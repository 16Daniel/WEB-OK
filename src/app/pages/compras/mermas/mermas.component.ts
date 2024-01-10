import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mermas',
  templateUrl: './mermas.component.html',
  styleUrls: ['./mermas.component.css']
})
export class MermasComponentC implements OnInit {
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
  public carga : boolean = false;
  
  constructor(
    public service: ServiceGeneralService,) { }

  ngOnInit(): void {
    this.ciudad = 1;
    this.getdataRegional(1);
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    if (this.user.roleId === 2) {
      this.ciudad = 1;
      console.log('City', this.ciudad);
      this.getdataSucursal(this.ciudad);
    }
    this.ciudad = 1;
    this.getdataRegional(this.ciudad);
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

  getMermas(ciudad, sucursal, dateInit, dateEnd) {
    this.carga= true;
    if (ciudad == undefined || dateEnd == undefined || dateInit == undefined || sucursal == undefined) {
      this.carga= false;
      return
    }
    this.service
      .serviceGeneralGet(`Dashboard/performance-regionalD/${ciudad}/${sucursal}/?initDate=${dateInit}&endDate=${dateEnd}`)
      .subscribe((resp) => {
       
        if (resp.success) {
          this.data = resp.result;
          console.log("data", this.data);
          this.getTotalmermas();
        }
        this.carga= false;
      });
    // StockChicken/Admin/All-Branch?dataBase=DB2
  }
  getTotalmermas(){
        //Calculamos el TOTAL 
        this.mermastotal = this.data.reduce((
          acc,
          obj,
        ) => acc + (obj.price * obj.unity),
        0);
        console.log("Total: ", this.mermastotal)
  }

  public name; 
  exportToExcel(): void {
    
      this.name = 'RW REPORTE MERMAS.xlsx';
    
    let element = document.getElementById('reporte-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
