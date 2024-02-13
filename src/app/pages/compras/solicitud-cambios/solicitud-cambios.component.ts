import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DetallesCambiosDialogComponent } from '../detalles-cambios-dialog/detalles-cambios-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-solicitud-cambios',
  templateUrl: './solicitud-cambios.component.html',
  styleUrls: ['./solicitud-cambios.component.css']
})
export class SolicitudCambiosComponent implements OnInit {
public data:any;
public showbtn:boolean = false;
  constructor(public service: ServiceGeneralService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSolicitudes();
  }


  getSolicitudes()
  {
    this.service
    .serviceGeneralGet(`Items/getCambiosArticulos`)
    .subscribe((resp) => {

      if (resp.success) {
        this.data = resp.result;
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


  Descartar(id)
  {
    var respuesta = window.confirm("¿Está seguro que desea descartar los cambios?");
    if(respuesta)
    {
    this.service
    .serviceGeneralPostWithUrl(`Items/descartarCambios/${id}`,{})
    .subscribe((resp) => {

      if (resp.success) {
        this.getSolicitudes()
      } else
      {
        alert("Error al descartar los cambios");
      }
    });
    }

  }

confirmarCambios(jdata,accion,ids)
{
  let idtipo;
  if(accion.includes("GENERALES"))
  {
      idtipo= 1;
  }
  if(accion.includes("VENTA"))
  {
    idtipo= 2;
  }
  if(accion.includes("PROVEEDORES"))
  {
    idtipo= 3;
  }

  this.service.serviceGeneralPostWithUrl('Items/UpdateData', {jsondata: jdata, tipo: idtipo}).subscribe(resp => {
    if (resp.success) {
      this.updatestatus(ids);
      alert('Actualizado correctamente');
    }
  }, (error) => {
    alert('Error al actualizar');
    console.log(error);
  });

}

confirmartodo()
{
  for(let item of this.data)
  {
    this.confirmarCambios(item.jsondata,item.accion,item.id);
  }
}

updatestatus(id)
{
  this.service
  .serviceGeneralPostWithUrl(`Items/ConfirmarCambios/${id}`,{})
  .subscribe((resp) => {

    if (resp.success) {
      this.getSolicitudes();
    } else
    {
      alert("Error al descartar los cambios");
    }
  });
}

}
