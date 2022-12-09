
import * as gendis from '../repo/modules/vg-tables.js';
import {ObjList} from '../repo/tools/vg-lists.js';
export class FlatRateTable{
  constructor(list,cont){
    this.master = new ObjList(list); //holds 1 book with all levels
    this.cont=cont;
    this.fltrs={}; //holds any on going filters

    this.SETfilters();
  }
  SETfilters=()=>{
    document.getElementsByClassName('min-page-menu')[0].appendChild(gendis.SETrowFROMobject({FlatRateBookCode:'',TaskID:'',PriceLevelCode:''},true));
    let filterrow = document.getElementsByClassName('min-page-menu')[0].lastChild;
    filterrow.classList.add('wo-filter-row');
    filterrow.children[0].setAttribute('type','search');
    filterrow.children[0].setAttribute('list','flatrate-book-list');
    filterrow.children[0].setAttribute('placeholder','Select');
    filterrow.children[0].value = 'RES';

    filterrow.children[1].setAttribute('placeholder','Search');

    filterrow.children[2].setAttribute('type','search');
    filterrow.children[2].setAttribute('list','flatrate-book-pl-list');
    filterrow.children[2].setAttribute('placeholder','Select');
    filterrow.children[2].value = 'STA';

    filterrow.addEventListener('change',(ele)=>{
      this.GETfilters();
    });

    this.GETfilters();
  }
  GETfilters=(flts)=>{
    for(let f in flts){
      if(flts[f]!=''){
        this.fltrs[f]=flts[f];
      }else if(flts[f]===''&&this.fltrs[f]){this.fltrs[f]=undefined;}

    }
    this.SETrepairlist(this.master.TRIMlist(flts,true));
  }
  SETrepairlist=()=>{
    gendis.BUILDtruetable(this.master.TRIMlist(this.fltrs),this.cont,false,'wo-item-row');
  }
}
