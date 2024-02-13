import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';


@Component({
  selector: 'app-edit-precio-venta-dialog',
  templateUrl: './edit-precio-venta-dialog.component.html',
  styleUrls: ['./edit-precio-venta-dialog.component.css']
})
export class EditPrecioVentaDialogComponent implements OnInit {
  public codart: number; 
  public articulolin:any; 
  public preciosventa: any; 
  public preciosventaC: any; 

  public costemedio:number|undefined; 
  public costestock:number|undefined; 
  public ultimocoste:number|undefined; 
  public preciocompra:number|undefined; 
  public comentario: string; 
  public nombrearticulo: string;
  public data: any; 

  public userdata : any;

  constructor(public dialogRef: MatDialogRef<EditPrecioVentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public _dialog: MatDialog,public service: ServiceGeneralService) { }

  ngOnInit(): void {
    this.codart = this.param.cod;
    this.userdata = JSON.parse(localStorage.getItem("userData"));
    this.getArticulolin(); 
    this.getItem(); 
    this.getPreciosventa(); 
  } 

  close() { 
    this.dialogRef.close();
  }

  getArticulolin()
  {
    this.service
    .serviceGeneralGet(`Items/getArticulolin/${this.codart}`)
    .subscribe((resp) => {
      if (resp.success) {
        this.articulolin = resp.result;
        this.costemedio = parseFloat(this.articulolin[0].costemedio);
        this.costestock = parseFloat(this.articulolin[0].costestock);
        this.ultimocoste = parseFloat(this.articulolin[0].ultimocoste)
        this.preciocompra = parseFloat(this.articulolin[0].precioultcompra);
      }

    });
  }

  getItem()
  {
    this.service
    .serviceGeneralGet(`Items/${this.codart}`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.data =  resp.result[0];
        this.nombrearticulo= this.data.descripcion;  
      }

    });
  }

  getPreciosventa()
  {
    this.service
    .serviceGeneralGet(`Items/getPreciosventa/${this.codart}`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.preciosventa = resp.result;
        this.preciosventaC = JSON.parse(JSON.stringify(this.preciosventa));
      }

    });
  }


  guardar()
  {  

    if(this.costemedio ==null || this.costestock ==null || this.ultimocoste ==null || this.preciocompra ==null || this.comentario =="" || this.comentario == null || this.comentario== undefined)
    {
      alert("Ninguno de los campos debe estar vacío"); 
      return; 
    }

    var respuesta = window.confirm("¿Está seguro que desea guardar los cambios?");
if (respuesta) {
  let jsondata = {
    data: { articulolin: this.articulolin, datagen: this.data, preciosvC: this.preciosventaC,},
    newdata: 
    {
    costemedio: this.costemedio,
     costestock:  this.costestock,
      ultimocoste:  this.ultimocoste,
      preciocompra:  this.preciocompra,
      preciosv: this.preciosventa,
    }
  }
  
  let bodydata =
  {
    idu : this.userdata.id,
    justificacion: this.comentario,
    accion: "MODIFICACIÓN DE DATOS EN PRECIOS DE VENTA",
    jsondata: JSON.stringify(jsondata)
  }
  this.service.serviceGeneralPostWithUrl('Items/InsertarCambios', bodydata).subscribe(resp => {
    if (resp.success) {
      alert("Guardado correctamente");
      this.dialogRef.close(1);
    }
  }, (error) => {
    alert("Error al guardar: "+error);
    this.dialogRef.close(3);
  });


} else {

}
  }


}
