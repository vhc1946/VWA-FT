import { CollateralForm } from "../forms/collateral-form.js";
import { summarychecks } from "./checklists/summary-checklist.js";
import { basicinvoice } from "./invoices/basic-invoice.js";



//generate presentation printout

var ticket = window.opener.data;
ticket.wo.location = ticket.wo.street;
ticket.wo.jstreet = ticket.wo.street;
ticket.wo.jcity = ticket.wo.cityzip;
ticket.wo.invdate = new Date().toLocaleDateString();

var checksum = new CollateralForm(document.createElement('div'),summarychecks);
document.body.appendChild(checksum.cont);
for(let i in checksum.dom.info){
    //document.getElementsByClassName(checksum.dom.info[i])[0].innerText = "Testing";
}

var invoice = new CollateralForm(document.createElement('div'),basicinvoice);
document.body.appendChild(invoice.cont);
for(let i in invoice.dom.info){
    if(ticket.wo[i]){
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = ticket.wo[i];
    }else{
        document.getElementsByClassName(invoice.dom.info[i])[0].innerText = '';
    }
}