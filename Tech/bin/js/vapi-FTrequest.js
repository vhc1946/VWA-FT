
import * as dom from '../back/ticket-dom.js';
import {awo} from '../repo/ds/wos/vogel-wos.js';
import { SENDrequest } from '../repo/apis/vapi/vapicore.js';


var vurl = 'https://18.191.134.244:5000/api'//'https://localhost:5000/api'//;
var vapp = 'VMT';



// HEADERS /////////////////////////////////////////////

////////////////////////////////////////////////////////

var GETjapitest=()=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'test',
          option:'template',
          template:'WO_SC_ServiceContractMaster_tbl'
      };
      return res(SENDrequest(vurl,vapp,wopull));
  });
}
GETjapitest().then(
  res=>{
    let arr=[]
    for(let x in res.body.table[0]){
      arr.push(x);
    }
    var wopull = {
        table:'test',
        option:'download',
        template:'WO_SC_ServiceContractMaster_tbl',
        where:[{OP:'=',CustomerCode:'VOJO05'}]
    };
    SENDrequest(vurl,vapp,wopull).then(
            res=>{console.log(res);}
        );
  }).then(res2=>{console.log(res2)});



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
            table:'test',
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


var STARTticket=(wonum)=>{
  return new Promise((resolve,reject)=>{
    GETwo(wonum).then(
        result=>{
            if(result.body.success){
                let ticket = {};
                ticket.history = {};
                ticket.wo = awo(result.body.table[0]);
                let havesc = false;
                let havesi = false;

                GETscontract(ticket.wo.CustCode).then(
                    result=>{
                        if(result.body.success){
                            let others=[];
                            for(let i=result.body.table.length-1;i>=0;i--){  //Finds first Active Contract by searching from the bottom up
                                if(result.body.table[i].ContractStatus == 'A'){
                                    ticket.contract = dom.convert(dom.contdom,result.body.table[i]);
                                }else{
                                    others.push(dom.convert(dom.contdom,result.body.table[i])); //aservicecontract()
                                }
                            }
                            ticket.history.contracts = others;
                        }else{
                            ticket.contract = {};
                            console.log('Contracts request fail');
                        }
                        havesc=true;
                        if(havesi){return resolve(ticket);}
                    }
                )
                GETserviceitems(ticket.wo.CustCode).then(
                    result=>{
                        ticket.sitems = [];
                        if(result.body.success){
                            for(let i=0;i<result.body.table.length;i++){
                                ticket.sitems[i] = dom.convert(dom.sitabdom, result.body.table[i]); //aserviceitems()
                            }
                        }else{console.log('Service Items request fail');}

                        havesi=true;
                        if(havesc){return resolve(ticket);}
                    }
                )
            }else{console.log('WO request fail');return resolve(null);}
        }
    )
  });
}

var SYNCticket=(wonum,ticket)=>{
  return new Promise((resolve,reject)=>{
    GETwo(wonum).then(
        result=>{
            if(result.body.success){
                let ticket = {};
                ticket.history = {};
                ticket.wo = awo(result.body.table[0]);
                console.log(ticket);
                return resolve(ticket);
            }else{console.log('WO request fail');return resolve(null);}
        }
    )
  });
}

export{
  STARTticket,
  SYNCticket
}
