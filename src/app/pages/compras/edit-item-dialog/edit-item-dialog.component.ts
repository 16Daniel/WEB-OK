import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.css']
})
export class EditItemDialogComponent implements OnInit {
public codart: number; 
public data:any;
public codarticulo: number|undefined; 
public referencia: string |undefined; 
public descripcion:string|undefined; 
public departamento: number|undefined; 
public seccion: number|undefined; 
public marca: number|undefined;
public usastock: boolean; 
public udsenteras: boolean; 
public tipoimpuesto: number|undefined; 
public impuestocompra: number|undefined;
public familia: number | undefined;
public subfamilia: number | undefined | null; 
public comentario: string | undefined | null; 


public catdepartamentos: any = []; 
public catsecciones: any = [];
public catmarcas: any = [];
public catimpuestos: any = [];
public catfamilias:any = []; 
public catsubfamilias:any =[]; 
public catlineas: any = []; 

public userdata : any;

  constructor(public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public _dialog: MatDialog,public service: ServiceGeneralService) { }

  ngOnInit(): void {
    this.usastock = false;
    this.udsenteras = false; 
    this.codart = this.param.cod;
    this.userdata = JSON.parse(localStorage.getItem("userData"));

    this.getDepartamentos(); 
    this.getSecciones(); 
    this.getMarcas(); 
    this.getImpuestos();
    this.getFamilias();
    this.getSubfamilias(); 
    this.getLineas(); 
    this.getItem(); 
  }

  close() { 
    this.dialogRef.close();
  }

  getItem()
  {
    this.service
    .serviceGeneralGet(`Items/${this.codart}`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.data =  resp.result[0];
        this.referencia = this.data.referencia; 
        this.descripcion = this.data.descripcion; 
        this.departamento = this.data.departamento;
        this.seccion = this.data.seccion;
        this.marca = this.data.marca; 
        this.tipoimpuesto = this.data.tipoImpuesto; 
        this.impuestocompra = this.data.impuestoCompra; 
        this.usastock = this.data.usaStock == "T" ? true: false; 
        this.udsenteras = this.data.forzarUdsEntreras == "True" ? true: false;
        this.familia =this.data.familia; 
        this.subfamilia = this.data.subfamilia; 
      }

    });
  }

  getDepartamentos()
  {
    this.service
    .serviceGeneralGet(`Items/getDepartamentos`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catdepartamentos = resp.result;
      }

    });

  }

  getSecciones()
  {
    this.service
    .serviceGeneralGet(`Items/getSecciones`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catsecciones = resp.result; 
      }

    });

  }

  getMarcas()
  {
    this.service
    .serviceGeneralGet(`Items/getMarcas`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catmarcas = resp.result;
      }

    });
  }


  getImpuestos()
  {
    this.service
    .serviceGeneralGet(`Items/getImpuestos`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catimpuestos = resp.result;
      }

    });

  }

  getFamilias()
  {
    this.service
    .serviceGeneralGet(`Items/getFamilias`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catfamilias = resp.result;
      }

    });

  }


  getSubfamilias()
  {
    this.service
    .serviceGeneralGet(`Items/getSubfamilias`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catsubfamilias = resp.result;
      }

    });

  }

  getLineas()
  {
    this.service
    .serviceGeneralGet(`Items/getLineas`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catlineas = resp.result;
      }

    });

  }

  guardar()
  {  

    if(this.referencia =="" || this.descripcion =="" || this.comentario =="" || this.comentario == null || this.comentario== undefined)
    {
      alert("Ninguno de los campos debe estar vacío"); 
      return; 
    }

    var respuesta = window.confirm("¿Está seguro que desea guardar los cambios?");

if (respuesta) {
  let jsondata = {
    data: this.data,
    newdata: 
    {
    referencia: this.referencia,
    descripcion:this.descripcion, 
    departamento: this.departamento,
    seccion : this.seccion,
    marca : this.marca, 
    tipoimpuesto : this.tipoimpuesto,
    impuestocompra : this.impuestocompra, 
    usastock : this.usastock, 
    udsenteras : this.udsenteras,
    familia : this.familia, 
    subfamilia : this.subfamilia,
    }
  }
  
  let bodydata =
  {
    idu : this.userdata.id,
    justificacion: this.comentario,
    accion: "MODIFICACIÓN DATOS GENERALES DEL ÁRTICULO",
    jsondata: JSON.stringify(jsondata)
  }
  this.service.serviceGeneralPostWithUrl('Items/InsertarCambios', bodydata).subscribe(resp => {
    if (resp.success) {
      console.log('resp', resp);
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
