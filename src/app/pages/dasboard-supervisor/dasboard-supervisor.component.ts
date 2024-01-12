import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { DialogDetalleTareaComponent } from '../sucursales/dialog/dialog-detalle-tarea/dialog-detalle-tarea.component';
import { DialogDetalleMesaEsperaComponent } from '../sucursales/dialog/dialog-detalle-mesa-espera/dialog-detalle-mesa-espera.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogDetalleProductoRiesgoComponent } from '../sucursales/dialog/dialog-detalle-producto-riesgo/dialog-detalle-producto-riesgo.component';
import { DialogVoladoEfectivoComponent } from '../sucursales/dialog/dialog-volado-efectivo/dialog-volado-efectivo.component';
import { DialogDetalleStockPolloComponent } from '../sucursales/dialog/dialog-detalle-stock-pollo/dialog-detalle-stock-pollo.component';
import { DialogDetalleAperturaComponent } from '../sucursales/dialog/dialog-detalle-apertura/dialog-detalle-apertura.component';
import { DialogDetalleAceiteComponent } from '../sucursales/dialog/dialog-detalle-aceite/dialog-detalle-aceite.component';
import { ActivatedRoute } from '@angular/router';
import { DialogViewImageComponent } from '../sucursales/dialog/dialog-view-image/dialog-view-image.component';

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

  public carga = false;

  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];
  public catCompletado: any[] = [ 
    { id: 2, text: 'Todo'}
    // ,
    // { id: 1, text: 'Si'}, 
    // { id: 0, text: 'No'}
    ];
  public isDone;
  public db;
  public catRegionales: any[] = [];
  public regional;
  public totalTareas;


  constructor(
    public services: ServiceGeneralService, 
    public dialog: MatDialog,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.ciudad = 1; 
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    this.getdataRegional(1);
    if (this.user.roleId === 2) {
      this.ciudad = 1
      this.getdataSucursal(this.ciudad);
    }
    const p1 = this.route.snapshot.paramMap.get('city');
    const p2 = this.route.snapshot.paramMap.get('regional');
    const p3 = this.route.snapshot.paramMap.get('dateOne');
    const p4 = this.route.snapshot.paramMap.get('dateTwo');
    const p5 = this.route.snapshot.paramMap.get('branch');
    console.log('Query params',p1,p2,p3,p4,p5);
    if (p2 != undefined || p3 != undefined || p4 != undefined || p1 != undefined || p5 != undefined) {
      console.log('Enter Query params');
      
      this.ciudad = 1
      this.getdataRegional(this.ciudad);
      
      this.regional = (p2).toString();
      this.getdataSucursal(this.regional);

      this.isDone = 2;

      this.dateDash = (p3).toString();
      this.dateDashTwo = (p4).toString();

      this.sucursal = (p5).toString();

      this.getDataDash(this.sucursal, this.dateDash, this.dateDashTwo, this.isDone);
    }
  }

  imgviewer()
  {
    const dialog = this.dialog.open(DialogViewImageComponent, {
      data: {
        urlimg: 'assets/img/angular.png'
      },
      width: "80%",
      height: "90%"
    });
    dialog.afterClosed().subscribe();
  }


  getDataDash(branch, dateOne, dateTwo, isDone) {
    console.log('sucursal', branch);
    console.log('dateDash', dateOne);
    if (branch == undefined || dateOne == undefined || dateTwo == undefined || isDone == undefined) {
      return
    }
    else {
      this.carga = true;
      this.data = null;
      console.log(dateOne);
      this.services.serviceGeneralGet(`Dashboard/${branch
        }/Supervisor?timeOne=${dateOne}&timeTwo=${dateTwo}&isDone=${isDone}&city=1`).subscribe(resp => {
          if (resp.success) {
            this.data = resp.result;
            console.log('data dash', this.data);
            this.totalTareas = this.data.tasksMorningsCollection.length + this.data.tasksEveningsCollection.length;
            console.log('Total Tareas: ', this.totalTareas);
            this.carga = false;
          }
        });
      this.getNameBranch();
    }
  }
  detail(data: any, area: number, city) {
    debugger
    this.dataTask = [];
    console.log('city', city);
    // id 1 cdmx DB2
    if (city == '1') {
      this.db = 'DB2';
    }
    // id 2 queretaro DB1
    else if (city == '2') {
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
                  width: "50rem",
                  height: "80%"
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
                  // width: '70vw', //sets width of dialog
                  // height:'70vh', //sets width of dialog
                  // maxWidth: '100vw', //overrides default width of dialog
                  // maxHeight: '100vh', //overrides default height of dialog
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;
        case 'BAÑOS HOMBRES':

          console.log('BAÑOS HOMBRES');
          this.services
            .serviceGeneralGet(`BanosMatutino/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBanosMatutinos;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "50rem",
                  height: "80%"
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;

          case 'ACEITE':
            console.log('ACEITE');
            this.services
              .serviceGeneralGet('Alarm/' + data.detail)
              .subscribe((resp) => {
                if (resp.success) {
                  this.dataTask = resp.result;
                  this.photosTemp = this.dataTask.photoAlarms;
                  console.log('get data', this.dataTask);
                  const dialog = this.dialog.open(DialogDetalleAceiteComponent, {
                    data: {
                      data: this.dataTask,
                      photos: this.photosTemp,
                      name: data.nameTask,
                      baseDatos: this.db,
                    },
                    width: "50rem",
                    height: "80%"
                  });
                  dialog.afterClosed().subscribe();
                }
              });
            break;

          case 'BAÑOS MUJERES':

          console.log('BAÑOS MUJERES');
          this.services
            .serviceGeneralGet(`BanosMatutino/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBanosMatutinos;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "50rem",
                  height: "80%"
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
                    width: "50rem",
                    height: "80%"
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
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;
        case 'BAÑOS HOMBRES':

          console.log('BAÑOS HOMBRES');
          this.services
            .serviceGeneralGet(`BanosMatutino/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBanosMatutinos;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "50rem",
                  height: "80%"
                });
                dialog.afterClosed().subscribe();
              }
            });

          break;

          case 'BAÑOS MUJERES':

          console.log('BAÑOS MUJERES');
          this.services
            .serviceGeneralGet(`BanosMatutino/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBanosMatutinos;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.nameTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
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
                  width: "50rem",
                  height: "80%"
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

