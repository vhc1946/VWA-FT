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
  <select class="${dom.form.name}" placeholder="Select Plan Type">
    <option>CLASSIC</option>
    <option>PREMIUM</option>
    <option>ULTIMATE</option>
  </select>
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

    this.cont.addEventListener('change',(ele)=>{
      console.log('recalculate inputs');
    })
  }

}
