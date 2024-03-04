import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DetallesCambiosDialogComponent } from '../detalles-cambios-dialog/detalles-cambios-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-historial-cambios-items',
  templateUrl: './historial-cambios-items.component.html',
  styleUrls: ['./historial-cambios-items.component.css']
})
export class HistorialCambiosItemsComponent implements OnInit {
  public data:any;
  public dataini: any;
  public fehcaini:Date;
  public fechafin:Date;
  public showbtn:boolean = false;
  public carga:boolean = true; 
  constructor(public service: ServiceGeneralService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHistorial()
  }


  getHistorial()
  {
    this.service
    .serviceGeneralGet(`Items/getCambiosArticulosH`)
    .subscribe((resp) => {
     
      if (resp.success) {
        debugger
        this.data = resp.result;
        this.dataini = this.data;
        this.showbtn = this.data.length<1 ? false : true; 
        this.carga = false; 
      }

    });

  }

  openVD(jdata,accion)
  {
    let idForm;
    if(accion.includes("GENERALES"))
    {
        idForm= 1; 
    }
    if(accion.includes("VENTA"))
    {
      idForm= 2;
    }
    if(accion.includes("PROVEEDORES"))
    {
      idForm= 3;
    }
    const dialog = this.dialog.open(DetallesCambiosDialogComponent, {
      data: {
        jsondata: jdata,
        form: idForm
      },
      width: "70rem",
      height: "80%"
    });
    dialog.afterClosed().subscribe();
  
  }

  filtrar()
  {  this.data = this.dataini;
      this.data = this.filtrarPorMesYAnio(this.data);

  }

  mostrartodo()
  {
    this.data = this.dataini;
  }
  

  filtrarPorMesYAnio(objetos,) {
let objetosFiltrados = objetos.filter(objeto => {
  let fechaObjeto = objeto.fecha;
  return fechaObjeto >= this.fehcaini && fechaObjeto <= this.fechafin;
});
return objetosFiltrados; 
}

public name; 
exportToExcel(): void {
    
  this.name = 'AUDITORIA ARTICULOS.xlsx';

let element = document.getElementById('reporte-tble');
const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

const book: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

XLSX.writeFile(book, this.name);
}

}
