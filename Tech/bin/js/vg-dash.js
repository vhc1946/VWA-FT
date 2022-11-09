import {wolstore} from './lstore.js';
import * as dom from '../back/ticket-dom.js';
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
try{document.getElementById(Titlebar.tbdom.info.username).innerText = JSON.parse(localStorage.getItem(usersls.curruser)).uname;
}catch{console.log("Could not pick up UserName")}
//////////////////////////////////////////////////////////

var vurl = 'https://18.191.134.244:5000/api'//'https://localhost:5000/api'//;
var vapp = 'VMT';

var GETresflbook=(wonum)=>{
    return new Promise((res,rej)=>{
        var wopull = {
            table:'flatratebook',
            bookcode:'RES'
        };
        return res(SENDrequest(vurl,vapp,wopull));
    })
}
var GETscontract=(custcode)=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'contracttable',
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

/*
GETresflbook().then(
  result=>{
    console.log(result);
  }
)
*/
var GETticket=(wonum)=>{
    GETwo(wonum).then(
        result=>{
            if(result.body.success){
                let ticket = {};
                ticket.history = {};
                ticket.wo = dom.convert(dom.wotabdom, result.body.table[0]);
                GETscontract(ticket.wo.CustCode).then(
                    result=>{
                        if(result.body.success){
                            let others=[];
                            for(let i=result.body.table.length-1;i>=0;i--){  //Finds first Active Contract by searching from the bottom up
                                if(result.body.table[i].ContractStatus == 'A'){
                                    ticket.contract = dom.convert(dom.contdom,result.body.table[i]);
                                }else{
                                    others.push(dom.convert(dom.contdom,result.body.table[i]));
                                }
                            }
                            ticket.history.contracts = others;
                        }else{
                            ticket.contract = {};
                            console.log('Contracts request fail');
                        }
                    }
                )
                GETserviceitems(ticket.wo.CustCode).then(
                    result=>{
                        ticket.sitems = [];
                        if(result.body.success){
                            for(let i=0;i<result.body.table.length;i++){
                                ticket.sitems[i] = dom.convert(dom.sitabdom, result.body.table[i]);
                            }
                        }else{
                            console.log('Service Items request fail')}
                    }
                )
                console.log(`TICKET ${wonum}>`,ticket);
            }else{console.log('WO request fail')}
        }
    )
}

//LOADwolist();

GETticket('00025796');  //Everything exists
GETticket('00024530');  //No contracts to pull
GETticket('00123450');  //WO does not exist
GETticket();
