import { VHCform } from '../repo/tools/vhc-forms.js';

/* Contract Worksheet Form
*/

const dom={
  cont: 'wo-present-contract-cont',
  fields: {
    sys: 'present-contract-addsys',
    comp: 'present-contract-addcomp',
    stdfltr: 'present-contract-addstdflt',
    spcfltr: 'present-contract-addspcflt',
    humpad: 'present-contract-addhumpad',
    timesave: 'present-contract-addtimesave'
  },
  form: {
      cont: 'present-contract-opts',
      option: 'present-contract-opt',
      memappr: 'wo-contract-appr',
      desc: 'present-contract-opt-desc',
      qty: 'present-contract-opt-quantity',
      name: 'present-contract-name',
      month: 'present-contract-monthly',

      inputs: {
          sys: 'present-contract-addsys',
          comp: 'present-contract-addcomp',
          stdfltr: 'present-contract-addstdflt',
          spcfltr: 'present-contract-addspcflt',
          humpad: 'present-contract-addhumpad',
          timesave: 'present-contract-addtimesave'
      }
  }
}
const content = `
  <div class="select">
    <select class="${dom.form.name}" placeholder="Select Plan Type">
      <option value = "CLASSIC">CLASSIC</option>
      <option value = "PREMIUM">PREMIUM</option>
      <option value = "ULTIMATE">ULTIMATE</option>
    </select>
    <span class="focus"></span>
  </div>
  <div class="${dom.form.cont}">
      <div class="${dom.form.option}">
          <div class="${dom.form.desc}" id="monthly-tag">Monthly Plan</div>
          <input class="${dom.form.memappr}" type="checkbox" />
          <div class="${dom.form.month}">24</div>
      </div>

      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Additional System(s)</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.sys}">21</div>
      </div>
      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Additional Component(s)</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.comp}">12</div>
      </div>

      <div id="enhance-tag">Enhancements</div>

      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Standard Filters</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.stdfltr}">5</div>
      </div>
      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Humidifier Service/Pad</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.humpad}">5</div>
      </div>
      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Specialty Filters</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.spcfltr}">12</div>
      </div>
      <div class="${dom.form.option}">
          <div class="${dom.form.desc}">Time Saver Disc.</div>
          <input class="${dom.form.qty}" type="number" />
          <div class="${dom.form.inputs.timesave}">-4</div>
      </div>
  </div>
`

export class ContractWSform extends VHCform{
  constructor(){
    super({
      dom:dom,
      content:content
    });
    this.cont.classList.add(this.dom.cont);

    this.pricelevel = this.GETmemhead('');
    console.log(this.cont.getElementsByTagName("select"))
    if (this.pricelevel == 'CLASSIC') {
      this.cont.getElementsByTagName("select")[0].options[0].selected = true;
    } else if (this.pricelevel == 'PREMIUM') {
      this.cont.getElementsByTagName("select")[0].options[1].selected = true;
    } else {
      this.cont.getElementsByTagName("select")[0].options[2].selected = true;
    }

    //Update price level
    this.cont.getElementsByTagName('select')[0].addEventListener('change',(ele)=>{
      this.SETprices(this.GETprices(this.pricelevel));
    })

    /*Must wait for DOM to fully load before updating prices.*/
    window.addEventListener('DOMContentLoaded', (event) => {
      this.SETprices(this.GETprices(this.pricelevel));

      //Update membership label
      document.getElementsByClassName('memlevel-label')[0].innerText = this.pricelevel;
  });
  }


  //returns the contract price from form, multiplied by pmnts (pmnts=12 == annual payment)
  GETformprice = (pmnts = 1) => { //get price from form
    this.form.pl = document.getElementsByClassName(dom.form.name)[0][document.getElementsByClassName(dom.form.name)[0].selectedIndex].value;
    this.pricelevel = this.GETmemhead(this.form.pl);
    this.SETprices(this.GETprices(this.pricelevel)); //Update pricing box
    let month = document.getElementsByClassName(dom.form.month)[0].parentNode;
    let conappr = document.getElementsByClassName(dom.form.memappr)[0];
    let price = 0;
    if(conappr.checked){ //if the memebership has been "checked-on"
      price = Number(document.getElementsByClassName(dom.form.month)[0].innerText);
    }
    for (let i in dom.form.inputs) {
        let opt = document.getElementsByClassName(dom.form.inputs[i])[0].parentNode;
        let optval = Number(document.getElementsByClassName(dom.form.inputs[i])[0].innerText);
        let optinput = opt.getElementsByTagName('input')[0];
        //Input validation
        if (optinput.value == '' || Number(optinput.value) <=0 || optinput.value == undefined) {
          optinput.value = '0'
        }
        if(conappr.checked){
          price += optval * Number(optinput.value); //add to memebership price
        }
    }
    return price;
  }

  //Pass the name from the contract FORM
  //Either uses that OR the associated pl
  GETmemhead = (pname)=>{
    switch(pname){
      case 'CLASSIC': return 'CLASSIC'
      case 'PREMIUM': return 'PREMIUM'
      case 'ULTIMATE': return 'ULTIMATE'
      case '':
        switch(document.getElementsByClassName("wo-info-pricelevel")[0].value){
          case 'CLA':return 'CLASSIC'
          case 'PRE':return 'PREMIUM'
          case 'ULT':return 'ULTIMATE'
          default: return 'DEFAULT'
        }
    }
  }

  SETprices=(prices)=>{
    console.log(prices)
    //Set prices of inputs
    for (let i in dom.form.inputs) {
      let opt = document.getElementsByClassName(dom.form.inputs[i])[0];
      opt.innerText = prices[i];
    }
    //Set monthly price plan
    let pl = 24
    switch(this.pricelevel){
      case 'CLASSIC': pl=24;break;
      case 'PREMIUM': pl=33;break;
      case 'ULTIMATE': pl=44;break;
    }
    console.log(pl)
    document.getElementsByClassName('present-contract-monthly')[0].innerText = pl
  }

  //Get price levels for form
  GETprices=(pname)=>{
    let prices = {};
    switch(pname){
      case 'CLASSIC':
        prices = { //these should match that of the form dom element
          sys:21,
          comp:12,
          stdfltr:5,
          humpad:5,
          spcfltr:12,
          timesave:-4
        };
        break;
      case 'PREMIUM': {
        prices = { //these should match that of the form dom element
          sys:29,
          comp:12,
          stdfltr:0,
          humpad:0,
          spcfltr:7,
          timesave:-4
        };
        break;
      }
      case 'ULTIMATE': {
        prices = { //these should match that of the form dom element
          sys:37,
          comp:12,
          stdfltr:0,
          humpad:0,
          spcfltr:7,
          timesave:-4
        };
        break;
      }
    }
    return prices;
  }
}