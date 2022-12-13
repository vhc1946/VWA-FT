//arepair

//aservicepresentation(){}
var cfdom = {
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
var cfcontent = `
  <div id="${cfdom.cont}">
      <input id="${cfdom.form.name}" type="search" list="contract-name-list" />
      <div id="${cfdom.form.cont}">
          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}" id="monthly-tag">Monthly Plan</div>
              <input id="${cfdom.form.memappr}" type="checkbox" />
              <div id="${cfdom.form.month}">24</div>
          </div>

          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Additional System(s)</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.sys}">21</div>
          </div>
          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Additional Component(s)</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.comp}">12</div>
          </div>

          <div id="enhance-tag">Enhancements</div>

          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Standard Filters</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.stdfltr}">5</div>
          </div>
          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Humidifier Service/Pad</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.humpad}">5</div>
          </div>
          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Specialty Filters</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.spcfltr}">12</div>
          </div>
          <div class="${cfdom.form.option}">
              <div class="${cfdom.form.desc}">Time Saver Disc.</div>
              <input class="${cfdom.form.qty}" type="number" />
              <div id="${cfdom.form.inputs.timesave}">-4</div>
          </div>
      </div>
  </div>
`;




export class ServicePresentation{
  constructor(cont,data,pricebook){
    this.cont = cont;
    this.cont.innerHTML=this.contents;
    //this.pricebook = new ServicePricing();

    //this.conform = VHCform(conform.cont);
    //this.conform.setinputs(this.dom.contract.form.inputs);

    //this.conform.cont.addEventListener('change',(ele)=>{
    //  console.log(cfdom.form);
    //});
    this.SETpresent(data);
  }

  dom = {
    cont: 'present-full-cont',
    button:{
      open:'button-open-presentation'
    },

    head: 'present-header-cont',
    info:{
      name:'wo-info-name',
      street:'wo-info-street',
      unit:'wo-info-unit',
      city:'wo-info-city',
      phone:'wo-info-phone',
      desc:'wo-info-description',
      custcode:'wo-info-custcode',
      wonum:'wo-info-wonum'
    },

    //contract: cntrctform, //from vg-membership.js

    body: 'present-bottom-cont',

    memlevel:'wo-present-membership',
    systems: 'wo-present-systems',
    system: {   //Most of this is generated by JS
      cont: 'wo-present-system',
      id: 'wo-present-system-id',
      repairs: 'wo-present-system-repairs',
      specials:{
        diagnostic:'wo-present-repair-diagnostic'
      },
      repair: {
        unapproved:'wo-present-repair-unapproved',
        cont: 'wo-present-repair',
        num: 'present-repair-num',
        desc: 'present-repair-desc',
        invst: 'present-repair-price',
        savings: 'present-repair-savings',
        appr: 'present-repair-appr'
      }
    },
    invest: {
      savings: 'wo-present-savings-today',
      regprice: 'wo-present-regprice-today',
      memprice: 'wo-present-memprice-today',
      conmonth: 'wo-present-contract-monthly'
    },
    sig: 'wo-present-signature'
  }

  contents=`
  <div class="${this.dom.cont}">
        <div class="${this.dom.head}">
            <div class="wo-contact-cont">
                <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
                <div class="${this.dom.info.name}">Client Name</div>
                <div class="${this.dom.info.street}">1234 Street Dr</div>
                <div class="${this.dom.info.unit}"></div>
                <div class="${this.dom.info.city}">Fenton, MO 63026</div>
                <div class="${this.dom.info.phone}">Phone Number</div>
                <div class="${this.dom.info.desc}">Description text</div>
                <div class="${this.dom.info.custcode}">CUSTCODE</div>
                <div class="${this.dom.info.wonum}">wonum</div>
            </div>
            
        </div>

        <div class="${this.dom.body}">
            <div id="wo-present-repair-cont">
                <div class="${this.dom.system.repair.cont}">
                    <div id="${this.dom.memlevel}">Premium</div>
                    <a href="https://www.vogelhvac.co/" target="_blank" id="membership-link">Sign Up for Your Membership!</a>
                </div>
                <div id="wo-present-headers">
                    <div>Services & Repairs</div>
                    <div>Regular</div>
                    <div>Member</div>
                    <div>Savings</div>
                    <div>Approval</div>
                </div>
                

                <div id="wo-present-repair-diagnostic" class="${this.dom.system.repair.cont}" style="display:none">
                    
                    <div class="${this.dom.system.repair.desc}">Diagnostic</div>
                    <div class="${this.dom.system.repair.invst}"></div>
                    <div></div>
                    <div class="${this.dom.system.repair.savings}"></div>
                    <div>YES</div>
                </div>

                <div id="wo-present-systems">
                </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Savings Today</div>
                <div>0</div>
                <div id="${this.dom.invest.savings}"></div>
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Monthly Membership</div>
                <div id="${this.dom.invest.conmonth}"></div>
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Due Today</div>
                <div id="${this.dom.invest.regprice}"></div>
                <div id="${this.dom.invest.memprice}"></div>
            </div>
            </div>
            <div class="${this.dom.sig}">
                <canvas class="signature-pad"></canvas>
            </div> 
        </div>
        
    </div>
  `
  
  SETpresent = (wodata) => {
    console.log(wodata);
    if (wodata.sitems != null) {
      document.body.appendChild(this.cont);
      document.getElementsByClassName(this.dom.head)[0].appendChild(document.createElement('div')).innerHTML = cfcontent;
      let slist = document.getElementById(this.dom.systems);

      let rprice=0; //temp for reg book price
      let mprice=0; //temp for mem book price
      slist.innerHTML = '';

      for (let x = 0; x < wodata.sitems.length; x++) {
        let s = slist.appendChild(document.createElement('div'));
        s.classList.add(this.dom.system.cont);
        s.appendChild(document.createElement('div')).innerText = this.wo.systems[x].id;
        let rlist = s.appendChild(document.createElement('div'));
        rlist.classList.add(this.dom.system.repairs);

        for (let y = 0; y < wodata.repairs[x].length; y++) {
          rprice = 0;
          mprice = 0;
          //tell what column repcost goes to

          //find the memebership cost (if any)

          //fill the difference
          let r = rlist.appendChild(document.createElement('div'));

          r.classList.add(this.dom.system.repair.cont);
          r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].desc;

          //rprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.reg);
          r.appendChild(document.createElement('div')).innerText =  rprice;
          this.wo.build.regprice += (wodata.repairs[x][y].appr ? rprice : 0);

          if(wodata.repairs[x][y].task=='DIAG'){ //special case for diagnostic fee
            if(this.wo.hascntrct){
              mprice = this.pricing.GETbookprice(wodata.repairs[x][y].task,this.wo.cntrct);
            }else{mprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.reg);}
          }else{mprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.cntrct);}

          r.appendChild(document.createElement('div')).innerText = mprice;
          this.wo.build.memprice += (wodata.repairs[x][y].appr ? mprice : 0);
          r.appendChild(document.createElement('div')).innerText = rprice - mprice;
          this.wo.build.savings += (wodata.repairs[x][y].appr ? rprice - mprice :0);

          if(!wodata.repairs[x][y].appr){
            r.classList.add(this.dom.system.repair.unapproved);
          }
          r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].appr ? 'YES':'NO';
        }
      }
      document.getElementById(this.dom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(this.dom.contract.form.name).value) || this.wo.cntrct;
      document.getElementById(this.dom.invest.regprice).innerText = this.wo.build.regprice;
      document.getElementById(this.dom.invest.memprice).innerText = this.wo.build.memprice;
      document.getElementById(this.dom.invest.savings).innerText = this.wo.build.savings;
      document.getElementById(this.dom.invest.conmonth).innerText = this.rewardform.GETformprice();
    }
  }

}
