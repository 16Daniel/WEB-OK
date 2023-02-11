import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DialogDetalleTareaComponent } from '../sucursales/dialog/dialog-detalle-tarea/dialog-detalle-tarea.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogDetallePolloPrecoccionComponent } from '../sucursales/dialog/dialog-detalle-pollo-precoccion/dialog-detalle-pollo-precoccion.component';
import { DialogDetalleMesaEsperaComponent } from '../sucursales/dialog/dialog-detalle-mesa-espera/dialog-detalle-mesa-espera.component';
import { DialogDetalleConteoPersonasComponent } from '../sucursales/dialog/dialog-detalle-conteo-personas/dialog-detalle-conteo-personas.component';
import { DialogDetalleEncuestaComponent } from '../sucursales/dialog/dialog-detalle-encuesta/dialog-detalle-encuesta.component';
import { DialogDetalleLimpiezaGeneralComponent } from '../sucursales/dialog/dialog-detalle-limpieza-general/dialog-detalle-limpieza-general.component';
// salon
import { DialogDetalleEstacionSalonComponent } from '../sucursales/dialog/dialog-detalle-estacion-salon/dialog-detalle-estacion-salon.component';
import { DialogDetalleTemperaturaBebidasSalonComponent } from '../sucursales/dialog/dialog-detalle-temperatura-bebidas-salon/dialog-detalle-temperatura-bebidas-salon.component';
import { DialogDetalleAudioVideoSalonComponent } from '../sucursales/dialog/dialog-detalle-audio-video-salon/dialog-detalle-audio-video-salon.component';
import { DialogDetalleFocosSalonComponent } from '../sucursales/dialog/dialog-detalle-focos-salon/dialog-detalle-focos-salon.component';
import { DialogDetalleLimpiezaBarraSalonComponent } from '../sucursales/dialog/dialog-detalle-limpieza-barra-salon/dialog-detalle-limpieza-barra-salon.component';
import { DialogDetalleRefrigeradoresSalonComponent } from '../sucursales/dialog/dialog-detalle-refrigeradores-salon/dialog-detalle-refrigeradores-salon.component';
// baños
import { DialogDetalleEstadoGeneralBanosComponent } from '../sucursales/dialog/dialog-detalle-estado-general-banos/dialog-detalle-estado-general-banos.component';
import { DialogDetalleLavabosJabonPapelBanosComponent } from '../sucursales/dialog/dialog-detalle-lavabos-jabon-papel-banos/dialog-detalle-lavabos-jabon-papel-banos.component';
// sistema
import { DialogDetalleTicketMesaSistemaComponent } from '../sucursales/dialog/dialog-detalle-ticket-mesa-sistema/dialog-detalle-ticket-mesa-sistema.component';
import { DialogDetalleEntradasAlbaranSistemaComponent } from '../sucursales/dialog/dialog-detalle-entradas-albaran-sistema/dialog-detalle-entradas-albaran-sistema.component';
import { DialogDetalleRevisionMesaSistemaComponent } from '../sucursales/dialog/dialog-detalle-revision-mesa-sistema/dialog-detalle-revision-mesa-sistema.component';
// mantenimiento
import { DialogDetalleCocinaMantenimientoComponent } from '../sucursales/dialog/dialog-detalle-cocina-mantenimiento/dialog-detalle-cocina-mantenimiento.component';
import { DialogDetalleSalonMantenimientoComponent } from '../sucursales/dialog/dialog-detalle-salon-mantenimiento/dialog-detalle-salon-mantenimiento.component';
import { DialogDetalleBanosMantenimientoComponent } from '../sucursales/dialog/dialog-detalle-banos-mantenimiento/dialog-detalle-banos-mantenimiento.component';
import { DialogDetalleBarraMantenimientoComponent } from '../sucursales/dialog/dialog-detalle-barra-mantenimiento/dialog-detalle-barra-mantenimiento.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dasboard-regional',
  templateUrl: './dasboard-regional.component.html',
  styleUrls: ['./dasboard-regional.component.css']
})
export class DasboardRegionalComponent implements OnInit {

