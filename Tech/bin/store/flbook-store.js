var fbdb;
var ftable = JSON.parse(localStorage.getItem('flbook'));
import {IDBinterface} from '../repo/storage/IDBinterface.js';

var fbdbsetup =(db)=>{
  let ostore = db.createObjectStore('books',{
    autoIncrement:true
  });
}
export var fbstore = new IDBinterface('jonas-flatratebook','books',fbdbsetup);

fbstore.REFRESHstore=function(){
  console.log(this.list.list);
}
