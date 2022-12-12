import {wolstore} from './store/lstore.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import {DropNote} from './repo/modules/vg-dropnote.js';

import {SYNCticket, STARTticket} from './tools/vapi-FTrequest.js';
import {ServiceTicket} from './ticket/service-ticket.js';

var publicfolder = '/Tech/bin/css'; //not sure we need
// Load Data //
//fbstore.list = is the ObjList, and can be used as normal fbstore.list.TRIMlist()
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
// /var ticket = CREATEticket();
var ticket = new ServiceTicket(currticket,fbstore.list);
// Setup Page //
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
      console.log('SAVE TICKET',ticket.ticket);
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
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  DropNote('tr','Going home','yellow');
});
//$(document.getElementById(titlebar.tbdom.page.user)).hide(); //hide the user section of title bar
$(document.getElementById(titlebar.tbdom.page.settings)).hide();
////////////////

document.getElementsByClassName('min-page-hide-button')[0].addEventListener('click', (ele)=>{   // Home Button
  $(document.getElementsByClassName('min-page-cont')[0]).toggle();
});

const canvas = document.getElementsByClassName('signature-pad')[0];
const ctx = canvas.getContext('2d');

function resize(){
  ctx.canvas.width = canvas.width;
  ctx.canvas.height = canvas.height;
}

let coord = {x:0 , y:0};
let paint = false;

function getPosition(event){
  coord.x = event.offsetX;
  coord.y = event.offsetY;
}

function startPainting(event){
  paint = true;
  getPosition(event);
}

function stopPainting(){
  paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

resize(); // Resizes the canvas once the window loads
document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', sketch);
window.addEventListener('resize', resize);
