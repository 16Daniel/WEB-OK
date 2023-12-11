import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import {MatTableModule} from '@angular/material/table';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reporte-ranking',
  templateUrl: './reporte-ranking.component.html',
  styleUrls: ['./reporte-ranking.component.css']
})
export class ReporteRankingComponent implements OnInit {

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
    public nameSuc="";
    
    public displayedColumns = ['articulo', 'seccion', 'unidades', 'importe', 'porcentaje'];
  
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
    
    getdataSucursal(city) {
      this.catSucursal = []; 
      this.service.serviceGeneralGet(`Dashboard/Sucursales/${city}`).subscribe((resp) => {
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
  
    getReporte(city,sucursal,dateInit, dateEnd) {
      if (city == undefined || sucursal == undefined ||dateEnd == undefined || dateInit == undefined) {
        console.log("error suc:"+sucursal+" city:"+city);
        return
      }
      this.carga = true;
      this.service
        .serviceGeneralGet(`Dashboard/Ranking/${city}/${sucursal}?initDate=${dateInit}&endDate=${dateEnd}`)
        .subscribe((resp) => {
          if (resp.success) {
            this.data = resp.result;
            console.log("data", this.data);
            this.carga = false;
            this.nameSuc = "";
            this.nameSuc = this.catSucursal.find(x => x.idfront == sucursal).titulo;
            console.log("succ", this.nameSuc);
          }
        });
      // StockChicken/Admin/All-Branch?dataBase=DB2
      
    }
    clickTable(index){
      this.selectFila = index;
      console.log("index", this.selectFila);
    }
     
    public name; 
    exportToExcel(sucu): void {
      
      
        this.name = 'RANKING DE ARTICULOS '+this.nameSuc+'.xlsx';
      
      let element = document.getElementById('reporte-tble');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, ''+ this.nameSuc);
  
      XLSX.writeFile(book, this.name);
    }
  
  }