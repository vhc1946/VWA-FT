import {wolstore} from './lstore.js';
import{dashdom,wodom} from '../back/ticket-dom.js';
import {ServiceWO} from '../back/sticket-build.js';

import {DropNote} from '../repo/js/vg-poppers.js';
import {SETUPtitlebar} from '../repo/js/vg-titlebar.js';
import * as vcontrol from '../repo/js/view-controller.js';

var publicfolder = '/Tech/bin/css'


//var curwo = new ServiceWO(JSON.parse(localStorage.getItem(wolstore.currentwo))); //set the current WO to null


// SETUP title bar ///////////////////////////////////////

var qactions = {};
var mactions = {};

SETUPtitlebar('/Tech/bin/repo/',qactions,mactions);
//////////////////////////////////////////////////////////
vcontrol.SETUPviewcontroller('/Tech/bin/repo/');
vcontrol.SETUPviews(document.getElementById('viewcontainer'),'mbe');




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
document.getElementById(wodom.info.num).addEventListener('change', (ele) => { //WO number input change
    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
        curwo.SAVEwo();
        LOADwolist();
    }
});

//PRINT Button
document.getElementById('wo-save').addEventListener('click', (ele) => {
    window.print();
});

document.getElementById(wodom.action.save).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  LOADwolist();
  console.log('WO saved...',curwo.wo);
  DropNote('tr','WO Saved!','green');
});
document.getElementById(wodom.action.close).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  curwo.LOADwo();
  DropNote('tr','WO Saved!','green');
  DropNote('tr','WO Closed..','yellow');
});
document.getElementById(wodom.action.delete).addEventListener('click',(ele)=>{
  DELETEwo(curwo.wo.num);
  curwo.LOADwo();
  DropNote('tr','WO Deleted..','red');
});


/* Navbar Testing */
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
