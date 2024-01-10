import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/core/services/service-general/service-general.service';
import {MatTableModule} from '@angular/material/table';
import { ListFormat } from 'typescript';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reporte-venta-vendedor',
  templateUrl: './reporte-venta-vendedor.component.html',
  styleUrls: ['./reporte-venta-vendedor.component.css']
})
export class ReporteVentaVendedorComponent implements OnInit {

  public today = new Date();
  public DB;
  public data: any[] = [];
  public dataComp: any[] = [];
  public dataCompF: any[] = [];
  public dataF: any[] = [];
  public user;
  public ciudad;
  public catState: any[] = [];
  public catSucursal: any[] = [];  
  public sucursal;
  public catRegionales: any[] = [];
  public regional;
  public dateInit;
  public dateEnd;
  public mermastotal;
  public list : any[];
  public list2 : any[];
  public listComp : any[];
  public listComp2 : any[];
  public selectFila =null;
  public selectFila1 =null;

  public carga = false;
  
  displayedColumns = ['sucursal', 'vendedor', 'articulo', 'uds', 'importe'];
  displayedColumns1 = ['sucursal', 'vendedor', 'articulo', 'uds', 'importe'];
  

  

  constructor(public service: ServiceGeneralService,) { 
    this.listComp = [
      {name:"ALIMENTOS", checked: false},
      {name:"BEBIDAS", checked: false},
      {name:"AYC (TODOS)", checked: false},
      {name:"AYC (BURGER-HOTDOG)", checked: false},
      {name:"AYC (WINGS-BONELESS)", checked: false},
      {name:"CERVEZA", checked: false},
      {name:"BEBIDAS NUEVAS", checked: false},
      {name:"CAGUAMAS", checked: false},
      {name:"VENTA TOTAL", checked: false},
      {name:"GANADORES", checked: false},
    ];

    
  }

  

  ngOnInit(): void {
    this.getdataState();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log('user', this.user);
    
    if (this.user.roleId === 2) {
      this.ciudad = (this.user.stateId).toString();
      console.log('City', this.ciudad);
      this.getdataSucursal(this.ciudad);
    }
    this.ciudad = 1;
    this.getdataRegional(this.ciudad);
  }

  public name; 
  exportToExcel(city): void {
    if(city == 1){
      this.name = 'RW CDMX RANKING ART: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    else{
      this.name = 'RW QRO RANKING ART: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    let element = document.getElementById('reporte-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'ARTICULOS');

    XLSX.writeFile(book, this.name);
  }

  public name1; 
  exportToExcel1(city): void {
    if(city == 1){
      this.name = 'RW CDMX RANKING COMPUESTO: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    else{
      this.name = 'RW QRO RANKING COMPUESTO: '+this.today.getDate()+''+this.today.getMonth()+''+this.today.getFullYear()+'.xlsx';
    }
    let element = document.getElementById('reporte-tble1');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'COMPUESTOS');

