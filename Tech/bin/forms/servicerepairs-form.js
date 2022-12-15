import {FormList} from '../repo/tools/vhc-formlist.js';
import * as ttools from '../repo/modules/vg-tables.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {aflatrepair} from '../repo/ds/jonas/flatratebook.js';
// service item repairs

export class SIrepairform extends FormList{
  constructor(cont,pricebook){
    super(cont);

    this.cont.innerHTML=this.content;
    this.list = this.cont.getElementsByClassName(this.dom.table.cont)[0];
    this.pricebook=pricebook;


    this.srow = this.ADDrepair;//morph this.srow
    this.grow = this.GETrepair;//morph this.grow

    this.cont.getElementsByClassName(this.dom.actions.add)[0].addEventListener('click',(ele)=>{
      let customdesc = this.cont.getElementsByClassName(this.dom.addform.desc)[0].value;
      let customprc = this.cont.getElementsByClassName(this.dom.addform.price)[0].value;
      if(customdesc === '' || customprc === ''){
        $(document.getElementsByClassName('min-page-cont')[0]).toggle();
      }else{
        this.ADDrepair({
          task: customdesc.substring(0,4),
          descr: customdesc,
          price: Number(customprc)
        });
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
      <input class="${this.dom.addform.price}" placeholder="Price"/>
      <div class="icon-action-button ${this.dom.actions.add} "><img src="../../images/icons/plus-icon.png"/></div></div>
      <div class="${this.dom.table.heads}"></div>
      <div class="${this.dom.table.cont}">
    </div>
  </div>
  `

  row=`<div class="sr-task"></div>
    <div class="sr-descr"></div>
    <div class="sr-pl"></div>
    <div class="sr-price"></div>
    <input class="sr-qty"></div>
    <div class="sr-price"></div>
    <div>
      <div class="sr-appr vg-checkbox"></div>
    </div>
    <img class="delete-repair-item" src="../../images/icons/trash.png">
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
      item = aflatrepair(item);

      if(this.list.getElementsByClassName('vg-displynone').length!=0){this.list.innerHTML='';}//attempt to "display none" message
      let row = document.createElement('div');
      row.innerHTML = this.row;

      row.getElementsByClassName('sr-task')[0].innerText = item.task;
      row.getElementsByClassName('sr-descr')[0].innerText = item.descr;
      row.getElementsByClassName('sr-pl')[0].innerText = item.pl;
      row.getElementsByClassName('sr-qty')[0].value = item.qty;
      row.getElementsByClassName('sr-price')[0].innerText = item.price;
      if(item.appr){row.getElementsByClassName('sr-appr')[0].classList.add('vg-checkbox-checked');}

      row.getElementsByClassName('sr-appr')[0].addEventListener('click',(ele)=>{
        ele.target.classList.toggle('vg-checkbox-checked')
      });

      row.getElementsByClassName('delete-repair-item')[0].addEventListener('click',(ele)=>{
        ele.target.parentNode.remove();
      });

      if(this.Dupcheck(row)){
        return row;
      }else{
        DropNote('tr','Already on List','yellow');
        return null;
      }
    }
  }
  GETrepair(row){
    let item={};
    item.task=row.getElementsByClassName('sr-task')[0].innerText||'-';
    item.descr=row.getElementsByClassName('sr-descr')[0].innerText||'';
    item.pl=row.getElementsByClassName('sr-pl')[0].innerText||'';
    item.qty=row.getElementsByClassName('sr-qty')[0].innerText||'';
    item.price=row.getElementsByClassName('sr-price')[0].innerText||'';
    item.appr=row.getElementsByClassName('sr-appr')[0].innerText||'';
    return item;
  }

  Dupcheck(lrow){ //Checks for duplicates in table before adding
    let cont = this.list;
    for(let x=0;x<cont.children.length;x++){
      if(cont.children[x].children[0].innerText == lrow.children[0].innerText){
        return false;
      }
    }
    return true;
  }
  DisplayNone(){
    this.list.innerHTML=`<div class="vg-displaynone">DISPLAY NONE</div>`
  }
}
