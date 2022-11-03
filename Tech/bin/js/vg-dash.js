import {wolstore} from './lstore.js';
import {dashdom,wodom} from '../back/ticket-dom.js';
import {DropNote} from '../repo/js/vg-poppers.js';
import * as titlebar from '../repo/js/vg-titlebar.js';
import * as viewcontrol from '../repo/js/view-controller.js';
import { SENDrequest } from '../repo/apis/vapi/vapicore.js';

// SETUP title bar for dash /////////////////////////////

var qactions = {
    new:{
        id:'new-wo',
        src:'./bin/repo/assets/icons/file.png',
        alt:'NEW',
        title:'New WO'
    }
};
var mactions = {
    spacer1:{},
    back:{
        id:'back-to-index',
        src:'./bin/repo/assets/icons/angle-double-left.png',
        alt:'RETURN',
        title:'Return to Index'
    },
    spacer2:{},
    test:{
        id:'test-button',
        src:'./bin/repo/assets/icons/facebook.png'
    }


};

titlebar.SETUPtitlebar('./bin/repo/',qactions,mactions);
$(document.getElementById(titlebar.tbdom.window.close)).hide();
$(document.getElementById(titlebar.tbdom.page.settings)).hide();
$(document.getElementById(titlebar.tbdom.page.user)).hide();
//////////////////////////////////////////////////////////

var vurl = 'http://18.191.134.244:5000/japi'//'http://localhost:5000/japi'//';
var vapp = 'VMT';

var GETwolist=()=>{
    return new Promise((res,rej)=>{
        var wopull = {
            table:'wonumber',
            wonum:'00024530'
        };
        return res(SENDrequest(vurl,vapp,wopull));
    })
}

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
            var row = viewcontrol.FINDparentele(ele.target,dashdom.list.item.cont);
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
document.getElementById(titlebar.tbdom.page.print).addEventListener('click', (ele)=>{
    window.print();
});
document.getElementById('back-to-index').addEventListener('click', (ele)=>{
    window.location.href='../index.html';
});
GETwolist().then(
    result=>{
      console.log(result);
    }
)

//LOADwolist();

viewcontrol.CREATEviewport();
