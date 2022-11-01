import {wolstore} from '../../js/lstore.js';
import {dashdom,wodom} from '../bin/back/ticket-dom.js';


import {DropNote} from '../bin/repo/js/vg-poppers.js';


//var curwo = new ServiceWO(JSON.parse(localStorage.getItem(wolstore.currentwo))); //set the current WO to null

var DELETEwo = (wonum=null)=>{
  if(wonum){
    let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
    let nwolist = [];
    for(let x=0;x<wolist.length;x++){
      if(wolist[x].num!=wonum){
        nwolist.push(wolist[x]);
      }
    }
    localStorage.setItem(wolstore.techwo,JSON.stringify(nwolist));
    LOADwolist();
  }
}
//WO Number CHANGE
document.getElementById(wodom.info.num).addEventListener('change', (ele) => { //WO number input change
    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
        curwo.SAVEwo();
        LOADwolist();
    }
});

//PRINT Button
document.getElementById('wo-save').addEventListener('click', (ele) => {
    window.print();
});

document.getElementById(wodom.action.save).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  LOADwolist();
  console.log('WO saved...',curwo.wo);
  DropNote('tr','WO Saved!','green');
});
document.getElementById(wodom.action.close).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  curwo.LOADwo();
  DropNote('tr','WO Saved!','green');
  DropNote('tr','WO Closed..','yellow');
});
document.getElementById(wodom.action.delete).addEventListener('click',(ele)=>{
  DELETEwo(curwo.wo.num);
  curwo.LOADwo();
  DropNote('tr','WO Deleted..','red');
});


/* Navbar Testing */
var prevScrollpos = window.pageYOffset; // Set initial screen position
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) { //  Checks if the user has scolled UP
    document.getElementsByClassName("header-bar")[0].style.top = "0";
  } else {
    document.getElementsByClassName("header-bar")[0].style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}