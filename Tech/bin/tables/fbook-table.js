
import * as gendis from '../repo/modules/vg-tables.js';
import {ObjList} from '../repo/tools/vg-lists.js';
export class FlatRateTable{
  constructor(list,cont){
    this.master = new ObjList(list); //holds 1 book with all levels
    this.cont=cont;
    this.fltrs={}; //holds any on going filters
    this.miscreps={//Misc Repairs
      'CLNCHK-AC':{
        'desc':'AC Clean and Check',
        'STA':149,
        'AHR':149,
        'CLA':0,
        'PRE':0,
        'ULT':0
      },
      'CLNCHK-FURN':{
        'desc':'Furnace Clean and Check',
        'STA':149,
        'AHR':149,
        'CLA':0,
        'PRE':0,
        'ULT':0
      },
      'DIAG':{
        'desc':'Diagnostic',
        'STA':119,
        'AHR':149,
        'CLA':119,
        'PRE':59.5,
        'ULT':0
      }
    }

    //add misc repairs to header of flatrate table
    //events need to be returned to
    //
    this.SETfilters();
  }
  SETfilters=()=>{
    document.getElementsByClassName('min-page-menu')[0].appendChild(gendis.SETrowFROMobject({TaskID:''},true));
    let filterrow = document.getElementsByClassName('min-page-menu')[0].lastChild;
    filterrow.classList.add('wo-filter-row');
    filterrow.children[0].setAttribute('placeholder','Search');
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
