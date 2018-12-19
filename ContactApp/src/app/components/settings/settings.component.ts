import { Component, OnInit, Inject, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar,  MAT_DIALOG_DATA, } from '@angular/material';
import { SettingsService } from '@app/_services/';
import { DBOperation } from '@app/shared/DBOperation';
import { ISettings } from '@app/_models/';
// import { MatColorPickerModule } from 'mat-color-picker';

// @NgModule({
//   imports: [
//     MatColorPickerModule
//   ]
// })

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  msg: string;
  indLoading = false;
  settingsFrm: FormGroup;
  listFilter: string;
  selectedOption: string;
  settings: ISettings;
  sizeSettings: ISettings;
  title = 'Settings';

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, 
  constructor(public snackBar: MatSnackBar, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _settingsService: SettingsService) { }

  ngOnInit() {

    // Build vehicle form
    // The lines including lambda expressions force the re-evaluation of method parameters whenever they change,
    // otherwise the parameters would only be evaluated once, during OnInit.

    this._settingsService.getSettings('api/settings/getSettings')
      .subscribe(settings => {
        this.settings = settings;
        this.settingsFrm = this.fb.group({
          settingsId: [''],
          chartTitleFontSize: ['', [Validators.required]],
          chartScaleLabelFontSize: ['', [Validators.required]],
          chartLineWidth: ['', [Validators.required]],
          chartLineColour: [this.settings.chartLineColour, [Validators.required]],
          chartAreaBackgroundColour: ['', [Validators.required]],
          chartModalBackgroundColour: ['', [Validators.required]]
        });
      this.settingsFrm.setValue(this.settings);


      // subscribe on value changed event of form to show validation message
      this.settingsFrm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();

      });

    // this.SetControlsState(this.data.dbops === DBOperation.delete ? false : true);
  }

  // form value change event
  onValueChanged(data?: any) {
    if (!this.settingsFrm) { return; }
    const form = this.settingsFrm;
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

  onChartLineColorChange(chartLineColour: any): void {
    this.settings.chartLineColour = chartLineColour;
  }

  onChartAreaBackgroundColourChange(ChartAreaBackgroundColour: any): void {
    this.settings.chartAreaBackgroundColour = ChartAreaBackgroundColour;
  }

  onChartModalBackgroundColourChange(ChartModalBackgroundColour: any): void {
    this.settings.chartModalBackgroundColour = ChartModalBackgroundColour;
  }

    // this.settingsFrm.value['chartLineColour'] =chartLineColour;

  // form errors model
  // tslint:disable-next-line:member-ordering
  formErrors = {
    settingsId: '',
    chartTitleFontSize: '',
    chartScaleLabelFontSize: '',
    chartLineWidth: '',
    chartLineColour: '',
    chartAreaBackgroundColour: '',
    chartModalBackgroundColour: ''
  };
  // custom valdiation messages
  validationMessages = {
    'chartTitleFontSize': {
      'required': 'Chart title font size is required.'
    },
    'chartScaleLabelFontSize': {
      'required': 'chart scale label font size is required.'
    },
    'chartLineWidth': {
    'required': 'Chart line width is required.'
    },
    'chartLineColour': {
      'required': 'Chart line colour is required.'
    },
    'chartAreaBackgroundColour': {
      'required': 'Chart area background colour is required.'
    },
    'chartModalBackgroundColour': {
      'required': 'chart modal background colour Date is required.',
    }
  };

  onSubmit(formData: any) {
    this.sizeSettings = formData.value;
    this.settings.chartLineWidth = this.sizeSettings.chartLineWidth;
    this.settings.chartScaleLabelFontSize = this.sizeSettings.chartScaleLabelFontSize;
    this.settings.chartTitleFontSize = this.sizeSettings.chartTitleFontSize;
    this._settingsService.updateSettings('api/settings/updateSettings', this.settings).subscribe(
      data => {
        // Success
        if (data.message) {
          this.showMessage('Settings updated successfully');
          this.router.navigate(['cms']);
          // alert('Settings updated successfully');
          // this.dialogRef.close('success');
        } else {
          this.showMessage('Unable to update settings');
          // this.dialogRef.close('error');
        }
      },
      error => {
        // this.dialogRef.close('error');
      }
    );

  }
  // SetControlsState(isEnable: boolean) {
  //   isEnable ? this.settingsFrm.enable() : this.settingsFrm.disable();
  // }

  cancel() {
    this.router.navigate(['cms']);
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000
    });
  }

}

