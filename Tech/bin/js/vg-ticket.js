import {wolstore} from './lstore.js';
import {ServiceWO} from '../back/sticket-build.js';
import {SYNCticket} from './vapi-FTrequest.js';

import {DropNote} from '../repo/modules/vg-poppers.js';
import * as titlebar from '../repo/modules/vg-titlebar.js';
import * as vcontrol from '../repo/layouts/view-controller.js';
import {VHCform} from '../repo/tools/vhc-forms.js';

var publicfolder = '/Tech/bin/css';


// LOAD Ticket /////////////////////////////////////////////////////////////////

var currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));

class WOform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=`
    <div id=${this.dom.cont} class="twelve-col-grid">
      <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
      <div class="client-label">WO Num:</div><input class=${this.dom.info.id} type="text" />
      <div class="client-label">Client:</div><input class=${this.dom.info.contactname} class="client-input" type="text" />
      <div class="client-label">Street:</div><input class=${this.dom.info.street} class="client-input" type="text" />
      <div class="client-label">City/Zip:</div><input class=${this.dom.info.cityzip} class="client-input" type="text" />
      <div class="client-label">Description:</div><textarea class=${this.dom.info.descr}></textarea>
      <div class="client-label">Phone:</div><input class=${this.dom.info.contactphone} class="client-input" type="text" />
      <div class="client-label">Cust Code:</div><input class=${this.dom.info.custcode} class="client-input" type="text" />
      <div class="client-label">Department:</div><input class=${this.dom.info.dept} class="client-input" type="text" />
      <div class="client-label">Price Book:</div><input class=${this.dom.info.pricebook} class="client-input" type="text" />
    `;
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
  submit(){}
}
class Contform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=`
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
      <div id=${this.dom.cont}>
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
      `;
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
  submit(){}
}
class SIform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=``;
  }
  dom={
    cont: 'si-cont',
    info: {
      area: 'si-area',
      beltsize: 'si-beltsize',
      controls: 'si-controls',
      desc: 'si-desc',
      elec: 'si-elec',
      filt1: 'si-filt1',
      filt1q: 'si-filt1q',
      filt2: 'si-filt2',
      filt2q: 'si-filt2q',
      id: 'si-id',
      location: 'si-location',
      manf: 'si-manf',
      model: 'si-model',
      refri: 'si-refri',
      serial: 'si-serial',
      status: 'si-status',
      tagnum: 'si-tagnum',
      type: 'si-type',
      warr1: 'si-warr1',
      warr2: 'si-warr2',
      warr3: 'si-warr3'
    }
  }
  submit(){}
}

console.log(currticket);

if(currticket){
  localStorage.setItem(wolstore.toloadwo,null);
  localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));
  DropNote('tr','WO found','green');
}else{DropNote('tr','WO not found','red');}

window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

////////////////////////////////////////////////////////////////////////////////

// SETUP title bar ///////////////////////////////////////
var qactions = {
  present:{
    id:'presentation-open',
    src:'../bin/repo/assets/icons/document-signed.png',
    title:'Presentation'
  }
};
var mactions = {
  save:{
    id:'wo-save-button',
    src:'../bin/repo/assets/icons/disk.png',
    title:'Save WO'
  },
  delete:{
    id:'wo-delete-button',
    src:'../bin/repo/assets/icons/trash.png',
    title:'Delete WO'
  },
  refresh:{
    id:'wo-refresh-button',
    src:'../bin/repo/assets/icons/refresh.png',
    title:'Refresh WO'
  }
};

titlebar.SETUPtitlebar('../bin/repo/',qactions,mactions,false); //login disabled

$(document.getElementById(titlebar.tbdom.page.settings)).hide();
//$(document.getElementById(titlebar.tbdom.page.user)).hide(); //hide the user section of title bar

//////////////////////////////////////////////////////////

// SETUP ticket view group /////////////////////////////////////////////////////

vcontrol.SETUPviewcontroller('../bin/repo/');
var ticketviews = new vcontrol.ViewGroup({
  cont:document.getElementById('ticket-build-container'),
  type:'mbe',
  qactions:{
    '.test.div':{
      attributes:{
      },
      value:'test button'
    }
  }
});


var woform = new WOform(document.createElement('div'));
var contform = new Contform(document.createElement('div'));
// Adding forms to build views

ticketviews.ADDview('Information',woform.cont);
ticketviews.ADDview('Contract',contform.cont);
ticketviews.ADDview('Service Items',document.createElement('div'));
ticketviews.ADDview('Checklists',document.createElement('div'));

$(document.getElementsByClassName('viewcontrol-menu-item')[0]).click();  //Sets first tab as selected

var LOADinfo=()=>{
  woform.form = currticket.wo;
  contform.form = currticket.contract;
}

LOADinfo();


document.getElementById('wo-refresh-button').addEventListener('click',(ele)=>{
  SYNCticket(currticket.wo.id).then(ticket=>{console.log(ticket);})
});
document.getElementById('presentation-open').addEventListener('click',(ele)=>{
  let box = document.getElementsByClassName('present-cont')[0];
  if(box.style.left == "0px"){box.style.left = "-5000px";}
  else{box.style.left = "0px";}
});


/*
////////////////////////////////////////////////////////////////////////////////
var DELETEwo = (wonum=null)=>{
  if(wonum){
    let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
    let nwolist = [];
    for(let x=0;x<wolist.length;x++){
      if(wolist[x].num!=wonum){
        nwolist.push(wolist[x]);
      }
    }
    localStorage.setItem(wolstore.techwo,JSON.stringify(nwolist));
    LOADwolist();
  }
}

//WO Number CHANGE
document.getElementById('wo-info-num').addEventListener('change', (ele) => { //WO number input change
    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
        curwo.SAVEwo();
        LOADwolist();
    }
});

// Buttons ///////////////////////////////////////////////////////////
document.getElementById('wo-save').addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  LOADwolist();
  console.log('WO saved...',curwo.wo);
  DropNote('tr','WO Saved!','green');
});
/*
document.getElementById(titlebar.tbdom.window.close).addEventListener('click',(ele)=>{
  //curwo.SAVEwo();
  //curwo.LOADwo();
  DropNote('tr','WO Saved!','green');
  window.close();
});
document.getElementById('wo-delete').addEventListener('click',(ele)=>{
  DELETEwo(curwo.wo.num);
  curwo.LOADwo();
  DropNote('tr','WO Deleted..','red');
});



*/
/* Navbar Testing
var prevScrollpos = window.pageYOffset; // Set initial screen position
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) { //  Checks if the user has scolled UP
    document.getElementById("titlebar-cont").style.top = "0";
    document.getElementsByClassName("viewcontrol-menu")[0].style.bottom = "-50px";
  } else {
    document.getElementById("titlebar-cont").style.top = "-50px";
    document.getElementsByClassName("viewcontrol-menu")[0].style.bottom = "0px";
  }
  prevScrollpos = currentScrollPos;
}
 */
