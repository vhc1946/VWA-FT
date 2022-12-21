import { VHCform } from "../repo/tools/vhc-forms.js";



export class CollateralForm extends VHCform{
    constructor(cont,info){
        super(cont);
        this.cont.innerHTML = info.contents;
        this.dom = info.dom;
        this.setinputs(info.dom.info||{});
      }
}

