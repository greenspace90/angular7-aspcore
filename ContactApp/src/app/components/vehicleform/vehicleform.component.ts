import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _bodystyleService: BodystyleService,
    public dialogRef: MatDialogRef<VehiclelistComponent>) { }

  ngOnInit() {
    // built vehicle form
    this.vehicleFrm = this.fb.group({
      vehicleId: [''],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      version: ['', [Validators.required]],
      registration: ['', [Validators.required]], 
      contactId: [''],
      contact: [''],
      typeId: [''],
      bodystyle: ['']
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
    'typeId': ''  
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
  };

  onSubmit(formData: any) {
    switch (this.data.dbops) {
      case DBOperation.create:
      this.savevehicle = formData.value;
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
        this.savevehicle = formData.value;
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
        this._vehicleService.deleteVehicle('api/vehicle/deleteVehicle', formData.vehicleId).subscribe(
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
}
