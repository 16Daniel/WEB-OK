import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-performance-regional',
  templateUrl: './dashboard-performance-regional.component.html',
  styleUrls: ['./dashboard-performance-regional.component.css']
})
export class DashboardPerformanceRegionalComponent implements OnInit {
  public user: any;
  public ciudad = 1;
  public catState: any[] = [];
  public catSucursal: any[] = [];
  public catRegionales: any[] = [];
  public regional;
  public db; 
  public dateDash;
  public dateDashTwo;
  public data: any;
  public chartOptions: any;
  public carga = false;
  public hayDatos = true;

  // Charts Dounut
  singleDounut = [];
  view: [number, number] = [900, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // Chart Staked
  multi: [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'SUCURSALES';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'TAREAS';
  legendTitle: string = 'TAREAS';
  animation: boolean = true;

  colorScheme = {
    domain: ['#00C24F','#FF9C2A']
  };

  constructor(public services: ServiceGeneralService,private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getdataRegional(1);
  }

  getdataState() {
    this.services.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
  }

  getdataRegional(id){
    this.catRegionales = []; 
    this.services.serviceGeneralGet(`User/Regionals/${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catRegionales = resp.result;
        console.log("resp regionales", this.catRegionales);
      }
    });
  }

  getDataDash(ciudad, regional, dateOne, dateTwo) {
    ciudad = 1;
    console.log('regional', regional);
    console.log('ciudad', ciudad);
    console.log('dateDash', dateOne, dateTwo);
    if ( dateOne == undefined || dateTwo == undefined || regional == undefined) {
      return
    }
    else {
      this.carga = true;
      this.data = null;
      this.hayDatos = true;
      this.services.serviceGeneralGet(`Dashboard/performance-general/1/${regional}?startDate=${dateOne}&endDate=${dateTwo}`).subscribe(resp => {
        if (resp.success && resp.message != 'SIN DATOS') {
          
          this.data = resp.result;
          console.log('data dash', this.data);
          this.singleDounut = resp.result.topOmittedTask;
          this.multi = resp.result.multi;
          this.carga=false;
        }
        else{
          console.log('data dash', resp);
          this.carga=false;
          this.hayDatos = false;
        }
      });
    }
  }

  detail(item: any){
    this.router.navigate(['/regionales', 
      { 
        city: this.ciudad, 
        regional: this.regional, 
        dateOne: this.dateDash, 
        dateTwo: this.dateDashTwo,
        branch: item.idBranch
      }
    ]);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
