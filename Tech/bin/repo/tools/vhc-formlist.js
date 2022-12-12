import {VHCform} from './vhc-forms.js';
/*
  cont: the top of the custom list
  seleeve: an option to apply function to row click
  rmap: the values to include in row
  lheads: any desired headers
  lrow: a template row, needs to be repeatedly creatable as lrow will run as a function
*/
export class FormList extends VHCform{
  constructor({
    cont=document.createElement('div'),
    seleeve=()=>{},
    rmap=(r)=>{return r},
    laction=null,
    lhead=null,
    srow= null,
    grow= null,
    list=[]
  }){
    super(cont);
    this.sleeve=seleeve;
    this.rmap=rmap;
    this.laction=laction;
    this.lhead=lhead;
    this.srow=srow;

    if(!this.cont.classList.contains(this.dom.cont)){this.cont.classList.add(this.dom.cont)}
    let ccount=[];

    for(let p in this.dom.part){//ensure parts
      let set = false;
      let x=0;
      for(x;x<this.cont.children.length;x++){
        if(this.cont.children[x].classList.contains(this.dom.part[p])){set=true;break;}
      }
      if(!set){
        console.log(p)
        this[p]=document.createElement('div');
        this[p].classList.add(this.dom.part[p]);
        this.cont.appendChild(this[p]);
      }else{
        this[p]=this.cont.children[x];
      }
    }
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
    let row = this.srow?this.srow(item):SETrowFROMobject(item);
    this.list.appendChild(row);
  }
  GETitem(row){
    let item = this.grow?this.grow(row):GETrowTOobject(row);
    return item;
  }
  LOADlist(list=[]){
    this.list.innerHTML='';
    for(let x=0;x<list.length;x++){
      this.ADDitem(list[x]);
    }
  }
}
