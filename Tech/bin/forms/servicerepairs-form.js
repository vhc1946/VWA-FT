import {FormList} from '../repo/tools/vhc-formlist.js';
import * as ttools from '../repo/modules/vg-tables.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
// service item repairs

export class SIrepairform extends FormList{
  constructor(cont,pricebook){
    super(cont);

    this.cont.innerHTML=this.content;
    this.list = this.cont.getElementsByClassName(this.dom.table.cont)[0];
    this.pricebook=pricebook;


    this.srow = this.ADDrepair;//morph this.srow
    //this.grow = this.GETrepair;//morph this.grow

    this.cont.getElementsByClassName(this.dom.actions.add)[0].addEventListener('click',(ele)=>{
      let customin = this.cont.getElementsByClassName(this.dom.input)[0].value;
      if(customin === ''){
        $(document.getElementsByClassName('min-page-cont')[0]).toggle();
      }else{
        DropNote('tr',`Add ${customin}`);
      }

    });

    this.cont.getElementsByClassName(this.dom.table.actions)[0].appendChild(this.pricebook.CREATEmiscinputs(this));
    this.cont.addEventListener('mouseover',(ele)=>{
      if(this.cont.children.length==0){this.DisplayNone();}
    })
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
  <div class="${this.dom.cont}">
    <div class="${this.dom.table.actions}">
      <input class="${this.dom.addform.desc}" placeholder="Add description"/>
      <input class="${this.dom.input}" placeholder="Price"/>
      <div class="icon-action-button ${this.dom.actions.add} "><img src="../../images/icons/plus-icon.png"/></div></div>
      <div class="${this.dom.table.heads}"></div>
      <div class="${this.dom.table.cont} vg-gentable">
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

  ADDrepair(item=null){
    if(item){
      if(this.list.getElementsByClassName('vg-displynone').length!=0){this.list.innerHTML='';}
      let newrow = ttools.SETrowFROMobject(arepair(item))
      newrow.appendChild(document.createElement('input'));
      newrow.lastChild.setAttribute('type','checkbox');
      newrow.appendChild(document.createElement('img'));
      newrow.lastChild.src = '../../images/icons/trash.png';
      newrow.lastChild.classList.add('delete-repair-item');
      if(this.Dupcheck(newrow)){
        return newrow;
      }else{
        DropNote('tr','Already on List','yellow');
        return null;
      }
    }
  }
  Dupcheck(lrow){ //Checks for duplicates in table before adding
    let cont = this.list;
      for(let x=0;x<cont.children.length;x++){
        if(cont.children[x].innerHTML == lrow.innerHTML){
          return false;
        }
      }
    return true;
  }
  DisplayNone(){
    this.list.innerHTML=`<div class="vg-displaynone">DISPLAY NONE</div>`
  }

}


var arepair=(item)=>{
  return {
    TaskID: item.TaskID,
    Desc: item.desc ||"Descriptions to come",
    SellingPrice: item.SellingPrice,
    PriceLevelCode: item.PriceLevelCode,
  }
}
