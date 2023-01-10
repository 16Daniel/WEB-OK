import { ServiceGeneralService } from "./../../../../core/services/service-general/service-general.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-detalle-audio-video-salon',
  templateUrl: './dialog-detalle-audio-video-salon.component.html',
  styleUrls: ['./dialog-detalle-audio-video-salon.component.css']
})
export class DialogDetalleAudioVideoSalonComponent implements OnInit {

  public user;
  public data;
  public taskId;
  public dataBranch: any[] = [];
  public nameBranch = '';
  public status;
  public url = 'http://opera.no-ip.net/back/api_rebel_wings/';
  public photoAudioVideosA: any[] = [];
  public photoAudioVideosB : any[] = [];
  constructor(public dialogRef: MatDialogRef<DialogDetalleAudioVideoSalonComponent>,
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
    if (this.data.data.photoAudioVideos !== undefined) {
      this.photoAudioVideosA = this.data.data.photoAudioVideos.filter(f => f.type === 1);
      this.photoAudioVideosB = this.data.data.photoAudioVideos.filter(f => f.type === 2);
    }
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



