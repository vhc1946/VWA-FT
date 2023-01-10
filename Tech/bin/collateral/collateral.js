import { CollateralForm } from "../forms/collateral-form.js";
import { SummaryCheckList } from "./checklists/summary-checklist.js";
import { basicinvoice } from "./invoices/basic-invoice.js";
import { coolingchecks } from '../collateral/checklists/cooling-checklist.js';
import { heatingchecks } from '../collateral/checklists/heating-checklist.js';
import { systemchecks } from '../collateral/checklists/system-checklist.js';
import { summarychecks } from '../collateral/checklists/summary-checklist.js';
import { basicsummary } from "./presentationsummary/presentationsummary.js";


//generate presentation printout

var ticket = window.opener.data;
var summary = window.opener.summary;
var repairtable = window.opener.repairtable;
const contractopts = window.opener.contractopt;
repairtable.id = "wo-present-system-summary"
console.log("Ticker from collateral::::", ticket)
var summary = window.opener.summary;
ticket.wo.location = ticket.wo.street;
ticket.wo.jstreet = ticket.wo.street;
ticket.wo.jcity = ticket.wo.cityzip;
ticket.wo.invdate = new Date().toLocaleDateString();

//Loop through each summary
for (let i = 0; i < summary.length; i++){
    var checksum = new CollateralForm(document.createElement('div'),new SummaryCheckList(summary[i].summary.content, summary[i].name));
    document.body.appendChild(checksum.cont);
}

var summaryform = new CollateralForm(document.createElement('div'), basicsummary);
document.body.appendChild(summaryform.cont);

//Loop through repair items
//Add the header for the current service item
console.log(summaryform.dom)
document.getElementsByClassName(summaryform.dom.repairs.repairtable)[0].appendChild(repairtable)
//Add rewards summary
let options = contractopts.getElementsByClassName("present-contract-opt")
let results = []
for (let i = 0; i < options.length; i++){
    let children = options[i].children;
    results.push(children[1].value)
    console.log(children[1], children[1].value)
}

let rewardLabels = document.getElementById('summary-objects').getElementsByTagName('div');
for (let i = 0; i < rewardLabels.length; i++){
    if (results[i] == 'on'){
        rewardLabels[i].innerText = ticket.wo.pricelevel;
    } else if (results[i] == 'off') {
        rewardLabels[i].innerText = "No Plan Selected"
    } else {
        rewardLabels[i].innerText = results[i]
    }
    console.log(rewardLabels[i], results[i])
}



var invoice = new CollateralForm(document.createElement('div'),basicinvoice);
console.log(invoice)
document.body.appendChild(invoice.cont);
for(let i in invoice.dom.info){
    if(ticket.wo[i]){
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = ticket.wo[i];
    }else{
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = '';
    }
}
//Add repairs to invoice
var invrepairs = repairtable.cloneNode(true);
invrepairs.id = "wo-present-system-invoice";
document.getElementsByClassName(invoice.dom.repairs.repairtable)[0].appendChild(invrepairs)