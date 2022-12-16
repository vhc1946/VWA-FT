

//import awo
export var aserviceticket=(st={})=>{
  if(!st){st={};}
  return{
    wo:awo(st.wo),
    contract:st.contract||null,
    checks:st.checks||{},
    sitems:st.sitems||[],
    repairs:st.repairs||[]
  }
}

export{
  awo
}
