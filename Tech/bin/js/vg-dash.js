

import {wolstore} from './lstore.js';
import {dashdom,wodom} from '../back/ticket-dom.js';
import {ServiceWO} from '../back/sticket-build.js';

import {DropNote} from '../repo/js/vg-poppers.js';
import {FINDparentele} from '../repo/js/vg-displaytools.js';

import {SETUPtitlebar} from '../repo/js/vg-titlebar.js';


// SETUP title bar for dash /////////////////////////////

var qactions = {};
var mactions = {

};

SETUPtitlebar('/Tech/bin/repo/',qactions,mactions);
//////////////////////////////////////////////////////////


var LOADwolist = ()=>{   //Loads WO list into display table
    let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
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
            var row = FINDparentele(ele.target,dashdom.list.item.cont);
            if(row){
                //Open de WO!
                DropNote('tr',`WO # ${row.children[0].innerText} Loaded..`,'green');
            }

        });
    }
}

LOADwolist();
