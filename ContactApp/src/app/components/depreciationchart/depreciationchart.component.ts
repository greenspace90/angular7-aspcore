import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { VehiclelistComponent } from '@components/vehiclelist';
import { IDataPoint } from '@app/_models'; 

@Component({
  selector: 'app-depreciationchart',
  templateUrl: './depreciationchart.component.html',
  styleUrls: ['./depreciationchart.component.css']
})
export class DepreciationchartComponent implements OnInit {

  chart = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<VehiclelistComponent>) { }

  ngOnInit() {
    let days = this.data.map(res => res.day);
    let bookValue = this.data.map(res => res.bookValue);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            data: bookValue,
            borderColor: '#3cba9f',
            fill: false
          }
          // {
          //   data: temp_min,
          //   borderColor: '#ffcc00',
          //   fill: false
          // },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })

  }

}
