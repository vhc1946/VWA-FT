
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
        contactname: 'wo-info-contactname',
        street: 'wo-info-street',
        cityzip: 'wo-info-cityzip',
        descr:'wo-description',
        contactphone: 'wo-info-contactphone',
        custcode: 'wo-info-custcode',
        dept: 'wo-info-dept',
        pricebook: 'wo-info-pricebook'
    }
  }
  content=`
  <div id="${this.dom.cont}" class="twelve-col-grid">
    <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
    <div class="client-label">WO Num:</div><input class="${this.dom.info.id}" type="text" />
    <div class="client-label">Client:</div><input class="${this.dom.info.contactname}" class="client-input" type="text" />
    <div class="client-label">Street:</div><input class="${this.dom.info.street}" class="client-input" type="text" />
    <div class="client-label">City/Zip:</div><input class="${this.dom.info.cityzip}" class="client-input" type="text" />
    <div class="client-label">Description:</div><textarea class="${this.dom.info.descr}"></textarea>
    <div class="client-label">Phone:</div><input class="${this.dom.info.contactphone}" class="client-input" type="text" />
    <div class="client-label">Cust Code:</div><input class="${this.dom.info.custcode}" class="client-input" type="text" />
    <div class="client-label">Department:</div><input class="${this.dom.info.dept}" class="client-input" type="text" />
    <div class="client-label">Price Book:</div><input class="${this.dom.info.pricebook}" class="client-input" type="text" />
  `
  submit(){}
}
