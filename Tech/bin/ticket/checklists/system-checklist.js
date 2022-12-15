let dom = {
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
let contents = `
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
                                  <div>System Designation</div><input class="${dom.inputs.in_info_indes}" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Heating System Age</div><input class="${dom.inputs.in_info_heatage}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated Capacity</div><input class="${dom.inputs.in_info_heatratedcap}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Actual Capacity</div><input class="${dom.inputs.in_info_heatactualcap}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Lost Efficiency</div><input class="${dom.inputs.in_info_heatlosteffic}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>System Condition</div><input class="${dom.inputs.in_info_incondition}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-airflow">
                          <div class="section-header">--Airflow</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Return Air Static</div><input class="${dom.inputs.in_airf_returnstatic}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated CFM</div><input class="${dom.inputs.in_airf_ratedcfm}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Building Pressure</div><input class="${dom.inputs.in_airf_buildpress}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Particle Count</div><input class="${dom.inputs.in_airf_partcount}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Filters Condition</div><input class="${dom.inputs.in_airf_filtercond}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Evaporator Coil Condition</div><input class="${dom.inputs.in_airf_evapcond}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Belt Tight</div><input class="${dom.inputs.in_airf_belttight}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-cooling">
                          <div class="section-header">--Cooling</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Drain Clear & Secure</div><input class="${dom.inputs.in_cool_drainclear}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-heating">
                          <div class="section-header">--Heating</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Drain Clear & Secure</div><input class="${dom.inputs.in_heat_drainclear}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Pump Lockout Temperature</div><input class="${dom.inputs.in_heat_hplockout}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Thermostat Programmed</div><input class="${dom.inputs.in_heat_statprog}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-access">
                          <div class="section-header">--Accessories</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Humidifier Operations</div><input class="${dom.inputs.in_acce_humdop}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Whole Home Air Cleaner</div><input class="${dom.inputs.in_acce_eacop}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Energy Recovery Ventilator</div><input class="${dom.inputs.in_acce_ervop}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>Anti Microbial Lamp System</div><input class="${dom.inputs.in_acce_uvop}" placeholder="Choose One">
                              </div>
                              <div class="checklist-item">
                                  <div>CO Sensor </div><input class="${dom.inputs.in_acce_coop}" placeholder="Choose One">
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
                                  <div>System Designation</div><input class="${dom.inputs.ou_info_outdes}" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Cooling System Age</div><input class="${dom.inputs.ou_info_coolage}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Rated Capacity</div><input class="${dom.inputs.ou_info_coolratedcap}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Actual Capacity</div><input class="${dom.inputs.ou_info_coolactualcap}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Lost Efficiency</div><input class="${dom.inputs.ou_info_coollosteffic}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>System Condition</div><input class="${dom.inputs.ou_info_outcondition}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-airflow">
                          <div class="section-header">--Airflow</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Supply Air Static</div><input class="${dom.inputs.ou_airf_supplystatic}" type="number" placeholder="">
                              </div>
                              <div class="checklist-item">
                                  <div>Actual CFM</div><input class="${dom.inputs.ou_airf_actualcfm}" placeholder="">
                              </div>
                          </div>
                      </div>
                      <div class="checklist-access">
                          <div class="section-header">--Accessories</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Economizer</div><input class="${dom.inputs.ou_acce_econ}" placeholder="Choose One">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `

  export var systemchecks ={
    dom:dom,
    contents:contents
}