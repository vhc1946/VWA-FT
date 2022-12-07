import {VHCform} from '../../repo/tools/vhc-forms.js';
import {DropNote} from '../../repo/modules/vg-dropnote.js';

var logurl = 'https://localHost:5000/login'; //'https://18.191.134.244:5000/login';//
class LoginForm extends VHCform{
    constructor(cont,logineve=()=>{}){
        super(cont);
        this.cont.innerHTML=this.content;

        this.inputs.user=document.getElementById(this.dom.inputs.user);
        this.inputs.pswrd=document.getElementById(this.dom.inputs.pswrd);

        this.permission=false;

        let creds=this.storecreds;
        if(creds && creds.user!=''||creds.pswrd!=''){
        this.form=creds;
        this.submit().then(
            result=>{
            if(result.success){
                this.permission=true;
                $(this.cont).hide();
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
                logineve(this.storecreds);
            }else{//login failed
                DropNote('tr','User or Password Failed','yellow');
                this.permission=false;
                this.form={user:"",pswrd:""};//reset form
            }
            this.storecreds=this.form;//reset store
            }
        )
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
        submit:'login-submit'
        }
    }

    content=`
        <div id=${this.dom.cont}>
        <div id=${this.dom.info}>
            <label>User</label><input id=${this.dom.inputs.user} type="text"/>
            <label>Password</label><input id=${this.dom.inputs.pswrd} type="password"/>
            <div id=${this.dom.actions.submit} class="flat-action-button">SUBMIT</div>
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
        console.log(this.form)
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
        3
        });
    }
}

export {LoginForm}
