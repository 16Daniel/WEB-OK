import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import {MatTableModule} from '@angular/material/table';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reporte-inventarios-s',
  templateUrl: './reporte-inventarios-s.component.html',
  styleUrls: ['./reporte-inventarios-s.component.css']
})
export class ReporteInventariosSComponent implements OnInit {

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
    // displayedColumns = ['sucursal', 'articulo', 'invAyer', 'traspasoAyer', 'consumoAyer', 'invHoy', 'captura', 'invFormula','diferencia'];
    public displayedColumns = ['region','sucursal', 'articulo', 'seccion', 'invAyer', 'traspasoAyer', 'consumoAyer', 'invHoy', 'captura', 'invFormula','diferencia'];
  
    public carga = false;
  
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

    form = new FormGroup({
      Inv: new FormControl('', Validators.required)
    });
     
    get f(){
      return this.form.controls;
    }

    changeInv(e) {
      
      if(e.target.value === "1"){
        this.displayedColumns = ['sucursal', 'articulo', 'seccion', 'invHoy', 'captura'];
        console.log(this.displayedColumns);
        console.log("1", e.target.value);
      }
      else{
        this.displayedColumns = ['sucursal', 'articulo', 'seccion',  'traspasoAyer', 'consumoAyer'];
        console.log(this.displayedColumns);
        console.log("2",e.target.value);
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
      // if (ciudad == undefined || dateInit == undefined) {
      if (dateInit == undefined) {
        return
      }
      this.carga = true;
      this.service
        .serviceGeneralGet(`Dashboard/performance-reporte-s/${ciudad}/?initDate=${dateInit}`)
        .subscribe((resp) => {
          if (resp.success) {
            this.data = resp.result;
            console.log("data", this.data);
            this.carga = false;
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
        this.name = 'RW CDMX INVENTARIO VESPERTINO: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
      }
      else{
        this.name = 'RW QRO INVENTARIO VESPERTINO: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
      }
      let element = document.getElementById('reporte-tble');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      XLSX.writeFile(book, this.name);
    }
  
  }