import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';

@Component({
  selector: 'app-tiempos',
  templateUrl: './tiempos.component.html',
  styleUrls: ['./tiempos.component.css']
})
export class TiemposComponent implements OnInit {

  public today = new Date();
  public DB;
  public data: any[] = [];
  public user;
  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];  
  public sucursal;
  public catRegionales: any[] = [];
  public regional;
  public dateInit;
  public dateEnd;
  public mermastotal;
  public dataR: RangosDataModel []= [];

  constructor(public service: ServiceGeneralService,) { }

  ngOnInit(): void {
    this.getdataState();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    if (this.user.roleId === 2) {
      this.ciudad = (this.user.stateId).toString();
      console.log('City', this.ciudad);
      this.getdataSucursal(this.ciudad);
    }
  }
  
  getdataSucursal(id) {
    this.catSucursal = [];
    let endpoint = this.user.roleId !== 2 ? 
      `User/Branches/${id}/${this.ciudad}` : `User/Branches/${this.user.id}/${this.user.stateId}`;  
    this.service.serviceGeneralGet(endpoint).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
      }
    });
  }

  getdataState() {
    this.service.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
  }
  
  getdataRegional(id){
    this.catRegionales = []; 
    this.service.serviceGeneralGet(`User/Regionals/${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catRegionales = resp.result;
        console.log("resp regionales", this.catRegionales);
      }
    });
  }

  getTiempos(ciudad, sucursal, dateInit, dateEnd) {
    if (ciudad == undefined || dateEnd == undefined || dateInit == undefined || sucursal == undefined) {
      return
    }
    this.service
      .serviceGeneralGet(`Dashboard/performance-sucursal-tiempos/${sucursal}/?initDate=${dateInit}&endDate=${dateEnd}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          console.log("data", this.data);
          this.getRangos();
        }
      });
    // StockChicken/Admin/All-Branch?dataBase=DB2
    
  }
  getRangos(){
    var rango1 =0;  //rango 0-10 min
    var rango2 =0;  //rango 11-15 min
    var rango3 =0;  //rango 16-20 min
    var rangoT =0;  //total


    this.data.forEach(element =>{
      
        if(element.minutos>=0 && element.minutos <= 15){ rango1++}
        if(element.minutos>=16 && element.minutos <= 25){ rango2++}
        if(element.minutos>=26 && element.minutos <= 30){ rango3++} 
    });

    rangoT=rango1+rango2+rango3;
    this.dataR=[
      {rango: "0-15 MINUTOS", comandas: rango1, porcentaje:""+ ((rango1/rangoT)*100).toFixed(1)},
      {rango: "16-25 MINUTOS", comandas: rango2, porcentaje:""+ ((rango2/rangoT)*100).toFixed(1)},
      {rango: "26-30 MINUTOS", comandas: rango3, porcentaje:""+ ((rango3/rangoT)*100).toFixed(1)}]

      // console.log("RANGOs",this.dataR)
      // console.log("RANGO Total:",rangoT)

  }

}
class RangosDataModel {
  rango: string;
  comandas: number;
  porcentaje: string;
}