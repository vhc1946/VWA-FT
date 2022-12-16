import { VHCform } from "../repo/tools/vhc-forms";



export class InvoiceForm extends VHCform{
    constructor(cont,content){
        super(cont);
        this.cont.innerHTML = content;
      }
}

