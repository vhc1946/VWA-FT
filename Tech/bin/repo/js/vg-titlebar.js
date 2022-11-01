
import {CreateComponent} from '../tools/vhc-components.js';

//  PATHS //
var stylesheets = ['vg-titlebar.css'];
var assets={
}


var pubfolder = ''

var SETUPtitlebar=(pfolder,qacts,macts)=>{
  pubfolder=pfolder;

  document.body.prepend(CreateComponent(tdom));

  for(let x=0,l=stylesheets.length;x<l;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',`${pubfolder}css/${stylesheets[x]}`);
    document.getElementsByTagName('head')[0].prepend(viewstyles);

  }

  document.getElementById(tbdom.window.close).addEventListener('click',(ele)=>{  // Close window
    window.close();
  });
  document.getElementById(tbdom.window.mini).addEventListener('click',(ele)=>{  // Minimize window
    ipcRenderer.send('view-minimize',document.getElementById(tbdom.title).innerText);
  });

  document.getElementById(tbdom.window.maxi).addEventListener('click',(ele)=>{  // Maximize window
    if(screen.availWidth == window.innerWidth && screen.availHeight == window.innerHeight){
      window.resizeTo(lastwinsize.x,lastwinsize.y);
    }else{
      lastwinsize.x = window.innerWidth;
      lastwinsize.y = window.innerHeight;
      window.resizeTo(screen.availWidth,screen.availHeight);
    }
  });

  document.getElementById(tbdom.page.print).addEventListener('dblclick',(ele)=>{  // Print screen
    ipcRenderer.send('print-screen',{file:document.getElementById(tbdom.title).innerText});
  });

  document.getElementById(tbdom.more.cont).addEventListener('click',(ele)=>{  // Toggle More Options menu
      let moreele = document.getElementById(tbdom.more.actions);
        if($(moreele).is(":visible")){
          $(moreele).hide();
        }else{$(moreele).show();}

    });


}

//////////////////////////////////////////////////////////////////////

// Menu Actions //////////////////////////////////
var tbdom={ //menubar
  cont:'titlebar-cont',
  title:'titlebar-title',
  window:{
    close:'titlebar-win-close',
    mini:'titlebar-win-mini',
    maxi:'titlebar-win-maxi'
  },
  more:{
    cont:'titlebar-moretools',
    actions:'titlebar-moretools-quick'
  },
  info:{
    cont:'titlebar-page-user-cont',
    username:'titlebar-username'
  },
  page:{
    save:'titlebar-page-save',
    print:'titlebar-page-print',
    settings:'titlebar-page-settings',
    user:'titlebar-page-user'
  },
  utils:{
    buttons:{
      view:'titlbar-button-view',
      action:'titlebar-button-action',
      moretools:'titlebar-button-more'
    },
    groups:{
      right:'titlebar-cont-right',
      left:'titlebar-cont-left'
    }
  }
}

var tdom ={
  "#titlebar-cont.div":{
    attributes:{},
    children:{
      "#titlebar-cont-left.div":{
        attributes:{},
        children:{
          "#titlebar-moretools.img":{
            attributes:{
              class: "titlebar-button-action",
              src: pubfolder +"bin/assets/icons/menu-burger.png",
              alt: "MORE",
              title: "More"
            },
            children: null
          },
          "#titlebar-moretools-quick.div":{
            attributes:{
              style: "display:none"
            },
            children:{
              "#titlebar-page-print.div":{
                attributes:{
                  class: "titlebar-button-action",
                  src: pubfolder + "bin/assets/icons/print.png",
                  alt: "PRINT",
                  title: "Print"
                },
                children: null
              },
              "#titlebar-page-settings.div":{
                attributes:{
                  class: "titlebar-button-action",
                  src: pubfolder + "bin/assets/icons/settings.png",
                  alt: "SETTINGS",
                  title: "Settings"
                },
                children: null
              }
            }
          },
          "#titlebar-page-user-cont.span":{
            attributes:{},
            children:{
              "#titlebar-page-user.img":{
                attributes:{
                  class: "titlebar-button-action",
                  src: pubfolder + "bin/assets/icons/user.png",
                  alt: "USER",
                  title: "Log Out"
                },
                children: null
              },
              "#titlebar-username.span":{
                attributes:{},
                children:null
              }
            }
          }
        }
      },
      "#titlebar-title.div":{
        attributes:{},
        children:{}
      },
      "#titlebar-cont-right.div":{
        attributes:{},
        children:{
          "#titlebar-win-mini.img":{
            attributes:{
              class: "titlebar-button-action",
              src: pubfolder + "bin/assets/icons/minus.png",
              alt: "MINI",
              title: "Minimize"
            },
            children: null
          },
          "#titlebar-win-maxi.img":{
            attributes:{
              class: "titlebar-button-action",
              src: pubfolder + "bin/assets/icons/square.png",
              alt: "MAX",
              title: "Maximize"
            },
            children: null
          },
          "#titlebar-win-close.img":{
            attributes:{
              class: "titlebar-button-action",
              src: pubfolder + "bin/assets/icons/cross.png",
              alt: "CLOSE",
              title: "Close"
            },
            children: null
          }
        }
      }
    }
  }
}

var lastwinsize={
  x:window.innerWidth,
  y:window.innerHeight
}


/* ADD actions to title bar
    Function to add an array of elements to the more actions portion
    of the title bar.
*/
var ADDmactions=(acts)=>{
  acts=CREATEactionbuttons(acts);
  for(let x=0;x<acts.length;x++){
    acts[x].classList.add(tbdom.utils.buttons.action);
    document.getElementById(tbdom.more.actions).appendChild(acts[x]);
  }
}

var ADDqactions=(acts)=>{
  acts=CREATEactionbuttons(acts);
  for(let x=0;x<acts.length;x++){
    acts[x].classList.add(tbdom.utils.buttons.action);
    document.getElementById(tbdom.utils.groups.left).insertBefore(acts[x],document.getElementById(tbdom.info.cont)); //refresh button
  }
}

var CREATEactionbuttons=(acts)=>{
  let alist = [];
  for(let ma in acts){
    alist.push(document.createElement('img'));
    for(let as in acts[ma]){
      alist[alist.length-1][as]=acts[ma][as];
    }
  }
  return alist;
}


export {SETUPtitlebar}
