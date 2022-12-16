import { awo } from "../wos/vogel-wos.js";
import { aservicecontract } from "../contracts/vogel-servicecontracts.js";

var aserviceticket=(st={})=>{
  if(!st){st={};}
  return{
    wo:awo(st.wo),
    contract:aservicecontract(st.contract),
    checks:st.checks||{},
    sitems:st.sitems||[],
    repairs:st.repairs||[]
  }
}

export {
  awo, aservicecontract, aserviceticket
}