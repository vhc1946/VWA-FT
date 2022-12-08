import {wolstore} from '../store/lstore.js';
import {GETrowTOobject,SETrowFROMobject} from '../repo/modules/vg-tables.js';
import {FINDparentele} from '../repo/tools/vg-displaytools.js';
import {TechLocalWos} from '../store/techwo-store.js';
import {DropNote} from '../repo/modules/vg-dropnote.js';

var molist = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

const wrmap = (w)=>{
  if(!w){w={};}
  return{
    id:w.id||'',
    contactname:w.contactname||'',
    contactphone:w.contactphone||'',
    descr:w.descr||'',
    datescheduled:w.datescheduled||'',
    street:w.street||'',
    cityzip:w.cityzip||''
  }
}
const wrdom ={
  cont:'techwo-row',
  contact:'techwo-row-contact',
  address:'techwo-row-address',
  actions:{
    delete:'techwo-row-deletes',
    open:'techwo-row-open'
  },
  values:{
    id:'techwo-row-id',
    contactname:'tech-row-contact',
    contactphone:'tech-row-phone',
    descr:'techwo-row-descr',
    datescheduled:'techwo-row-date',

    street:'techwo-row-street',
    cityzip:'techwo-row-cityzip',
  }
}
const wotablerow=`
  <div class="${wrdom.values.datescheduled}"></div>
  <div class="${wrdom.contact}">
    <div class="${wrdom.values.id}" style="display:none"></div>
    <div class="${wrdom.values.contactname}"></div>
    <div class="${wrdom.values.contactphone}"></div>
  </div>
  <div class="${wrdom.values.descr}"></div>
  <div class="${wrdom.address}">
    <div class="${wrdom.values.street}"></div>
    <div class="${wrdom.values.cityzip}"></div>
  </div>
  <div class="techwo-row-actions">
    <div><img class="${wrdom.actions.delete}" src="./bin/repo/assets/icons/cross.png"/></div>
    <div><img class="${wrdom.actions.open}" src="./bin/repo/assets/icons/edit.png"/></div>
  </div>
`

// DATA //
export var twolist = new TechLocalWos();

///////////////

var SETUProw=(item={})=>{
  let row = document.createElement('div');
  row.classList.add(wrdom.cont);
  row.innerHTML=wotablerow;
  console.log(item.wo)
  for(let v in wrdom.values){
    if(v != "datescheduled"){
      row.getElementsByClassName(wrdom.values[v])[0].innerText = item.wo[v];
    }else{
      let date = new Date(item.wo[v].split('T')[0]+'Z12:00:00');
      let datespot = row.getElementsByClassName(wrdom.values[v])[0]
      datespot.appendChild(document.createElement('div'));
      datespot.lastChild.innerText = molist[date.getMonth()] + ' ' + date.getDate();
      datespot.appendChild(document.createElement('div'));
      datespot.lastChild.innerText = date.getFullYear();
    }
  }
  row.getElementsByClassName(wrdom.actions.delete)[0].addEventListener('dblclick',(ele)=>{
    console.log()
  });
  row.getElementsByClassName(wrdom.actions.open)[0].addEventListener('dblclick',OPENwo);

  return row;
}

var OPENwo=(ele)=>{
  var row = FINDparentele(ele.target,wrdom.cont);
  console.log('OPENING');
  if(row){
      let wonum = row.getElementsByClassName(wrdom.values.id)[0].innerText;
      let woitem = twolist.GETitem(wonum);
      console.log(row);
      if(woitem){
        localStorage.setItem(wolstore.toloadwo,JSON.stringify(woitem));
        window.open('controllers/ticket.html');
        DropNote('tr',`WO # ${wonum} Loaded..`,'green');
      }else{DropNote('tr',`WO # ${wonum} Could NOT Load`,'yellow')}
  }
}

/*
  cont: the top of the custom list
  seleeve: an option to apply function to row click
  rmap: the values to include in row
  lheads: any desired headers
  lrow: a template row, needs to be repeatedly creatable as lrow will run as a function
*/
export class CustomList{
  constructor({
    cont=document.createElement('div'),
    seleeve=()=>{},
    rmap=(r)=>{return r},
    laction=null,
    lhead=null,
    lrow=SETUProw,
    list=[]
  }){
    this.cont = cont;
    this.sleeve=seleeve;
    this.rmap=rmap;
    this.laction=laction;
    this.lhead=lhead;
    this.lrow=lrow;

    if(!this.cont.classList.contains(this.dom.cont)){this.cont.classList.add(this.dom.cont)}
    let ccount=[];

    for(let p in this.dom.part){//ensure parts
      let set = false;
      let x=0;
      for(x;x<this.cont.children.length;x++){
        if(this.cond.children[x].classList.contains(this.dom.part[p])){set=true;break;}
      }
      if(!set){
        this[p]=document.createElement('div');
        this[p].classList.add(this.dom.part[p]);
      }else{
        this[p]=this.cont.children[x];
      }
    }
    console.log(this)
    for(let x=0;x<list.length;x++){
      this.ADDitem(list[x]);
    }
  }

  dom={
    cont:'cl-cont',
    part:{
      actions:'cl-actions',
      heads:'cl-heads',
      list:'cl-list'
    }
  }

  ADDitem(item={}){
    item=this.rmap(item);
    let row = this.lrow?this.lrow(item):SETrowFROMobject(item);
    this.cont.appendChild(row);
  }
  LOADlist(list){
    this.list.innerHTML='';
    for(let x=0;x<list.length;x++){
      this.ADDitem(list[x]);
    }
  }
}
