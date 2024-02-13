import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';

@Component({
  selector: 'app-edit-precio-proveedor-dialog',
  templateUrl: './edit-precio-proveedor-dialog.component.html',
  styleUrls: ['./edit-precio-proveedor-dialog.component.css']
})
export class EditPrecioProveedorDialogComponent implements OnInit {
  public codart: number;
  public precioscompras: any = [];  
  public cattarifascompra: any; 
  public comentario:string | undefined; 
  public nombrearticulo: string;
  public data: any; 

  public proveedores: any = [];
  public artprovlist: any = [];

  public idtarifa:any;
  public pbruto:any;
  public pneto:any;
  public userdata : any;
  public dataprecios: any; 

  public proveedorselect:any;

  constructor(public dialogRef: MatDialogRef<EditPrecioProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public _dialog: MatDialog,public service: ServiceGeneralService) { }

  ngOnInit(): void {
    this.codart = this.param.cod;
    this.userdata = JSON.parse(localStorage.getItem("userData"));
    this.getProveedores();
    this.getTarifascompras(); 
    this.getprecioscompras(); 
    this.getItem(); 
  } 
  close() { 
    this.dialogRef.close();
  }

  getprecioscompras()
  {
    this.service
    .serviceGeneralGet(`Items/getPrecioscompra/${this.codart}`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.precioscompras = resp.result;
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

  getTarifascompras()
  {
    this.service
    .serviceGeneralGet(`Items/getTarifascompra`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.cattarifascompra = resp.result;
      }

    });
  }

  getProveedores()
  {
    this.service
    .serviceGeneralGet(`Items/getProveedores`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.proveedores = resp.result;
        this.filtrarproveedores();
      }

    });
  }

  filtrarproveedores()
  {
    for(let item of this.precioscompras)
    {
      let dataprov = this.proveedores.filter(function(elemento) {
        return elemento.codproveedor === item.codproveedor;
    });
      this.artprovlist.push(dataprov[0]);
    }
    let codprov = this.precioscompras[0].codproveedor;
    this.dataprecios = this.precioscompras.filter(function(elemento) {
      return elemento.codproveedor == codprov;
  });
     this.proveedorselect = this.precioscompras[0].codproveedor;
   this.idtarifa = this.precioscompras[0].idtarifac;
   this.pbruto =  this.precioscompras[0].pbruto;
   this.pneto = this.precioscompras[0].pneto; 
  }

  changedata(event: any)
  {
    this.dataprecios = this.precioscompras.filter(function(elemento) {
      return elemento.codproveedor == event.target.value;
  });
   this.idtarifa = this.dataprecios[0].idtarifac;
   this.pbruto =  this.dataprecios[0].pbruto;
   this.pneto = this.dataprecios[0].pneto;  

  }

  guardar()
  {  
    if(this.pbruto =="" || this.comentario =="" || this.comentario == null || this.comentario== undefined)
    {
      alert("Ninguno de los campos debe estar vacío"); 
      return; 
    }

    var respuesta = window.confirm("¿Está seguro que desea guardar los cambios?");

if (respuesta) {
  let jsondata = {
    data: this.dataprecios,
    newdata: 
    {
     pbruto: this.pbruto,
     nameart: this.nombrearticulo,
     proveedor: this.getNameProv()
    }
  }
  
  let bodydata =
  {
    idu : this.userdata.id,
    justificacion: this.comentario,
    accion: "MODIFICACIÓN DE DATOS EN PRECIOS DE PROVEEDORES",
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

  getNameProv()
  {
    let id = this.proveedorselect
    let prov = this.artprovlist.filter(function(elemento) {
      return elemento.codproveedor == id;
  });
   let name = prov[0].codproveedor + " - "+ prov[0].nombre;  
   return name;
  }

}

