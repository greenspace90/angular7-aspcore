import { Component, Inject, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehiclelistComponent } from '@components/vehiclelist';
import { SettingsService } from '@app/_services';
import { ISettings } from '@app/_models';

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
  settings: ISettings;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _settingsService: SettingsService,
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

    this._settingsService.getSettings('api/settings/getSettings')
    .subscribe(settings => {
      this.settings = settings;
      document.documentElement.style.setProperty('--background-color', settings.chartModalBackgroundColour);
      var config = {
        type: 'line',
        data: {
          labels: this.days,
          datasets: [
            {
              data: this.bookValue,
              backgroundColor: this.settings.chartLineColour,
              borderColor: this.settings.chartLineColour,
              pointRadius: this.settings.chartLineWidth,
              pointBorderWidth: this.settings.chartLineWidth,
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
                fontSize: this.settings.chartScaleLabelFontSize
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
                fontSize: this.settings.chartScaleLabelFontSize
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
            backgroundColor: this.settings.chartAreaBackgroundColour
          },
          title: {
            display: true,
            text: this.data.chartTitle,
            fontSize: this.settings.chartTitleFontSize
          },
          aspectRatio: 3
        }
      }
      let depreciationChart = new Chart(this.ctx, config);

  
    });

    // let depreciationChart = new Chart(this.ctx, {
    // var config = {
    //   type: 'line',
    //   data: {
    //     labels: this.days,
    //     datasets: [
    //       {
    //         data: this.bookValue,
    //         backgroundColor: this.settings.chartLineColour,
    //         borderColor: this.settings.chartLineColour,
    //         pointRadius: this.settings.chartLineWidth,
    //         pointBorderWidth: this.settings.chartLineWidth,
    //         // borderWidth: 0.05,
    //         fill: false
    //       }
    //     ]
    //   },
    //   options: {
    //     layout: {
    //       padding: {
    //         left: 50,
    //         right: 0,
    //         top: 0,
    //         bottom: 0
    //       }
    //     },
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true,
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'Days',
    //           fontSize: this.settings.chartScaleLabelFontSize
    //         }
    //       }],
    //       yAxes: [{
    //         display: true,
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'Value',
    //           fontSize: this.settings.chartScaleLabelFontSize
    //         },
    //         ticks: {
    //           // stepSize: 2500,
    //           callback: function (value, index, values) {
    //             value = value.toString();
    //             // Split every 3 digits
    //             value = value.split(/(?=(?:...)*$)/);
    //             // Convert the array to a string and format the output
    //             value = value.join(',');
    //             return '£' + value;
    //           }
    //         }
    //       }]
    //     },
    //     chartArea: {
    //       backgroundColor: this.settings.chartAreaBackgroundColour
    //     },
    //     title: {
    //       display: true,
    //       text: this.data.chartTitle,
    //       fontSize: this.settings.chartTitleFontSize
    //     },
    //     aspectRatio: 3
    //   }
    // }
    // })

    // let depreciationChart = new Chart(this.ctx, config);


    // console.log(depreciationChart);




  }





}


