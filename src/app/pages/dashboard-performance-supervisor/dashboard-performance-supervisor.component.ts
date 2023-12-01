import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';

@Component({
  selector: 'app-dashboard-performance-supervisor',
  templateUrl: './dashboard-performance-supervisor.component.html',
  styleUrls: ['./dashboard-performance-supervisor.component.css']
})
export class DashboardPerformanceSupervisorComponent implements OnInit {
  public user: any;
  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];
  public catRegionales: any[] = [];
  public regional;
  public db; 
  public dateDash;
  public dateDashTwo;
  public data: any;
  public dataT: any;
  public chartOptions: any;
  public dataR: RangosDataModel []= [];
  public dat:[];
  public carga = false;

  // Charts Dounut
  singleDounut = [];
  singleDounut2 = [];
  view: [number, number] = [900, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // Chart Staked
  multi2: [];
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

  // options2
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'SUCURSALES';
  showYAxisLabel2: boolean = true;
  yAxisLabel2: string = 'RANGOS';
  legendTitle2: string = 'RANGOS';
  animation2: boolean = true;

  colorScheme = {
    domain: ['#00C24F','#FF9C2A']
  };
  colorScheme2 = {
    domain: ['#00C24F','#FF9C2A','#E96B56']
  };

  constructor(public services: ServiceGeneralService,private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getdataState();
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
        this.catRegionales.unshift({id: -1,name:"TODOS"});
        console.log("resp regionales", this.catRegionales);
      }
    });
  }

  getDataDash(ciudad, regional, dateOne, dateTwo) {
    console.log('regional', regional);
    console.log('ciudad', ciudad);
    console.log('dateDash', dateOne, dateTwo);

    if(this.user.roleId == 7 )
    {
      let datetemp = new Date(dateTwo);
      dateOne = datetemp.getFullYear()+"-"+(datetemp.getMonth()+1)+'-01'
    }

    
    if (ciudad == undefined || dateOne == undefined || dateTwo == undefined || regional == undefined) {
      return
    }
    else {
      this.carga = true;
      this.data = null;
      this.services.serviceGeneralGet(`Dashboard/performance-general-supervisor/${ciudad}/${regional}?startDate=${dateOne}&endDate=${dateTwo}`).subscribe(resp => {
        if (resp.success) {
          this.data = resp.result;
          this.singleDounut = resp.result.topOmittedTask;
          this.multi = resp.result.multi;
          this.multi2 = resp.result.multi2;
          this.singleDounut2 = resp.result.topOmittedTask2;
          console.log('cir', this.singleDounut);
          console.log('cir2', this.singleDounut2);
          console.log('multi', this.multi);
          console.log('multi2', this.multi2);
          console.log('data dash', this.data);
          this.carga = false;
        }
        this.getdataSucursal(regional);
      });
    }
  }

  detail(item: any){
    this.router.navigate(['/supervisores', 
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
  
  getdataSucursal(id) {
    this.catSucursal = [];
    let endpoint = this.user.roleId !== 2 ? 
      `User/Branches/${id}/${this.ciudad}` : `User/Branches/${this.user.id}/${this.user.stateId}`;  
    this.services.serviceGeneralGet(endpoint).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
       
      }
    });
  }


  
}
class RangosDataModel {
  rango: string;
  comandas: number;
  porcentaje: string;
  sucursal: string;
}
class MultiDataModel {
  name: string;
  series: SerieTableModel[];
}
class SerieTableModel {
  name: string;
  value: number;
}
