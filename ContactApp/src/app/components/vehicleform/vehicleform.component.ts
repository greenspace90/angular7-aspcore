import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

import { VehiclelistComponent } from '../vehiclelist/vehiclelist.component';

import { IVehicle } from '@app/model/vehicle';
import { VehicleService } from '@app/services/vehicle.service';
import { BodystyleService } from '@app/services/bodystyle.service';
import { DBOperation } from '@app/shared/DBOperation';
import { Global } from '@app/shared/Global';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})

export class VehicleformComponent implements OnInit {
  msg: string;
  indLoading = false;
  vehicleFrm: FormGroup;
  // dbops: DBOperation;
  // modalTitle: string;
  // modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  // contact: IContact;
  // genders = [];
  // technologies = [];
  bodystyles = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _bodystyleService: BodystyleService,
    public dialogRef: MatDialogRef<VehiclelistComponent>) { }

  ngOnInit() {
    // built vehicle form
    this.vehicleFrm = this.fb.group({
      vehicleid: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      make: ['', [Validators.required, Validators.email]],
      model: ['', [Validators.required]],
      version: ['', [Validators.required]],
      contactid: [''],
      typeid: [''],
    });
    // this.genders = Global.genders;
    // this.technologies = Global.technologies;

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
    'name': '',
    'make': '',
    'model': '',
    'version': ''
  };
  // custom valdiation messages
  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be more than 50 characters long.',
      'required': 'Name is required.'
    },
    'make': {
      'required': 'Make is required.'
    },
    'model': {
      'required': 'Model is required.'
    },
    'version': {
      'required': 'Version is required.'
    }
  };

  onSubmit(formData: any) {
    switch (this.data.dbops) {
      case DBOperation.create:
        this._vehicleService.addVehicle('api/vehicle/addVehicle', formData).subscribe(
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
        this._vehicleService.updateVehicle('api/vehicle/updateVehicle', formData.vehicleid, formData).subscribe(
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
        this._vehicleService.deleteVehicle('api/vehicle/deleteVehicle', formData.vehicleid).subscribe(
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
