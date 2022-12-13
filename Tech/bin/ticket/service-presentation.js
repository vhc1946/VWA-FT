//arepair

//aservicepresentation(){}
var cfdom = {
  cont: 'wo-present-contract-cont',
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
var cfcontent = ``;




class ServicePresentation{
  constructor(cont,data,pricebook){
    this.cont = cont;
    this.cont.innerHTML=this.contents;
    //this.pricebook = new ServicePricing();

    //this.conform = VHCform(conform.cont);
    //this.conform.setinputs(this.dom.contract.form.inputs);

    this.conform.cont.addEventListener('change',(ele)=>{
      console.log(cfdom.form);
    });
    SETpresent(data);
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

    contract: cntrctform, //from vg-membership.js

    body: 'present-bottom-cont',

    memlevel:'wo-present-membership',
    systems: 'wo-present-systems',
    system: {
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
    }
  }

  contents=`
  <div class="present-full-cont">
        <div class="present-header-cont">
            <div class="wo-contact-cont">
                <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
                <div class='wo-info-name'>Client Name</div>
                <div class='wo-info-street'>1234 Street Dr</div>
                <div class='wo-info-unit'></div>
                <div class='wo-info-city'>Fenton, MO 63026</div>
                <div class='wo-info-phone'>Phone Number</div>
                <div class='wo-info-description'>Description text</div>
                <div class='wo-info-cust'>CUSTCODE</div>
                <div class='wo-info-wonum'>wonum</div>
            </div>
            <div id="wo-present-contract-cont">
                <input id="present-contract-name" type="search" list="contract-name-list" />
                <div id="present-contract-opts">
                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc" id="monthly-tag">Monthly Plan</div>
                        <input id="wo-contract-appr" type="checkbox" />
                        <div id="present-contract-monthly">24</div>
                    </div>

                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Additional System(s)</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addsys">21</div>
                    </div>
                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Additional Component(s)</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addcomp">12</div>
                    </div>

                    <div id="enhance-tag">Enhancements</div>

                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Standard Filters</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addstdflt">5</div>
                    </div>
                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Humidifier Service/Pad</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addhumpad">5</div>
                    </div>
                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Specialty Filters</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addspcflt">12</div>
                    </div>
                    <div class="present-contract-opt">
                        <div class="present-contract-opt-desc">Time Saver Disc.</div>
                        <input class="present-contract-opt-quantity" type="number" />
                        <div id="present-contract-addtimesave">-4</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="present-bottom-cont">
            <div id="wo-present-repair-cont">
                <div class="wo-present-repair">
                    <div id="wo-present-membership">Premium</div>
                    <a href="https://www.vogelhvac.co/" target="_blank" id="membership-link">Sign Up for Your Membership!</a>
                </div>
                <div id="wo-present-headers">
                    <div>Services & Repairs</div>
                    <div>Regular</div>
                    <div>Member</div>
                    <div>Savings</div>
                    <div>Approval</div>
                </div>
                

                <div id="wo-present-repair-diagnostic" class="wo-present-repair" style="display:none">
                    
                    <div class="present-repair-desc">Diagnostic</div>
                    <div class="present-repair-price"></div>
                    <div></div>
                    <div class="present-repair-savings"></div>
                    <div>YES</div>
                </div>

                <div id="wo-present-systems">
                </div>
            <div class="wo-present-repair">
                <div>Savings Today</div><!--TITLE-->
                <div>0</div>
                <div id="wo-present-savings-today"></div>
            </div>
            <div class="wo-present-repair">
                <div>Monthly Membership</div>
                <div id="wo-present-contract-monthly"></div>
            </div>
            <div class="wo-present-repair">
                <div>Due Today</div>
                <div id="wo-present-regprice-today"></div>
                <div id="wo-present-memprice-today"></div>
            </div>
            </div>
            <div class="present-signature-area">
                <canvas class="signature-pad"></canvas>
            </div> 
        </div>
        
    </div>
  `
  
  SETpresent = (wodata) => {
    console.log(wodata);
    if (wodata.sitems != null) {
      let slist = document.getElementById(prsdom.systems);

      let rprice=0; //temp for reg book price
      let mprice=0; //temp for mem book price
      slist.innerHTML = '';

      for (let x = 0; x < wodata.sitems.length; x++) {
        let s = slist.appendChild(document.createElement('div'));
        s.classList.add(prsdom.system.cont);
        s.appendChild(document.createElement('div')).innerText = this.wo.systems[x].id;
        let rlist = s.appendChild(document.createElement('div'));
        rlist.classList.add(prsdom.system.repairs);

        for (let y = 0; y < wodata.repairs[x].length; y++) {
          rprice = 0;
          mprice = 0;
          //tell what column repcost goes to

          //find the memebership cost (if any)

          //fill the difference
          let r = rlist.appendChild(document.createElement('div'));

          r.classList.add(prsdom.system.repair.cont);
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
            r.classList.add(prsdom.system.repair.unapproved);
          }
          r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].appr ? 'YES':'NO';
        }
      }
      document.getElementById(prsdom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(prsdom.contract.form.name).value) || this.wo.cntrct;
      document.getElementById(prsdom.invest.regprice).innerText = this.wo.build.regprice;
      document.getElementById(prsdom.invest.memprice).innerText = this.wo.build.memprice;
      document.getElementById(prsdom.invest.savings).innerText = this.wo.build.savings;
      document.getElementById(prsdom.invest.conmonth).innerText = this.rewardform.GETformprice();
    }
  }

}
