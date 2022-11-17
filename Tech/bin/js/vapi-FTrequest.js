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
          template:'AR_ServiceItemCustomInfo_tbl'
      };
      return res(SENDrequest(vurl,vapp,wopull));
  });
}

//WO_DetailHistory_tbl
//WO_DescOfWorkPerformed_tbl
//WO_DescriptionOfWork_tbl
//WO_DescriptOfWorkPerformedForBill_tbl
//WO_Profile_tbl *to get the WO categories
//WO_FlatRate_tbl *
//WO_ServiceItemComments_tbl

//AR_ServiceItemCustomTables_tbl
//AR_ServiceItemCustomInfo_tbl * use for custom service items
//AR_ServiceItemCustomInfoLog_tbl


/*
GETjapitest().then(
  res=>{
    let arr=[]
    for(let x in res.body.table[0]){arr.push(x);}
    console.log(arr);
    var wopull = {
        table:'test',
        option:'download',
        template:'AR_ServiceItemCustomInfo_tbl',
        where:[{OP:'=',CustomerCode:'801C01'}]
    };
    SENDrequest(vurl,vapp,wopull).then(
            res=>{console.log(res);}
        );
  });
//*/

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
        let wo = null;
        SENDrequest(vurl,vapp,wopull).then(
          answr=>{
            if(answr.body.success&&answr.body.table.length==1){
              wo = awo(answr.body.table[0]);
              var wodpull = {
                  table:'test',
                  option:'download',
                  template:'WO_DescriptionOfWork_tbl',
                  where:[{OP:'=',WorkOrderNumber:wonum}]
              };
              SENDrequest(vurl,vapp,wodpull).then( //bring in descriptions
                answr=>{
                  if(answr.body.success){
                    wo.descr=''
                    for(let x=0,l=answr.body.table.length;x<l;x++){
                      wo.descr+=answr.body.table[x].WorkDescription+'\n';
                    }
                  }
                  return res(wo);
                }
              );
            }else{return res(wo);}
          }
        );
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
      let sitems=[];
      SENDrequest(vurl,vapp,wopull).then(
        result=>{
          if(result.body.success){
            for(let i=0;i<result.body.table.length;i++){
                sitems.push(aserviceitem(result.body.table[i])); //aserviceitems()
            }
            let sicustpull = {
                table:'test',
                option:'download',
                template:'AR_ServiceItemCustomInfo_tbl',
                where:[{OP:'=',CustomerCode:custcode}]
            };
            SENDrequest(vurl,vapp,sicustpull).then(
              answr=>{
                if(answr.body.success){
                  for(let x=0,l=answr.body.table.length;x<l;x++){
                    for(let y=0,ll=sitems.length;y<ll;y++){
                      if(sitems[y].id===answr.body.table[x].LineNumber){
                        switch(answr.body.table[x].FieldNumber){
                          case "01":{sitems[y].filt1=answr.body.table[x].Information || '';}
                          case "02":{sitems[y].filt1q=answr.body.table[x].Information || '';}
                          case "03":{sitems[y].filt2=answr.body.table[x].Information || '';}
                          case "04":{sitems[y].filt2q=answr.body.table[x].Information || '';}
                          case "05":{sitems[y].beltsize=answr.body.table[x].Information || '';}
                          case "06":{sitems[y].controls=answr.body.table[x].Information || '';}
                          case "07":{sitems[y].refri=answr.body.table[x].Information || '';}
                          case "08":{sitems[y].elec=answr.body.table[x].Information || '';}
                        }
                      }
                    }
                  }
                }
                return res(sitems);
              }
            );
          }else{console.log('Service Items request fail');return res(sitems);}
        }
      );
  })
}

var STARTticket=(wonum)=>{
  return new Promise((resolve,reject)=>{
    GETwo(wonum).then(
        wo=>{
            if(wo){
                let ticket = {};
                ticket.history = {};
                ticket.wo = wo;
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
                        ticket.sitems = result;
                        ticket.repairs={}; //init repair list
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
