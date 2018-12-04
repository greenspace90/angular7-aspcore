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

    Chart.pluginService.register({
      beforeDraw: function (chart: any, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
          var ctx = chart.chart.ctx;
          var chartArea = chart.chartArea;

          ctx.save();
          ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          ctx.restore();
        }
      }
    });



    // let depreciationChart = new Chart(this.ctx, {
    var config = {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            data: this.bookValue,
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
            pointRadius: 0.5,
            pointBorderWidth: 0.5,
            // borderWidth: 0.05,
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
              labelString: 'Value',
              fontSize: 14
            },
            ticks: {
              // stepSize: 2500,
              callback: function (value, index, values) {
                value = value.toString();
                // Split every 3 digits
                value = value.split(/(?=(?:...)*$)/);
                // Convert the array to a string and format the output
                value = value.join(',');
                return '£' + value;
              }
            }
          }]
        },
        chartArea: {
          backgroundColor: '#99ebff'
        },
        title: {
          display: true,
          text: this.data.chartTitle,
          fontSize: 18
        },
        aspectRatio: 3
      }
    }
    // })

    let depreciationChart = new Chart(this.ctx, config);


    // console.log(depreciationChart);




  }





}


