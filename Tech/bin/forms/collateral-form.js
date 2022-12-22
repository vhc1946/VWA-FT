import { VHCform } from "../repo/tools/vhc-forms.js";



export class CollateralForm extends VHCform{
    constructor(cont,info){
        super({
          cont:cont,
          content:info.contents,
          fields:info.dom.info,
        });
        
        this.dom = info.dom;

        //loop through info.dom.info
      }
}
