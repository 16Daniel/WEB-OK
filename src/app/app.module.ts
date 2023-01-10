import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { WelcomeComponent } from './pages/auth/welcome/welcome.component';
import { DialogGeneralMessageComponent } from './pages/dialog-general/dialog-general-message/dialog-general-message.component';
import { DialogGeneralConfimationComponent } from './pages/dialog-general/dialog-general-confimation/dialog-general-confimation.component';
import { MatDialogModule } from "@angular/material/dialog";
import { DialogAddStockPolloComponent } from './pages/sucursales/dialog/dialog-add-stock-pollo/dialog-add-stock-pollo.component';
import { DialogAddTicketComponent } from './pages/sucursales/dialog/dialog-add-ticket/dialog-add-ticket.component';
import { DashboarMockupExampleComponent } from './pages/dashboar-mockup-example/dashboar-mockup-example.component';
import { DashboardAsistenciasComponent } from './pages/sucursales/dashboard-asistencias/dashboard-asistencias.component';
import { DialogDetalleTareaComponent } from './pages/sucursales/dialog/dialog-detalle-tarea/dialog-detalle-tarea.component';
import { DialogDetalleMesaEsperaComponent } from './pages/sucursales/dialog/dialog-detalle-mesa-espera/dialog-detalle-mesa-espera.component';
import { DialogDetalleProductoRiesgoComponent } from './pages/sucursales/dialog/dialog-detalle-producto-riesgo/dialog-detalle-producto-riesgo.component';
import { DialogDetallePolloPrecoccionComponent } from './pages/sucursales/dialog/dialog-detalle-pollo-precoccion/dialog-detalle-pollo-precoccion.component';
import { DialogDetalleConteoPersonasComponent } from './pages/sucursales/dialog/dialog-detalle-conteo-personas/dialog-detalle-conteo-personas.component';
import { DialogDetalleEncuestaComponent } from './pages/sucursales/dialog/dialog-detalle-encuesta/dialog-detalle-encuesta.component';
import { DialogDetalleLimpiezaGeneralComponent } from './pages/sucursales/dialog/dialog-detalle-limpieza-general/dialog-detalle-limpieza-general.component';
import { DialogDetalleEstacionSalonComponent } from './pages/sucursales/dialog/dialog-detalle-estacion-salon/dialog-detalle-estacion-salon.component';
import { DialogDetalleTemperaturaBebidasSalonComponent } from './pages/sucursales/dialog/dialog-detalle-temperatura-bebidas-salon/dialog-detalle-temperatura-bebidas-salon.component';
import { DialogDetalleAudioVideoSalonComponent } from './pages/sucursales/dialog/dialog-detalle-audio-video-salon/dialog-detalle-audio-video-salon.component';
import { DialogDetalleFocosSalonComponent } from './pages/sucursales/dialog/dialog-detalle-focos-salon/dialog-detalle-focos-salon.component';
import { DialogDetalleLimpiezaBarraSalonComponent } from './pages/sucursales/dialog/dialog-detalle-limpieza-barra-salon/dialog-detalle-limpieza-barra-salon.component';
import { DialogDetalleRefrigeradoresSalonComponent } from './pages/sucursales/dialog/dialog-detalle-refrigeradores-salon/dialog-detalle-refrigeradores-salon.component';
import { DialogDetalleEstadoGeneralBanosComponent } from './pages/sucursales/dialog/dialog-detalle-estado-general-banos/dialog-detalle-estado-general-banos.component';
import { DialogDetalleLavabosJabonPapelBanosComponent } from './pages/sucursales/dialog/dialog-detalle-lavabos-jabon-papel-banos/dialog-detalle-lavabos-jabon-papel-banos.component';
import { DialogDetalleTicketMesaSistemaComponent } from './pages/sucursales/dialog/dialog-detalle-ticket-mesa-sistema/dialog-detalle-ticket-mesa-sistema.component';
import { DialogDetalleEntradasAlbaranSistemaComponent } from './pages/sucursales/dialog/dialog-detalle-entradas-albaran-sistema/dialog-detalle-entradas-albaran-sistema.component';
import { DialogDetalleCocinaMantenimientoComponent } from './pages/sucursales/dialog/dialog-detalle-cocina-mantenimiento/dialog-detalle-cocina-mantenimiento.component';
import { DialogDetalleSalonMantenimientoComponent } from './pages/sucursales/dialog/dialog-detalle-salon-mantenimiento/dialog-detalle-salon-mantenimiento.component';
import { DialogDetalleBanosMantenimientoComponent } from './pages/sucursales/dialog/dialog-detalle-banos-mantenimiento/dialog-detalle-banos-mantenimiento.component';
import { DialogDetalleBarraMantenimientoComponent } from './pages/sucursales/dialog/dialog-detalle-barra-mantenimiento/dialog-detalle-barra-mantenimiento.component';
import { RegistroUsuarioComponent } from './pages/admon-user/registro-usuario/registro-usuario.component';
import { DialogDetalleRevisionMesaSistemaComponent } from './pages/sucursales/dialog/dialog-detalle-revision-mesa-sistema/dialog-detalle-revision-mesa-sistema.component';
import { UsuariosComponent } from './pages/admon-user/usuarios/usuarios.component';
import { DialogChangePasswordComponent } from './pages/sucursales/dialog/dialog-change-password/dialog-change-password.component';
import { DialogVoladoEfectivoComponent } from './pages/sucursales/dialog/dialog-volado-efectivo/dialog-volado-efectivo.component';
import { DialogDetalleStockPolloComponent } from './pages/sucursales/dialog/dialog-detalle-stock-pollo/dialog-detalle-stock-pollo.component';
import { ModalComponent } from './pages/sucursales/dialog/modal/modal.component';
import { DialogDetalleAperturaComponent } from './pages/sucursales/dialog/dialog-detalle-apertura/dialog-detalle-apertura.component';
import { DialogDetalleAsistenciaComponent } from './pages/sucursales/dialog/dialog-detalle-asistencia/dialog-detalle-asistencia.component';
import { NgRatingBarModule } from "ng-rating-bar";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    WelcomeComponent,
    DialogGeneralConfimationComponent,
    DialogAddStockPolloComponent,
    DialogAddTicketComponent,
    DashboarMockupExampleComponent,
    DashboardAsistenciasComponent,
    DialogDetalleTareaComponent,
    DialogDetalleMesaEsperaComponent,
    DialogDetalleProductoRiesgoComponent,
    DialogDetallePolloPrecoccionComponent,
    DialogDetalleConteoPersonasComponent,
    DialogDetalleEncuestaComponent,
    DialogDetalleLimpiezaGeneralComponent,
    DialogDetalleEstacionSalonComponent,
    DialogDetalleTemperaturaBebidasSalonComponent,
    DialogDetalleAudioVideoSalonComponent,
    DialogDetalleFocosSalonComponent,
    DialogDetalleLimpiezaBarraSalonComponent,
    DialogDetalleRefrigeradoresSalonComponent,
    DialogDetalleEstadoGeneralBanosComponent,
    DialogDetalleLavabosJabonPapelBanosComponent,
    DialogDetalleTicketMesaSistemaComponent,
    DialogDetalleEntradasAlbaranSistemaComponent,
    DialogDetalleCocinaMantenimientoComponent,
    DialogDetalleSalonMantenimientoComponent,
    DialogDetalleBanosMantenimientoComponent,
    DialogDetalleBarraMantenimientoComponent,
    RegistroUsuarioComponent,
    DialogDetalleRevisionMesaSistemaComponent,
    UsuariosComponent,
    DialogChangePasswordComponent,
    DialogVoladoEfectivoComponent,
    DialogDetalleStockPolloComponent,
    ModalComponent,
    DialogDetalleAperturaComponent,
    DialogDetalleAsistenciaComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    NgRatingBarModule,
  ],
  providers: [],
  schemas: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
