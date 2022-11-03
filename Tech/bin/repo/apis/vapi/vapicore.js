
var SENDrequest = (url,app,pack)=>{
  return new Promise((res,rej)=>{
    console.log(33);
    var options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access:{
          coid:'01',
          app:app,
          user:'VOGCH',
          pswrd:'vogel321'
        },
        pack:pack
      })
    }
    fetch(url,options)
    .then(response=>{return response.json()})
    .then(
      data=>{return res(data);}
    )
    .catch(err=>{console.log(err);})
  });
}

export {
  SENDrequest
}
