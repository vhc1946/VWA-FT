import {wolstore} from './lstore.js';
import {DropNote} from '../repo/modules/vg-poppers.js';
import {dashdom} from '../back/ticket-dom.js';
import * as titlebar from '../repo/modules/vg-titlebar.js';
import * as viewcontrol from '../repo/layouts/view-controller.js';
import { STARTticket } from './vapi-FTrequest.js';
import { SELECTview } from '../repo/modules/vg-floatviews.js';

// SETUP title bar for dash /////////////////////////////

var qactions = {
    new:{
        id:'search-wo',
        src:'./bin/repo/assets/icons/file.png',
        alt:'SEARCH',
        title:'Search WO'
    }
};
var mactions = {};

var login =titlebar.SETUPtitlebar('./bin/repo/',qactions,mactions);//returns login Form
console.log(login.storecreds,'Has Permission: ',login.permission);

// Work Order List Setup ////////////////////////////////////////////////////////
/* This section needs to be thought through for how to better store a list
   locally and keep it updated with the master list held on server.

   IndexDB
   localStorage
   Hold on server and retrieve tickets marked mobile *not the move now*
*/
var wolist = JSON.parse(localStorage.getItem(wolstore.localwos));
var LOADwolist = ()=>{   //Loads WO list into display table
    let dlist = document.getElementById(dashdom.list.cont);
    dlist.innerHTML = '';

    if(wolist){
        for(let x=0;x<wolist.length;x++){
            let item = document.createElement('div');
            item.classList.add(dashdom.list.item.cont);

            item.appendChild(document.createElement('div')).innerText = wolist[x].num;
            item.lastChild.classList.add(dashdom.list.item.num);

            item.appendChild(document.createElement('div')).innerText = wolist[x].name;
            item.lastChild.classList.add(dashdom.list.item.name);

            item.appendChild(document.createElement('div')).innerText = wolist[x].address;
            item.lastChild.classList.add(dashdom.list.item.address);

            dlist.appendChild(item);
        }
        dlist.addEventListener('click', (ele)=>{
            var row = viewcontrol.FINDparentele(ele.target,dashdom.list.item.cont);
            if(row){
                window.open('controllers/ticket.html');
                DropNote('tr',`WO # ${row.children[0].innerText} Loaded..`,'green');
            }

        });
    }
}


// App Dock Setup ///////////////////////////////////////////////////////////////
var appdock = document.createElement('div');
appdock.id="vhc-app-dock";
var apps = ['SPIFFs','Work Orders','Performance','Resources'];

for(let app in apps){
    let appbox = document.createElement('div');
    appbox.classList.add('vhc-app');
    appbox.id = 'app-' + apps[app];
    appbox.appendChild(document.createElement('img'));
    appbox.lastChild.src = './bin/repo/assets/icons/' + `${apps[app]}` + '.png';
    appbox.appendChild(document.createElement('div'));
    appbox.lastChild.innerText = apps[app];
    appdock.appendChild(appbox);
}

document.body.appendChild(appdock);

//Function to create Dock
//Function to add buttons

//Function to program buttons
/*
  var dockapps={
    ['SPIFFs']:launchSpiffs,
    ['Work Orders']:launchWOs,
    ['Performance']:launchPerf,
    ['Resources']:launchReso,
  }

  var launchSpiffs=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
  }
  var launchWOs=(ele)=>{
    $(document.getElementById(appdock.id)).hide();
    $(document.getElementById('vg-wo-dash')).show();
  }
  var launchPerf=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
  }
  var launchReso=(ele)=>{
    DropNote('tr','Module not ready.','yellow');
  }
*/

////////////////////////////////////////////////////////////////////////////////


// Tech Dash Navigation ////////////////////////////////////////////////////////
document.getElementById('app-SPIFFs').addEventListener('click',(ele)=>{
    DropNote('tr','Module not ready.','yellow');
});
document.getElementById('app-Work Orders').addEventListener('click',(ele)=>{
    $(document.getElementById(appdock.id)).hide();
    $(document.getElementById('vg-wo-dash')).show();
    $(document.getElementById(titlebar.tbdom.utils.buttons.home)).show();
});
document.getElementById('app-Performance').addEventListener('click',(ele)=>{
    DropNote('tr','Module not ready.','yellow');
});
document.getElementById('app-Resources').addEventListener('click',(ele)=>{
    DropNote('tr','Module not ready.','yellow');
});

document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{
    $(document.getElementById(appdock.id)).show();
    $(document.getElementById('vg-wo-dash')).hide();
    $(document.getElementById(titlebar.tbdom.utils.buttons.home)).hide();
});

////////////////////////////////////////////////////////////////////////////////

window.ticketdata=(data)=>{
  console.log(data);
}

// WO Dash /////////////////////////////////////////////////////////////////////
document.getElementById('search-wo').addEventListener('click', (ele)=>{
    SELECTview(document.getElementById('wo-center'),'Open WO');
});
document.getElementById('openwo-number').addEventListener('keypress',(eve)=>{
    if(eve.key == 'Enter'){document.getElementById('submit-search').click();};
});
document.getElementById('submit-search').addEventListener('click', (ele)=>{
    let wonum = document.getElementById('openwo-number').value;
    while(wonum.length < 8){
        wonum = '0' + wonum;
    }
    DropNote('tr','Wo is being Retrieved','green');
    /* check for in local storage
       ^(if) then load the WO from local storage and run SYNCticket to refresh it
       current data
    */
    STARTticket(wonum).then(  //'00025796'
        ticket=>{
        console.log('TICKET >',ticket);
        if(ticket){
            DropNote('tr','Wo is Loading...','green');
            localStorage.setItem(wolstore.toloadwo,JSON.stringify(ticket));
            window.open('controllers/ticket.html');
        }else{DropNote('tr','Wo Not Found','red');}
        }
    );
    $(document.getElementById('vg-float-frame-close')).click();
});

////////////////////////////////////////////////////////////////////////////////

/*
document.getElementById(titlebar.tbdom.page.print).addEventListener('click', (ele)=>{
    window.print();
});

document.getElementById(titlebar.tbdom.page.user).addEventListener('click', (ele)=>{
    window.location.href='../index.html';
});
*/
LOADwolist();
