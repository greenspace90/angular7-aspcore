import 'rxjs/add/operator/map'
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSort, MatDialog } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { VehicleformComponent } from '@components/vehicleform';
import { DepreciationchartComponent } from '@components/depreciationchart';
import { VehicleService } from '@app/_services';
import { IVehicle, IDataPoint } from '@app/_models';
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
  // vehicleId: number;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  contactId: number;
  // chartTitle: string;
  // chartData: IDataPoint[];

  // set columns that will need to show in listing table
  displayedColumns = ['make', 'model', 'version', 'registration', 'bodystyle', 'purchaseDate', 'purchasePrice', 'ownershipPeriod', 'currentValue', 'residualValue', 'action'];
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
    if (this.vehicle !== undefined) {
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

  displayChart(id: number) {
    this.vehicle = this.dataSource.data.filter(x => x.vehicleId === id)[0];    // Info needed for chart title
    let chartTitle = `Depreciation curve for ${this.vehicle.make} ${this.vehicle.model} over ${this.vehicle.ownershipPeriod} years`;

    callChart(id, this._vehicleService, this.dialog, chartTitle);
  };

  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  };
}

function callChart(id: number, _vehicleService: VehicleService, dialog: MatDialog, chartTitle: string) {
  (async () => {
    await callChartFunctions(id, _vehicleService, dialog, chartTitle);
  })();
}

async function callChartFunctions(id: number, _vehicleService: VehicleService, dialog: MatDialog, chartTitle: string) {
  try {
    let chartData = await getChartData(id, _vehicleService);
    let message = await openChartDialog(chartData, dialog, chartTitle);
    console.log(message);
  }
  catch (error) {
    console.log(error.message);
  }
}

const getChartData = (id, _vehicleService) => {
  return new Promise((resolve, reject) => {
    _vehicleService.getChartDataById('api/vehicle/getChartData', id)
      .subscribe(data => {
        const chartData: IDataPoint[] = data;
        // loadingState = false;
        if (chartData) {
          resolve(chartData);
        } else {
          reject();
        }
      });
  });
};

async function openChartDialog(chartData, dialog, chartTitle) {
  return new Promise(
    (resolve, reject) => {
      const dialogRef = dialog.open(DepreciationchartComponent, {
        height: '600px',
        width: '1550px',
        // data: chartData
        data: {chartData: chartData, chartTitle: chartTitle},
        panelClass: 'custom-settings'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result === 'success') {
          // this.loadingState = true;
          // this.loadVehicles(id);
        }
        else {
          // this.showMessage('Please try again, something went wrong');
        }
      });

      var message = 'OK';

      resolve(message);
    }
  );
};



