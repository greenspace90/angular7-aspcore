import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

import { IBodystyle } from '@app/_models/';
import { BodystyleService } from '@app/_services/';
import {BodystylesComponent} from '../bodystyles'
import { Global } from '@app/shared/Global';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent implements OnInit {
  msg: string;
  deleteconfirmFrm: FormGroup;
  bodystyle: IBodystyle;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _bodystyleService: BodystyleService,
    public dialogRef: MatDialogRef<BodystylesComponent>) { }

  ngOnInit() {
    this.bodystyle = this.data.bodystyle;
    this.deleteconfirmFrm = this.fb.group({
      name: this.bodystyle.name
    });
  }

  delete(){
    this._bodystyleService.deleteBodystyle('api/bodystyle/deleteBodystyle', this.bodystyle.typeId).subscribe(
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
  }
}
