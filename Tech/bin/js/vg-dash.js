import {wolstore} from './lstore.js';
import {DropNote} from '../repo/js/vg-poppers.js';
import {dashdom} from '../back/ticket-dom.js';
import * as titlebar from '../repo/js/vg-titlebar.js';
import * as viewcontrol from '../repo/js/view-controller.js';
import { STARTticket } from './vapi-FTrequest.js';

// SETUP title bar for dash /////////////////////////////

var qactions = {
    new:{
        id:'new-wo',
        src:'./bin/repo/assets/icons/file.png',
        alt:'NEW',
        title:'New WO'
    }
};
var mactions = {};

titlebar.SETUPtitlebar('./bin/repo/',qactions,mactions);

//$(document.getElementById(titlebar.tbdom.window.close)).hide();
$(document.getElementById(titlebar.tbdom.page.settings)).hide();

try{document.getElementById(Titlebar.tbdom.info.username).innerText = JSON.parse(localStorage.getItem(usersls.curruser)).uname;
}catch{console.log("Could not pick up UserName")}
//////////////////////////////////////////////////////////

var appdock=document.createElement('div');
appdock.id="vhc-app-dock";


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

document.getElementById('new-wo').addEventListener('click', (ele)=>{
    DropNote('tr','Wo is being Retrieved','green');
    /* check for in local storage
       ^(if) then load the WO from local storage and run SYNCticket to refresh it
       current data
    */

    STARTticket('00025796').then(
      ticket=>{
        console.log('TICKET >',ticket);
        if(ticket){
          DropNote('tr','Wo is Loading...','green');
          localStorage.setItem(wolstore.toloadwo,JSON.stringify(ticket));
          window.open('controllers/ticket.html');
        }else{DropNote('tr','Wo Not Found','red');}
      }
    );
});
/*
document.getElementById(titlebar.tbdom.page.print).addEventListener('click', (ele)=>{
    window.print();
});

document.getElementById(titlebar.tbdom.page.user).addEventListener('click', (ele)=>{
    window.location.href='../index.html';
});
*/
LOADwolist();
