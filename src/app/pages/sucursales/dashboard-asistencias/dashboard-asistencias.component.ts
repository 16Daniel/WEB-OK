import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DialogDetalleAsistenciaComponent } from '../dialog/dialog-detalle-asistencia/dialog-detalle-asistencia.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogDetalleAperturaComponent } from '../dialog/dialog-detalle-apertura/dialog-detalle-apertura.component';

@Component({
  selector: 'app-dashboard-asistencias',
  templateUrl: './dashboard-asistencias.component.html',
  styleUrls: ['./dashboard-asistencias.component.css']
})
export class DashboardAsistenciasComponent implements OnInit {

  // variables
  public user: any;
  public data: any;
  public dataBranch: any[] = [];
  public sucursal;
  public nameBranch;

  // variables de calendario
  public today = new Date();
  public dateDash;
  public dateDashTwo;
  public dateFormat;
  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];
  public catRegionales: any[] = [];
  public db;
  public dataTask;  
  // obj temp para mandar las fotos al modal
  public photosTemp;
  
  constructor(public services: ServiceGeneralService, public dialog: MatDialog) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    this.getdataState();
    if (this.user.roleId === 2) {
      this.ciudad = this.user.stateId;
      this.getdataSucursal(this.ciudad);
    }
  }
  getDataDash(branch, dateOne, dateTwo) {
    console.log('sucursal', branch);
    console.log('dateDash', dateOne);
    if (branch == undefined || dateOne == undefined || dateTwo == undefined) {
      return
    }
    else {
      console.log(dateOne);
      this.services.serviceGeneralGet(`Dashboard/${branch
        }/Assistance?timeOne=${dateOne}&timeTwo=${dateTwo}`).subscribe(resp => {
          if (resp.success) {
            this.data = resp.result;
            console.log('data dash', this.data);
          }
        });
      this.getNameBranch();
    }
  }
  getdataState() {
    this.services.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
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
  getdataRegional(id){
    this.catRegionales = []; 
    this.services.serviceGeneralGet(`User/Regionals/${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catRegionales = resp.result;
        console.log("resp regionales", this.catRegionales);
      }
    });
  }
  getdataBranch() {
    this.services
      .serviceGeneralGet("StockChicken/Admin/All-Branch")
      .subscribe((resp) => {
        if (resp.success) {
          this.dataBranch = resp.result;
          console.log("resp", this.dataBranch);
        }
      });
  }

  getNameBranch() {
    let branchIdNumber = 0;
    branchIdNumber = Number(this.sucursal);
    this.catSucursal.forEach(element => {
      if (element.idfront === branchIdNumber) {
        this.nameBranch = element.titulo;
        this.nameBranch = this.nameBranch.toUpperCase();
        console.log('nombre', this.nameBranch);
      }
    });
  }

  detail(data: any, area: number, city) {
    this.dataTask = [];
    console.log('city', city);
    // id 1 cdmx DB2
    if (city === '1') {
      this.db = 'DB2';
    }
    // id 2 queretaro DB1
    else if (city === '2') {
      this.db = 'DB1';
    }
    console.log(`DB ${this.db}`);
    if (area === 1) {
      console.log('APERTURA');
          this.services
            .serviceGeneralGet('ToSetTable/By-Id/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoToSetTables;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleAsistenciaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
    }
    else if (area === 2) {
      console.log('APERTURA');
          this.services
            .serviceGeneralGet('ToSetTable/By-Id/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoToSetTables;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleAsistenciaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
    }
  }

}
