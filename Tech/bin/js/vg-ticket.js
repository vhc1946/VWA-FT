import {wolstore} from './lstore.js';
import {ServiceWO} from '../back/sticket-build.js';
import {SYNCticket, STARTticket} from './vapi-FTrequest.js';

import {DropNote} from '../repo/modules/vg-poppers.js';
import * as titlebar from '../repo/modules/vg-titlebar.js';
import * as vcontrol from '../repo/layouts/view-controller.js';

import {WOform} from './ticket/woforms.js';
import {Contform} from './ticket/contractforms.js';
import * as sitemmod from './ticket/serviceitem-module.js';
import {SETUPchecklist} from './ticket/checklists.js';

var publicfolder = '/Tech/bin/css';

window.opener.ticketdata('ticket has opened');
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
if(currticket){
  localStorage.setItem(wolstore.toloadwo,null);
  localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));
  DropNote('tr','WO found','green');
}else{DropNote('tr','WO not found','red');}

window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

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

  let woform = new WOform(document.createElement('div'));
  let contform = new Contform(document.createElement('div'));

  infoview.ADDview('WO',woform.cont);
  infoview.ADDview('Contract',contform.cont);
  $(infoview.buttons.children[0]).click();

  ticketview.ADDview('Information',infoview.cont);
  ticketview.ADDview('Service Items',sitemview.cont);
  ticketview.ADDview('Check Lists',checkview.cont);

  let {checkforms,checkcont}=SETUPchecklist(document.createElement('div'));
  checkview.ADDview('System 1',checkcont);
  $(ticketview.buttons.children[0]).click();  //Sets first tab as selected

  /*

  */
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

  }
}
var GETticket=()=>{

}

LOADticket(ticket);
console.log(ticket.forms);

document.getElementById('currsi').addEventListener('click',(ele)=>{   // Service Items menu toggle
  let box = ticket.views.sitems.menu.children[0];
  if(box.style.left=='-250px'){box.style.left='0px';}
  else{box.style.left='-250px';}
});
document.getElementById('wo-refresh-button').addEventListener('click',(ele)=>{   // Refresh info
  SYNCticket(currticket.wo.id).then(
    sync=>{
      if(sync.wo){currticket.wo=sync.wo;ticket.form.wo=currticket.wo;}
    });
});
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  DropNote('tr','Going home','yellow');
});
document.getElementById('presentation-open').addEventListener('click',(ele)=>{  // Presentation show/hide
  let box = document.getElementsByClassName('present-cont')[0];
  if(box.style.left == "0px"){box.style.left = "-5000px";}
  else{box.style.left = "0px";}
});
document.getElementById('si-delete').addEventListener('click',(ele)=>{  // Presentation show/hide
  DropNote('tr','Delete Service Item','yellow');
});
document.getElementById('si-add').addEventListener('click',(ele)=>{  // Presentation show/hide
  DropNote('tr','Add New Service Item','yellow');
});
