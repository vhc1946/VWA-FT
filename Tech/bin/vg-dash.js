import {wolstore} from './store/lstore.js';
import {DropNote} from './repo/modules/vg-dropnote.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import * as viewcontrol from './repo/layouts/view-controller.js';
import { SELECTview } from './repo/modules/vg-floatviews.js';
import { AppDock } from './repo/modules/appdock.js';

import {dashdom} from './back/ticket-dom.js';
import { STARTticket,SYNCdatalist } from './tools/vapi-FTrequest.js';
import * as manlist from './store/tech-managelist.js';
import {SENDrequestapi} from './repo/apis/vapi/vapicore.js';

import * as techwos from './tables/techwo-table.js';

// SETUP title bar for dash /////////////////////////////
var datamart=null;
manlist.INITmanagelist().then(
  mlist=>{
    datamart=mlist;
    window.datamart=datamart;
    console.log('Done With list')
    //post needed updates to manage list
  }
)

window.techwos=techwos.twolist;

var qactions = {
  new:{
    id:'search-wo',
    src:'./bin/repo/assets/icons/file.png',
    alt:'SEARCH',
    title:'Search WO',
    onclick:(ele)=>{SELECTview(document.getElementById('wo-center'),'Open WO');}
  }
};
var mactions = {
  datalist:{
    id:'refresh-datalist',
    src:'./bin/repo/assets/icons/datastores.png',
    ondblclick:(ele)=>{manlist.REFREsHmanagelist()}
  }
};

var login = titlebar.SETUPtitlebar(
  './bin/repo/',
  qactions,
  mactions,
  true,
  (creds)=>{
    techwos.twolist.REFRESHstore(creds.user).then(res=>{if(res){twdashlist.LOADlist(techwos.twolist.list);}console.log('RESPONSE ',res);})},
  ()=>{console.log('logout');DropNote('tr','Logging Out','green');window.location.replace('../index.html')}
);//returns login Form
if(login.storecreds.user!=''){
  console.log('LOGIN')
  console.log(login.storecreds)
  techwos.twolist.REFRESHstore(login.storecreds.user).then(res=>{
  twdashlist.LOADlist(techwos.twolist.list);
  })
}

var twdashlist = new techwos.CustomList({
  cont:document.getElementById(dashdom.list.cont)
});

// Work Order List Setup ////////////////////////////////////////////////////////

// App Dock Setup ///////////////////////////////////////////////////////////////
var launchSpiffs=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
}
var launchWOs=(ele)=>{
    $(document.getElementById('vhc-app-dock')).hide();
    $(document.getElementById('vg-wo-dash')).show();
}
var launchPerf=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
}
var launchReso=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
}
var dockapps={
    ['SPIFFs']:launchSpiffs,
    ['Work Orders']:launchWOs,
    ['Performance']:launchPerf,
    ['Resources']:launchReso,
}

var appdock = new AppDock(document.createElement('div'),dockapps);
document.body.appendChild(appdock.cont);
////////////////////////////////////////////////////////////////////////////////

// Tech Dash Navigation ////////////////////////////////////////////////////////
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{
    $(document.getElementById('vhc-app-dock')).show();
    $(document.getElementById('vg-wo-dash')).hide();
});

////////////////////////////////////////////////////////////////////////////////

// WO Dash /////////////////////////////////////////////////////////////////////
document.getElementById('openwo-number').addEventListener('keypress',(eve)=>{
    if(eve.key == 'Enter'){document.getElementById('submit-search').click();};
});
document.getElementById('submit-search').addEventListener('click', (ele)=>{
    let wonum = document.getElementById('openwo-number').value;
    while(wonum.length < 8){
        wonum = '0' + wonum;
    }
    let woitem = techwos.twolist.GETitem(wonum);
    if(woitem){
      localStorage.setItem(wolstore.toloadwo,JSON.stringify(woitem));
      window.open('controllers/ticket.html');
    }else{
      STARTticket(wonum).then(  //'00025796'
          ticket=>{
          console.log('TICKET >',ticket);
          if(ticket){
              ticket.id = wonum;//add an id
              ticket.mobile=true; //add mobile
              ticket.tech=login.storecreds.user; //add tech
              DropNote('tr','Wo is Loading...','green');
              localStorage.setItem(wolstore.toloadwo,JSON.stringify(ticket));
              techwos.twolist.UPDATEstore(ticket).then(
                result=>{
                  twdashlist.LOADlist(techwos.twolist.list);
                }
              );
              window.open('controllers/ticket.html');
          }else{DropNote('tr','Wo Not Found','red');}
          }
      );
    }
    $(document.getElementById('vg-float-frame-close')).click();
});
