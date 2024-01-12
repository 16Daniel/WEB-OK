import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-view-image',
  templateUrl: './dialog-view-image.component.html',
  styleUrls: ['./dialog-view-image.component.css']
})
export class DialogViewImageComponent implements OnInit {
 public urlimg:string;
 public zoom: number; 
 public rotate:number;
  constructor(public dialogRef: MatDialogRef<DialogViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.zoom=0.4;
    this.rotate= 0; 
    this.urlimg = this.param.urlimg;
  }

  close() {
    this.zoom=0.4;
    this.rotate= 0; 
    this.dialogRef.close();
  }
   
  zooming(){
    if (this.zoom <7.8)
    this.zoom= this.zoom+0.2;
  }

  shrinking(){
    if (this.zoom >0.4)
    this.zoom= this.zoom-0.2;
  }
}
