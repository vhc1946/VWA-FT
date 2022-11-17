import {wolstore} from './lstore.js';
import {ServiceWO} from '../back/sticket-build.js';
import {SYNCticket} from './vapi-FTrequest.js';

import {DropNote} from '../repo/modules/vg-poppers.js';
import * as titlebar from '../repo/modules/vg-titlebar.js';
import * as vcontrol from '../repo/layouts/view-controller.js';

import {WOform} from './ticket/woforms.js';
import {Contform} from './ticket/contractforms.js';
import {SIform} from './ticket/serviceitem-module.js';
var publicfolder = '/Tech/bin/css';


// SETUP title bar ////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////

// LOAD Ticket /////////////////////////////////////////////////////////////////

var currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));

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

// SETUP ticket view group /////////////////////////////////////////////////////

vcontrol.SETUPviewcontroller('../bin/repo/');
var ticketviews = new vcontrol.ViewGroup({
  cont:document.getElementById('ticket-build-container'),
  type:'mbe'
});

var syschange=(cont,view,button)=>{
  document.getElementById('currsi').innerText = view.title;
  $(document.getElementById('currsi')).click();
}

var serviceitems = new vcontrol.ViewGroup({
  type:'mlt',
  swtchEve:syschange,
  qactions:{
    '#currsi.div':{
      attributes:{
        class: 'flat-action-button'
      },
      value:'Items'
    }
  }
});
serviceitems.cont.id='si-cont';

var woform = new WOform(document.createElement('div'));
var contform = new Contform(document.createElement('div'));

ticketviews.ADDview('Information',woform.cont);
ticketviews.ADDview('Contract',contform.cont);
ticketviews.ADDview('Service Items',serviceitems.cont);
ticketviews.ADDview('Checklists',document.createElement('div'));

$(document.getElementsByClassName('viewcontrol-menu-item')[0]).click();  //Sets first tab as selected

var LOADticket=()=>{
  if(currticket){
    woform.form = currticket.wo;
    contform.form = currticket.contract;
    for(let i=0;i<currticket.sitems.length;i++){
      let siteinfo = new SIform(document.createElement('div'));
      let sitemvc = new vcontrol.ViewGroup({
        type:'mtr',
        qactions:{['.div']:{value:currticket.sitems[i].descr}}
      });

      if(currticket.repairs[currticket.sitems[i].tagid]==undefined){currticket.repairs[currticket.sitems[i].tagid]=[]}


      // add/init service repairs
      sitemvc.ADDview('Repairs',document.createElement('div'))

      //add/init service info form
      sitemvc.ADDview('Info',siteinfo.cont);
      siteinfo.form = currticket.sitems[i];

      serviceitems.ADDview(currticket.sitems[i].tagid,sitemvc.cont);

      $(document.getElementsByClassName('viewcontrol-menu-item')[4]).click(); //selects first SI menu item
      $(document.getElementById('currsi')).click();
    }
  }
}

LOADticket();

console.log(currticket);

document.getElementById('currsi').addEventListener('click',(ele)=>{
  let box = serviceitems.cont.getElementsByClassName('viewcontrol-menubox')[0];
  if(box.style.left=='-250px'){box.style.left='0px';}
  else{box.style.left='-250px';}
});
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
