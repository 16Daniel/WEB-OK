import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { DialogChangePasswordComponent } from "app/pages/sucursales/dialog/dialog-change-password/dialog-change-password.component";
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DialogGeneralMessageComponent } from "app/pages/dialog-general/dialog-general-message/dialog-general-message.component";
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  // variables
  public user: any;
  public data: UserModel = new UserModel();
  public dataBranch: any[] = [];
  public sucursal;
  public nameBranch;
  public today = new Date();
  public catalogState: any[] = [];
  public catalogSucursal: any[] = [];
  public catRoles:any;
  enctexto;

  destexto;
  encPass;
  desPass;
  textoEncriptado;
  textoDesencriptado;

  constructor(public dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public services: ServiceGeneralService,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('params', this.param);
    console.log('user', this.user);
    this.catalogs();
    // this.getdataBranch();
    if (this.param.id === 0) {
      console.log('Crear usuario');

    }
    else {
      console.log('Actualizar Usuario');
      this.getData();
    }
  }

  close() {
    this.dialogRef.close();
  }

  catalogs() {
    this.services
      .serviceGeneralGet(`User/GetStateList`)
      .subscribe((resp) => {
        if (resp.success) {
          resp.result.forEach(element => {
            if (element.status == true) {
              this.catalogState.push(element);
            }
          });
          console.log("catalogState ", this.catalogState);
        }
      });
  }
  getCatalogSucursal(id) {
    this.catalogSucursal= [];
    console.log('entra', id);
    this.services.serviceGeneralGet(`User/GetSucursalList?idState=${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catalogSucursal = resp.result;
        console.log("catalogSucursal ", this.catalogSucursal);
      }
    });
  }

  getData() {
    this.services
      .serviceGeneralGet(`User/${this.param.id}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          console.log("resp", this.data);
          this.getCatalogSucursal(this.data.stateId);
        }
      });
  }

  // getdataBranch() {
  //   this.services
  //     .serviceGeneralGet("StockChicken/Admin/All-Branch")
  //     .subscribe((resp) => {
  //       if (resp.success) {
  //         this.dataBranch = resp.result;
  //         console.log("resp", this.dataBranch);
  //       }
  //     });
  // }

  changePass(correo: number) {
    console.log('correo', correo);
    const dialogRef = this._dialog.open(DialogChangePasswordComponent, {
      data: {
        email: correo,
      },
      width: '30rem',
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
            body: "La contraseña se creo satisfactoriamente.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "La contraseña se actualizo satisfactoriamente.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error al cambiar la contraseña.",
          },
          width: "350px",
        });
        this.ngOnInit();
      }
    });


  }

  save() {
    if (this.param.id === 0) {
      this.data.clabTrab = 0;
      this.data.token = "";
      this.data.password = "admin123";
      if (this.data.roleId !== 1) {
        this.data.branchId = null;
      }
      console.log('Crear usuario');
      // this.encriptar();
      this.addData();
    }
    else {
      console.log('Actualizar Usuario');
      this.updateData();
    }
  }
  addData() {
    this.data.createdBy = this.user.id;
    this.data.createdDate = this.today;
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = this.today;
    console.log('data', this.data);
    this.services.serviceGeneralPostWithUrl('User', this.data).subscribe(resp => {
      if (resp.success) {
        console.log('resp', resp);
        this.dialogRef.close(1);
      }
    }, (error) => {
      this.dialogRef.close(3);
    });

  }

  updateData() {
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = this.today;
    console.log('data', this.data);
    this.services.serviceGeneralPut(`User/${this.data.id}`, this.data).subscribe(resp => {
      if (resp.success) {
        console.log('resp', resp);
        this.dialogRef.close(2);
      }
    }, (error) => {
      this.dialogRef.close(3);
    });

  }

  getRoles()
  {
    this.services
    .serviceGeneralGet(`User/getRoles`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catRoles = resp.result;
        console.log(this.catRoles);
      }
  
    });
  } 

}

class UserModel {
  id: number;
  email: string;
  password: string;
  clabTrab: number;
  token: string;
  name: string;
  lastName: string;
  motherName: string;
  roleId: number;
  stateId: number;
  sucursalId: number;
  branchId: number;
  createdBy: number;
  createdDate: Date;
  updatedBy: number;
  updatedDate: Date;
}
