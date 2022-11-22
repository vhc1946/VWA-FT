
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
  <div id="${this.dom.cont}" class="ft-form">
    <div class='wo-item'>
      <div>WO Num:</div><input class="${this.dom.info.id}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Cust Code:</div><input class="${this.dom.info.custcode}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Client:</div><input class="${this.dom.info.contactname}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Phone:</div><input class="${this.dom.info.contactphone}" type="text" />
    </div>

    <div class='wo-item'>
      <div>Street:</div><input class="${this.dom.info.street}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Unit:</div><input class="${this.dom.info.unit}" type="text" />
    </div>
    <div class='wo-item'>
      <div>City/Zip:</div><input class="${this.dom.info.cityzip}" type="text" />
    </div>
    <div class='wo-item'>
      <div>State:</div><input class="${this.dom.info.state}" type="text" />
    </div>

    <div class='wo-item'>
      <div>Sales Rep:</div><input class="${this.dom.info.salesrep}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Taken By:</div><input class="${this.dom.info.takenby}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Department:</div><input class="${this.dom.info.dept}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Category:</div><input class="${this.dom.info.cat}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Reference:</div><input class="${this.dom.info.ref}" type="text" />
    </div>

    <div class='wo-item'>
      <div>Job Reference:</div><input class="${this.dom.info.jobref}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Contract Reference:</div><input class="${this.dom.info.conref}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Price Book:</div><input class="${this.dom.info.pricebook}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Price Level:</div><input class="${this.dom.info.pricelevel}" type="text" />
    </div>
    <div class='wo-item'>
      <div>Description:</div><textarea class="${this.dom.info.descr}"></textarea>
    </div>
  </div>
  `
  submit(){}
}
