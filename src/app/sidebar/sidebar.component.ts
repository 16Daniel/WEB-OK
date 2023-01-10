import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  target: string;
  id: string;
  children: child[];
}
export interface child {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard-inactivo",
    class: "",
    target: "#colapseDashboard",
    id: "colapseDashboard",
    children: [{
      path: "/regionales",
      title: "Regionales",
      icon: "regional-inactivo",
      class: ""
    },
    {
      path: "/supervisores",
      title: "Supervisores",
      icon: "supervisor-inactivo",
      class: ""
    },
    ]
  },
  {
    path: "/asistencias",
    // path: "/sucursales",
    title: "Sucursales",
    icon: "sucursales-inactivo",
    class: "",
    target: "#colapseSucursales",
    id: "colapseSucursales",
    children: [
      {
        path: "/asistencias",
        title: "Asistencias",
        icon: "asistencias-inactivo",
        class: "",
      },
      {
        path: "/stock-pollo",
        title: "Inventario",
        icon: "stock-de-pollo-inactivo",
        class: "",
      },
      {
        path: "/mantenimiento",
        title: "Mantenimiento",
        icon: "mantenimiento-inactivo",
        class: "",
      },
       {
         path: "/usuarios",
        title: "Usuarios",
         icon: "regional-inactivo",
        class: "",
      },
      // {
      //   path: "/tarea",
      //   title: "Tareas",
      //   icon: "tareas-inactivo",
      //   class: "",
      // },
    ],
  },


];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = false;

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.menuItems);


  }
}
