import { VHCform } from '../repo/tools/vhc-forms.js';

/* Contract Worksheet Form
*/

export class ContractWSform extends VHCform{
  constructor(){
    let cont = document.createElement('div');//create empty div
    super(cont);
    this.cont.classList.add(this.dom.cont);
    this.cont.innerHTML=this.content;
    this.setinputs(this.dom.form.inputs);

    this.cont.addEventListener('change',(ele)=>{
      console.log('recalculate inputs');
    })
  }

  dom={
    cont: 'wo-present-contract-cont',
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
  content= `
    <input class="${this.dom.form.name}" type="search" list="contract-name-list" placeholder="Select Plan Type"/>
    <div class="${this.dom.form.cont}">
        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}" id="monthly-tag">Monthly Plan</div>
            <input class="${this.dom.form.memappr}" type="checkbox" />
            <div class="${this.dom.form.month}">24</div>
        </div>

        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Additional System(s)</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.sys}">21</div>
        </div>
        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Additional Component(s)</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.comp}">12</div>
        </div>

        <div id="enhance-tag">Enhancements</div>

        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Standard Filters</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.stdfltr}">5</div>
        </div>
        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Humidifier Service/Pad</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.humpad}">5</div>
        </div>
        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Specialty Filters</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.spcfltr}">12</div>
        </div>
        <div class="${this.dom.form.option}">
            <div class="${this.dom.form.desc}">Time Saver Disc.</div>
            <input class="${this.dom.form.qty}" type="number" />
            <div class="${this.dom.form.inputs.timesave}">-4</div>
        </div>
    </div>
  `

}
