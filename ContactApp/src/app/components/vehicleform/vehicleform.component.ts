import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { VehiclelistComponent } from '@components/vehiclelist';
import { VehicleService, BodystyleService } from '@app/_services/';
import { DBOperation } from '@app/shared/DBOperation';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _bodystyleService: BodystyleService,
    public dialogRef: MatDialogRef<VehiclelistComponent>) { }

  ngOnInit() {

    this.currentPurchasePrice = this.data.vehicle.purchasePrice;
    this.currentResidualValue = this.data.vehicle.residualValue;

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
      currentValue: ['']
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
    } else {
      this.vehicleFrm.setValue(this.data.vehicle);
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
    'residualValue': ''
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
    }
  };

  onSubmit(formData: any) {
    this.savevehicle = this.mapDateData(formData.value);

    switch (this.data.dbops) {
      case DBOperation.create:
        // this.savevehicle = formData.value;
        this.savevehicle.contactId = this.data.contactId;

        // this._vehicleService.addVehicle('api/vehicle/addVehicle', formData).subscribe(
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
        // this.savevehicle = formData.value;
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

