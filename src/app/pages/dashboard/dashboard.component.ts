import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceFilter } from '@angular/compiler';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})

export class DashboardComponent implements OnInit {
  model: NgbDateStruct;
  placement = 'bottom';
  public chartColor;
  public chartHours;
  //------------graficas--------------
  // sucursales con mas omicion: barras
  public branchOmision;
  public canvas: any;
  public ctx;
  // actividades mas omitidas: barras
  public activityOmision;
  public canvasActivity: any;
  public ctxActivity;


  public activeDate = false;
  // variables
  public user: any;
  public data: any;
  // variables de calendario
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  public today = new Date();
  public dateDash = new Date();
  public dateFormat;
  public graficActivityLabel;

  constructor(public services: ServiceGeneralService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    let day = this.dateDash.getDate()
    let month = this.dateDash.getMonth() + 1
    let year = this.dateDash.getFullYear()

    if (month < 10) {
      this.dateFormat = `${year}-0${month}-${day}`;
      console.log(`${year}-0${month}-${day}`)
    } else {
      this.dateFormat = `${year}-${month}-${day}`;
      console.log(`${year}-${month}-${day}`)
    }
    //this.getDataDash(this.dateFormat);
  }
  getDataDash(date) {
    console.log(this.dateDash);
    this.services.serviceGeneralGet('Dashboard/Admin?dateTime=' + date).subscribe(resp => {
      if (resp.success) {
        this.data = resp.result;
        console.log('data dash', this.data);
        this.getGrafica();

      }
    });
  }

  getGrafica() {
    console.log('data grafica');
    // estructura de data  omiciones
    this.canvas = document.getElementById("branchOmision");
    this.ctx = this.canvas.getContext("2d");
    const graficOmisionData = [];
    this.data.branchWithMostOmissionsCollection.forEach(data => {
      graficOmisionData.push(
        data.percentage
      );
    });
    console.table("graficOmisionData", graficOmisionData);
    const graficOmisionLabel = [];
    this.data.branchWithMostOmissionsCollection.forEach(data => {
      graficOmisionLabel.push(
        data.branchName
      );
    });
    console.table("graficOmisionLabel", graficOmisionLabel);

    // grafica de omisiones
    this.branchOmision = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: graficOmisionLabel,
        datasets: [{
          barPercentage: 1,
          label: 'Porcentaje de omision',
          borderColor: "#ff5353",
          backgroundColor: "rgba(255, 83, 83, 0.2)",
          borderWidth: 1,
          minBarLength: 0,
          pointHoverRadius: 0,
          data: graficOmisionData,
        }],
      },
      options: {
        scales: {
          y: {

            beginAtZero: true

          }
        }
      }
    });
    // pointRadius: 0,



    // grafica con actividades mas omitidas
    this.canvas = document.getElementById("activityOmision");
    this.ctxActivity = this.canvas.getContext("2d");

    // creacion del objeto
    const graficActivityData = [];
    this.data.mostOmittedActivitiesCollection.forEach(data => {
      graficActivityData.push(
        data.percentage
      );
    });
    this.graficActivityLabel = [];
    this.data.mostOmittedActivitiesCollection.forEach(data => {
      this.graficActivityLabel.push(
        data.name
      );
    });
    console.table("actividades mas omitidas", graficActivityData);
    console.table("graficActivityLabel", this.graficActivityLabel);

    this.activityOmision = new Chart(this.ctxActivity, {
      type: 'doughnut',
      data: {
        labels: this.graficActivityLabel,
        datasets: [{
          label: "Actividades omitidas",
          hoverOffset: 4,
          backgroundColor: [
            '#4acccd',
            '#e3e3e3',
            '#fcc468',
            '#ef8157'
          ],
          borderWidth: 0,
          data: graficActivityData
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '% actividades omitidas'
          }
        },
      }
    });


    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });


  }
}
