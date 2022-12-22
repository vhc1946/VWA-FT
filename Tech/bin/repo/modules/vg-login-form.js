import {VHCform} from '../../repo/tools/vhc-forms.js';
import {DropNote} from '../../repo/modules/vg-dropnote.js';

var logurl = 'https://18.191.134.244:5000/login';//'https://localHost:5000/login'; //
class LoginForm extends VHCform{
    constructor(cont,logieve=()=>{},logoeve=()=>{}){
        super(cont);
        this.cont.innerHTML=this.content;

        this.inputs.user=document.getElementById(this.dom.inputs.user);
        this.inputs.pswrd=document.getElementById(this.dom.inputs.pswrd);

        this.permission=false;

        let creds=this.storecreds;
        if(creds && creds.user!=''||creds.pswrd!=''){
        console.log(creds);
          this.form=creds;
          this.submit().then(
            result=>{
            if(result.success){
                this.permission=true;
                $(this.cont).hide();
                logieve(this.storecreds);
            }
            else{this.form=undefined;}//reset form
              this.storecreds=this.form;//store result
            }
        )
        }else{this.storecreds=undefined}

        document.getElementById(this.dom.actions.submit).addEventListener("click",(ele)=>{
          this.submit().then(
              result=>{
              if(result.success){
                  DropNote('tr','Logged in','green');
                  this.permission=true;
                  $(this.cont).hide();
                  logieve(this.storecreds);
              }else{//login failed
                  DropNote('tr','User or Password Failed','yellow');
                  this.permission=false;
                  this.form={user:"",pswrd:""};//reset form
              }
              this.storecreds=this.form;//reset store
              }
          )
        });
        document.getElementById(this.dom.actions.logout).addEventListener("click",(ele)=>{
          this.form = undefined;
          this.storecreds = this.form;
          logoeve();//do passed down event
        });
        document.getElementById(this.dom.actions.gotovapi).addEventListener('click',(ele)=>{
          window.open('https://18.191.134.244:5000/');
        });
        for(let i in this.inputs){
        this.inputs[i].addEventListener('keypress',(eve)=>{
            if(eve.key == 'Enter'){document.getElementById(this.dom.actions.submit).click();};
        });
        }
    }

    dom={
        cont:'login-box',
        info:'login-info',
        inputs:{
          user:'login-username',
          pswrd:'login-password'
        },
        actions:{
          submit:'login-submit',
          logout:'logiout-button',
          gotovapi:'gotovapi-button'
        }
    }

    content=`
        <div id=${this.dom.cont}>
        <div id=${this.dom.info}>
            <label>User</label><input id=${this.dom.inputs.user} type="text"/>
            <label>Password</label><input id=${this.dom.inputs.pswrd} type="password"/>
            <div class = "action-buttons-div">
              <div class = "login-action-button" id=${this.dom.actions.submit} class="flat-action-button">SUBMIT</div>
              <div class = "login-action-button" id=${this.dom.actions.logout} class="flat-action-button">LOGOUT</div>
              <img id="${this.dom.actions.gotovapi}" src="bin/repo/assets/icons/badge.png" />
            </div>
        </div>
        </div>
    `

    get storecreds(){
        try{
          let creds=JSON.parse(localStorage.getItem('vapi-user'));
          if(creds){return creds;}
          else{return {user:'',pswrd:''};}
        }catch{return {user:'',pswrd:''};}
    }
    set storecreds(creds={user:'',pswrd:''}){localStorage.setItem('vapi-user',JSON.stringify(creds))}

    validate(){
        let frm = this.form;
        if(frm.user!=''||frm.pswrd!=''){return true;}
        else{return false;}
    }
    submit(){
      console.log('here');
      return new Promise((resolve,reject)=>{
      let {user,pswrd} = this.form;
      this.storecreds=this.form;
      if(user!=''||pswrd!=''){
          var options={
          method:'POST',
          headers:{
            'Accept':'application/json'
          },
          body:JSON.stringify({access:{user:user,pswrd:pswrd}})
          }
          fetch(logurl,options)
          .then(response=>{return response.json()})
          .then(data=>{return resolve(data);})
          .catch(err=>{console.log(err);})
      }else{return resolve({success:false});}
      });
    }
}

export {LoginForm}