  public chartColor;
  public chartEmail;
  public chartHours;
  public activeDate = false;

  // variables
  public user: any;
  public data: any;
  public dataBranch: any[] = [];
  public sucursal;
  public nameBranch;
  // variables de calendario
  public today = new Date();
  public dateDash;
  public dateDashTwo;
  public dateFormat;
  public dataTask;
  public isDone;
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
  public catRegionales: any[] = [];
  public regional;
  public db;

  constructor(
    public services: ServiceGeneralService, 
    public dialog: MatDialog,
    private route: ActivatedRoute
    ) { }



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    this.getdataState();
    if (this.user.roleId === 2) {
      this.ciudad = (this.user.stateId).toString();
      console.log('City', this.ciudad);
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
      
      this.ciudad = (p1).toString();
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
  getDataDash(branch, dateOne, dateTwo, isDone) {
    console.log('sucursal', branch);
    console.log('dateDash', dateOne, dateTwo);
    if (branch == undefined || dateOne == undefined || dateTwo == undefined || isDone == undefined) {
      return
    }
    else {
      console.log(dateOne, dateTwo);
      this.services.serviceGeneralGet(`Dashboard/${branch}/Regional?timeOne=${dateOne}&timeTwo=${dateTwo}&isDone=${isDone}&city=${this.ciudad}`).subscribe(resp => {
        if (resp.success) {
          this.data = resp.result;
          console.log('data dash', this.data);
        }
      });
      this.getNameBranch();
    }
  }

  detail(data: any, area: number, city) {
    console.log('data', data);
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
    // cocina
    if (area === 1) {
      switch (data.name) {
        case 'TIEMPOS':
          console.log('TIEMPOS');
          this.services
            .serviceGeneralGet(`Order/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoOrders;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'REFRIS':
          console.log('REFRIS');
          this.services
            .serviceGeneralGet(`Fridge/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoFridges;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'PRECOCCIÓN':
          console.log('PRECOCCIÓN');
          this.services
            .serviceGeneralGet(`PrecookedChicken/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoPrecookedChickens;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetallePolloPrecoccionComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'Productos completos y en Órden':
          console.log('Productos completos y en Órden');
          this.services
            .serviceGeneralGet(`CompleteProductsInOrder/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoCompleteProductsInOrders;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'FREIDORAS':
          console.log('FREIDORAS');
          this.services
            .serviceGeneralGet(`Fryer/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoFryerCleanings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

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
    // salon
    else if (area === 2) {
      switch (data.name) {
        case 'COMENSALES':
          console.log('COMENSALES');
          this.services
            .serviceGeneralGet(`PeopleCounting/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleConteoPersonasComponent, {
                  data: {
                    name: data.name,
                    data: this.dataTask,
                    baseDatos: this.db
                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'ENCUESTA':
          // falta conectar modal
          console.log('ENCUESTA');
          this.services
            .serviceGeneralGet(`SatisfactionSurvey/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = resp.result.photoSatisfactionSurveys;
                console.log('get data', this.dataTask, this.db);
                const dialog = this.dialog.open(DialogDetalleEncuestaComponent, {
                  data: {
                    name: data.name,
                    data: this.dataTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
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
            .serviceGeneralGet(`GeneralCleaning/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoGeneralCleanings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleLimpiezaGeneralComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'ESTACION':
          console.log('ESTACION');
          this.services
            .serviceGeneralGet(`Station/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoStations;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleEstacionSalonComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'BEBIDAS':
          console.log('BEBIDAS');
          this.services
            .serviceGeneralGet(`DrinksTemperature/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoDrinksTemperatures;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTemperaturaBebidasSalonComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'AUDIO Y VIDEO':
          console.log('AUDIO Y VIDEO');
          this.services
            .serviceGeneralGet(`AudioVideo/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleAudioVideoSalonComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'ILUMINACION':
          console.log('ILUMINACION');
          this.services
            .serviceGeneralGet(`Spotlight/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleFocosSalonComponent, {
                  data: {
                    name: data.name,
                    data: this.dataTask,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'BARRA':
          console.log('BARRA');
          this.services
            .serviceGeneralGet(`BarCleaning/${data.detail}/By-Id/`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBarCleanings;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleLimpiezaBarraSalonComponent, {
                  data: {
                    name: data.name,
                    photos: this.photosTemp,
                    data: this.dataTask,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'REFRIS':
          console.log('Refrigeradores');
          this.services
            .serviceGeneralGet(`FridgeSalon/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoFridgeSalons;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleRefrigeradoresSalonComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

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

    // baños
    else if (area === 3) {
      switch (data.name) {
        case 'BAÑOS':
          console.log('BAÑOS');
          this.services
            .serviceGeneralGet(`BathRoomsOverallStatus/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBathRoomsOverallStatuses;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleEstadoGeneralBanosComponent, {
                  data: {
                    name: data.name,
                    data: this.dataTask,
                    baseDatos: this.db,
                    photos: this.photosTemp
                  },
                  width: '30rem'
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'LAVABOS':
          console.log('LAVABOS');
          this.services
            .serviceGeneralGet(`WashBasinWithSoapPaper/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoWashBasinWithSoapPapers;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleLavabosJabonPapelBanosComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

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

    // sistema y caja
    else if (area === 4) {
      switch (data.name) {

        case 'TICKET VS MESA':
          console.log('TICKET VS MESA');
          this.services
            .serviceGeneralGet(`TicketTable/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoTicketTables;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTicketMesaSistemaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'ENTRADAS ALBARÁN ':
          console.log('ENTRADAS ALBARÁN');
          this.services
            .serviceGeneralGet(`EntriesChargedAsDeliveryNote/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoEntriesChargedAsDeliveryNotes;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleEntradasAlbaranSistemaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'REVISIÓN CALENDARIO':
          console.log('REVISIÓN CALENDARIO');
          this.services
            .serviceGeneralGet(`OrderScheduleReview/${data.detail}/By-Id`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoOrderScheduleReviews;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleTareaComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'REVISIÓN':
          console.log('REVISIÓN');
          this.services
            .serviceGeneralGet(`CheckTable/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleRevisionMesaSistemaComponent, {
                  data: {
                    data: this.dataTask,
                    name: data.name,
                    baseDatos: this.db,

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

    // mantenimiento
    else if (area === 5) {
      switch (data.name) {

        case 'Cocina':
          console.log('Cocina');
          this.services
            .serviceGeneralGet(`Kitchen/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoKitchens;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleCocinaMantenimientoComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'Salon':
          console.log('Salon');
          this.services
            .serviceGeneralGet(`Salon/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoSalons;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleSalonMantenimientoComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'Baños':
          console.log('Baños');
          this.services
            .serviceGeneralGet(`Bathroom/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBathrooms;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleBanosMantenimientoComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

                  },
                  width: "30rem",
                });
                dialog.afterClosed().subscribe();
              }
            });
          break;

        case 'Barra':
          console.log('Barra');
          this.services
            .serviceGeneralGet(`Bar/By-Id/${data.detail}`)
            .subscribe((resp) => {
              if (resp.success) {
                this.dataTask = resp.result;
                this.photosTemp = this.dataTask.photoBars;
                console.log('get data', this.dataTask);
                const dialog = this.dialog.open(DialogDetalleBarraMantenimientoComponent, {
                  data: {
                    data: this.dataTask,
                    photos: this.photosTemp,
                    name: data.name,
                    baseDatos: this.db,

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
    this.services.serviceGeneralGet("StockChicken/Admin/All-Branch").subscribe((resp) => {
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
