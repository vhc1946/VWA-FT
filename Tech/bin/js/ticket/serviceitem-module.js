/* Service Item Module
    Responsible for:
    - Adding service items to view
    - linking all service item's info to one
    - linking service item repairs to one fo
*/
import {ViewGroup} from '../../repo/layouts/view-controller.js';
import {SIform} from './serviceitem-form.js';
import {SETUPchecklist} from './checklists.js';
import {SETUPrepairs} from './repairlist.js';

//repairs table


export var SETUPserviceitems=(group,items,repairs)=>{
  // Inserts Add and Delete buttons into Items Menu
  let qckbox = group.cont.getElementsByClassName('viewcontrol-menubox')[0].appendChild(document.createElement('div'));
  qckbox.classList.add('si-menu-buttons');
  qckbox.appendChild(document.createElement('img')).src = '../bin/repo/assets/icons/trash.png';
  qckbox.lastChild.id = 'si-delete';
  qckbox.appendChild(document.createElement('img')).src = '../bin/repo/assets/icons/add.png';
  qckbox.lastChild.id = 'si-add';

  let sitemforms = [];
  let repairforms = [];

  for(let i=0;i<items.length;i++){
    let sitemview = new ViewGroup({
      type:'mtr',
      qactions:{['.item-header.div']:{value:items[i].descr}}
    });

    //add/init service info form
    sitemforms.push(new SIform(document.createElement('div')));
    sitemview.ADDview('Info',sitemforms[i].cont);
    sitemforms[i].form = items[i]; //load info

    // add/init service repairs
    if(repairs[items[i].tagid]==undefined){repairs[items[i].tagid]=[]}
    let repcont = document.createElement('div');
    repairforms.push(SETUPrepairs(repairs));
    sitemview.ADDview('Repairs',repcont);

    $(sitemview.buttons.children[0]).click();
    group.ADDview(items[i].tagid,sitemview.cont); //add service item to group
  }
  // DONT DO THIS => $(document.getElementsByClassName('viewcontrol-menu-item')[4]).click(); //selects first SI menu item
  group.menu.children[1].children[0].innerText = items[items.length-1].tagid;
  $(group.buttons.children[0]).click();
  group.menu.children[0].style.left = '-250px';   // Start with menu hidden

  return {
    sitems:sitemforms,
    repairs:repairforms
  }
}
