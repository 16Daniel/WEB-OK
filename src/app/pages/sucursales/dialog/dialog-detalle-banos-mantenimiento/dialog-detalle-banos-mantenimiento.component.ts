import { ServiceGeneralService } from "./../../../../core/services/service-general/service-general.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
@Component({
  selector: 'app-dialog-detalle-banos-mantenimiento',
  templateUrl: './dialog-detalle-banos-mantenimiento.component.html',
  styleUrls: ['./dialog-detalle-banos-mantenimiento.component.css']
})
export class DialogDetalleBanosMantenimientoComponent implements OnInit {

  public user;
  public data;
  public taskId;
  public dataBranch: any[] = [];
  public nameBranch = '';
  public status;
  public url = 'http://opera.no-ip.net/back/api_rebel_wings/';
  public photo1: any[] = []; 
  public photo2: any[] = []; 
  public photo3: any[] = [];
  public photo4: any[] = [];
  constructor(public dialogRef: MatDialogRef<DialogDetalleBanosMantenimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  // este modal solo recibe la data para mostrarla
  ngOnInit(): void {
    console.log("data que recibe", this.param);
    this.data = this.param;
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("user", this.user);
    this.getBranch();

    this.photo1 = this.param.photos.filter(x => x.type === 1);
    this.photo2 = this.param.photos.filter(x => x.type === 2);
    this.photo3 = this.param.photos.filter(x => x.type === 3);
    this.photo4 = this.param.photos.filter(x => x.type === 4);
  }
  close() {
    this.dialogRef.close();
  }


  // get  name sucursal
  getBranch() {

    this.services.serviceGeneralGet(`StockChicken/Admin/All-Branch?dataBase=${this.data.baseDatos}`).subscribe(resp => {
      if (resp.success) {
        this.dataBranch = resp.result;
        console.log('get branch', this.dataBranch);
        this.dataBranch.forEach(element => {
          if (this.data.data.branch) {
            if (element.branchId === this.data.data.branch) {
              this.nameBranch = element.branchName;
              this.nameBranch = this.nameBranch.toUpperCase();
              console.log('nombre', this.nameBranch);
            }
          }
          else {
            if (element.branchId === this.data.data.branchId) {
              this.nameBranch = element.branchName;
              this.nameBranch = this.nameBranch.toUpperCase();
              console.log('nombre', this.nameBranch);
            }
          }
        });
      }
    });
  }
}




