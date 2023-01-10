import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DialogDetalleTareaComponent } from '../sucursales/dialog/dialog-detalle-tarea/dialog-detalle-tarea.component';
import { DialogDetalleMesaEsperaComponent } from '../sucursales/dialog/dialog-detalle-mesa-espera/dialog-detalle-mesa-espera.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogDetalleProductoRiesgoComponent } from '../sucursales/dialog/dialog-detalle-producto-riesgo/dialog-detalle-producto-riesgo.component';
import { DialogVoladoEfectivoComponent } from '../sucursales/dialog/dialog-volado-efectivo/dialog-volado-efectivo.component';
import { DialogDetalleStockPolloComponent } from '../sucursales/dialog/dialog-detalle-stock-pollo/dialog-detalle-stock-pollo.component';
import { DialogDetalleAperturaComponent } from '../sucursales/dialog/dialog-detalle-apertura/dialog-detalle-apertura.component';

@Component({
  selector: 'app-dasboard-supervisor',
  templateUrl: './dasboard-supervisor.component.html',
  styleUrls: ['./dasboard-supervisor.component.css']
})
export class DasboardSupervisorComponent implements OnInit {
  // variables
  public user: any;
  public data: any;
  public dataBranch: any[] = [];
  public sucursal;
  public nameBranch;
  public dataTask;

