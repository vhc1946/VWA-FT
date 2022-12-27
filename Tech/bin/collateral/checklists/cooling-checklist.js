const dom={
    cont: 'cooling-rewards',
    fields: {
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

const content=`
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
                              <div>Density Altitude</div><input class="${dom.fields.in_cool_densityalt}" type="number" placeholder="HARDCODE">
                          </div>
                          <div class="checklist-item">
                              <div>Wet Bulb - Entering</div><input class="${dom.fields.in_cool_wbentering}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Wet Bulb - Leaving</div><input class="${dom.fields.in_cool_wbleaving}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Dry Bulb - Entering</div><input class="${dom.fields.in_cool_dbentering}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Dry Bulb - Leaving</div><input class="${dom.fields.in_cool_dbleaving}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Temperature Drop</div><input class="${dom.fields.in_cool_tempdrop}" type="number">
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
                              <div>Suction Pressure</div><input class="${dom.fields.ou_cool_sucpress}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Head Pressure</div><input class="${dom.fields.ou_cool_headpress}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Liquid Pressure</div><input class="${dom.fields.ou_cool_liqpress}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Dry Bulb - Outdoor</div><input class="${dom.fields.ou_cool_dboutdoor}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Target Superheat</div><input class="${dom.fields.ou_cool_targetsh}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Actual Superheat</div><input class="${dom.fields.ou_cool_actualsh}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Target Subcooling</div><input class="${dom.fields.ou_cool_targetsc}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Actual Subcooling</div><input class="${dom.fields.ou_cool_actualsc}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Compressor Amps Rated</div><input class="${dom.fields.ou_cool_ratedamps}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Compressor Amps Actual</div><input class="${dom.fields.ou_cool_actualamps}" type="number">
                          </div>
                          <div class="checklist-item">
                              <div>Condenser Fan Operation</div><input class="${dom.fields.ou_cool_condfan}" type='search' placeholder="Choose One" list='wear-tear'>
                          </div>
                          <div class="checklist-item">
                              <div>Condenser Coil Condition</div><input class="${dom.fields.ou_cool_condcoil}" type='search' placeholder="Choose One" list='cond-condition'>
                          </div>
                          <div class="checklist-item">
                              <div>Electrical Connections Secured</div><input class="${dom.fields.ou_cool_elecout}" type='search' placeholder="Choose One" list='needs-repairs'>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

    <datalist id='cond-condition'>
        <option value='Clean'>
        <option value='Needs Cleaning'>
        <option value='Leak Detected'>
        <option value='Damaged'>
    </datalist>
    <datalist id='wear-tear'>
        <option value='Operational'>
        <option value='Worn & Doubtful'>
        <option value='Failed'>
        <option value='Failed - Furnace Tagged'>
        <option value='Recommended'>
    </datalist>
    <datalist id='needs-repairs'>
        <option value='Yes'>
        <option value='Repairs Needed'>
    </datalist>

`
export var coolingchecks ={
    dom:dom,
    content:content
}
  