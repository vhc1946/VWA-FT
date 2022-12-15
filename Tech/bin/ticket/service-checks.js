import {CheckListForm} from '../forms/checklist-form.js';
import {VHCform} from '../repo/tools/vhc-forms.js';
import { DropNote } from '../repo/modules/vg-dropnote.js';
import {ViewGroup} from '../repo/layouts/view-controller.js';

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
var coolingdom = {
    cont: 'cooling-rewards',
    inputs: {
        in_cool_densityalt: 'densityalt',
        in_cool_wbentering: 'wbentering',
        in_cool_wbleaving: 'wbleaving',
        in_cool_dbentering: 'dbentering',
        in_cool_dbleaving: 'dbleaving',
        in_cool_tempdrop: 'tempdrop',
        ou_cool_sucpress: 'sucpress',
        ou_cool_headpress: 'headpress',
        ou_cool_liqpress: 'liqpress',
        ou_cool_dboutdoor: 'dboutdoor',
        ou_cool_targetsh: 'targetsh',
        ou_cool_actualsh: 'actualsh',
        ou_cool_targetsc: 'targetsc',
        ou_cool_actualsc: 'actualsc',
        ou_cool_ratedamps: 'ratedamps',
        ou_cool_actualamps: 'actualamps',
        ou_cool_condfan: 'condfan',
        ou_cool_condcoil: 'condcoil',
        ou_cool_elecout: 'elecout'
    },
    valids: {}
}
var heatingdom = {
    cont: 'heating-rewards',
    inputs: {
        in_heat_hriserated: 'hriserated',
        in_heat_hriseactual: 'hriseactual',
        in_heat_gpin: 'gpin',
        in_heat_gpouthigh: 'gpouthigh',
        in_heat_gpoutlow: 'gpoutlow',
        in_heat_flmsensor: 'flmsensor',
        in_heat_blowerrated: 'blowerrated',
        in_heat_bloweractual: 'bloweractual',
        in_heat_ignitionop: 'ignitionop',
        in_heat_combustop: 'combustop',
        in_heat_fluesafety: 'fluesafety',
        in_heat_heatex: 'heatex',
        in_heat_inducerops: 'inducerops',
        in_heat_testO2: 'testO2',
        in_heat_testCO: 'testCO',
        in_heat_testeffic: 'testeffic',
        in_heat_testCO2: 'testCO2',
        in_heat_stacktemp: 'stacktemp',
        in_heat_elecin: 'elecin',
        ai_heat_blowerrated: 'blowerrated',
        ai_heat_bloweractual: 'bloweractual'
    },
    valids: {}
}
var systemdom = {
    cont: 'system-info',
    inputs: {
        in_info_indes: 'indes',
        in_info_heatage: 'heatage',
        in_info_heatratedcap: 'heatratedcap',
        in_info_heatactualcap: 'heatactualcap',
        in_info_heatlosteffic: 'heatlosteffic',
        in_info_incondition: 'incondition',
        in_airf_returnstatic: 'returnstatic',
        in_airf_ratedcfm: 'ratedcfm',
        in_airf_buildpress: 'buildpress',
        in_airf_partcount: 'partcount',
        in_airf_filtercond: 'filtercond',
        in_airf_evapcond: 'evapcond',
        in_airf_belttight: 'belttight',
        in_cool_drainclear: 'drainclear',
        in_heat_drainclear: 'drainclear',
        in_heat_hplockout: 'hplockout',
        in_heat_statprog: 'statprog',
        in_acce_humdop: 'humdop',
        in_acce_eacop: 'eacop',
        in_acce_ervop: 'ervop',
        in_acce_uvop: 'uvop',
        in_acce_coop: 'coop',
        ou_info_outdes: 'outdes',
        ou_info_coolage: 'coolage',
        ou_info_coolratedcap: 'coolratedcap',
        ou_info_coolactualcap: 'coolactualcap',
        ou_info_coollosteffic: 'coollosteffic',
        ou_info_outcondition: 'outcondition',
        ou_airf_supplystatic: 'supplystatic',
        ou_airf_actualcfm: 'actualcfm',
        ou_acce_econ: 'econ'
    },
    valids: {}
}

