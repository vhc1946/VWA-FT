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
