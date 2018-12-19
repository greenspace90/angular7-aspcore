import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { VehiclelistComponent } from '@components/vehiclelist';
import { VehicleService, BodystyleService } from '@app/_services/';
import { DBOperation, FileValidator, FileValueAccessor } from '@app/shared';
import { IVehicle } from '@app/_models/';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})

export class VehicleformComponent implements OnInit {
  msg: string;
  indLoading = false;
  vehicleFrm: FormGroup;
  listFilter: string;
  selectedOption: string;
  bodystyles = [];
  savevehicle: IVehicle;
  viewVehicle: IVehicle;
  currentPurchasePrice: number;
  currentResidualValue: number;
  message: string;
  imagePath;
  imgURL: any;
  progress: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _bodystyleService: BodystyleService,
    public dialogRef: MatDialogRef<VehiclelistComponent>,
    private http: HttpClient) { }

  ngOnInit() {
    if (this.data.dbops != DBOperation.create) {
      this.currentPurchasePrice = this.data.vehicle.purchasePrice;
      this.currentResidualValue = this.data.vehicle.residualValue;
    }

    // Build vehicle form
    // The lines including lambda expressions force the re-evaluation of method parameters whenever they change,
    // otherwise the parameters would only be evaluated once, during OnInit.
    this.vehicleFrm = this.fb.group({
      vehicleId: [''],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      version: ['', [Validators.required]],
      registration: ['', [Validators.required]],
      contactId: [''],
      contact: [''],
      typeId: [''],
      bodystyle: [''],
      purchaseDate: ['', [purchaseDateValidator()]],
      purchasePrice: ['', [(control: AbstractControl) => purchasePriceValidator(this.currentResidualValue)(control)]],
      ownershipPeriod: ['', [Validators.required]],
      residualValue: ['', [(control: AbstractControl) => residualValueValidator(this.currentPurchasePrice)(control)]],
      currentValue: [''],
      imagePath: [''],
      // fullImagePath: ['']
      fullImagePath: ['', [FileValidator.validate]]
    });

    this._bodystyleService.getAllBodystyles('api/bodystyle/getAllBodystyles')
      .subscribe(styles => {
        this.bodystyles = styles;
      });

    // subscribe on value changed event of form to show validation message
    this.vehicleFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    if (this.data.dbops === DBOperation.create) {
      this.vehicleFrm.reset();
      // Prevents form control error when creating a vehicle- full image path not yet known, but some value must be set on formgroup
      this.vehicleFrm.controls['fullImagePath'].setValue('not set');
    } else {
      this.vehicleFrm.setValue(this.data.vehicle);
      this.imgURL = this.data.vehicle.fullImagePath;
    }
    this.SetControlsState(this.data.dbops === DBOperation.delete ? false : true);
  }

  // form value change event
  onValueChanged(data?: any) {
    if (!this.vehicleFrm) { return; }

    this.currentPurchasePrice = this.vehicleFrm.get('purchasePrice').value;
    this.currentResidualValue = this.vehicleFrm.get('residualValue').value;
    const form = this.vehicleFrm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      // setup custom validation message to form
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }



  // form errors model
  // tslint:disable-next-line:member-ordering
  formErrors = {
    'make': '',
    'model': '',
    'version': '',
    'registration': '',
    'typeId': '',
    'purchaseDate': '',
    'purchasePrice': '',
    'ownershipPeriod': '',
    'residualValue': '',
    'imagePath': ''
  };
  // custom valdiation messages
  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'make': {
      'required': 'Make is required.'
    },
    'model': {
      'required': 'Model is required.'
    },
    'version': {
      'required': 'Version is required.'
    },
    'registration': {
      'required': 'Registration is required.'
    },
    'typeId': {
      'required': 'Bodystyle is required.'
    },
    'purchaseDate': {
      'required': 'Purchase Date is required.',
      'purchaseDateInFuture': 'Purchase Date cannot be a future date.'
    },
    'purchasePrice': {
      'required': 'Purchase Price is required.',
      'purchasePriceBelowResidualValue': 'Purchase Price must exceed Residual Value.'
    },
    'ownershipPeriod': {
      'required': 'Ownership Period is required.'
    },
    'residualValue': {
      'required': 'Residual Value is required.',
      'residualValueExceedsPurchasePrice': 'Residual Value cannot exceed Purchase Price'
    },
    'imagePath': {
      'required': 'Image Path is required.'
    }
  };

  onSubmit(formData: any) {
    this.savevehicle = this.mapDateData(formData.value);

    switch (this.data.dbops) {
      case DBOperation.create:
        this.savevehicle.contactId = this.data.contactId;
        if (this.imagePath) {
          this.upload(this.savevehicle.make);
          this.savevehicle.imagePath = this.imagePath[0].name;
        }

        this._vehicleService.addVehicle('api/vehicle/addVehicle', this.savevehicle).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.update:
        if (this.imagePath) {
          this.upload(this.savevehicle.make);
          this.savevehicle.imagePath = this.imagePath[0].name;
        }
        this._vehicleService.updateVehicle('api/vehicle/updateVehicle', this.data.vehicle.vehicleId, this.savevehicle).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.delete:
        this._vehicleService.deleteVehicle('api/vehicle/deleteVehicle', this.data.vehicle.vehicleId).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
    }
  }
  SetControlsState(isEnable: boolean) {
    isEnable ? this.vehicleFrm.enable() : this.vehicleFrm.disable();
  }

  mapDateData(vehicle: IVehicle): IVehicle {
    vehicle.purchaseDate = new Date(vehicle.purchaseDate).toISOString();
    return vehicle;
  }

  preview(files) {
    if (files.length === 0)
      return;

    console.log(files[0].name);

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  upload(make: string) {
    if (this.imagePath.length === 0)
      return;

    const formData = new FormData();

    for (let file of this.imagePath) {
      formData.append('Files', file);
    }

    const value = { 'key': make };
    formData.append('makeDTO', JSON.stringify(value));
    // console.log(formData.get('makeDTO'));
    // console.log(formData.get('Files'));
    // const url = `api/upload?make=${make}`;   

    //  this.uploadReq = this._uploadService.upload('api/upload', formData);
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      headers: headers,
      reportProgress: true
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
}

function purchasePriceValidator(residualValue: number): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {

    // if (control.value !== undefined && (isNaN(control.value) || control.value < residualValue)) {
    if (control.value !== undefined && Number(control.value) < Number(residualValue)) {
      return { 'purchasePriceBelowResidualValue': true };
    }

    return null;

  };

}

function residualValueValidator(purchasePrice: number): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {

    // if (control.value !== undefined && (isNaN(control.value) || control.value > purchasePrice)) {
    if (control.value !== undefined && Number(control.value) > Number(purchasePrice)) {
      return { 'residualValueExceedsPurchasePrice': true };
    }

    return null;

  };

}

function purchaseDateValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let today = new Date();
    if (control.value !== undefined && control.value > today) {
      return { 'purchaseDateInFuture': true };
    }

    return null;

  };

}

