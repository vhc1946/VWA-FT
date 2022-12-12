/* Service Item Module
    Responsible for:
    - Adding service items to view
    - linking all service item's info to one
    - linking service item repairs to one fo
*/
import * as gendis from '../repo/modules/vg-tables.js';
import {FINDparentele} from '../repo/tools/vg-displaytools.js';

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
      swtchEve:(cont,view,button)=>{
        cont.getElementsByClassName('currsi')[0].innerText = view.title;
        this.SETcurrtab(view.title);
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
    this.currtab=null;
    //attach price book, want to move
    this.pricebook = pricebook; // FlatRateTable passed from parent

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
      if(repairs[i]==undefined){repairs[i]=[]}//correct empty repairs
      this.repairs.push(new SIrepairform(document.createElement('div'),this.pricebook));
      sitemview.ADDview('Repairs',this.repairs[i].cont);
      //try{
      this.repairs[i].form=repairs[i];
      //catch{}

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

    //setup flatrate add event
    pricebook.cont.addEventListener('click',(ele)=>{
      let row  = FINDparentele(ele.target,'wo-item-row');
      this.repairs[this.currtab].ADDrepair(gendis.GETrowTOobject(row));
    });
  }

  //add item
  //remove item

  //get currtab as index
  SETcurrtab(tagid){
    for(let x=0;x<this.info.length;x++){
      if(this.info[x].form.tagid===tagid){console.log(x);this.currtab=x;break;}
    }
  }
}
