
import {ServicePricing} from './service-pricing.js';
import {ContractWSform} from '../forms/contract-ws-form.js';
//arepair

//aservicepresentation(){}
export class ServicePresentation{
  constructor(cont,data,pricebook){
    this.cont = cont;
    this.cont.innerHTML=this.contents;
    this.data = data; //ticket data
    this.pricebook = new ServicePricing(pricebook); //ticket book
    this.conform = new ContractWSform();
    this.cont.getElementsByClassName(this.dom.head)[0].appendChild(this.conform.cont);
    this.conform.cont.addEventListener('change',(ele)=>{
      console.log('update pricing on presentation');

      let price = this.conform.GETformprice(1);

      //Update price in paymeny form
      document.getElementById('wo-present-contract-monthly').innerText = price;

      //Update membership label
      document.getElementsByClassName('memlevel-label')[0].innerText = this.conform.pricelevel;
    });

    this.contract='PRE'
    this.SETpresent(data);

    /*Setup + listeners for approve buttons.*/
    document.getElementsByClassName(this.dom.sig)[0].style.left = '-5000px'; //For first run
    document.getElementById(this.dom.buttons.appreg).addEventListener('click',(eve)=>{
      this.SHOWsignature(false);
    });
    document.getElementById(this.dom.buttons.appmem).addEventListener('click',(eve)=>{
      this.SHOWsignature(true);
    });
    /*Open collateral on signature save.*/
    document.getElementsByClassName('sig-save')[0].addEventListener('click', (ele)=>{
      window.data = this.data;
      window.open("../bin/collateral/collateral.html");
    });
  }

