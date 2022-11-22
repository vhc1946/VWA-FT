var dom = {
    cont: 'checklist-cont',
    info: 'checklist-info',
    cool: 'checklist-cooling',
    heat: 'checklist-heating',
    airflow: 'checklist-airflow',
    access: 'checklist-access',
    indoor: 'checklist-indoor',
    outdoor: 'checklist-outdoor'
}

var HideAll=()=>{
    let hide = document.getElementsByClassName('section-cont');
    for (let i=0;i<hide.length;i++){
        $(hide[i]).hide();
    }
}
var Clicktoclose=()=>{
    for (let ea in dom){
        let box = document.getElementsByClassName(dom[ea]);
        for (let i=0;i<box.length;i++){
            box[i].getElementsByClassName('section-header')[0].addEventListener('click', (ele)=>{
                $(box[i].getElementsByClassName('section-cont')[0]).toggle();
            });
        }
    }
}

HideAll();
Clicktoclose();

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
    <div class="checklist-cont" id="heating-rewards">
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
    <div class="checklist-cont" id="system-info">
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
                                <div>Humidifier Operations</div><input class="humd-op" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Whole Home Air Cleaner</div><input class="eac-op" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Energy Recovery Ventilator</div><input class="erv-op" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>Anti Microbial Lamp System</div><input class="uv-op" placeholder="Choose One">
                            </div>
                            <div class="checklist-item">
                                <div>CO Sensor </div><input class="co-op" placeholder="Choose One">
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