  // variables de calendario
  public today = new Date();
  public dateDash;
  public dateFormat;
  public dateDashTwo;
  // obj temp para mandar las fotos al modal
  public photosTemp;

  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];
  public catCompletado: any[] = [ 
    { id: 2, text: 'Todo'},
    { id: 1, text: 'Si'}, 
    { id: 0, text: 'No'}
    ];
  public isDone;
  public db;
  public catRegionales: any[] = [];
  public regional;


  constructor(public services: ServiceGeneralService, public dialog: MatDialog) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    this.getdataState();
    if (this.user.roleId === 2) {
      this.ciudad = (this.user.stateId).toString();
      this.getdataSucursal(this.ciudad);
    }
  }
  getDataDash(branch, dateOne, dateTwo, isDone) {
    console.log('sucursal', branch);
    console.log('dateDash', dateOne);
    if (branch == undefined || dateOne == undefined || dateTwo == undefined || isDone == undefined) {
      return
    }
    else {
      console.log(dateOne);
      this.services.serviceGeneralGet(`Dashboard/${branch
        }/Supervisor?timeOne=${dateOne}&timeTwo=${dateTwo}&isDone=${isDone}&city=${this.ciudad}`).subscribe(resp => {
          if (resp.success) {
            this.data = resp.result;
            console.log('data dash', this.data);
          }
        });
      this.getNameBranch();
    }
  }
  detail(data: any, area: number, city) {
    this.dataTask = [];
    console.log('city', city);
    // id 1 cdmx DB2
    if (city === '1') {
      this.db = 'DB2';
    }
    // id 2 queretaro DB1
    else if (city === '2') {
      this.db = 'DB1';
    }
    console.log(`DB ${this.db}`);


    // cocina la mayoria de las tareas se obtiene por id de branch
    // aqui se armara el objeto para que se reutilize el modal detalle de tarea
    // matutino
    if (area === 1) {
      switch (data.nameTask) {
        case 'Validación de asistencias':

          break;
        case 'GAS':
          console.log('GAS');
          this.services
            .serviceGeneralGet('ValidationGas/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoValidationGas;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'Stock de pollo':
          break;
        case 'APERTURA':
          console.log('APERTURA');
          this.services
            .serviceGeneralGet('ToSetTable/By-Id/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoToSetTables;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleAperturaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: '98vw', //sets width of dialog
                  height:'70vh', //sets width of dialog
                  maxWidth: '100vw', //overrides default width of dialog
                  maxHeight: '100vh', //overrides default height of dialog
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'EN ESPERA':

          console.log('EN ESPERA');
          this.services
            .serviceGeneralGet('WaitListTable/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoToSetTables;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleMesaEsperaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'BAÑOS':

          console.log('BAÑOS');
          this.services
            .serviceGeneralGet(`LivingRoomBathroomCleaning/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoLivingRoomBathroomCleanings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;

          case 'VOLADO':

            console.log('VOLADO');
            this.services
              .serviceGeneralGet(`CashRegisterShortage/${data.detail}`)
              .subscribe((resp) => {
                if (resp.success) {
                  this.dataTask = resp.result;
                  this.photosTemp = this.dataTask.photoCashRegisterShortages;
                  console.log('get data', this.dataTask);
                  const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                    data: {
                      data: this.dataTask,
                      name: data.nameTask,
                      baseDatos: this.db,
                      photos: this.photosTemp
                    },
                    width: "30rem",
                  });
                  dialog.afterClosed().subscribe();
                }
              });
  
            break;
        default:
          break;
      }
    }
    // vespertino
    else if (area === 2) {
      console.log('turno vespertino');

      switch (data.nameTask) {
        case 'Validación de asistencias':

          break;
        case 'Stock de pollo':
          console.log('Stock de pollo');
          this.services
            .serviceGeneralGet('StockChicken/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleStockPolloComponent, {
                  data: {
                    name: data.nameTask,
                    data: this.dataTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;
        case 'Producto en riesgo':
          console.log('Producto en riesgo');
          this.services
            .serviceGeneralGet('RiskProduct/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleProductoRiesgoComponent, {
                  data: {
                    name: data.nameTask,
                    data: this.dataTask,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'PROPINA':
          console.log('PROPINA');
          this.services
            .serviceGeneralGet('Tip/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoTips;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;
        case 'LIMPIEZA':
          console.log('LIMPIEZA');
          this.services
            .serviceGeneralGet('LivingRoomBathroomCleaning/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoLivingRoomBathroomCleanings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'TABLETAS':
          console.log('TABLETAS');
          this.services
            .serviceGeneralGet('TabletSafeKeeping/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoTabletSageKeepings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;

        case 'Alarmas':
          console.log('Alarmas');
          this.services
            .serviceGeneralGet('Alarm/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoAlarms;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;
        case 'EN ESPERA':
          console.log('EN ESPERA');
          this.services
            .serviceGeneralGet('WaitListTable/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleMesaEsperaComponent, {
                  data: {
                    name: data.nameTask,
                    data: this.dataTask,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;

        case 'VOLADO':
          console.log('VOLADO');
          this.services
            .serviceGeneralGet('CashRegisterShortage/' + data.detail)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoCashRegisterShortages;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogVoladoEfectivoComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.nameTask,
                    baseDatos: this.db,
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'ALBARANES':

          break;
        case 'Remisiones':

          break;

        default:
          break;
      }
    }
  }
  getdataState() {
    this.services.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
  }
  getdataSucursal(id) {
    this.catSucursal = [];
    let endpoint = this.user.roleId !== 2 ? 
      `User/Branches/${id}/${this.ciudad}` : `User/Branches/${this.user.id}/${this.user.stateId}`;  
    this.services.serviceGeneralGet(endpoint).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
      }
    });
  }
  getdataRegional(id){
    this.catRegionales = []; 
    this.services.serviceGeneralGet(`User/Regionals/${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catRegionales = resp.result;
        console.log("resp regionales", this.catRegionales);
      }
    });
  }
  getdataBranch() {
    this.services
      .serviceGeneralGet("StockChicken/Admin/All-Branch")
      .subscribe((resp) => {
        if (resp.success) {
          this.dataBranch = resp.result;
          console.log("resp", this.dataBranch);
        }
      });
  }

  getNameBranch() {
    let branchIdNumber = 0;
    branchIdNumber = Number(this.sucursal);
    this.catSucursal.forEach(element => {
      if (element.idfront === branchIdNumber) {
        this.nameBranch = element.titulo;
        this.nameBranch = this.nameBranch.toUpperCase();
        console.log('nombre', this.nameBranch);
      }
    });
  }
}

