import {Component,Input,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {
  @Input() list:any[]; 

    
    @Output() shareCheckedList = new EventEmitter();
    @Output() shareIndividualCheckedList = new EventEmitter();
    @Output() limpiaList = new EventEmitter();
 
    
    
    
    checkedList : any[];
    currentSelected : {};
    borra = false;
    showDropDown ;
  constructor() {
    this.checkedList = [];
   }
   
    getSelectedValue(status:Boolean,value:String){
        
        if(status){
          this.checkedList.push(value);  
        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
        }
        
        this.currentSelected = {checked : status,name:value};

        //share checked list
        this.shareCheckedlist();
        
        //share individual selected item
        this.shareIndividualStatus();
      
    }
    shareCheckedlist(){
         this.shareCheckedList.emit(this.checkedList);
         console.log("checkedList", this.checkedList);

        
    }
    shareIndividualStatus(){
        this.shareIndividualCheckedList.emit(this.borra);
        // this.limpiaList.emit();
        console.log("currentSelected", this.checkedList);
        

    }
    limpia(){
        this.borra = true;
        this.checkedList = [];
        this.currentSelected = {};
        this.shareIndividualStatus();
        this.shareCheckedlist();
        this.borra = false;
     }

}
