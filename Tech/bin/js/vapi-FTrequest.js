import {awo} from '../repo/ds/wos/vogel-wos.js';
import {aservicecontract} from '../repo/ds/contracts/vogel-servicecontracts.js';
import {aserviceitem} from '../repo/ds/customers/vogel-serviceitems.js';

import { SENDrequest } from '../repo/apis/vapi/vapicore.js';


var vurl = 'https://18.191.134.244:5000/api'//'https://localhost:5000/api'//;
var vapp = 'VMT';

var GETjapitest=()=>{
  return new Promise((res,rej)=>{
      var wopull = {
          table:'test',
          option:'template',
          template:'WO_CrewTechIds_tbl'
      };
      return res(SENDrequest(vurl,vapp,wopull));
  });
}

//WO_DetailHistory_tbl
//WO_DescOfWorkPerformed_tbl
//WO_DescriptionOfWork_tbl
//WO_Profile_tbl //to get the WO categories

GETjapitest().then(
  res=>{
    let arr=[]
    for(let x in res.body.table[0]){
      arr.push(x);
    }
    console.log(arr);
    var wopull = {
        table:'test',
        option:'download',
        template:'WO_DescriptionOfWork_tbl',
        where:[{OP:'=',WorkOrderNumber:'00026024'}]
    };
    SENDrequest(vurl,vapp,wopull).then(
            res=>{console.log(res);}
        );
  });

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


var STARTticket=(wonum)=>{
  return new Promise((resolve,reject)=>{
    GETwo(wonum).then(
        result=>{
            if(result.body.success){
                let ticket = {};
                ticket.history = {};

                if(result.body.table.length==1){ticket.wo = awo(result.body.table[0]);}
                else{ticket.wo=null;}

                let havesc = false;
                let havesi = false;
                GETscontract(ticket.wo.custcode).then(
                    result=>{
                        if(result.body.success){
                            let others=[];
                            for(let i=result.body.table.length-1;i>=0;i--){  //Finds first Active Contract by searching from the bottom up
                                if(result.body.table[i].status == 'A'){
                                    ticket.contract = aservicecontract(result.body.table[i]);
                                }else{
                                    others.push(aservicecontract(result.body.table[i])); //aservicecontract()
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
                GETserviceitems(ticket.wo.custcode).then(
                    result=>{
                        ticket.sitems = [];
                        if(result.body.success){
                            for(let i=0;i<result.body.table.length;i++){
                                ticket.sitems[i] = aserviceitem(result.body.table[i]); //aserviceitems()
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
