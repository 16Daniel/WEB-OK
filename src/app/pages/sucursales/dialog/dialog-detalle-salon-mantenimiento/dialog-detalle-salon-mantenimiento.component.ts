import { ServiceGeneralService } from "./../../../../core/services/service-general/service-general.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-detalle-salon-mantenimiento',
  templateUrl: './dialog-detalle-salon-mantenimiento.component.html',
  styleUrls: ['./dialog-detalle-salon-mantenimiento.component.css']
})
export class DialogDetalleSalonMantenimientoComponent implements OnInit {

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
  public photo5: any[] = []; 
  public photo6: any[] = []; 
  public photo7: any[] = [];
  public photo8: any[] = [];
  constructor(public dialogRef: MatDialogRef<DialogDetalleSalonMantenimientoComponent>,
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
    this.photo5 = this.param.photos.filter(x => x.type === 5);
    this.photo6 = this.param.photos.filter(x => x.type === 6);
    this.photo7 = this.param.photos.filter(x => x.type === 7);
    this.photo8 = this.param.photos.filter(x => x.type === 8);
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




