
//conversion used in vapi
export var ajflatrateitem=(fi={})=>{
  if(!fi){fi={}}
  return{
    book:fi.FlatRateBookCode || '',
    task:fi.TaskID || '',
    descr:fi.Description || '',
    pl:fi.PriceLevelCode ||'',
    price:fi.SellingPrice || ''
  }
}

//Flatrate table item
export var aflatrateitem=(fi={})=>{
  if(!fi){fi={}}
  return{
    book:fi.book || '',
    task:fi.task || '',
    descr:fi.descr || '',
    pl:fi.pl ||'',
    price:fi.price || ''
  }
}

//Flatrate repair
export var aflatrepair=(fr={})=>{
  if(!fr){fr={}}
  return{
    book:fi.book || '',
    task:fi.task || '',
    descr:fi.descr || '',
    pl:fi.pl || '',
    price:fi.price||'',
    qty:fi.qty||0,
    appr:fi.appr||false
  }
}
