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
    <div class="techwo-row-actions">
      <div class = "action-button" id = "button-delete" ><img class="${wrdom.actions.delete}" src="./bin/repo/assets/icons/cross.png"/></div>
      <div class = "action-button" id = "button-open" ><img class="${wrdom.actions.open}" src="./bin/repo/assets/icons/edit.png"/></div>
    </div>
`

const wotablerow_old=`
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
    <div><img class="${wrdom.actions.delete} src="./bin/repo/assets/icons/cross.png"/></div>
    <div><img class="${wrdom.actions.open} src="./bin/repo/assets/icons/edit.png"/></div>
  </div>
`

// DATA //
export var twolist = new TechLocalWos();

///////////////

export var SETUProw=(item={})=>{
  let row = document.createElement('div');
  row.classList.add(wrdom.cont);
  row.innerHTML=wotablerow;
  for(let v in wrdom.values){
    if(v != "datescheduled"){
      let elem = row.getElementsByClassName(wrdom.values[v])[0]; //Check if element exists in the table
      if (elem) {
        elem.innerText = item.wo[v];
      }
    }else{
      try{
        if (item.wo[v] == undefined) {
          let datespot = row.getElementsByClassName(wrdom.values[v])[0]
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = "No date available."
        } else {
          let date = new Date(item.wo[v].split('T')[0]+'Z12:00:00');
          let datespot = row.getElementsByClassName(wrdom.values[v])[0]
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = molist[date.getMonth()] + ' ' + date.getDate();
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = date.getFullYear();
        }
        
      }catch{}
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
