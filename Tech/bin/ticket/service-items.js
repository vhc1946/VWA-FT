/* Service Item Module
    Responsible for:
    - Adding service items to view
    - linking all service item's info to one
    - linking service item repairs to one fo
*/
import * as gendis from '../repo/modules/vg-tables.js';
import {ViewGroup} from '../repo/layouts/view-controller.js';
import {SIform} from '../forms/serviceitem-form.js';
import {SIrepairform} from '../forms/servicerepairs-form.js';

import {SETUPchecklist} from './service-checks.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
//repairs table

export class TicketServiceItems{
  // Inserts Add and Delete buttons into Items Menu
  constructor(items,repairs,pricebook){
    let cont = document.createElement('div');
    cont.id='si-cont';
    this.view = new ViewGroup({
      cont:cont,
      type:'mlt',
      swtchEve:(contt,view,button)=>{
        cont.getElementsByClassName('currsi')[0].innerText = view.title;
        $(cont.getElementsByClassName('currsi')[0]).click();
      },
      qactions:{
        'div':{
          children:{
            '.currsi.div':{
              attributes:{
                class:'flat-action-button'
              },
              children:{},
              value:'-  -'
            },
            '.si-menu-buttons.div':{
              attributes:{},
              children:{
                '.si-delete.div':{
                  attributes:{
                    class:'icon-action-button'
                  },
                  children:{
                    '.delete-button.img':{
                      attributes:{
                        src:'../bin/repo/assets/icons/trash.png'
                      }
                    }
                  }
                },
                '.si-add.div':{
                  attributes:{
                    class:'icon-action-button'
                  },
                  children:{
                    '.add-button.img':{
                      attributes:{
                        src:'../bin/repo/assets/icons/add.png'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    this.currsi=this.view.cont.getElementsByClassName('currsi')[0];

    //attach price book, want to move
    this.pricebook = pricebook; // object to handle the price
    console.log(this.pricebook);

    this.SETfilters();
    this.SETrepairlist(this.pricebook.list);
    

    this.info = [];
    this.repairs = [];


    for(let i=0;i<items.length;i++){//Loop ticket.serviceitems
      let sitemview = new ViewGroup({
        type:'mtr',
        qactions:{['.item-header.div']:{value:items[i].descr}}
      });

      //add/init service info form
      this.info.push(new SIform(document.createElement('div')));
      //console.log(i,this.info[i].cont)
      sitemview.ADDview('Info',this.info[i].cont);
      this.info[i].form = items[i]; //load info

      // add/init service repairs
      if(repairs[i]==undefined){repairs[i]=[]}
      this.repairs.push(new SIrepairform(document.createElement('div'),this.pricebook));
      sitemview.ADDview('Repairs',this.repairs[i].cont);
      try{this.repairs[i].form=repairs[i];}
      catch{}

      this.view.ADDview(items[i].tagid,sitemview.cont); //add service item to group
      $(sitemview.buttons.children[0]).click();
    }

    this.currsi.addEventListener('click',(ele)=>{   // Service Items menu toggle
      let box = this.view.buttons;
      let exbuttons = this.view.cont.getElementsByClassName('si-menu-buttons')[0];
      if(box.style.left=='-250px'){
        box.style.left='0px';
        exbuttons.style.left='0px';
      }else{
        box.style.left='-250px';
        exbuttons.style.left='-250px';
      }
    });

    $(this.view.buttons.children[0]).click();

    this.view.cont.getElementsByClassName('si-delete')[0].addEventListener('click',(ele)=>{DropNote('tr','Delete Service Item','yellow');});
    this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{DropNote('tr','Add New Service Item','yellow');});
  }

  SETfilters=()=>{
    document.getElementsByClassName('min-page-menu')[0].appendChild(gendis.SETrowFROMobject({FlatRateBookCode:'',TaskID:'',PriceLevelCode:''},true));
    let accfilterrow = document.getElementsByClassName('min-page-menu')[0].lastChild;
    accfilterrow.classList.add('wo-filter-row');
    accfilterrow.children[0].setAttribute('type','search');
    accfilterrow.children[0].setAttribute('list','flatrate-book-list');
    accfilterrow.children[0].setAttribute('placeholder','Select');
    accfilterrow.children[0].value = 'RES';

    accfilterrow.children[1].setAttribute('placeholder','Search');

    accfilterrow.children[2].setAttribute('type','search');
    accfilterrow.children[2].setAttribute('list','flatrate-book-pl-list');
    accfilterrow.children[2].setAttribute('placeholder','Select');
    accfilterrow.children[2].value = 'STA';

    accfilterrow.addEventListener('change',(ele)=>{
      let flts = gendis.GETrowTOobject(document.getElementsByClassName('min-page-menu')[0].lastChild,true);
      this.SETrepairlist(this.pricebook.TRIMlist(flts,true));
    });
  }
  SETrepairlist=(list)=>{
    gendis.BUILDtruetable(list,this.pricebook.cont,false,'wo-item-row');
  }
}
