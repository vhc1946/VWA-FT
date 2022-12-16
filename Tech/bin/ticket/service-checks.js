import {CheckListForm} from '../forms/checklist-form.js';
import {VHCform} from '../repo/tools/vhc-forms.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {ViewGroup} from '../repo/layouts/view-controller.js';

import { coolingchecks } from './checklists/cooling-checklist.js';
import { heatingchecks } from './checklists/heating-checklist.js';
import { systemchecks } from './checklists/system-checklist.js';

var toggledom = {
    cont: 'checklist-cont',
    info: 'checklist-info',
    cool: 'checklist-cooling',
    heat: 'checklist-heating',
    airflow: 'checklist-airflow',
    access: 'checklist-access',
    indoor: 'checklist-indoor',
    outdoor: 'checklist-outdoor'
}

var HideAll=(cont)=>{
    let hide = cont.getElementsByClassName('section-cont');
    for (let i=0;i<hide.length;i++){
        $(hide[i]).hide();
    }
}
var Clicktoclose=(cont)=>{
    for (let ea in toggledom){
        let box = cont.getElementsByClassName(toggledom[ea]);
        for (let i=0;i<box.length;i++){
            box[i].getElementsByClassName('section-header')[0].addEventListener('click', (ele)=>{
                $(box[i].getElementsByClassName('section-cont')[0]).toggle();
            });
        }
    }
}

// First two characters = in / ou / ai / ac
// Next four characters = cool / heat / info

var checklists = {
  doms:{
    system:systemchecks.dom,
    cooling:coolingchecks.dom,
    heating:heatingchecks.dom
  },
  contents:{
    system:systemchecks.contents,
    cooling:coolingchecks.contents,
    heating:heatingchecks.contents
  }
}

export class ServiceChecks{
  constructor(checks={}){
    let cont = document.createElement('div');
    //cont.id='check-cont';
    this.view = new ViewGroup({
      cont:cont,
      type:'mtr',
      qactions:{
        'div':{
          children:{
            '.si-menu-buttons.div':{
              attributes:{
                id:'checklists-menu-buttons'
              },
              children:{
                '.si-add.div':{
                  attributes:{
                    class:'icon-action-button',
                    id:'checklists-add-button'
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
    this.forms = [];
    console.log(Object.keys(checks).length)
    if(checks===undefined||Object.keys(checks).length===0){//default if no checks
      console.log('No Checks')
      this.ADDgroup('System 1');
    }else{
      for(let c in checks){ //INIT checks
        let agroup = {}; //to pull from pool
        for(let cl in checks[c]){
          if(checklists.contents[cl]){
            agroup[cl]=checks[c][cl];
          }else{console.log('bad list')}
        }
        this.ADDgroup(c,agroup);
      }
    }

    /*
    Menu quick action to open input box
    */
    this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{
      this.TOGGLEaddinput();
    });
    /*
    Menu quick action for input box
    */
    this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
      let name = this.view.cont.getElementsByClassName('si-add-input')[0];
      if(name.value != ''){
        let retval = this.ADDgroup(name.value);
        if (!retval) {
            DropNote('tr',`${name.value} Already Added`,'yellow');
        } else {
            DropNote('tr',`Adding ${name.value}`);
        }

        name.value = '';
        this.TOGGLEaddinput();
      }
    });
    //HideAll(cont);
    //Clicktoclose(cont);
  }

  ADDgroup(name,group={system:null,cooling:null,heating:null}){
    let cview = new ViewGroup({
      cont:document.createElement('div'),
      type:'mlt'
    });
    cview.cont.classList.add('checklists-menu');
    if(this.view.ADDview(name,cview.cont, true)){
      console.log('not added')
      this.forms = [];
      for(let c in group){
        this.forms.push(new CheckListForm(document.createElement('div'),checklists.contents[c],checklists.doms[c]));
        let nview = cview.ADDview(c,this.forms[this.forms.length-1].cont);

        this.forms[this.forms.length-1].form=group[c];
      }
      return true
    } else {return false}
  }
  //REMOVEgroup(){}

  /*
  Change visibity of input box
  */
  TOGGLEaddinput(){
    let box = this.view.cont.getElementsByClassName('si-add-inputs')[0];
    if(box.style.left == '80px'){
      box.style.left = '-200px';
      box.style.zIndex = "-1";
    }else{
      box.style.left = '80px';
      box.style.zIndex = "2";
    }
  }
}