var coolingrewards = `
    <div class="checklist-cont" class="cooling-rewards">
        <div class="section-header">Cooling Rewards</div>
        <div class="section-cont">
            <div class="checklist-indoor">
                <div class="section-header">-Indoor</div>
                <div class="section-cont">
                    <div class="checklist-cooling">
                        <div class="section-header">--Cooling</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Density Altitude</div><input class="densityalt" type="number" placeholder="HARDCODE">
                            </div>
                            <div class="checklist-item">
                                <div>Wet Bulb - Entering</div><input class="wbentering" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Wet Bulb - Leaving</div><input class="wbleaving" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Dry Bulb - Entering</div><input class="dbentering" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Dry Bulb - Leaving</div><input class="dbleaving" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Temperature Drop</div><input class="tempdrop" type="number" placeholder="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checklist-outdoor">
                <div class="section-header">-Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-cooling">
                        <div class="section-header">--Cooling</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Suction Pressure</div><input class="sucpress" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Head Pressure</div><input class="headpress" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Liquid Pressure</div><input class="liqpress" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Dry Bulb - Outdoor</div><input class="dboutdoor" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Target Superheat</div><input class="targetsh" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Actual Superheat</div><input class="actualsh" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Target Subcooling</div><input class="targetsc" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Actual Subcooling</div><input class="actualsc" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Compressor Amps Rated</div><input class="ratedamps" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Compressor Amps Actual</div><input class="actualamps" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Condenser Fan Operation</div><input class="condfan" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Condenser Coil Condition</div><input class="condcoil" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Electrical Connections Secured</div><input class="elecout" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
var heatingrewards = `
    <div class="checklist-cont" class="heating-rewards">
        <div class="section-header">Heating Rewards</div>
        <div class="section-cont">
            <div class="checklist-indoor">
                <div class="section-header">-Indoor</div>
                <div class="section-cont">
                    <div class="checklist-heating">
                        <div class="section-header">--Heating</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Heat Rise - Rated</div><input class="hriserated" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Heat Rise - Actual</div><input class="hriseactual" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Gas Pressure - Inlet</div><input class="gpin" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Gas Pressure - Outlet High Stage</div><input class="gpouthigh" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Gas Pressure - Outlet Low Stage</div><input class="gpoutlow" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Flame Sensor Current</div><input class="flmsensor" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Blower Amp Rated</div><input class="blowerrated" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Blower Amp Actual</div><input class="bloweractual" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Ignition Operation</div><input class="ignitionop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Operation</div><input class="combustop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Flue Safety</div><input class="fluesafety" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Heat Exchanger</div><input class="heatex" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Inducer Motor Operations</div><input class="inducerops" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Test O2</div><input class="testO2" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Test CO</div><input class="testCO" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Test Efficiency</div><input class="testeffic" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Test CO2</div><input class="testCO2" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Combustion Test Stack Temp</div><input class="stacktemp" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Electrical Connections Secured</div><input class="elecin" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="checklist-airflow">
                    <div class="section-header">-Airflow</div>
                    <div class="section-cont">
                        <div class="checklist-item">
                            <div>Blower Amp Rated</div><input class="blowerrated" type="number" placeholder="">
                        </div>
                        <div class="checklist-item">
                            <div>Blower Amp Actual</div><input class="bloweractual" type="number" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
