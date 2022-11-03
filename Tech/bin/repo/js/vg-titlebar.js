
import {CreateComponent} from '../tools/vhc-components.js';

//  PATHS //
var stylesheets = ['css/vg-titlebar.css'];

var tbdom={ // Titlebar
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
      moretools:'titlebar-button-more',
      help:'titlebar-button-help'
    },
    groups:{
      right:'titlebar-cont-right',
      left:'titlebar-cont-left'
    }
  }
}

var tdom = (rroot='')=>{
  return{
    [`#${tbdom.cont}.div`]:{
      attributes:{},
      children:{
        [`#${tbdom.utils.groups.left}.div`]:{
          attributes:{},
          children:{
            [`#${tbdom.more.cont}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot +"assets/icons/menu-burger.png",
                alt: "MORE",
                title: "More"
              },
              children: null
            },
            [`#${tbdom.more.actions}.div`]:{
              attributes:{
                style: "display:none"
              },
              children:{
                "#titlebar-page-print.div":{
                  attributes:{
                    class: "titlebar-button-action",
                    src: rroot + "assets/icons/print.png",
                    alt: "PRINT",
                    title: "Print"
                  },
                  children: null
                },
                "#titlebar-page-settings.div":{
                  attributes:{
                    class: "titlebar-button-action",
                    src: rroot + "assets/icons/settings.png",
                    alt: "SETTINGS",
                    title: "Settings"
                  },
                  children: null
                }
              }
            },
            [`#${tbdom.info.cont}.span`]:{
              attributes:{},
              children:{
                [`#${tbdom.page.user}.img`]:{
                  attributes:{
                    class: "titlebar-button-action",
                    src: rroot + "assets/icons/user.png",
                    alt: "USER",
                    title: "Log Out"
                  },
                  children: null
                },
                [`#${tbdom.info.username}.span`]:{
                  attributes:{},
                  children:null
                }
              }
            }
          }
        },
        [`#${tbdom.title}.div`]:{
          attributes:{
          },
          children:null
        },
        [`#${tbdom.utils.groups.right}.div`]:{
          attributes:{},
          children:{
            [`#${tbdom.utils.buttons.help}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot + "assets/icons/info.png",
                alt: "HELP",
                title: "help"
              },
              children: null
            },
            [`#${tbdom.window.close}.img`]:{
              attributes:{
                class: "titlebar-button-action",
                src: rroot + "assets/icons/cross.png",
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

var SETUPtitlebar=(RROOT='',qacts,macts)=>{
  document.body.prepend(CreateComponent(tdom(RROOT))); //add titlebar to the body

  console.log(RROOT);
  for(let x=0,l=stylesheets.length;x<l;x++){
    let viewstyles = document.createElement('link');
    viewstyles.setAttribute('rel','stylesheet');
    viewstyles.setAttribute('href',RROOT+stylesheets[x]);
    document.getElementsByTagName('head')[0].prepend(viewstyles);
  }
  ADDqactions(qacts);
  ADDmactions(macts);

  document.getElementById(tbdom.more.cont).addEventListener('click',(ele)=>{  // Toggle More Options menu
    let moreele = document.getElementById(tbdom.more.actions);
    $(moreele).toggle();
  });
}


export {
  tbdom,
  SETUPtitlebar
}
