import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "app/core/services/login/login.service";
import { DialogGeneralMessageComponent } from "app/pages/dialog-general/dialog-general-message/dialog-general-message.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";
  public message: any;
  public dataProfile: any;
  public validar = false;
  public disabled = false;
  public typeInput = "password";
  eyed = false;

  constructor(
    public router: Router,
    public service: LoginService,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void { }
  forgotPassword() {
    console.log("forgot password");
    this.router.navigateByUrl("recuperar-contrasena");
  }
  public viewPassword(type) {
    if (type === true) {
      this.typeInput = "text";
      this.eyed = true;
    } else {
      this.typeInput = "password";
      this.eyed = false;
    }
  }
  login(correo, contrasena) {
    this.disabled = true;
    const loginObj = `?email=${correo}&password=${contrasena}`;
    this.service.login(loginObj).subscribe(
      (resp) => {
        if (resp.success) {
          this.dataProfile = resp.result;
          console.log("data profile", this.dataProfile);
          this.disabled = false;
          localStorage.setItem("userData", JSON.stringify(this.dataProfile));
          // solo ingresaran los usuarios de tipo id 3
          if (this.dataProfile.roleId === 1) {
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Error",
                body: "No tienes permisos para acceder como Administrador",
              },
              width: "250px",
            });
          }
          else {
            this.router.navigateByUrl("bienvenido");
          }
        } else {
          console.log("data error", resp);
          this.disabled = false;
          const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Error",
              body: resp.message,
            },
            width: "250px",
          });

          // this.generalMessage(resp.message);
        }
      },
      (error) => {
        console.log(error);
        this.disabled = false;
      }
    );
  }
}