var systeminfo = `
    <div class="checklist-cont" class="system-info">
        <div class="section-header">System Info</div>
        <div class="section-cont">
            <div class="checklist-indoor">
                <div class="section-header">-Indoor</div>
                <div class="section-cont">
                    <div class="checklist-info">
                        <div class="section-header">--Info</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>System Designation</div><input class="indes" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Heating System Age</div><input class="heatage" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Rated Capacity</div><input class="heatratedcap" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Actual Capacity</div><input class="heatactualcap" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Lost Efficiency</div><input class="heatlosteffic" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>System Condition</div><input class="incondition" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-airflow">
                        <div class="section-header">--Airflow</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Return Air Static</div><input class="returnstatic" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Rated CFM</div><input class="ratedcfm" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Building Pressure</div><input class="buildpress" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Particle Count</div><input class="partcount" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Filters Condition</div><input class="filtercond" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Evaporator Coil Condition</div><input class="evapcond" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Belt Tight</div><input class="belttight" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-cooling">
                        <div class="section-header">--Cooling</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Drain Clear & Secure</div><input class="drainclear" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-heating">
                        <div class="section-header">--Heating</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Drain Clear & Secure</div><input class="drainclear" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Heat Pump Lockout Temperature</div><input class="hplockout" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Thermostat Programmed</div><input class="statprog" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-access">
                        <div class="section-header">--Accessories</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Humidifier Operations</div><input class="humdop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Whole Home Air Cleaner</div><input class="eacop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Energy Recovery Ventilator</div><input class="ervop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Anti Microbial Lamp System</div><input class="uvop" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>CO Sensor </div><input class="coop" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checklist-outdoor">
                <div class="section-header">-Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-info">
                        <div class="section-header">--Info</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>System Designation</div><input class="outdes" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Cooling System Age</div><input class="coolage" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Rated Capacity</div><input class="coolratedcap" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Actual Capacity</div><input class="coolactualcap" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Lost Efficiency</div><input class="coollosteffic" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>System Condition</div><input class="outcondition" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-airflow">
                        <div class="section-header">--Airflow</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Supply Air Static</div><input class="supplystatic" type="number" placeholder="">
                            </div>
                            <div class="checklist-item">
                                <div>Actual CFM</div><input class="actualcfm" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="checklist-access">
                        <div class="section-header">--Accessories</div>
                        <div class="section-cont">
                            <div class="checklist-item">
                                <div>Economizer</div><input class="econ" placeholder="Choose One">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`


var checklists = {
  doms:{
    system:systemdom,
    cooling:coolingdom,
    heating:heatingdom
  },
  contents:{
    system:systeminfo,
    cooling:coolingrewards,
    heating:heatingrewards
  }
}

export class ServiceChecks{
  constructor(checks=[]){
    let cont = document.createElement('div');
    //cont.id='check-cont';
    this.view = new ViewGroup({
      cont:cont,
      type:'mtr',
      qactions:{
        'div':{
          children:{
            '.si-menu-buttons.div':{
              attributes:{},
              children:{
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
                        '.si-add-input-system.checkbox':{
                          attributes:{
                            class: 'si-add-input-system',
                          },
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
    console.log(checks);
    if(!checks==undefined||checks.length===0){
      console.log('No Checks')
      this.ADDgroup('System 1');
    }else{
      for(let x=0;x<checks.length;x++){ //INIT checks
        let agroup = {};
        for(let cl in checks[x]){
          if(checklists.contents[cl]){
            agroup[cl]=checks[x][cl];
          }else{console.log('bad list')}
        }
        this.ADDgroup(checks[x].name,agroup);
      }
    }

    //Quick actions events
    this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{
      this.TOGGLEaddinput();
    });
    this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
      let name = this.view.cont.getElementsByClassName('si-add-input')[0];

      

      if(name.value != ''){
        DropNote('tr',`Adding ${name.value}`);


        this.ADDgroup(name.value);

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

    this.forms = [];
    for(let c in group){
      this.forms.push(new CheckListForm(document.createElement('div'),checklists.contents[c],checklists.doms[c]));
      cview.ADDview(c,this.forms[this.forms.length-1].cont);
      this.forms[this.forms.length-1].form=group[c];
    }
    this.view.ADDview(name,cview.cont, true);
  }
  //REMOVEgroup(){}

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
