/* Service Item Module
    Responsible for:
    - Adding service items to view
    - linking all service item's info to one
    - linking service item repairs to one fo
*/
import * as gendis from '../repo/modules/vg-tables.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {FINDparentele} from '../repo/tools/vg-displaytools.js';

import {ViewGroup} from '../repo/layouts/view-controller.js';

import {SIform} from '../forms/serviceitem-form.js';
import {SIrepairform} from '../forms/servicerepairs-form.js';



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
                },
                '.si-add-inputs.div':{
                      attributes:{},
                      children:{
                        '.si-add-input.input':{
                          attributes:{},
                          children:{}
                        },
                        '.si-add-button.div':{
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
        }
      }
    });

    this.currsi=this.view.cont.getElementsByClassName('currsi')[0];
    this.currtab=0;
    //attach price book, want to move
    this.pricebook = pricebook; // FlatRateTable passed from parent

    this.info = [];
    this.repairs = [];

    if(repairs[0]==undefined||repairs.length===0){console.log(repairs);repairs=[];}

    for(let i=0;i<items.length;i++){//Loop ticket.serviceitems
      if(repairs[i]==undefined){
        console.log("Correcting empty repairs for index ", i)
        repairs.push([]);
      }
<<<<<<< HEAD
      this.ADDitem(items[i], repairs[i]);
=======
      this.ADDserviceitem(items[i], repairs[i])
>>>>>>> ae250030ce928bf613bc01ddf56c82925c365a5b
    }

    this.view.port.addEventListener('click',(ele)=>{this.TOGGLEitemlist(true);});

    this.currsi.addEventListener('click',(ele)=>{this.TOGGLEitemlist();});

    $(this.view.buttons.children[0]).click();

    this.SETcurrtab(this.currsi.innerText);//shouldnt need

    console.log('First run',this.currtab,this.currsi.innerText);
    this.view.cont.getElementsByClassName('si-delete')[0].addEventListener('click',(ele)=>{DropNote('tr','Delete Service Item','yellow');});
    this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{this.TOGGLEaddinput();});
    this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
      let name = this.view.cont.getElementsByClassName('si-add-input')[0];

      if(name.value != ''){
<<<<<<< HEAD
        //
        DropNote('tr',`Adding ${name.value}`);


        this.ADDitem({tagid: name.value});

        this.currsi.innerText=name.value;
        this.SETcurrtab(this.currsi.innerText);
=======
        let retval = this.ADDserviceitem({tagid: name.value});
        if (retval) {
          DropNote('tr',`Adding ${name.value}`);
          this.currsi.innerText=name.value;
          this.SETcurrtab(this.currsi.innerText);
          
          name.value = '';
          this.TOGGLEaddinput();
        } else {
          DropNote('tr',`${name.value} Already Added`,'yellow');
        }
>>>>>>> ae250030ce928bf613bc01ddf56c82925c365a5b

        
      }
    });
    //setup flatrate add event
    pricebook.cont.addEventListener('click',(ele)=>{
      let row  = FINDparentele(ele.target,'wo-item-row');
      this.repairs[this.currtab].ADDitem(gendis.GETrowTOobject(row));
    });
  }

  /*
    Adds a new repair item to the service items
    Returns true if the item doesn't exist, null otherwise
  */
<<<<<<< HEAD
  ADDitem(item, repairs=[]) {
=======
  ADDserviceitem(item, repairs=[]) {
    console.log("Item: ", item)

>>>>>>> ae250030ce928bf613bc01ddf56c82925c365a5b
    let sitemview = new ViewGroup({
      type:'mtr',
      qactions:{['.item-header.div']:{value:item.descr}}
    });

    //add/init service info form
    this.info.push(new SIform(document.createElement('div')));
    var index = this.info.length-1
    sitemview.ADDview('Info',this.info[index].cont);
    this.info[index].form = item; //load info
    console.log(this.repairs)
    //add/init service repairs
    this.repairs.push(new SIrepairform(document.createElement('div'),this.pricebook));
    sitemview.ADDview('Repairs',this.repairs[index].cont);

    this.repairs[index].form=repairs[index];

    let added = this.view.ADDview(item.tagid,sitemview.cont); //add service item to group
    if (added) {
      $(sitemview.buttons.children[0]).click();
    }
    return added;
  }
  //remove item

  //get currtab as index
  SETcurrtab(tagid){
    for(let x=0;x<this.info.length;x++){
      if(this.info[x].form.tagid===tagid){this.currtab=x;break;}
    }
  }

  TOGGLEitemlist(hide=false){
    let box = this.view.buttons;
    let exbuttons = this.view.cont.getElementsByClassName('si-menu-buttons')[0];
    if(box.style.left=='-250px'&&!hide){
      box.style.left='0px';
      exbuttons.style.left='0px';
    }else{
      box.style.left='-250px';
      exbuttons.style.left='-250px';
    }
  }
  TOGGLEaddinput(){
    let box = this.view.cont.getElementsByClassName('si-add-inputs')[0];
    if(box.style.left == '80px'){
      box.style.left = '-200px';
    }else{
      box.style.left = '80px';
    }
  }
}
