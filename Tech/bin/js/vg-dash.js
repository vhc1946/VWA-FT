import {wolstore} from './lstore.js';
import {dashdom,wodom} from '../back/ticket-dom.js';
import {DropNote} from '../repo/js/vg-poppers.js';
import {FINDparentele} from '../repo/js/vg-displaytools.js';
import * as titlebar from '../repo/js/vg-titlebar.js';
import { CREATEviewport } from '../repo/js/view-controller.js';

// SETUP title bar for dash /////////////////////////////

var qactions = {
    new:{
        id:'new-wo',
        src:'./bin/repo/assets/icons/file.png',
        title:'New WO'
    }
};
var mactions = {};

titlebar.SETUPtitlebar('/../bin/repo/',qactions,mactions);
$(document.getElementById(titlebar.tbdom.window.close)).hide();

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
                window.open('controllers/ticket.html');
                DropNote('tr',`WO # ${row.children[0].innerText} Loaded..`,'green');
            }

        });
    }
}
document.getElementById('new-wo').addEventListener('click', (ele)=>{
    window.open('controllers/ticket.html');
});

LOADwolist();

CREATEviewport();