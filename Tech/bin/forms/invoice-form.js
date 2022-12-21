import { VHCform } from "../repo/tools/vhc-forms";


export class InvoiceForm extends VHCform{
    constructor(cont,info){
      super(cont);
      this.cont.innerHTML = info.contents;
      this.dom = info.dom;
      this.setinputs(info.dom.inputs)
    }
}
