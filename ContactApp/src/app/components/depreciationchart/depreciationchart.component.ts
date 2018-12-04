import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { VehiclelistComponent } from '@components/vehiclelist';
import { IDataPoint } from '@app/_models';

@Component({
  selector: 'app-depreciationchart',
  templateUrl: './depreciationchart.component.html',
  styleUrls: ['./depreciationchart.component.css']
})
export class DepreciationchartComponent implements AfterViewInit {

  canvas: any;
  ctx: any;
  days: string[];
  bookValue: number[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VehiclelistComponent>) { }

  ngAfterViewInit() {
    this.days = this.data.chartData.map(res => res.day.toString());
    this.bookValue = this.data.chartData.map(res => res.bookValue);

    this.canvas = document.getElementById('depreciationChart');
    this.ctx = this.canvas.getContext('2d');
    let depreciationChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            data: this.bookValue,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Days',
              fontSize: 14
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value (£)',
              fontSize: 14
            },
            ticks: {
              beginAtZero: true,
              stepSize: 2500,

              // Return an empty string to draw the tick line but hide the tick label
              // Return `null` or `undefined` to hide the tick line entirely
                // Convert the number to a string and split the string every 3 charaters from the end
              userCallback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                // Convert the array to a string and format the output
                value = value.join('.');
                return '£' + value;
              }
            }
          }]
        },
        title: {
          display: true,
          text: this.data.chartTitle,
          fontSize: 18
        },
        aspectRatio: 3
      }
    })
    // console.log(depreciationChart);
  }




}
