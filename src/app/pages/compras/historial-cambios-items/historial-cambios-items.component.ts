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
  public mesF:any;
  public showbtn:boolean = false;
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
        this.data = resp.result;
        this.dataini = this.data;
        this.showbtn = this.data.length<1 ? false : true; 
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
      this.data = this.filtrarPorMesYAnio(this.data, this.mesF);
  }

  mostrartodo()
  {
    this.data = this.dataini;
    this.mesF = null;
  }
  

  filtrarPorMesYAnio(objetos, fechaInput) {
    // Convertir el valor del input tipo month a un objeto Date
    let fechaInputDate = new Date(fechaInput + "-10"); // Añadimos "-01" para establecer el día como 01
    
    // Obtener el mes y año del objeto Date
    let mesInput = fechaInputDate.getMonth()+1;
    let anioInput = fechaInputDate.getFullYear();
  
    // Filtrar los objetos por mes y año
    let objetosFiltrados = objetos.filter(objeto => {
        let fechaObjeto = new Date(objeto.fecha);
        return fechaObjeto.getMonth()+1 == mesInput && fechaObjeto.getFullYear() == anioInput;
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
