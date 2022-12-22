
export class VHCform{
  constructor({cont=document.createElement('div'),dom={},content='',data={},datamap=(d)=>{return d}}){
    this.cont=cont;
    this.content=content;
    this.dom=dom;
    this.fields=this.setfields(this.dom.fields||{});
    this.datamap=datamap;
    this.data=this.datamap(data);

    this.cont.innerHTML=this.content;
  }

  set form(updates={}){
    let setformloop=(update,data,fields)=>{
      for(let u in update){
        if(data[u]){ //check if part of structure
          if(update[u].keys){
            if(update[u].keys.length!==0){setformloop(updata[u],data[u],fields[u])}
          }else{ // update data and field
            data[u]=update[u];
            try{
              if(fields[u]){
                switch(fields[u].tagName){
                  case 'INPUT':{fields[u].value=update[u]?update[u]:'';break;}
                  case 'TEXTAREA':{fields[u].value=update[u]?update[u]:'';break;}
                  default:{fields[u].innerText = update[u]?update[u]:'';}
                }
              }
            }catch{console.log(`${u} is not setup in the form`)}
          }
        }
      }
    }
    this.setformloop(updates,this.data,this.fields);
  }

  get form(){
    let getformloop=(data,fields)=>{
      for(let u in fields){
        if(this.fields[u]){
          if(this.fields[u].keys){
            if(this.fields[u].keys.length===0){return getformloop(data[u],fields[u])}
          }else{
            try{
              switch(this.fields[i].tagName){
                case 'INPUT':{data[u]=this.fields[u].value;break;}
                case 'TEXTAREA':{data[u]=this.fields[u].value;break;}
                default:{data[u]=this.fields[u].innerText;break;}
              }
            }catch{console.log(`${u} failed to get from form`);}
          }
        }
      }
      return this.data;
    }
    return getformloop(this.data,this.fields);
  }

  switch(){}
  validate(){return true}
  submit(){return this.validate()?this.form:null}

  setfields(fields){
    for(let f in fields){
      try{this.fields[i]=this.cont.getElementsByClassName(fields[f])[0];}
      catch{console.log(`Class ${f} is not declared in Form ${this.cont} it has been left out of this.inputs`)}
    }
  }
}
