
import {VHCform} from '../repo/tools/vhc-forms.js';
export class WOform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=this.content;
    this.setinputs(this.dom.info);
  }
  dom={  // was wodom
    cont: 'wo-cont',
    info: {
        id: 'wo-info-id',
        custcode: 'wo-info-custcode',
        contactname: 'wo-info-name',
        contactphone: 'wo-info-phone',
        contactemail: 'wo-info-email',

        street: 'wo-info-street',
        unit: 'wo-info-unit',
        cityzip: 'wo-info-city',
        state: 'wo-info-state',

        salesrep: 'wo-info-salesrep',
        takenby:'wo-info-takenby',
        dept: 'wo-info-dept',
        cat:'wo-info-cat',
        jobref:'wo-info-jobref',
        conref:'wo-info-conref',
        ref:'wo-info-ref',

        status:'wo-info-status',

        pricebook: 'wo-info-pricebook',
        pricelevel: 'wo-info-pricelevel',

        descr:'wo-info-descr'
    },
    label:{
        id: 'wo-label-id',
        custcode: 'wo-label-custcode',
        contactname: 'wo-label-name',
        contactphone: 'wo-label-phone',
        contactemail: 'wo-label-email',

        street: 'wo-label-street',
        unit: 'wo-label-unit',
        cityzip: 'wo-label-city',
        state: 'wo-label-state',

        salesrep: 'wo-label-salesrep',
        takenby:'wo-label-takenby',
        dept: 'wo-label-dept',
        cat:'wo-label-cat',
        jobref:'wo-label-jobref',
        conref:'wo-label-conref',
        ref:'wo-label-ref',

        status:'wo-label-status',

        pricebook: 'wo-label-pricebook',
        pricelevel: 'wo-label-pricelevel',

        descr:'wo-label-descr'
    }
  }
  content=`
  <div id="${this.dom.cont}" class="wo-info-cont">
      <div class="${this.dom.info.id}"></div>
      <div class="${this.dom.info.custcode}"></div>

      <div class="wo-contact-cont">
        <div class="${this.dom.info.contactname}"></div>
        <div class="${this.dom.info.contactphone}"></div>
        <input class="${this.dom.info.contactemail}"></input>
        <div class="${this.dom.info.street}"></div>
        <div class="${this.dom.info.unit}"></div>
        <div class="${this.dom.info.cityzip}"></div>
        <div class="${this.dom.info.state}"></div>
      </div>
      <div class="wo-reference-cont">
        <div class="${this.dom.label.salesrep}">Sales Rep:</div><div class="${this.dom.info.salesrep}"></div>
        <div class="${this.dom.label.takenby}">Taken By:</div><div class="${this.dom.info.takenby}"></div>
        <div class="${this.dom.label.dept}">Depart:</div><div class="${this.dom.info.dept}"></div>
        <div class="${this.dom.label.cat}">Category:</div><div class="${this.dom.info.cat}"></div>
        <div class="${this.dom.label.ref}">Reference:</div><div class="${this.dom.info.ref}"></div>
        <div class="${this.dom.label.status}">Status:</div><div class="${this.dom.info.status}"></div>
        <div class="${this.dom.label.jobref}">Job Ref.:</div><div class="${this.dom.info.jobref}">${this.dom.info.jobref}</div>
        <div class="${this.dom.label.conref}">Contract:</div><div class="${this.dom.info.conref}">${this.dom.info.conref}</div>
      </div>
      <div class="wo-pricing-cont">
        <div class="${this.dom.label.pricebook}">Price Book:</div><div class="${this.dom.info.pricebook}"></div>
        <div class="${this.dom.label.pricelevel}">Price Level:</div><input class="${this.dom.info.pricelevel}" list="price-levels"/>
      </div>
      <textarea class="${this.dom.info.descr}"></textarea>
  </div>

  <datalist id='price-levels'>
    <option value='STA'>
    <option value='CLA'>
    <option value='PRE'>
    <option value='ULT'>

  </datalist>
  `
  submit(){}
}
