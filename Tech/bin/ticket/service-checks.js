import {CheckListForm} from '../forms/checklist-form.js';
import {VHCform} from '../repo/tools/vhc-forms.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {ViewGroup} from '../repo/layouts/view-controller.js';

import { coolingchecks } from '../collateral/checklists/cooling-checklist.js';
import { heatingchecks } from '../collateral/checklists/heating-checklist.js';
import { systemchecks } from '../collateral/checklists/system-checklist.js';
import { summarychecks } from '../collateral/checklists/summary-checklist.js';
import { SummaryCheckList } from '../collateral/checklists/summary-checklist.js';

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
    system:systemchecks.content,
    cooling:coolingchecks.content,
    heating:heatingchecks.content
  }
}

export class ServiceChecks{
  constructor(checks={}){
    let cont = document.createElement('div');
    cont.id='check-cont';
    this.view = new ViewGroup({
      cont:cont,
      type:'mlt',
      swtchEve:(cont,view,button)=>{
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

    this.view.port.addEventListener('click',(ele)=>{this.TOGGLEitemlist(true);});

    this.currsi.addEventListener('click',(ele)=>{this.TOGGLEitemlist();});

    this.info = [];

    this.forms = [];
    console.log("# of Checks ", Object.keys(checks).length)
    /*Initialize first group - creates default group if no checklists are given to constructor. */
    if(checks===undefined||Object.keys(checks).length===0){
      console.log('No Checks')
      this.info.push(["System 1", this.ADDgroup('System 1')]);
    }else{
      for(let c in checks){
        let agroup = {}; //to pull from pool
        for(let cl in checks[c]){
          if(checklists.contents[cl]){
            agroup[cl]=checks[c][cl];
          }else{console.log('bad list')}
        }
        this.info.push([c, this.ADDgroup(c,agroup)]);
      }
    }
    console.log("This", this);
    this.currsi.innerText = this.info[0][0];
    this.TOGGLEitemlist();
    /*
    Menu quick action to open input box
    */
    this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{
      this.TOGGLEaddinput();
    });
    /*
    Listener event for adding a new system.
    */
    this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
      let name = this.view.cont.getElementsByClassName('si-add-input')[0];
      if(name.value != ''){
        let retval = this.ADDgroup(name.value);
        if (retval == false) {
            DropNote('tr',`${name.value} Already Added`,'yellow');
        } else {
            DropNote('tr',`Adding ${name.value}`);
            this.info.push([name, retval]);
        }
        this.currsi.innerText = name.value;
        name.value = '';
        this.TOGGLEaddinput();
      }
    });

    /*Test listener event for organizing summary.*/
    this.view.cont.getElementsByClassName('si-delete')[0].addEventListener('click', (eve)=>{
      let Summary = this.ORGANIZEsummary();
    })
    //HideAll(cont);
    Clicktoclose(cont);
  }

  /*
    Function for organizing the information on the document in order to print out the summary.
    Returns a CheckListSummary object
  */
  ORGANIZEsummary(){
    let summary = {
      dom: summarychecks.dom,
      current: summarychecks.innertext
    };

    //Loop through and update current with the info from the document
    for (let input in summary.dom.info) {
      var key = summary.dom.info[input];
      //Get the values from the document itself
      let docvalue = document.getElementsByClassName(key)[0]
      if (docvalue) {
        //Ignore blank text for now
        if (docvalue.value != "") {
          //Update the current value
          summary.current[key] = docvalue.value;
        }
      }
    }

    let Sumcheck = new SummaryCheckList(summary.current);

    return Sumcheck
  }
  /*
    Function for adding a new group of checklists
    Returns the newly created system view or false if system already exists.
  */
  ADDgroup(name,group={system:null,cooling:null,heating:null}){
    let cview = new ViewGroup({
      cont:document.createElement('div'),
      type:'mtr',
      qactions:{['.item-header.div']:{value:"Text to push buttons over"}}
    });
    cview.cont.classList.add('checklists-menu');
    if(this.view.ADDview(name,cview.cont,false)){
      console.log('not added')
      this.forms = [];
      for(let c in group){
        let dom = checklists.doms[c];
        let contents = checklists.contents[c]
        console.log("Creating checklist form:")
        this.forms.push(new VHCform({
          cont:document.createElement('div'),
          dom:checklists.doms[c],
          content:checklists.contents[c]
        }));
        let nview = cview.ADDview(c,this.forms[this.forms.length-1].cont);

        this.forms[this.forms.length-1].form=group[c];
      }
      return cview;
    } else {return false}
  }
  //REMOVEgroup(){}

  TOGGLEitemlist(hide=false){
    let box = this.view.buttons;
    let exbuttons = this.view.cont.getElementsByClassName('si-menu-buttons')[0];
    if(box.style.left=='-250px'&&!hide){
      box.style.left='-1px';
      exbuttons.style.left='-1px';
    }else{
      box.style.left='-250px';
      exbuttons.style.left='-250px';
    }
  }


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
