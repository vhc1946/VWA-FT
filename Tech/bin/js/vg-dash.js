

import {wolstore} from './lstore.js';
import {dashdom,wodom} from '../back/ticket-dom.js';
import {ServiceWO} from '../back/sticket-build.js';

import {DropNote} from '../repo/js/vg-poppers.js';
import {FINDparentele} from '../repo/js/vg-displaytools.js';

//import {ADDmactions,ADDqactions} from '../repo/js/vg-titlebar.js';

import {CreateComponent} from '../repo/tools/vhc-components.js';

var tdom = {
  '#firstid.div':{
    attributes:{
      class:'some class'
    },
    children:{
      '.firstclass.div':{
        attributes:{
          class:'someclass andanother'
        }
      }
    }
  }
}

document.body.appendChild(CreateComponent(tdom));


var RROOT='../bin/repo/';



var LOADwolist = ()=>{   //Loads WO list into display table
    let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
    let dlist = document.getElementById(dashdom.list.cont);
    dlist.innerHTML = '';
    if(wolist){
        for(let x=0;x<wolist.length;x++){
            let item = document.createElement('div');
            item.classList.add(dashdom.list.item.cont);

            item.appendChild(document.createElement('div')).innerText = wolist[x].num;
            item.lastChild.classList.add(dashdom.list.item.num);

            item.appendChild(document.createElement('div')).innerText = wolist[x].name;
            item.lastChild.classList.add(dashdom.list.item.name);

            item.appendChild(document.createElement('div')).innerText = wolist[x].address;
            item.lastChild.classList.add(dashdom.list.item.address);

            dlist.appendChild(item);
        }
        dlist.addEventListener('click', (ele)=>{
            var row = FINDparentele(ele.target,dashdom.list.item.cont);
            if(row){
                //Open de WO!
                DropNote('tr',`WO # ${row.children[0].innerText} Loaded..`,'green');
            }

        });
    }
}

LOADwolist();
