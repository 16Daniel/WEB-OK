import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import {MatTableModule} from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-inventarios',
  templateUrl: './reporte-inventarios.component.html',
  styleUrls: ['./reporte-inventarios.component.css']
})
export class ReporteInventariosComponent implements OnInit {

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
  public selectFila =null;
  displayedColumns = ['sucursal', 'articulo', 'invAyer', 'traspasoAyer', 'consumoAyer', 'invHoy', 'captura', 'invFormula','diferencia'];



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

  getReporte(ciudad, dateInit) {
    if (ciudad == undefined || dateInit == undefined) {
      return
    }
    this.service
      .serviceGeneralGet(`Dashboard/performance-reporte/${ciudad}/?initDate=${dateInit}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          console.log("data", this.data);
          
        }
      });
    // StockChicken/Admin/All-Branch?dataBase=DB2
    
  }
  clickTable(index){
    this.selectFila = index;
    console.log("index", this.selectFila);
  }
   
  public name; 
  exportToExcel(city): void {
    if(city == 1){
      this.name = 'RW CDMX INVENTARIOS: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    else{
      this.name = 'RW QRO INVENTARIOS: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    let element = document.getElementById('reporte-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}

