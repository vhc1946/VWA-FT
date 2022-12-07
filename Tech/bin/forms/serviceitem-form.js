import {VHCform} from '../repo/tools/vhc-forms.js';
import * as ttools from '../repo/modules/vg-tables.js';

// service item information
export class SIform extends VHCform{
  constructor(cont,seletable=()=>{}){
    super(cont);
    this.cont.innerHTML=this.content;
    this.setinputs(this.dom.info);


  }
  dom={
    cont: 'si-form',
    info: {
      id: 'si-id',//
      tagid: 'si-tagnum',//
      area: 'si-area', //
      beltsize: 'si-beltsize',//
      controls: 'si-controls',
      descr: 'si-descr',//

      elec: 'si-elec',
      filt1: 'si-filt1',//
      filt1q: 'si-filt1q',//
      filt2: 'si-filt2',//
      filt2q: 'si-filt2q',//
      location: 'si-location',//
      manf: 'si-manf',//
      model: 'si-model',//
      refri: 'si-refri',//
      serial: 'si-serial',//
      status: 'si-status',
      type: 'si-type',
      warr1: 'si-warr1',//
      warr2: 'si-warr2',//
      warr3: 'si-warr3',//
      expry1: 'si-expry1',//
      expry2: 'si-expry2',//
      expry3: 'si-expry3'//
    }
  }
  content=`
    <div id=${this.dom.cont} class='ft-form'>
      <div class="si-basics">
        <div class="si-item">
          <div>Item ID</div><input class=${this.dom.info.id} placeholder="id">
        </div>
        <div class="si-item">
          <div>Tag Num</div><input class=${this.dom.info.tagid} placeholder="tagnum">
        </div>
        <div class="si-item">
          <div>Description</div><input class=${this.dom.info.descr} placeholder="descr">
        </div>
        <div class="si-item">
          <div>Model Num</div><input class=${this.dom.info.model} placeholder="model">
        </div>
        <div class="si-item">
          <div>Serial Num</div><input class=${this.dom.info.serial} placeholder="serial">
        </div>
        <div class="si-item">
          <div>Brand</div><input class=${this.dom.info.manf} placeholder="manf">
        </div>
        <div class="si-item">
          <div>Location</div><input class=${this.dom.info.location} placeholder="location">
        </div>
        <div class="si-item">
          <div>Area Served</div><input class=${this.dom.info.area} placeholder="area">
        </div>
      </div>
      <div class="si-materials">
        <div class="si-item">
          <div>Filter Type 1</div><input class=${this.dom.info.filt1} placeholder="filt1">
        </div>
        <div class="si-item">
          <div>Filter Qty 1</div><input class=${this.dom.info.filt1q} placeholder="filt1q">
        </div>
        <div class="si-item">
          <div>Filter Type 2</div><input class=${this.dom.info.filt2} placeholder="filt2">
        </div>
        <div class="si-item">
          <div>Filter Qty 2</div><input class=${this.dom.info.filt2q} placeholder="filt2q">
        </div>
        <div class="si-item">
          <div>Belt Size</div><input class=${this.dom.info.beltsize} placeholder="beltsize">
        </div>
        <div class="si-item">
          <div>Refrigerant</div><input class=${this.dom.info.refri} placeholder="refri">
        </div>
      </div>
      <div class="si-warranties">
        <div class="si-item">
          <div>Parts Warranty</div><input class=${this.dom.info.warr1} placeholder="warr1">
        </div>
        <div class="si-item">
          <div>Labor Warranty</div><input class=${this.dom.info.warr2} placeholder="warr2">
        </div>
        <div class="si-item">
          <div>Addl Warranty</div><input class=${this.dom.info.warr3} placeholder="warr3">
        </div>
        <div class="si-item">
          <div>Parts Expires</div><input class=${this.dom.info.expry1} placeholder="expry1">
        </div>
        <div class="si-item">
          <div>Labor Expires</div><input class=${this.dom.info.expry2} placeholder="expry2">
        </div>
        <div class="si-item">
          <div>Addl Expires</div><input class=${this.dom.info.expry3} placeholder="expry3">
        </div>
      </div>
    </div>
  `
}

// service item repairs
export class SIrepairform extends VHCform{
  constructor(cont,seletable=()=>{}){
    super(cont);
    this.cont.innerHTML=this.content;
    this.table = this.cont.getElementsByClassName(this.dom.table.cont);
    this.cont.getElementsByClassName(this.dom.actions.save)[0].addEventListener('click',(ele)=>{
      this.ADDrepair(this.addform);
    });
  }
  dom={
    cont:'si-repair-cont',
    actions:{
      add:'si-repair-add',
      delete:'si-rcd cepair-delete'
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
    <div class="${this.dom.table.actions}"><img class="${this.dom.actions.add}"/><input class="add-repair-value"/></div>
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
