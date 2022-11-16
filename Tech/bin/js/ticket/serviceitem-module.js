import {VHCform} from '../../repo/tools/vhc-forms.js';
export class SIform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=this.content;
    this.setinputs(this.dom.info);
  }
  dom={
    cont: 'si-form',
    info: {
      area: 'si-area', //
      beltsize: 'si-beltsize',//
      controls: 'si-controls',
      desc: 'si-desc',
      elec: 'si-elec',
      filt1: 'si-filt1',//
      filt1q: 'si-filt1q',//
      filt2: 'si-filt2',//
      filt2q: 'si-filt2q',//
      id: 'si-id',//
      location: 'si-location',//
      manf: 'si-manf',
      model: 'si-model',//
      refri: 'si-refri',
      serial: 'si-serial',//
      status: 'si-status',
      tagnum: 'si-tagnum',
      type: 'si-type',
      warr1: 'si-warr1',
      warr2: 'si-warr2',
      warr3: 'si-warr3'
    }
  }
  content=`
    <div class=${this.dom.cont}>
      <div class="si-item">
        <div>Item ID</div><input class=${this.dom.info.id} placeholder="id">
      </div>
      <div class="si-item">
        <div>Description</div><input class=${this.dom.info.desc} placeholder="desc">
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
    </div>
  `
  submit(){}
}
