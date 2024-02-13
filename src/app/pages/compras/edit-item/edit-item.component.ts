import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { EditPrecioVentaDialogComponent } from '../edit-precio-venta-dialog/edit-precio-venta-dialog.component';
import { EditPrecioProveedorDialogComponent } from '../edit-precio-proveedor-dialog/edit-precio-proveedor-dialog.component';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  public data: any[] = [];
  public filtro: string = ""; 
  public catmarcas:any; 
  public articulospormarca:any; 

  constructor(public service: ServiceGeneralService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getItems(); 
    this.getMarcas();
  }
  getItems()
  {
    this.service
    .serviceGeneralGet(`Items`)
    .subscribe((resp) => {
     
      if (resp.success) {
        this.data = resp.result;
        console.log("data", this.data);
      }

    });
  }

  filtrarDatos() {
    if(this.filtro == '')
    {
      return this.data
    } else
    {
      return this.data.filter(item => item.descripcion.toUpperCase().includes(this.filtro.toUpperCase()));
    } 
  }

  limpiarfiltro()
  {
    this.filtro = '';
    this.filtrarDatos(); 
  }


  openForm(codart)
  {
    const dialog = this.dialog.open(EditItemDialogComponent, {
      data: {
        cod: codart
      },
      width: "50rem",
      height: "80%"
    });
    dialog.afterClosed().subscribe();
  
}

openFormV(codart)
{
  const dialog = this.dialog.open(EditPrecioVentaDialogComponent, {
    data: {
      cod: codart
    },
    width: "50rem",
    height: "80%"
  });
  dialog.afterClosed().subscribe();

}

openFormP(codart)
{
  const dialog = this.dialog.open(EditPrecioProveedorDialogComponent, {
    data: {
      cod: codart
    },
    width: "50rem",
    height: "80%"
  });
  dialog.afterClosed().subscribe();

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

filtrarpormarca(idmarca)
{
 return this.data.filter(item => item.marca == idmarca);
}

}