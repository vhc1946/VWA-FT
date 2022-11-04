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
var mactions = {};

titlebar.SETUPtitlebar('./bin/repo/',qactions,mactions);
$(document.getElementById(titlebar.tbdom.window.close)).hide();
$(document.getElementById(titlebar.tbdom.page.settings)).hide();
//////////////////////////////////////////////////////////

var vurl = 'https://18.191.134.244:5000/api'//'https://localhost:5000/api'//';
var vapp = 'VMT';

var GETscontract=(custcode)=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'contarcttable',
          custcode:custcode
      };
      return res(SENDrequest(vurl,vapp,wopull));
  })
}
var GETwo=(wonum)=>{
    return new Promise((res,rej)=>{
        var wopull = {
            table:'wonumber',
            wonum:wonum,//'00024530'
        };
        return res(SENDrequest(vurl,vapp,wopull));
    })
}
var GETcustomer=(custcode)=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'customertable',
          custcode:custcode
      };
      return res(SENDrequest(vurl,vapp,wopull));
  })
}
var GETserviceitems=(custcode)=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'custserviceitems',
          custcode:custcode
      };
      return res(SENDrequest(vurl,vapp,wopull));
  })
}

var LOADwolist = ()=>{   //Loads WO list into display table
    let wolist=[];
    GETwo('*').then(
        result=>{
            if(result.body.success){
                let wolist = result.body;
                console.log(wolist);
            }else{console.log('WO request fail')}
        }
    )
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
document.getElementById(titlebar.tbdom.page.user).addEventListener('click', (ele)=>{
    window.location.href='../index.html';
});


GETwo('00024530').then(
    result=>{
      if(result.body.success){
        let wo = result.body.table[0];
        console.log('WORKORDER> ',wo);
        GETscontract(wo.CustomerCode).then(
          result=>{
            let contract = result.body.table;
            console.log('CONTRACT> ',contract)
          }
        )
        GETserviceitems(wo.CustomerCode).then(
          result=>{
            let sitems = result.body.table;
            console.log('SERVICE ITEMS> ',sitems)
          }
        )
      }else{console.log('WO request fail')}
    }
)

LOADwolist();

viewcontrol.CREATEviewport();
