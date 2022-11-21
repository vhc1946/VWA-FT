import {VHCform} from '../../repo/tools/vhc-forms.js';
export class Contform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=this.content;
    this.setinputs(this.dom.disp);
  }
  dom={  // was cntrctform
    cont: 'contract-cont',
    disp:{
      id: 'contract-id',
      origid: 'contract-origid',
      renewid: 'contract-renewid',
      datefrom: 'contract-datefrom',
      dateto: 'contract-dateto',
      datesign: 'contract-datesign',
      datestart: 'contract-datestart',
      type: 'contract-type',
      status: 'contract-status',
      billings: 'contract-billings',
      visits: 'contract-visits',
      value: 'contract-value'
    },
    form: {
        cont: 'present-contract-opts',
        memappr: 'wo-contract-appr',
        desc: 'present-contract-opt-desc',
        quantity: 'present-contract-opt-quantity',
        appr: 'present-contract-opt-appr',
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
  content=`
    <div id="wo-present-contract-cont">
        <input id="present-contract-name" type="search" list="contract-name-list" />
        <div id="present-contract-opts">
            <div class="present-contract-opt">
                <div class="present-contract-opt-desc" id="monthly-tag">Monthly Plan</div>
                <input id="wo-contract-appr" type="checkbox" />
                <div id="present-contract-monthly">24</div>
            </div>

            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Additional System(s)</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addsys">21</div>
            </div>
            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Additional Component(s)</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addcomp">12</div>
            </div>

            <div id="enhance-tag">Enhancements</div>

            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Standard Filters</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addstdflt">5</div>
            </div>
            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Humidifier Service/Pad</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addhumpad">5</div>
            </div>
            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Specialty Filters</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addspcflt">12</div>
            </div>
            <div class="present-contract-opt">
                <div class="present-contract-opt-desc">Time Saver Disc.</div><input
                    class="present-contract-opt-quantity" type="number" />
                <div id="present-contract-addtimesave">-4</div>
            </div>
        </div>
    </div>
    <div id=${this.dom.cont} class='ft-form'>
        <div class="contract-opt">
            <div>Contract ID</div><input class=${this.dom.disp.id} placeholder="id">
        </div>
        <div class="contract-opt">
            <div>Original ID</div><input class=${this.dom.disp.origid} placeholder="origid">
        </div>
        <div class="contract-opt">
            <div>Renewal ID</div><input class=${this.dom.disp.renewid} placeholder="renewid">
        </div>
        <div class="contract-opt">
            <div>Date From</div><input class=${this.dom.disp.datefrom} placeholder="datefrom">
        </div>
        <div class="contract-opt">
            <div>Date To</div><input class=${this.dom.disp.dateto} placeholder="dateto">
        </div>
        <div class="contract-opt">
            <div>Date Signed</div><input class=${this.dom.disp.datesign} placeholder="datesign">
        </div>
        <div class="contract-opt">
            <div>Member Since</div><input class=${this.dom.disp.datestart} placeholder="datestart">
        </div>

        <div class="contract-opt">
            <div>Contact Type</div><input class=${this.dom.disp.type} placeholder="type">
        </div>
        <div class="contract-opt">
            <div>Contract Status</div><input class=${this.dom.disp.status} placeholder="status">
        </div>
        <div class="contract-opt">
            <div>Num of Billings</div><input class=${this.dom.disp.billings} placeholder="billings">
        </div>
        <div class="contract-opt">
            <div>Num of Visits</div><input class=${this.dom.disp.visits} placeholder="visits">
        </div>
        <div class="contract-opt">
            <div>Contract Value</div><input class=${this.dom.disp.value} placeholder="value">
        </div>
    </div>
    `
  submit(){}
}
