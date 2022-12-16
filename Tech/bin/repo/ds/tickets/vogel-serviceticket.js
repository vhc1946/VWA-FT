export var aserviceticket=(st={})=>{
  if(!st){st={};}
  return{
    wo:st.wo||null,
    contract:st.contract||null,
    checks:st.checks||{},
    sitems:st.sitems||[],
    repairs:st.repairs||[]
  }
}
