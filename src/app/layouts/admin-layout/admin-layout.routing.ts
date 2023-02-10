import { MantenimientoComponent } from './../../pages/sucursales/mantenimiento/mantenimiento.component';
import { StockPolloComponent } from './../../pages/sucursales/stock-pollo/stock-pollo.component';
import { Routes } from "@angular/router";


import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { SucursalesComponent } from "app/pages/sucursales/sucursales/sucursales.component";
import { TareasComponent } from 'app/pages/sucursales/tareas/tareas.component';
import { DasboardRegionalComponent } from 'app/pages/dasboard-regional/dasboard-regional.component';
import { DasboardSupervisorComponent } from 'app/pages/dasboard-supervisor/dasboard-supervisor.component';
import { DashboardAsistenciasComponent } from 'app/pages/sucursales/dashboard-asistencias/dashboard-asistencias.component';
import { UsuariosComponent } from 'app/pages/admon-user/usuarios/usuarios.component';
import { MermasComponent } from 'app/pages/sucursales/mermas/mermas.component';
import { DashboardPerformanceRegionalComponent } from "app/pages/dashboard-performance-regional/dashboard-performance-regional.component";
import { DashboardPerformanceSupervisorComponent } from 'app/pages/dashboard-performance-supervisor/dashboard-performance-supervisor.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "regionales", component: DasboardRegionalComponent },
  { path: "supervisores", component: DasboardSupervisorComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "sucursales", component: SucursalesComponent },
  { path: "stock-pollo", component: StockPolloComponent },
  { path: "mantenimiento", component: MantenimientoComponent },
  { path: "tarea", component: TareasComponent },
  { path: "asistencias", component: DashboardAsistenciasComponent},
  { path: "usuarios", component: UsuariosComponent},
  { path: "mermas", component: MermasComponent },
  { path: "vista-general-regional", component: DashboardPerformanceRegionalComponent },
  { path: "vista-general-supervisor", component: DashboardPerformanceSupervisorComponent },
];
