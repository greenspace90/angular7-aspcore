import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BodystyleService } from '@app/_services/';
import { IBodystyle } from '@app/_models/';
import { DBOperation } from '@app/shared/DBOperation';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { Global } from '@app/shared/Global';


@Component({
  selector: 'app-bodystyles',
  templateUrl: './bodystyles.component.html',
  styleUrls: ['./bodystyles.component.css']
})
export class BodystylesComponent implements OnInit {
  bodystyles: IBodystyle[];
  bodystyle: IBodystyle;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  showBodystyleInput: boolean = false;
  saveBodystyle: IBodystyle;
  bodystyleFrm: FormGroup;
  currentTypeId: number;

  // set columns that will need to show in listing table
  displayedColumns = ['name', 'action'];
  // setting up datasource for material table
  dataSource = new MatTableDataSource<IBodystyle>();

  constructor(public snackBar: MatSnackBar, private _bodystyleService: BodystyleService, private dialog: MatDialog, private fb: FormBuilder) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.bodystyleFrm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
      // showBodystyleInput: [this.showBodystyleInput]
    });
    // subscribe on value changed event of form to show validation message
    this.bodystyleFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.loadingState = true;
    this.loadBodystyles();
    this.dataSource.sort = this.sort;
  }
  onValueChanged(data?: any) {
    if (!this.bodystyleFrm) { return; }
    const form = this.bodystyleFrm;
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
    'name': ''
  };
  // custom valdiation messages
  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be more than 50 characters long.',
      'required': 'Name is required.'
    }
  };

  openDialog(): void {
    // const dialogRef = this.dialog.open(ContactformComponent, {
    //   width: '500px',
    //   data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, contact: this.bodystyle }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result === 'success') {
    //     this.loadingState = true;
    //     this.loadBodystyles();
    //     switch (this.dbops) {
    //       case DBOperation.create:
    //         this.showMessage('Data successfully added.');
    //         break;
    //       case DBOperation.update:
    //         this.showMessage('Data successfully updated.');
    //         break;
    //       case DBOperation.delete:
    //         this.showMessage('Data successfully deleted.');
    //         break;
    //     }
    //   } else if (result === 'error') {
    //     this.showMessage('There is some issue in saving records, please contact to system administrator!');
    //   } else {
    //     // this.showMessage('Please try again, something went wrong');
    //   }
    // });
  }

  loadBodystyles(): void {
    this._bodystyleService.getAllBodystyles('api/bodystyle/getAllBodystyles')
      .subscribe(bodystyles => {
        this.dataSource.data = bodystyles;
        this.loadingState = false;
      });
  }

  addBodystyle() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Contact';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }
  editBodystyle(typeId: number) {
    // this.dbops = DBOperation.update;
    // this.modalTitle = 'Edit Contact';
    // this.modalBtnTitle = 'Update';
    // this.bodystyle = this.dataSource.data.filter(x => x.typeId === typeId)[0];
    // this.openDialog();
    this.showBodystyleInput = true;
    this.currentTypeId = typeId;
  }

  updateBodystyle(formData: any, typeId: number) {
    this.saveBodystyle = this.dataSource.data.filter(x => x.typeId === typeId)[0];
    this.saveBodystyle.name = formData.value.name;
    this._bodystyleService.updateBodystyle('api/bodystyle/updateBodystyle', typeId, this.saveBodystyle).subscribe(
      data => {
        // Success
        if (data.message) {
          this.showMessage("Bodystyle updated successfully");
          this.showBodystyleInput = false;
          this.bodystyleFrm.reset();
        } else {
          this.showMessage("Unable to update Bodystyle");
        }
      },
      error => {
        this.showMessage("Unable to update Bodystyle");
      }
    );

  }

  deleteContact(typeId: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm Delete?';
    this.modalBtnTitle = 'Delete';
    this.bodystyle = this.dataSource.data.filter(x => x.typeId === typeId)[0];
    this.openDialog();
  }

  cancel() {
    this.bodystyleFrm.reset();
    this.showBodystyleInput = false;
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }

}
