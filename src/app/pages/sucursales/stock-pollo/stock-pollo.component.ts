import { Component, OnInit } from "@angular/core";
import { ServiceGeneralService } from "app/core/services/service-general/service-general.service";
import { DialogAddStockPolloComponent } from "../dialog/dialog-add-stock-pollo/dialog-add-stock-pollo.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogGeneralMessageComponent } from "app/pages/dialog-general/dialog-general-message/dialog-general-message.component";

@Component({
  selector: "app-stock-pollo",
  templateUrl: "./stock-pollo.component.html",
  styleUrls: ["./stock-pollo.component.css"],
})
export class StockPolloComponent implements OnInit {
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
  constructor(
    public service: ServiceGeneralService,
    public _dialog: MatDialog
  ) { }

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
    let endpoint = this.user.roleId !== 2 ? 
      `User/Branches/${id}/${this.ciudad}` : `User/Branches/${this.user.id}/${this.user.stateId}`;  
    this.service.serviceGeneralGet(endpoint).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
      }
    });
  }
  getdataStock(ciudad, sucursal, dateInit, dateEnd) {
    if (ciudad == undefined || dateEnd == undefined || dateInit == undefined || sucursal == undefined) {
      return
    }
    this.service
      .serviceGeneralGet(`StockChicken/Admin/Stock?city=${ciudad}&branch=${sucursal}&dateInit=${dateInit}&dateEnd=${dateEnd}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          console.log("data", this.data);
        }
      });
    // StockChicken/Admin/All-Branch?dataBase=DB2
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
  addStock(id: number, name: string, branch: number) {
    const dialogRef = this._dialog.open(DialogAddStockPolloComponent, {
      data: {
        id: id,
        sucursal: name,
        idBranch: branch,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("resp", result);
      // result = 1 es add success
      // result = 2 es update success
      // result = 3 es add o update false
      if (result == 1) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "Se agrego satisfactoriamente la espectativa de venta.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "Se actualizo satisfactoriamente la espectativa de venta.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error al agregar la espectativa de venta.",
          },
          width: "350px",
        });
        this.ngOnInit();
      }
    });
  }
}
