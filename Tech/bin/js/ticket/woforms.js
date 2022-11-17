
import {VHCform} from '../../repo/tools/vhc-forms.js';
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
        contactname: 'wo-info-contactname',
        contactphone: 'wo-info-contactphone',

        street: 'wo-info-street',
        unit: 'wo-info-unit',
        cityzip: 'wo-info-cityzip',
        state: 'wo-info-state',
        descr:'wo-description',

        salesrep: 'wo-info-salesrep',
        takenby:'wo-takenby',
        dept: 'wo-info-dept',
        cat:'wo-info-cat',
        jobref:'wo-info-jobref',
        conref:'wo-info-conref',
        ref:'wo-info-ref',

        pricebook: 'wo-info-pricebook',
        pricelevel: 'wo-info-pricelevel'
    }
  }
  content=`
  <div id="${this.dom.cont}" class="twelve-col-grid">
    <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
    <div class="client-label">WO Num:</div><input class="${this.dom.info.id}" type="text" />
    <div class="client-label">Cust Code:</div><input class="${this.dom.info.custcode}" class="client-input" type="text" />
    <div class="client-label">Client:</div><input class="${this.dom.info.contactname}" class="client-input" type="text" />
    <div class="client-label">Phone:</div><input class="${this.dom.info.contactphone}" class="client-input" type="text" />

    <div class="client-label">Street:</div><input class="${this.dom.info.street}" class="client-input" type="text" />
    <div class="client-label">Unit:</div><input class="${this.dom.info.unit}" class="client-input" type="text" />
    <div class="client-label">City/Zip:</div><input class="${this.dom.info.cityzip}" class="client-input" type="text" />
    <div class="client-label">State:</div><input class="${this.dom.info.state}" class="client-input" type="text" />

    <div class="client-label">Sales Rep:</div><input class="${this.dom.info.salesrep}" class="client-input" type="text" />
    <div class="client-label">Taken By:</div><input class="${this.dom.info.takenby}" class="client-input" type="text" />
    <div class="client-label">Department:</div><input class="${this.dom.info.dept}" class="client-input" type="text" />
    <div class="client-label">Category:</div><input class="${this.dom.info.cat}" class="client-input" type="text" />
    <div class="client-label">Reference:</div><input class="${this.dom.info.ref}" class="client-input" type="text" />
    <div class="client-label">Job Reference:</div><input class="${this.dom.info.jobref}" class="client-input" type="text" />
    <div class="client-label">Contract Reference:</div><input class="${this.dom.info.conref}" class="client-input" type="text" />

    <div class="client-label">Price Book:</div><input class="${this.dom.info.pricebook}" class="client-input" type="text" />
    <div class="client-label">Price Level:</div><input class="${this.dom.info.pricelevel}" class="client-input" type="text" />
    <div class="client-label">Description:</div><textarea class="${this.dom.info.descr}"></textarea>
  </div>
  `
  submit(){}
}