  dom = {
    cont: 'present-full-cont',
    head: 'present-header-cont',
    info:{
      contactname:'present-info-contactname',
      street:'present-info-street',
      unit:'present-info-unit',
      cityzip:'present-info-cityzip',
      contactphone:'present-info-contactphone',
      custcode:'present-info-custcode',
      id:'present-info-id'   // wonum
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
    buttons:{
      open:'button-open-presentation',
      appreg: 'present-approval-regular',
      appmem: 'present-approval-membership'
    },
    sig: 'wo-present-signature'
  }

  contents=`
  <div class="${this.dom.cont}">
        <div class="${this.dom.head}">
            <div class="wo-contact-cont">
                <img src="../bin/repo/assets/images/Header_clean_transparent.png" id="header-logo" alt="VOGEL">
                <div class="${this.dom.info.contactname}">Client Name</div>
                <div class="${this.dom.info.street}">1234 Street Dr</div>
                <div class="${this.dom.info.unit}"></div>
                <div class="${this.dom.info.cityzip}">Fenton, MO 63026</div>
                <div class="${this.dom.info.contactphone}">Phone Number</div>
                <div class="${this.dom.info.custcode}">CUSTCODE</div>
                <div class="${this.dom.info.id}">wonum</div>
            </div>
        </div>

        <div class="${this.dom.body}">
            <div id="wo-present-repair-cont">
                <div class="${this.dom.system.repair.cont}">
                    <div class="ignore">Pricing</div>
                    <div class="ignore">Premium</div>
                    <div class = "memlevel-label" id="${this.dom.memlevel}"></div>
                    <a href="https://www.vogelhvac.co/" target="_blank" id="membership-link">Sign Up for Your Membership!</a>
                </div>
                <div class="wo-present-headers">
                    <div>Services & Repairs</div>
                    <div>Regular</div>
                    <div>Member</div>
                    <select id = "price-select">
                      <option value = "STA">STANDARD</option>
                      <option value = "AHR">AFTER HOURS</option>
                    </select>
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
                <div class="ignore"></div>
                <div id="${this.dom.invest.conmonth}">0</div>
            </div>
            <div class="${this.dom.system.repair.cont}">
                <div>Due Today</div>
                <div id="${this.dom.invest.regprice}"></div>
                <div id="${this.dom.invest.memprice}"></div>
            </div>
            <div class="button-row">
                <label></label>
                <div id="${this.dom.buttons.appreg}">Approve</div>
                <div id="${this.dom.buttons.appmem}">Approve</div>
            </div>
            <div class="${this.dom.sig}">
                <canvas class="signature-pad"></canvas>
                <div class="signature-buttons">
                  <div class="flat-action-button sig-clear">Clear</div>
                  <div class="flat-action-button sig-save">Save</div>
                </div>
            </div>
        </div>

    </div>
  `

  SETpresent = (wodata) => {
    console.log('To Present > ',wodata);
    //Update WO info
    for(let i in this.dom.info){
      this.cont.getElementsByClassName(this.dom.info[i])[0].innerText = wodata.wo[i];
    }

    //Update price level
    this.conform.pricelevel = this.conform.GETmemhead(wodata.wo.pricelevel);
    //Check if document is loaded for first run of presentation generation
    if (document.readyState == 'complete') {
      this.conform.UPDATEselect(true);
    } else {
      this.conform.UPDATEselect(false);
    }
    //Update repair items
    if (wodata.sitems != null) {
      document.body.appendChild(this.cont);  // Creates presentation
      //document.getElementsByClassName(this.dom.head)[0].appendChild(document.createElement('div')).innerHTML = cfcontent; // Appends Contract Form within presentation

      let slist = document.getElementById(this.dom.systems);

      let rprice=0; //item reg price
      let mprice=0; //item member price

      let trprice=0; //total reg price
      let tmprice=0; //total member price
      let savings=0; //total savings

      slist.innerHTML = '';

      for (let x = 0; x < wodata.sitems.length; x++) {  // Sets each system
        if(wodata.repairs[x]!=undefined && wodata.repairs[x].length!==0){//only display if repairs
          let s = slist.appendChild(document.createElement('div'));
          s.classList.add(this.dom.system.cont);
          s.appendChild(document.createElement('div')).innerText = wodata.sitems[x].tagid;
          let rlist = s.appendChild(document.createElement('div'));
          rlist.classList.add(this.dom.system.repairs);

          for (let y = 0; y < wodata.repairs[x].length; y++) {  // Sets each repair for given system
            rprice = wodata.repairs[x][y].task!='OTH'?this.pricebook.GETbookprice(wodata.repairs[x][y].task):Number(wodata.repairs[x][y].price);
            mprice = 0;

            let r = rlist.appendChild(document.createElement('div'));

            r.classList.add(this.dom.system.repair.cont);
            r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].descr;

            r.appendChild(document.createElement('div')).innerText =  rprice;
            trprice += (wodata.repairs[x][y].appr ? rprice : 0);

            if(wodata.repairs[x][y].task!='OTH'){
              if(wodata.repairs[x][y].task=='DIAG'){ //special case for diagnostic fee
                if(wodata.contract && Object.keys(wodata.contract).length!==0){
                  mprice = this.pricebook.GETbookprice(wodata.repairs[x][y].task,this.contract);
                }else{mprice = this.pricebook.GETbookprice(wodata.repairs[x][y].task);}
              }else{mprice = this.pricebook.GETbookprice(wodata.repairs[x][y].task,this.contract);}
            }else{mprice = Number(wodata.repairs[x][y].price);}

            r.appendChild(document.createElement('div')).innerText = mprice;
            tmprice += (wodata.repairs[x][y].appr ? mprice : 0);
            r.appendChild(document.createElement('div')).innerText = rprice - mprice;
            savings += (wodata.repairs[x][y].appr ? rprice - mprice :0);

            if(!wodata.repairs[x][y].appr){
              r.classList.add(this.dom.system.repair.unapproved);
            }
            r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].appr ? 'YES':'NO';
          }
        }
      }
      //document.getElementById(this.dom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(this.dom.contract.form.name).value) || this.wo.cntrct;
      document.getElementById(this.dom.invest.regprice).innerText = trprice;
      document.getElementById(this.dom.invest.memprice).innerText = tmprice;
      document.getElementById(this.dom.invest.savings).innerText = savings;
      //document.getElementById(this.dom.invest.conmonth).innerText = this.rewardform.GETformprice();
    }
  }

  SHOWsignature=(IsMember)=>{
    let box = document.getElementsByClassName(this.dom.sig)[0];
    if(box.style.left == "0px"){
      box.style.left = "-5000px";
      document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--BCE-green)";
      document.getElementById(this.dom.buttons.appreg).innerText = "Approve"
      document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--BCE-green)";
      document.getElementById(this.dom.buttons.appmem).innerText = "Approve"
    }
    else{
      box.style.left = "0px";
      if (IsMember) {
        document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--vogel-red)";
        document.getElementById(this.dom.buttons.appreg).innerText = "Decline"
      } else {
        document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--vogel-red)";
        document.getElementById(this.dom.buttons.appmem).innerText = "Decline"
      }
    }
  }

}
