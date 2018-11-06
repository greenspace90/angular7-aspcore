import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { VehicleformComponent } from '@components/vehicleform/vehicleform.component';
import { VehicleService } from '@app/services/vehicle.service';
import { IVehicle } from '@app/model/vehicle';
import { DBOperation } from '@app/shared/DBOperation';
import { Global } from '@app/shared/Global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {

  vehicles: IVehicle[];
  vehicle: IVehicle;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;

  // set columns that will need to show in listing table
  displayedColumns = ['make', 'model', 'registration', 'bodystyle'];
  // setting up datasource for material table
  dataSource = new MatTableDataSource<IVehicle>();

  constructor(public snackBar: MatSnackBar, private _vehicleService: VehicleService, private dialog: MatDialog, private route: ActivatedRoute) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
      // This will get the param from your route
      this.route.params.subscribe((params) => {
        if (params) {
            const id= params['id'];
            if (id) {
                // Perform action when idOrClassName is presented
              this.loadingState = true;
              this.loadVehicles(id);
              this.dataSource.sort = this.sort;    
                return;
            } 

            // Perform action when idOrClassName is not presented   
        }
    });
  }
 loadVehicles(id): void {
    this._vehicleService.getVehiclesByContactId('api/vehicle/getAllVehicles', id)
      .subscribe(vehicles => {
        this.dataSource.data = vehicles;
        this.loadingState = false;
      });
  }  
  
  openDialog(id: number): void {
      this.vehicle.contactid = id;    
      const dialogRef = this.dialog.open(VehicleformComponent, {
      width: '500px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, vehicle: this.vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'success') {
        this.loadingState = true;
        this.loadVehicles(id);
        switch (this.dbops) {
          case DBOperation.create:
            this.showMessage('Data successfully added.');
            break;
          case DBOperation.update:
            this.showMessage('Data successfully updated.');
            break;
          case DBOperation.delete:
            this.showMessage('Data successfully deleted.');
            break;
        }
      } else if (result === 'error') {
        this.showMessage('There is some issue in saving records, please contact to system administrator!');
      } else {
       // this.showMessage('Please try again, something went wrong');
      }
    });
  }

  addVehicle(id: number) {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Vehicle';
    this.modalBtnTitle = 'Add';
    this.openDialog(id);
  }
  editVehicle(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Vehicle';
    this.modalBtnTitle = 'Update';
    this.vehicle = this.dataSource.data.filter(x => x.vehicleid === id)[0];
    this.openDialog(this.vehicle.contactid);
  }
  deleteVehicle(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm Delete?';
    this.modalBtnTitle = 'Delete';
    this.vehicle = this.dataSource.data.filter(x => x.vehicleid === id)[0];
    this.openDialog(this.vehicle.contactid);
  }
  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }

}
