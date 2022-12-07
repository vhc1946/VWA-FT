
import {ObjList} from '../repo/tools/vg-lists.js';
import {SENDrequestapi} from '../repo/apis/vapi/vapicore.js';

export class TechLocalWos extends ObjList{
  constructor(list){
    super(list);
  }
  UPDATEstore(item){
    return new Promise((resolve,reject)=>{
      if(this.TRIMlist({id:item.id}).length==0){
          SENDrequestapi({
            collect:'apps',
            store:'VFT',
            db:'techwos',
            method:'insert',
            options:{
              docs:item
            }
          }).then(answr=>{
            let success=false;
            if(!answr.body.result.err){this.list.push(item);success=true;}
            return resolve(success);
          })
      }else{
        SENDrequestapi({
          collect:'apps',
          store:'VFT',
          db:'techwos',
          method:'update',
          options:{
            query:{id:item.id},
            update:{$set:item},
            options:{}
          }
        }).then(answr=>{
          let success=false;
          if(!answr.body.result.err){this.UPDATEitem(item);success=true;}
          if(!answr.body.result.err){this.list.push(item);success=true;}
          return resolve(success);
        })
      }
    });
  }
  UPDATEitem(item){
    let list = this.list.splice();
    for(let x=0;x<list.length;x++){
      if(list[x].id===item.id){
        list[x]=item;
        break;
      }
    }
    this.list=list;
  }
  GETitem(id){
    let woitem = this.TRIMlist({id:id});

    if(woitem.length==0){return null;}
    return woitem[0];
  }
  REFRESHstore(tech=undefined){
    return new Promise((resolve,reject)=>{
      SENDrequestapi({
        collect:'apps',
        store:'VFT',
        db:'techwos',
        method:'query',
        options:{query:{tech:tech}}
      }).then(
        answr=>{
          let success=false;
          if(answr.success){this.list=answr.body.result;success=true;}
          return resolve(success);
        }
      );
    });
  }

}
