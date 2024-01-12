import { ServiceGeneralService } from "./../../../../core/services/service-general/service-general.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-dialog-add-ticket",
  templateUrl: "./dialog-add-ticket.component.html",
  styleUrls: ["./dialog-add-ticket.component.css"],
})
export class DialogAddTicketComponent implements OnInit {
  public disabled = false;
  public today = new Date();
  public user;
  public data;
  public ticketId;
  public dataBranch: any[] = [];
  public nameBranch = '';
  public status;
  public url = 'https://opera.no-ip.net/back/api_rebel_wings/';

  constructor(
    public dialogRef: MatDialogRef<DialogAddTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public services: ServiceGeneralService,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    console.log("data que se envia", this.param);
    this.ticketId = this.param.id;
    this.nameBranch = this.param.name;
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("user", this.user);
    if (this.ticketId != 0) {
      this.getData();
    }
  }
  close() {
    this.dialogRef.close();
  }
  getData() {
    this.services
      .serviceGeneralGet("Ticketing/" + this.ticketId)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          this.status = this.data.status;
          console.log("resp", this.data);
          //this.getBranch();
        }
      });
  }
  // get  name sucursal
  getBranch() {
    let branchIdNumber = 0;
    branchIdNumber = Number(this.data.branchId);
    console.log('branchIdNumber', branchIdNumber);
    this.services.serviceGeneralGet('StockChicken/Admin/All-Branch').subscribe(resp => {
      if (resp.success) {
        this.dataBranch = resp.result;
        console.log('get branch', this.dataBranch);
        this.dataBranch.forEach(element => {
          if (element.branchId === branchIdNumber) {
            this.nameBranch = element.branchName;
            this.nameBranch = this.nameBranch.toUpperCase();
            console.log('nombre', this.nameBranch);
          }
        });
      }
    });
  }

  save() {
    var boolValue = JSON.parse(this.status);
    this.data.status = boolValue;
    this.disabled = true;
    this.data.userId = this.user.id;
    this.data.closedDate = this.today;
    this.data.dateClosed = this.today;
    this.updateData();
  }

  updateData() {
    console.log('Obj To send put => ', this.data);
    this.services
      .serviceGeneralPut(`Ticketing/${this.ticketId}/Status`, this.data)
      .subscribe((data) => {
        if (data.success) {
          console.log('data', data);
          this.ngOnInit();
          this.disabled = false;
          this.dialogRef.close(1);
        }
      },
      (error) =>{
        this.dialogRef.close(3);
      });
    this.disabled = false;

  }
}
