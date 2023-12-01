import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  target: string;
  id: string;
  access: any;
  children: child[];
  
}
export interface child {
  path: string;
  title: string;
  icon: string;
  class: string;
  access: any;
}


export const ROUTES: RouteInfo[] = [
  {
    path: "/vista-general-regional",
    title: "Dashboard",
    icon: "dashboard-inactivo",
    class: "",
    target: "#colapseDashboard",
    id: "colapseDashboard",
    access: [3],
    children: [{
      path: "/vista-general-regional",
      title: "Vista general regional",
      icon: "regional-inactivo",
      class: "",
      access: [3]
    },
    {
      path: "/vista-general-supervisor",
      title: "Vista general supervisores",
      icon: "supervisor-inactivo",
      class: "",
      access: [3]
    },
    ]
  },
  {
    path: "/regionales",
    title: "Tareas",
    icon: "dashboard-inactivo",
    class: "",
    target: "#colapseTareas",
    id: "colapseTareas",
    access: [1,2,3],
    children: [{
      path: "/regionales",
      title: "Regionales",
      icon: "regional-inactivo",
      class: "",
      access: [1,2,3]
    },
    {
      path: "/supervisores",
      title: "Supervisores",
      icon: "supervisor-inactivo",
      class: "",
      access: [1,2,3]
    },
    ]
  },,
  {
    path: "/stock-pollo",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "Sucursales",
    icon: "sucursales-inactivo",
    class: "",
    target: "#colapseSucursales",
    id: "colapseSucursales",
    access: [1,2,3],
    children: [
      // {
      //   path: "",
      //   //path: "/asistencias",
      //   title: "Asistencias",
      //   icon: "asistencias-inactivo",
      //   class: "",
      //   access: [1,2,3]
      // },
      {
        path: "/stock-pollo",
        title: "Inventario",
        icon: "stock-de-pollo-inactivo",
        class: "",
        access: [1,2,3]
      },
      {
        path: "/mantenimiento",
        title: "Tickets",
        icon: "mantenimiento-inactivo",
        class: "",
        access: [1,2,3]
      },
      {
        path: "/mermas",
        title: "Mermas",
        icon: "tareas-inactivo",
        class: "",
        access: [1,2,3]
      },
      {
        path: "/tiempos",
        title: "Tiempos",
        icon: "tareas-inactivo",
        class: "",
        access: [1,2,3]
      },
      {
        path: "/auditoria",
        title: "Auditoria",
        icon: "tareas-inactivo",
        class: "",
        access: [1,2,3]
      },
    ],
  },
  {
    path: "/usuarios",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "Configuracion",
    icon: "tareas-inactivo",
    class: "",
    target: "#colapseConfiguracion",
    id: "colapseConfiguracion",
    access: [3],
    children: [
       {
         path: "/usuarios",
        title: "Usuarios",
         icon: "regional-inactivo",
        class: "",
        access: [3]
      },
    ],
  },
  {
    path: "/compras",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "Compras",
    icon: "tareas-inactivo",
    class: "",
    target: "#colapseCompras",
    id: "colapseCompras",
    access: [3],
    children: [
       {
         path: "/compras",
        title: "Inventario Matutino",
         icon: "tareas-inactivo",
        class: "",
        access: [3,4]
      },
      {
        path: "/compras-s",
       title: "Inventario Vespertino",
        icon: "tareas-inactivo",
       class: "",
       access: [3,4]
     },
    ],
  },
  {
    path: "/direccion",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "Informes",
    icon: "tareas-inactivo",
    class: "",
    target: "#colapseDireccion",
    id: "colapseDireccion",
    access: [3],
    children: [
       {
         path: "/direccion",
        title: "Venta por Vendedores",
         icon: "regional-inactivo",
        class: "",
        access: [3]
      },
    ],
  },
  {
    path: "/vista-general-supervisor",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "Monitorista",
    icon: "tareas-inactivo",
    class: "",
    target: "#colapseMotorista",
    id: "colapseMonitorista",
    access: [1,3,7],
    children: [
      {
        path: "/vista-general-supervisor",
        title: "Vista general supervisores",
        icon: "supervisor-inactivo",
        class: "",
        access: [1,3,7]
      },
      {
        path: "/tiempos",
        title: "Auditoria Cocina",
        icon: "tareas-inactivo",
        class: "",
        access: [1,3,7]
      },
      {
        path: "/auditoria",
        title: "Auditoria 25 PTS",
        icon: "tareas-inactivo",
        class: "",
        access: [1,3,7]
      },
    ],
  },

  {
    path: "/monitorista",
    //path: "/asistencias",
    // path: "/sucursales",
    title: "MONITORISTA",
    icon: "tareas-inactivo",
    class: "",
    target: "#colapseMonitorista",
    id: "colapseMonitorista",
    access: [3],
    children: [
      {
        path: "/vista-general-supervisor",
        title: "Vista general supervisores",
        icon: "supervisor-inactivo",
        class: "",
        access: [1,3,7]
      },
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
  public user;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.menuItems);
  }
}
