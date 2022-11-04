


var SENDrequest = (url,app,pack)=>{
  return new Promise((res,rej)=>{
    var options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access:{
          user:'VOGCH',
          pswrd:'vogel321',
          coid:'01',
          request:'japi',
          app:app
        },
        pack:pack
      })
    }
    fetch(url,options)
    .then(response=>{return response.json()})
    .then(data=>{return res(data);})
    .catch(err=>{console.log(err);})
  });
}

export {
  SENDrequest
}
