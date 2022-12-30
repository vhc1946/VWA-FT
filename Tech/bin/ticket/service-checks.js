import {CheckListForm} from '../forms/checklist-form.js';
import {VHCform} from '../repo/tools/vhc-forms.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {ViewGroup} from '../repo/layouts/view-controller.js';

import { coolingchecks } from '../collateral/checklists/cooling-checklist.js';
import { heatingchecks } from '../collateral/checklists/heating-checklist.js';
import { systemchecks } from '../collateral/checklists/system-checklist.js';
import { summarychecks } from '../collateral/checklists/summary-checklist.js';
import { SummaryCheckList } from '../collateral/checklists/summary-checklist.js';
import { Calculations } from '../repo/tools/vg-calculations.js';

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

/*Closes an individual container, using show and hide bools to selectively show or hide.*/
var Clicktoclose=(cont, hide=false, show=false)=>{
  let section_cont = cont.getElementsByClassName('section-cont')[0];
  //Hide the section container
  if (hide && !show) {
    $(cont.getElementsByClassName('section-cont')[0]).hide();
  } else if (show) {
    $(cont.getElementsByClassName('section-cont')[0]).show();
  } else {
    $(cont.getElementsByClassName('section-cont')[0]).toggle();
  }
  
  //Adjust border-radius of section header
  if (section_cont.style.display == "none") {
    cont.getElementsByClassName('section-header')[0].style.borderBottomLeftRadius = "10px";
    cont.getElementsByClassName('section-header')[0].style.borderBottomRightRadius = "10px";
  } else {
    cont.getElementsByClassName('section-header')[0].style.borderBottomLeftRadius = "0px";
    cont.getElementsByClassName('section-header')[0].style.borderBottomRightRadius = "0px";
  }
}

/*Hides all checklist-cards in a section.*/
var HideAll=(cont, showall)=>{
  let section_conts = cont.getElementsByClassName('checklist-card');
  for (let i = 0; i < section_conts.length; i++) {
    Clicktoclose(section_conts[i], true, showall);
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
  },
  titles:{
    system:"System Information",
    cooling:"Cooling Rewards",
    heating:"Heating Rewards"
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
      console.log("Checks exist! Loading data probably")
      //Loop through each system
      for (let i = 0; i < checks.length; i++) {
        console.log(checks[i]);
        this.info.push([checks[i].name, this.ADDgroup(checks[i].name,checks[i].checks)]);
      }
      /*for(let c in checks){
        let agroup = {}; //to pull from pool
        console.log("group:", c)
        for(let cl in checks[c]){
          if(checklists.contents[cl]){
            agroup[cl]=checks[c][cl];
          }else{console.log('bad list')}
        }
        this.info.push([c, this.ADDgroup(c,agroup)]);
    }*/
    }
    this.currsi.innerText = this.info[this.info.length - 1][0]; //Set tab title to last system
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
        console.log(this.forms)
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
    //Clicktoclose(cont);
    /*Click to close functionality on each section header*/
    let checklistcards = this.view.cont.getElementsByClassName('checklist-card');
    for (let i = 0; i<checklistcards.length; i++) {
      let header = checklistcards[i].firstElementChild;
      header.addEventListener('click', (eve)=>{
        Clicktoclose(checklistcards[i]);
      })
    }

    /*Hide all functionality for main section headers */
    let checklistsections = this.view.cont.getElementsByClassName('checklist-section');
    for (let i = 0; i<checklistsections.length; i++) {
      let mainheader = checklistsections[i].firstElementChild;
      mainheader.addEventListener('click', (eve)=>{
        if (mainheader.id == "shown") {
          HideAll(checklistsections[i], true);
          mainheader.id = "hidden"
        } else {
          HideAll(checklistsections[i], false);
          mainheader.id = "shown";
        }
      })
    }

    console.log("This", this);
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
      console.log('System not already added.')
      if (this.forms == undefined) {
        this.forms = [];
      }

      //Push dictionary with desired structure to this.forms
      this.forms.push({
        name: name,
        checks: {}
      })
      for(let c in group){
        this.forms[this.forms.length - 1].checks[c] = (new VHCform({
          cont:document.createElement('div'),
          dom:checklists.doms[c],
          content:checklists.contents[c]
        }));
        
        //Load existing data when not creating a new system
        if (group[c] != null) {
          this.forms[this.forms.length - 1].checks[c].data = group[c];
        }
        //I don't know if this is necessary but it was in the checklist form
        this.forms[this.forms.length - 1].checks[c].include = true;
        this.forms[this.forms.length - 1].checks[c].valids = checklists.doms[c].valids || {}; //describe any input validation rules
        let nview = cview.ADDview(checklists.titles[c],this.forms[this.forms.length - 1].checks[c].cont);
        this.forms[this.forms.length - 1].checks[c].form=group[c];
      }

      /*Listener event for change of CFM*/
      let cfm_input = this.forms[this.forms.length-1].checks.system.fields.ou_airf_actualcfm;
      let coolactcap = this.forms[this.forms.length-1].checks.system.fields.ou_info_coolactualcap; //MUST BE OUTSIDE or inputs won't set properly
      let heatactcap = this.forms[this.forms.length-1].checks.system.fields.in_info_heatactualcap;
      let temperature = this.forms[this.forms.length-1].checks.system.fields.ou_info_temp;
      temperature.addEventListener('change',(ele)=>{
        if (cfm_input.value != "" && temperature.value != "") {
          let heat_retval = Calculations.HeatingBTU(cfm_input.value, temperature.value);
          if (heatactcap) {
            heatactcap.value = heat_retval
            temperature.id = "temp-filled";
          };
        } else {
          temperature.id = "temp-empty";
        }
      })
      cfm_input.addEventListener('change',(ele)=>{
        let new_input = cfm_input.value;
        //Validate input
        if (new_input != "") {
          //Calculate BTU values
          let cool_retval = Calculations.CoolingBTU(new_input);
          //Check for a temperature
          let heat_retval = null;
          if (temperature.value != "") {
            temperature.id = "temp-filled";
            heat_retval = Calculations.HeatingBTU(new_input, temperature.value);
          } else {
            temperature.id = "temp-empty";
          }

          //Assign BTU values
          if (coolactcap) {coolactcap.value = cool_retval};
          if (heatactcap) {heatactcap.value = heat_retval};
        } else {
          DropNote('tr',`Invalid Input: ${new_input.value}`,'yellow')
        }
      });

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
