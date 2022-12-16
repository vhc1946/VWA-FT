import {wolstore} from './store/lstore.js';
import {DropNote} from './repo/modules/vg-dropnote.js';
import * as titlebar from './repo/modules/vg-titlebar.js';
import * as viewcontrol from './repo/layouts/view-controller.js';
import { SELECTview } from './repo/modules/vg-floatviews.js';
import { AppDock } from './repo/modules/appdock.js';
import {FormList} from './repo/tools/vhc-formlist.js';

import {STARTticket} from './tools/vapi-FTrequest.js';
import * as manlist from './store/tech-managelist.js';
import {SENDrequestapi,SENDrequestadmin} from './repo/apis/vapi/vapicore.js';

import * as techwos from './tables/techwo-table.js';


/*  Tech Dash

  TODO:
  - manage list
  - better oraganize dash into modules that reflect the app dock
  - rotate quick actions depending on module
  - provide editable tech information
  - sleep function that shows date and time on gray screen. Save ticket and clear
    memory. Restart on mouse move.
  - move "home"
*/


var dashdom = {
  cont:'vg-wo-dash',
  buttons:{
    editToggle:'tech-wo-selector'
  },
  list:{
    cont:'vg-wo-list',
    item:{
      cont:'vg-wo-item',
      num:'vg-wo-item-num',
      name:'vg-wo-item-name',
      address:'vg-wo-item-address'
    }
  }
}

var datamart=null;
manlist.INITmanagelist().then(
  mlist=>{
    datamart=mlist;
    window.datamart=datamart; //can be used in child windows
    console.log('Done With list',datamart)
    //post needed updates to manage list
  }
)


var qactions = {
  new:{
    id:'search-wo',
    src:'./bin/repo/assets/icons/file.png',
    alt:'SEARCH',
    title:'Search WO',
    onclick:(ele)=>{SELECTview(document.getElementById('wo-center'),'Open WO');}
  }
};
window.techwos=techwos.twolist;

var qactions = {};

var mactions = {
  datalist:{
    id:'refresh-datalist',
    src:'./bin/repo/assets/icons/datastores.png',
    ondblclick:(ele)=>{manlist.REFRESHmanagelist()}
  }
};
var login = titlebar.SETUPtitlebar(
  './bin/repo/',
  qactions,
  mactions,
  true,
  (creds)=>{ //on login
    techwos.twolist.REFRESHstore(creds.user).then(res=>{if(res){twdashlist.LOADlist(techwos.twolist.list);}})
  },
  ()=>{// on logout
    DropNote('tr','Logging Out','green');window.location.replace('../index.html')
  }
);//returns login Form
document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{
    $(document.getElementById('vhc-app-dock')).show();
    $(document.getElementById('vg-wo-dash')).hide();
});
if(login.storecreds.user!=''){
  //console.log('LOGIN');
  //console.log(login.storecreds);
  techwos.twolist.REFRESHstore(login.storecreds.user).then(res=>{
  twdashlist.form = techwos.twolist.list;
  })
}

// Pre-load / Setup dash modules
// Work Order List Setup ////////////////////////////////////////////////////////
var twdashlist = new FormList({
  cont:document.getElementById('vg-wo-dash'),
  srow:techwos.SETUProw
});

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

// App Dock Setup ///////////////////////////////////////////////////////////////
var dockapps={
    ['SPIFFs']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
    ['Work Orders']:(ele)=>{
        $(document.getElementById('vhc-app-dock')).hide();
        $(document.getElementById('vg-wo-dash')).show();
    },
    ['Performance']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
    ['Resources']:(ele)=>{
        DropNote('tr','Module not ready.','yellow');
    },
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
