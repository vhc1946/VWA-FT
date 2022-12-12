import {VHCform} from '../repo/tools/vhc-forms.js';
import * as ttools from '../repo/modules/vg-tables.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
// service item repairs

export class SIrepairform extends VHCform{
  constructor(cont,pricebook){
    super(cont);

    this.cont.innerHTML=this.content;
    this.table = this.cont.getElementsByClassName(this.dom.table.cont)[0];
    this.pricebook=pricebook;
    this.cont.getElementsByClassName(this.dom.actions.add)[0].addEventListener('click',(ele)=>{
      let customin = this.cont.getElementsByClassName(this.dom.input)[0].value;
      if(customin === ''){
        $(document.getElementsByClassName('min-page-cont')[0]).toggle();
      }else{
        DropNote('tr',`Add ${customin}`);
      }
    });
  }
  dom={
    cont:'si-repair-cont',
    actions:{
      add:'si-repair-add',
      delete:'si-repair-delete'
    },
    input: 'add-repair-value',
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
    <div class="${this.dom.table.actions}"><input class="${this.dom.input}"/><div class="${this.dom.actions.add} icon-action-button"><img src="../../images/icons/plus-icon.png"/></div></div>
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
      //loop through current repairs to check for dups
      this.table.appendChild(ttools.SETrowFROMobject(item));
    }
  }

}