    XLSX.writeFile(book, this.name);
  }

  showList(ciudad, dateInit, dateEnd){
    this.service
      .serviceGeneralGet(`Dashboard/performance-venta-vendedor-filtro/${ciudad}/?initDate=${dateInit}&endDate=${dateEnd}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.list2 = resp.result;
          
          
          this.list= this.list2.filter(item => item.name).sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          
        }
      });
  }
  selectLimpia1(){
    for(let x = 0; x < this.list.length; x++) {
         this.list[x].checked = false;
    }
    console.log("select", this.list);
    

  }
  shareCheckedList(item:any[]){
    //console.log(item);
    this.filtrarArt(item);
  }
  shareIndividualCheckedList(borra: boolean){
    //console.log(item);
    //this.filtrarArt();
    if(borra){
      console.log("se ejecuto limpia");
      this.selectLimpia1();
    }
  }


  filtrarArt(item:any[]) {


    console.log("num",item.length);
    console.log(item);
    if(item.length > 0){
    
    // this.dataF = this.data.filter( art => {
    //   item.forEach(element => {
    //     if(element == art.articulo){
    //     console.log("nombre",element);
    //     console.log("nombre 2",art.articulo);
    //     console.log("n",art);
    //     return art;
    //     }
    //   });
    // });
    var ok = false;
    this.dataF = this.data.filter( art => {
      
      for (let x = 0; x < item.length; x++) {
        if(art.articulo == item[x]){
          console.log(art);
          return art;
        }
       }
    });
    console.log("filtro",this.dataF);
    }
    else{this.dataF = this.data;}
   
  }
  getCrea() {
   
    
    var vend = [];
    var articulo = "Compuesto";
      
      for (let x = 0; x < this.dataF.length; x++) {
        if(vend.includes(this.dataF[x].vendedores)){
        
        }
        else{
          vend.push(this.dataF[x].vendedores);
        }
        
      }
   
    var articu;
      for (let x = 0; x < this.dataF.length; x++) {
      if(articu == undefined){
          articu = this.dataF[x].articulo;
      }
      else{
        if(articu.includes(this.dataF[x].articulo)){
        
        }
        else{
          articu = articu +" / "+ this.dataF[x].articulo;
        }
      }
        
      }
      //  console.log("filtro",vend);
     var sum;
     var importe;
     var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < this.dataF.length; x++) {
          if(vend[i] == this.dataF[x].vendedores){
            sum= sum + this.dataF[x].uds;
            sucursal = this.dataF[x].sucursal;
            importe = importe + parseFloat(this.dataF[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": "COMPUESTO ( "+articu+" )", "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      
     

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      console.log("filtro comp",this.dataCompF);
   
  }

  shareCheckedListComp(item:any[]){
     //console.log(item);
    this.listComp2= item;

  }
  limpiaListComp(item:any[]){
   this.selectLimpia();
   console.log("se ejecuto limpia");

  }
  shareIndividualCheckedListComp(borra: boolean){
    //console.log(item);
    //this.filtrarArt();
    if(borra){
      console.log("se ejecuto limpia");
      this.selectLimpia();
    }
  }
  

  getCreaDefinidos() {
    var listok=[];
    if(this.listComp2.length > 0){
      if(this.dataCompF.length > 0){
      for (let i = 0; i < this.listComp2.length; i++){ 
        var esta = false;
      for (let x = 0; x < this.dataCompF.length; x++) {
        if(this.dataCompF[x].articulo.includes(this.listComp2[i])){
          esta = true;
        } 
      }
      if(esta){}
      else{listok.push(this.listComp2[i])}
      }
      
    }
      else{listok = this.listComp2;}
      console.log("ok:",listok);
      if(listok.length >0){
        for (let x = 0; x < listok.length; x++) {
          if("ALIMENTOS" == listok[x]){
            this.getAlimentos();
          }
          if("BEBIDAS" == listok[x]){
            this.getBebidas();
          }
          if("AYC (TODOS)" == listok[x]){
            this.getAYC();
          }
          if("AYC (BURGER-HOTDOG)" == listok[x]){
            this.getAYCbugerHot(); 
          }
          if("AYC (WINGS-BONELESS)" == listok[x]){
            this.getAYCalaBone();
          }
          if("CERVEZA" == listok[x]){
            this.getCerveza();
          }
          if("BEBIDAS NUEVAS" == listok[x]){
            this.getBebNuevas();
          }
          if("CAGUAMAS" == listok[x]){
            this.getCaguamas();
          }
          if("VENTA TOTAL" == listok[x]){
            this.getTotal();
          }
          if("GANADORES" == listok[x]){
            this.getBebidas();
            this.getAYC();
            this.getTotal();
            this.getCerveza();
            this.getAYCbugerHot(); 
          }
         }
        }
     
      }

   
   
  }

  getCaguamas(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.filtro == "CAGUAMAS"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "CAGUAMAS";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getBebNuevas(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.filtro == "BEBIDAS NUEVAS"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "BEBIDAS NUEVAS";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }


  getCerveza(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.cerveza == "T"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "CERVEZA";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getBebidas(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.departamento == "*BEBIDAS REBEL WINGS"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "BEBIDAS";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getAlimentos(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.departamento == "*ALIMENTOS REBEL WINGS"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "ALIMENTOS";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getTotal(){

    // let listComp = this.list.filter( art => {
    //   if(art.name.includes("($)")){
    //     return art;
    //   }
      
    // });
    //console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      
        if(art.departamento == "*BEBIDAS REBEL WINGS" || art.departamento == "*ALIMENTOS REBEL WINGS"){
          
          return art;
        }
       
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "VENTA TOTAL";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getAYC(){
    let listComp = this.list.filter( art => {
      if(art.name.includes("($)")){
        return art;
      }
      
    });
    console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      for (let x = 0; x < listComp.length; x++) {
        if(art.articulo == listComp[x].name){
          
          return art;
        }
       }
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "AYC (ALA / HOT-DOG / BURGER / BONELESS)";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getAYCbugerHot(){
    let listComp = this.list.filter( art => {
      if(art.name.includes("($)")){
        if(art.name.includes("BURGER") || art.name.includes("HOT-DOG")){
        return art;
        }
      }
      
    });
    console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      for (let x = 0; x < listComp.length; x++) {
        if(art.articulo == listComp[x].name){
          
          return art;
        }
       }
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "AYC (HOT-DOG / BURGER)";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }

  getAYCalaBone(){
    let listComp = this.list.filter( art => {
      if(art.name.includes("($)")){
        if(art.name.includes("WINGS") || art.name.includes("BONELESS")){
        return art;
        }
      }
      
    });
    console.log("numcomp", listComp);

    let dataFC = this.data.filter( art => {
      
      for (let x = 0; x < listComp.length; x++) {
        if(art.articulo == listComp[x].name){
          
          return art;
        }
       }
    });
    console.log("filtroComp",dataFC);


    var vend = [];
    var articu = "AYC (HOT-DOG / BURGER)";
      
      for (let x = 0; x < dataFC.length; x++) {
        if(vend.includes(dataFC[x].vendedores)){
        
        }
        else{
          vend.push(dataFC[x].vendedores);
        }
        
      }
    
    // var articu;
    //   for (let x = 0; x < dataFC.length; x++) {
    //   if(articu == undefined){
    //       articu = dataFC[x].articulo;
    //   }
    //   else{
    //     if(articu.includes(dataFC[x].articulo)){
        
    //     }
    //     else{
    //       articu = articu +" / "+ dataFC[x].articulo;
    //     }
    //   }
        
    //   }
    
    var sum;
    var importe;
    var sucursal;
     
      for(let i = 0; i < vend.length; i++){
        sum=0;
        importe=0;
        for (let x = 0; x < dataFC.length; x++) {
          if(vend[i] == dataFC[x].vendedores){
            sum= sum + dataFC[x].uds;
            sucursal = dataFC[x].sucursal;
            importe = importe + parseFloat(dataFC[x].precio);

          }
        }
        this.dataComp.push({"sucursal": sucursal, "articulo": ""+articu, "precio": importe, "uds": sum, "vendedores": vend[i]})
      }
      

      this.dataCompF = this.dataComp.filter( art => {
      
        
            return art;
         
      });

      //console.log("filtro comp",this.dataCompF);
  }
  selectLimpia(){
    for(let x = 0; x < this.listComp.length; x++) {
         this.listComp[x].checked = false;
    }
    console.log("select", this.listComp);
    

  }
  limpia(){
    this.dataCompF= [];
    this.dataComp = [];
  }
  limpia1(){
    this.dataF= [];
    this.limpia();
  }

  clickTable(index){
    this.selectFila = index;
    console.log("index", this.selectFila);
  }
  clickTable1(index){
    this.selectFila1 = index;
    console.log("index", this.selectFila1);
  }
  // onCheckUncheckAll(event) {
  //       var dropdownObj = $('#dropdown1').data("ejDropDownList");
  //       if (event.target.checked) dropdownObj.checkAll();
  //       else dropdownObj.unCheckAll();
  // }

  getdataSucursal(id) {
    this.catSucursal = [];
    let endpoint = this.user.roleId !== 2 ? 
      `User/Branches/${id}/${this.ciudad}` : `User/Branches/${this.user.id}/${this.user.stateId}`;  
    this.service.serviceGeneralGet(endpoint).subscribe((resp) => {
      if (resp.success) {
        this.catSucursal = resp.result;
        console.log("resp sucursal", this.catSucursal);
      }
    });
  }

  getdataState() {
    this.service.serviceGeneralGet("User/GetStateList").subscribe((resp) => {
      if (resp.success) {
        this.catState = resp.result;
        console.log("resp state", this.catState);
      }
    });
  }
  
  getdataRegional(id){
    this.catRegionales = []; 
    this.service.serviceGeneralGet(`User/Regionals/${id}`).subscribe((resp) => {
      if (resp.success) {
        this.catRegionales = resp.result;
        console.log("resp regionales", this.catRegionales);
      }
    });
  }

  getVenta(ciudad, dateInit, dateEnd) {
    if (ciudad == undefined || dateEnd == undefined || dateInit == undefined) {
      return
    }
    this.carga = true;
    this.service
      .serviceGeneralGet(`Dashboard/performance-venta-vendedor/${ciudad}/?initDate=${dateInit}&endDate=${dateEnd}`)
      .subscribe((resp) => {
        if (resp.success) {
          this.data = resp.result;
          this.dataF = this.data;
          console.log("data", this.data);
          this.showList(ciudad, dateInit, dateEnd);
          this.carga = false;
        }
      });
    // StockChicken/Admin/All-Branch?dataBase=DB2
  }
}