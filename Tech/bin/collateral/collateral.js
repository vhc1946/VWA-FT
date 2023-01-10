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
console.log("Ticket from collateral::::", ticket)
var summary = window.opener.summary;
ticket.wo.location = ticket.wo.street;
ticket.wo.jstreet = ticket.wo.street;
ticket.wo.jcity = ticket.wo.cityzip;
ticket.wo.invdate = new Date().toLocaleDateString();
var price = 0;
if (ticket.wo.pricelevel == "STA") {
    price = window.opener.regprice
} else {
    price = window.opener.memberprice
}

/**
 * CREATE CHECKLIST FORM
 */
//Loop through each summary
for (let i = 0; i < summary.length; i++){
    var checksum = new CollateralForm(document.createElement('div'),new SummaryCheckList(summary[i].summary.content, summary[i].name));
    document.body.appendChild(checksum.cont);
    document.getElementsByClassName(checksum.dom.info.street)[i].innerText = ticket.wo.street;
    document.getElementsByClassName(checksum.dom.info.cityzip)[i].innerText = ticket.wo.cityzip;
}

/**
 * CREATE REWARD SUMMARY FORM
 */
var summaryform = new CollateralForm(document.createElement('div'), basicsummary);
document.body.appendChild(summaryform.cont);

//Append the repair table clone to the form
document.getElementsByClassName(summaryform.dom.repairs.repairtable)[0].appendChild(repairtable)

//Loop through each contract option and grab its value
let options = contractopts.getElementsByClassName("present-contract-opt")
let results = []
for (let i = 0; i < options.length; i++){
    let children = options[i].children;
    if (children[1].type == "checkbox") {
        results.push(children[1].checked)
    } else {
        results.push(children[1].value)
    }
}

//Loop through the labels on the the forms and assign contract values
let rewardLabels = document.getElementById('summary-objects').getElementsByTagName('div');
for (let i = 0; i < rewardLabels.length; i++){
    //Check if true or false for checkbox tag
    if (i == 0) {
        if (results[i] == true){
            rewardLabels[i].innerText = ticket.wo.pricelevel;
        } else {
            rewardLabels[i].innerText = "No Plan Selected"
        }
    } else {
        rewardLabels[i].innerText = results[i]
    }
}


/**
 * CREATE INVOICE FORM
 */
var invoice = new CollateralForm(document.createElement('div'),basicinvoice);
console.log(invoice)
document.body.appendChild(invoice.cont);
for(let i in invoice.dom.info){
    if(ticket.wo[i]){
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = ticket.wo[i];
        if (document.getElementsByClassName(summaryform.dom.info[i])[0]) {
            document.getElementsByClassName(summaryform.dom.info[i])[0].innerText = ticket.wo[i];
        }
    }else{
        if (invoice.dom.info[i] == "invoice-info-total") {
            document.getElementsByClassName(invoice.dom.info[i])[0].innerText = price;
        } else {
            document.getElementsByClassName(invoice.dom.info[i])[0].innerText = '';
        }
    }
}
//Add repairs to invoice
var invrepairs = repairtable.cloneNode(true);
invrepairs.id = "wo-present-system-invoice";
document.getElementsByClassName(invoice.dom.repairs.repairtable)[0].appendChild(invrepairs)