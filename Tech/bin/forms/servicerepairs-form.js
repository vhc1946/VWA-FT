import {VHCform} from '../repo/tools/vhc-forms.js';
import * as ttools from '../repo/modules/vg-tables.js';
// service item repairs
export class SIrepairform extends VHCform{
  constructor(cont,pricebook){
    super(cont);
    this.cont.innerHTML=this.content;
    this.table = this.cont.getElementsByClassName(this.dom.table.cont);
    this.pricebook=pricebook;
    this.cont.getElementsByClassName(this.dom.actions.add)[0].addEventListener('click',(ele)=>{
      //check if custom input

      if(true){$(document.getElementsByClassName('min-page-cont')[0]).toggle();}
      //this.ADDrepair(this.addform);
    });
  }
  dom={
    cont:'si-repair-cont',
    actions:{
      add:'si-repair-add',
      delete:'si-repair-delete'
    },
    addform:{
      desc:'si-add-form-desc',
      price:'si-add-form-price',
    },
    table:{
      cont:'si-repair-table',
      actions:'si-repair-actions',
      header:'si-repair-heads',
      rows:'si-repair-rows'
    }
  }
  content=`
  <div class="${this.dom.cont}"> TABLE
    <div class="${this.dom.table.actions}"><input class="add-repair-value"/><img class="${this.dom.actions.add} sm-action-button" src="../../images/icons/plus-icon.png"/></div>
    <div class="${this.dom.table.heads}"></div>
    <div class="${this.dom.table.cont}">
    </div>
  </div>
  `

  get addform(){
    let form={};
    for(let i in this.dom.addform){
      form[i]=this.cont.getElementsByClassName(this.dom.addform[i])[0].value;
    }
    return form;
  }
  set addform(af){

  }

  get form(){
    let rlist = [];
    let rrows = this.table.getElementsByClassName(this.dom.table.rows);
    for(let x=0;x<rrows.length;x++){
      rlist.push(ttools.GETrowTOobject(rrows[x]));
    }
    return rlist;
  }
  set form(rlist=[]){
    this.table.innerHTML='';
    for(let x=0;x<rlist.length;x++){
      this.table.appendChild(ttools.SETrowFROMobject(rlist[x]));
    }
  }

  ADDrepair(item=null){
    if(item){
      this.table.appendChild(ttools.SETrowFROMobject(item));
    }
  }

}
