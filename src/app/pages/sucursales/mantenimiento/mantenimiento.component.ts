import { Component, OnInit } from "@angular/core";
import { ServiceGeneralService } from "app/core/services/service-general/service-general.service";
import { DialogAddTicketComponent } from "../dialog/dialog-add-ticket/dialog-add-ticket.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogGeneralMessageComponent } from "app/pages/dialog-general/dialog-general-message/dialog-general-message.component";
@Component({
  selector: "app-mantenimiento",
  templateUrl: "./mantenimiento.component.html",
  styleUrls: ["./mantenimiento.component.css"],
})
export class MantenimientoComponent implements OnInit {
  public today = new Date();
  public data: any[] = [];
  public dataBranch: any[] = [];
  public sucursal;
  public dateDash;
  public dateDash2;
  public nameBranch;

  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];

  constructor(
    public service: ServiceGeneralService,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sucursal = null;
    this.dateDash = null;
    this.dateDash2 = null;
    // console.log("get data");
    // this.service.serviceGeneralGet("Ticketing").subscribe((resp) => {
    //   if (resp.success) {
    //     this.data = resp.result;
    //     console.log("data", this.data);
    //   }
    // });
    this.getdataState();
  }
  getDataDash(branch, date, date2, city) {
    console.log('sucursal', branch);
    console.log('dateDash', date);
    console.log('city', city);
    if (branch == undefined || date == undefined || date2 == undefined) {
      return
    }
    else {
      
      console.log(date);
      this.service.serviceGeneralGet(`Ticketing/History?ids=${branch}&startDate=${date}&endDate=${date2}&city=${city}`).subscribe(resp => {
        if (resp.success) {
          this.data = resp.result;
          console.log('data dash', this.data);
        }
      });
      this.getNameBranch();
    }
  }

  getdataState() {
    this.service.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
  }
  getdataSucursal(id) {
    this.catSucursal = [];
    this.service.serviceGeneralGet(`User/GetSucursalList?idState=${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
      }
    });
  }
  // get que trae todas las sucursales para los filtros
  getdataBranch() {
    this.service
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
  addTicket(id: number, name: string) {
    
    const dialogRef = this._dialog.open(DialogAddTicketComponent, {
      data: {
        id: id,
        name: name,
      },
      width: "30rem",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("resp", result);
      // result = 1 es update success
      // result = 3 es  update false
      if (result == 1) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "Se cambio satisfactoriamente el estatus del ticket.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error al cambiar el estatus del ticket.",
          },
          width: "350px",
        });
        this.ngOnInit();
      }
    });
  }
}
