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

console.log(currticket);
class WOform extends VHCform{
  constructor(cont){
    super(cont);
    this.cont.innerHTML=`
    <div id=${this.dom.cont} class="twelve-col-grid">
      <img src="../bin/repo/assets/images/VogelLogo.png" id="header-logo" alt="VOGEL">
      <div class="client-label">WO Num:</div><input id=${this.dom.info.num} type="text" />
      <div class="client-label">Client:</div><input id=${this.dom.info.name} class="client-input" type="text" />
      <div class="client-label">Address:</div><input id=${this.dom.info.address} class="client-input" type="text" />
    </div>
    `;
  }
  dom={  // was wodom
    cont: 'wo-cont',
    action:{
      save:'wo-action-save',
      close:'wo-action-close',
      delete:'wo-action-delete'
    },
    info: {
        num: 'wo-info-num',
        name: 'wo-info-customer',
        address: 'wo-info-address'
    }
  }
  submit(){}
}
class Contform extends VHCform{
  constructor(){
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
            `;
  }
  dom={  // was cntrctform
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
  submit(){}
}


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
  type:'mbe'
});


var woform = new WOform(document.createElement('div'));

// Adding forms to build views

ticketviews.ADDview('Information',woform.cont);
//add service item section
//add checklist section

woform.cont.id = 'wo-form';
document.body.appendChild(woform.cont);
$(document.getElementById('viewcontainer')).hide();




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
document.getElementById('presentation-open').addEventListener('click',(ele)=>{
  let box = document.getElementsByClassName('present-cont')[0];
  if(box.style.left == "0px"){box.style.left = "-5000px";}
  else{box.style.left = "0px";}
});
document.getElementById('refresh-wo').addEventListener('click',(ele)=>{
  SYNCticket(currwo.wo.WONum).then(ticket=>{console.log(ticket);})
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
