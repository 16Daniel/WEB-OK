import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogGeneralMessageComponent } from "app/pages/dialog-general/dialog-general-message/dialog-general-message.component";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  // variables
  public user: any;
  public data: UserModel= new UserModel();
  public dataBranch: any[] = [];
  public sucursal;
  public nameBranch;
  public catRoles:any;
  constructor(public services: ServiceGeneralService, public _dialog: MatDialog
) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    this.getRoles(); 
  }
  getData() {
    this.services
      .serviceGeneralGet("User")
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          console.log("resp", this.data);
        }
      });
  }

  addUser(id: number){
    console.log('user', id);
    const dialogRef = this._dialog.open(RegistroUsuarioComponent, {
      data: {
        id: id,
      },
      width:'30rem',
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
            body: "El Usuario se creo satisfactoriamente.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Exito",
            body: "El Usuario se actualizo satisfactoriamente.",
          },
          width: "350px",
        });
        this.ngOnInit();
      } else if (result == 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error al agregar el Usuario.",
          },
          width: "350px",
        });
        this.ngOnInit();
      }
    });

  } 

  getRoles()
{
  this.services
  .serviceGeneralGet(`User/getRoles`)
  .subscribe((resp) => {
   
    if (resp.success) {
      this.catRoles = resp.result;
    }
    this.getData();

  });
} 

getNameRol(idr)
{
  let rol = this.catRoles.filter(function(elemento) {
    return elemento.id == idr;
});
 let name = rol[0].descripcion != null ? rol[0].descripcion : '';  
 return name;
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
  branchId: number;
  createdBy: number;
  createdDate: Date;
  updatedBy: number;
  updatedDate: Date;
}
