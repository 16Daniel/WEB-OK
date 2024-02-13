import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';


@Component({
  selector: 'app-detalles-cambios-dialog',
  templateUrl: './detalles-cambios-dialog.component.html',
  styleUrls: ['./detalles-cambios-dialog.component.css']
})
export class DetallesCambiosDialogComponent implements OnInit {
  public jsondata: any;
  public dataantes: any;
  public datadespues: any; 

  public catdepartamentos: any = []; 
  public catsecciones: any = [];
  public catmarcas: any = [];
  public catimpuestos: any = [];
  public catfamilias:any = []; 
  public catsubfamilias:any =[]; 
  public catlineas: any = []; 

  public datGenBefSeccion: any;
  public datGenaftSeccion: any;
  public datGenBefDepartamento: any;
  public datGenaftDepartamento: any;
  public datGenBefMarca: any;
  public datGenaftMarca: any;
  public datGenBefTipoimp: any;
  public datGenaftTipoimp: any;
  public datGenBefImpComp: any;
  public datGenaftImpComp: any;
  public datGenBefFamilia: any;
  public datGenaftFamilia: any;
  public datGenBefSubfamilia: any;
  public datGenaftSubfamilia: any;

  public preciosventaF2A:any=[];
  public preciosventaF2D:any=[];
  public idform: any;

  public codart:any;
  public dataitem:any;


  constructor(public dialogRef: MatDialogRef<DetallesCambiosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
    public _dialog: MatDialog,public service: ServiceGeneralService) { }
  ngOnInit(): void {
    this.jsondata = this.param.jsondata;
    this.idform = this.param.form;
    let obj = JSON.parse(this.jsondata); 
    this.dataantes = obj.data;
    this.datadespues = obj.newdata;
    if(this.idform == 2)
    {
      this.preciosventaF2A = this.dataantes.preciosvC;
      this.preciosventaF2D = this.datadespues.preciosv;
    }

    if(this.idform ==1)
    {
      this.getDepartamentos(); 
      this.getSecciones(); 
      this.getMarcas(); 
      this.getImpuestos();
      this.getFamilias();
      this.getSubfamilias(); 
    }
    if(this.idform==2)
    {
      this.codart = this.dataantes.articulolin[0].codarticulo; 
      this.getItem();
    }
  }

  close() { 
    this.dialogRef.close();
  }
  getDepartamentos()
  {
    this.service
    .serviceGeneralGet(`Items/getDepartamentos`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.catdepartamentos = resp.result;
        let temp = this.catdepartamentos.find(objeto => objeto.numdpto == this.dataantes.departamento);
        this.datGenBefDepartamento = temp.descripcion; 
        temp = this.catdepartamentos.find(objeto => objeto.numdpto == this.datadespues.departamento);
        this.datGenaftDepartamento = temp.descripcion; 
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
        let temp = this.catsecciones.find(objeto => objeto.numseccion == this.dataantes.seccion);
        this.datGenBefSeccion = temp.descripcion; 
        temp = this.catsecciones.find(objeto => objeto.numseccion == this.datadespues.seccion);
        this.datGenaftSeccion = temp.descripcion; 
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
        let temp = this.catmarcas.find(objeto => objeto.codmarca == this.dataantes.marca);
        this.datGenBefMarca = temp.descripcion; 
        temp = this.catmarcas.find(objeto => objeto.codmarca == this.datadespues.marca);
        this.datGenaftMarca = temp.descripcion; 
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

        let temp = this.catimpuestos.find(objeto => objeto.tipoiva == this.dataantes.tipoImpuesto);
        this.datGenBefTipoimp = temp.descripcion; 
        temp = this.catimpuestos.find(objeto => objeto.tipoiva == this.datadespues.tipoimpuesto);
        this.datGenaftTipoimp = temp.descripcion; 

         temp = this.catimpuestos.find(objeto => objeto.tipoiva == this.dataantes.impuestoCompra);
        this.datGenBefImpComp = temp.descripcion; 
        temp = this.catimpuestos.find(objeto => objeto.tipoiva == this.datadespues.impuestocompra);
        this.datGenaftImpComp = temp.descripcion; 

      }

    });

  }

  getFamilias()
  { 
    this.service
    .serviceGeneralGet(`Items/getFamilias`)
    .subscribe((resp) => {
     
      if (resp.success) {
        debugger
        this.catfamilias = resp.result;
        let temp = this.catfamilias.find(objeto => objeto.num == this.dataantes.familia);
        this.datGenBefFamilia = temp ? temp.descripcion : ''; 
        temp = this.catfamilias.find(objeto => objeto.num == this.datadespues.familia);
        this.datGenaftFamilia = temp ? temp.descripcion : ''; 

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
        let temp = this.catsubfamilias.find(objeto => objeto.num == this.dataantes.subfamilia);
        this.datGenBefSubfamilia = temp ? temp.descripcion : ''; 
        temp = this.catsubfamilias.find(objeto => objeto.num == this.datadespues.subfamilia);
        this.datGenaftSubfamilia = temp ? temp.descripcion : ''; 
      }

    });

  }

  getItem()
  {
    this.service
    .serviceGeneralGet(`Items/${this.codart}`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.dataitem =  resp.result[0];
      }

    });
  }


}
