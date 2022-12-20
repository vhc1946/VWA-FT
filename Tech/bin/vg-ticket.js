import {wolstore} from './store/lstore.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import {DropNote} from './repo/modules/vg-dropnote.js';

import {SYNCticket, STARTticket} from './tools/vapi-FTrequest.js';
import {ServiceTicket} from './ticket/service-ticket.js';
import {ServicePresentation} from './ticket/service-presentation.js';
import { DrawingPad } from './tools/drawing-pad.js';

var publicfolder = '/Tech/bin/css'; //not sure we need
// Load Data //

var fbstore = window.opener.datamart.fbstore;//fbstore holds connections to indexdb and an instance of ObjList

console.log('FLATRATE BOOK >',fbstore.list.list);

// LOAD Ticket //
var currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));
if(currticket){
  localStorage.setItem(wolstore.toloadwo,null);//clear temp storage
  localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));//save as last open
  DropNote('tr','WO found','green');
}else{DropNote('tr','WO not found','red');}
window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

// Setup ticket view groups ////////////////////////////////////////////////////
var ticket = new ServiceTicket(currticket,fbstore.list);
var presentation = new ServicePresentation(document.createElement('div'),currticket,fbstore.list.TRIMlist({book:'RES'}));

// final summary
// Setup Page //


// Titlebar Setup ///////////////////////////////////////////////////////////
var qactions = {
  present:{
    id:'presentation-open',
    src:'../bin/repo/assets/icons/document-signed.png',
    title:'Presentation',
    onclick:(ele)=>{  // Presentation show/hide
      let box = document.getElementsByClassName('present-full-cont')[0];
      if(box.style.left == "0px"){
        box.style.left = "-5000px";
      }
      else{
        presentation.SETpresent(ticket.ticket);  //pass to ticket
        box.style.left = "0px";}
    }
  }
};
var mactions = {
  save:{
    id:'wo-save-button',
    src:'../bin/repo/assets/icons/disk.png',
    title:'Save WO',
    ondblclick:(ele)=>{
      currticket = ticket.ticket;
      console.log(currticket)
      //window.opener.techwos.UPDATEstore(currticket).then(answr=>{
      //  console.log(answr)
      //  if(answr){DropNote('tr','Ticket WAS Saved','green');}
      //  else{DropNote('tr','Ticket was NOTSaved','yellow');}
      //});
    }
  },
  refresh:{
    id:'wo-refresh-button',
    src:'../bin/repo/assets/icons/refresh.png',
    title:'Refresh WO',
    onclick:(ele)=>{   // Refresh info
      SYNCticket(currticket.wo.id).then(
        sync=>{
          console.log(sync);
          if(sync.wo){
            currticket.wo=sync.wo;
            ticket.ticket={wo:currticket.wo};
            DropNote('tr','Ticket is updated','green');
          }else{DropNote('tr','Ticket was NOT updated','yellow');}
        }
      );
    }
  }
};

titlebar.SETUPtitlebar('../bin/repo/',qactions,mactions,false); //login disabled

document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  DropNote('tr','Going home','yellow');
});
$(document.getElementById(titlebar.tbdom.page.settings)).hide();   //hide the settings section of title bar
////////////////////////////////////////////////////

/*Event listener which resets and closes repair table pop-up.*/
document.getElementsByClassName('min-page-hide-button')[0].addEventListener('click', (ele)=>{
  document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
  document.getElementsByClassName('frbook-list')[0].style.display = "";
  $(document.getElementsByClassName('min-page-cont')[0]).toggle();
  document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
  $(document.getElementById('loginout-block')).hide();
});

/*Event listener to minimize repair list pop-up.*/
document.getElementsByClassName('min-page-minimize-button')[0].addEventListener('click', (ele)=>{
  let style = window.getComputedStyle(document.getElementById('loginout-block'));

  //SHOW
  if (style.display == 'none') {
    $(document.getElementById('loginout-block')).show();
    document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
    document.getElementsByClassName('frbook-list')[0].style.display = "";
    document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
  } else {
  //HIDE
    $(document.getElementById('loginout-block')).hide();
    document.getElementsByClassName('min-page-cont')[0].id = "min-page-hide"
    document.getElementsByClassName('frbook-list')[0].style.display = "none";
    document.getElementsByClassName('min-page-minimize-button')[0].innerText = "+";
  }
});


// Signature Pad ///////////////////////////////////
const sigpad = new DrawingPad(document.getElementsByClassName('signature-pad')[0]);

document.getElementsByClassName('sig-clear')[0].addEventListener('click', (ele)=>{
  sigpad.ctx.clearRect(0,0,sigpad.ctx.canvas.width,sigpad.ctx.canvas.height);
});
///////////////////////////////////////////////////
