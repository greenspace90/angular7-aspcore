import 'rxjs/add/operator/map'
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSort, MatDialog } from '@angular/material';
import { VehicleformComponent } from '@components/vehicleform';
import { VehicleService } from '@app/_services';
import { IVehicle } from '@app/_models';
import { DBOperation } from '@app/shared/DBOperation';
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
  contactId: number;

  // set columns that will need to show in listing table
  displayedColumns = ['make', 'model', 'version', 'registration', 'bodystyle', 'purchaseDate', 'purchasePrice', 'ownershipPeriod', 'residualValue', 'action'];
  // setting up datasource for material table
  dataSource = new MatTableDataSource<IVehicle>();

  constructor(public snackBar: MatSnackBar, private _vehicleService: VehicleService, private dialog: MatDialog, private route: ActivatedRoute) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.route.params.map(p => p.id).subscribe((id: number) => {
      this.contactId = id;
      // let id = contactId;

    this.loadingState = true;
    if (this.contactId) {
      this.loadVehicles(this.contactId);
    }
    else {
      this.loadAllVehicles();
    }
    this.dataSource.sort = this.sort;
    });
  };

  loadAllVehicles(): void {
    this._vehicleService.getAllVehicles('api/vehicle/getAllVehicles')
      .subscribe(vehicles => {
        this.dataSource.data = vehicles;
        this.loadingState = false;
      });
  }

  loadVehicles(id): void {
    this._vehicleService.getVehiclesByContactId('api/vehicle/getVehiclesByContactId', id)
      .subscribe(vehicles => {
        this.dataSource.data = vehicles;
        this.loadingState = false;
      });
  }

  openDialog(id: number): void {
    let vehicledata;
    // Undefined when adding new Vehicle
    if(this.vehicle !== undefined)
    {
      this.vehicle.contactId = id;
      vehicledata = this.vehicle;
    }
    const dialogRef = this.dialog.open(VehicleformComponent, {
      width: '500px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, vehicle: vehicledata, contactId: this.contactId }
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

  addVehicle() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Vehicle';
    this.modalBtnTitle = 'Add';
    this.openDialog(this.contactId);
  }
  editVehicle(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Vehicle';
    this.modalBtnTitle = 'Update';
    this.vehicle = this.dataSource.data.filter(x => x.vehicleId === id)[0];
    this.openDialog(this.vehicle.contactId);
  }
  deleteVehicle(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm Delete?';
    this.modalBtnTitle = 'Delete';
    this.vehicle = this.dataSource.data.filter(x => x.vehicleId === id)[0];
    this.openDialog(this.vehicle.contactId);
  }
  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }

}
