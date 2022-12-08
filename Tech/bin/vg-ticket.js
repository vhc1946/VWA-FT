import {wolstore} from './store/lstore.js';
import {ServiceWO} from './back/sticket-build.js';
import {SYNCticket, STARTticket} from './tools/vapi-FTrequest.js';

import {DropNote} from './repo/modules/vg-dropnote.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import * as vcontrol from './repo/layouts/view-controller.js';

import {WOform} from './forms/wo-form.js';
import {Contform} from './forms/contract-form.js';
import {SIform} from './forms/serviceitem-form.js';

import * as sitemmod from './ticket/serviceitem-module.js';
import {SETUPchecklist} from './ticket/checklists.js';

var publicfolder = '/Tech/bin/css';

//fbstore holds connections to indexdb and an instance of ObjList
//fbstore.list = is the ObjList, and can be used as normal fbstore.list.TRIMlist()
var fbstore = window.opener.datamart.fbstore;
console.log('FLATRATE BOOK >',fbstore.list.list);

// LOAD Ticket /////////////////////////////////////////////////////////////////
var currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));
if(currticket){
  localStorage.setItem(wolstore.toloadwo,null);
  localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));
  DropNote('tr','WO found','green');
}else{DropNote('tr','WO not found','red');}
console.log(currticket);
window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

////////////////////////////////////////////////////////////////////////////////
// SETUP title bar ////////////////////////////////////////
var qactions = {
  present:{
    id:'presentation-open',
    src:'../bin/repo/assets/icons/document-signed.png',
    title:'Presentation',
    onclick:(ele)=>{  // Presentation show/hide
      let box = document.getElementsByClassName('present-cont')[0];
      if(box.style.left == "0px"){box.style.left = "-5000px";}
      else{box.style.left = "0px";}
    }
  }
};
var mactions = {
  save:{
    id:'wo-save-button',
    src:'../bin/repo/assets/icons/disk.png',
    title:'Save WO',
    ondblclick:(ele)=>{
      GETticket();
      //window.opener.techwos.UPDATEstore(currticket).then(answr=>{
      //  console.log(answr)
      //  if(answr){DropNote('tr','Ticket WAS Saved','green');}
      //  else{DropNote('tr','Ticket was NOTSaved','yellow');}
      //});
    }
  },
  delete:{
    id:'wo-delete-button',
    src:'../bin/repo/assets/icons/trash.png',
    title:'Delete WO'
  },
  refresh:{
    id:'wo-refresh-button',
    src:'../bin/repo/assets/icons/refresh.png',
    title:'Refresh WO',
    onclick:(ele)=>{   // Refresh info
      SYNCticket(currticket.wo.id).then(
        sync=>{
          if(sync.wo){currticket.wo=sync.wo;ticket.form.wo=currticket.wo;}
        }
      );
    }
  }
};

titlebar.SETUPtitlebar('../bin/repo/',qactions,mactions,false); //login disabled

$(document.getElementById(titlebar.tbdom.page.settings)).hide();
//$(document.getElementById(titlebar.tbdom.page.user)).hide(); //hide the user section of title bar

////////////////////////////////////////////////////////////////////////////////


// Setup ticket view groups ////////////////////////////////////////////////////

vcontrol.SETUPviewcontroller('../bin/repo/');

var CREATEticket=()=>{
  let ticketview = new vcontrol.ViewGroup({
    cont:document.getElementById('ticket-build-container'),
    type:'mbe'
  });
  let infoview = new vcontrol.ViewGroup({
    type:'mtl'
  });
  let sitemview = new vcontrol.ViewGroup({
    type:'mlt',
    swtchEve:(cont,view,button)=>{
      document.getElementById('currsi').innerText = view.title;
      $(document.getElementById('currsi')).click();
    },
    qactions:{
      '#currsi.div':{
        attributes:{
          class: 'flat-action-button'
        },
        value:'Items'
      }
    }
  });
  let checkview = new vcontrol.ViewGroup({
    type:'mtr'
  })
  sitemview.cont.id='si-cont';
  checkview.cont.id='check-cont';

  // Create Forms
  let woform = new WOform(document.createElement('div'));
  let contform = new Contform(document.createElement('div'));
  /////////////////////////////
  infoview.ADDview('WO',woform.cont);
  infoview.ADDview('Contract',contform.cont);
  $(infoview.buttons.children[0]).click();

  ticketview.ADDview('Information',infoview.cont);
  ticketview.ADDview('Service Items',sitemview.cont);
  ticketview.ADDview('Check Lists',checkview.cont);

  let {checkforms,checkcont}=SETUPchecklist(document.createElement('div'));
  checkview.ADDview('System 1',checkcont);
  $(ticketview.buttons.children[0]).click();  //Sets first tab as selected

  return {
    views:{
      ticket:ticketview,
      info:infoview,
      sitems:sitemview,
      checks:checkview
    },
    forms:{
      wo:woform,
      contract:contform,
      sitems:[],
      checks:[checkforms],
      repairs:[]
    }
  }
}
var ticket = CREATEticket();
ticket.data = currticket; //link ticket data

$(document.getElementsByClassName('viewcontrol-menu-item')[0]).click();  //Sets first tab as selected

////////////////////////////////////////////////////////////////////////////////

var LOADticket=(ticket)=>{
  let {forms,views,data}=ticket;

  if(ticket.data){
    forms.wo.form = data.wo;
    forms.contract.form = data.contract;

    views.sitems.CLEARview();

    let{sitems,repairs}=sitemmod.SETUPserviceitems(views.sitems,data.sitems,data.repairs);
    forms.sitems=sitems;
    forms.repairs=repairs;
    console.log(ticket);
  }
}
var GETticket=()=>{
  for(let f in ticket.forms){
    try{
      if(ticket.forms[f].form){
        console.log(f,ticket.forms[f].form)
        currticket[f]=ticket.forms[f].form; //load ticket part from form
      }
      else{
        for(let x=0;x<ticket.forms[f].length;x++){
          for(let ff in ticket.forms[f][x]){
            currticket[f][x]=ticket.forms[f][x].form;
          }
        }
      }
    }
    catch{}
  }
  console.log('QUOTE',currticket);
}

LOADticket(ticket);

document.getElementById('currsi').addEventListener('click',(ele)=>{   // Service Items menu toggle
  let box = ticket.views.sitems.menu.children[0];
  if(box.style.left=='-250px'){box.style.left='0px';}
  else{box.style.left='-250px';}
});
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  DropNote('tr','Going home','yellow');
});
document.getElementById('si-delete').addEventListener('click',(ele)=>{  // Presentation show/hide
  DropNote('tr','Delete Service Item','yellow');
});
document.getElementById('si-add').addEventListener('click',(ele)=>{  // Presentation show/hide
  DropNote('tr','Add New Service Item','yellow');
});
