
export class FlatRateBook {
  constructor(book,pl=null){
    this.book = book
    this.miscreps = {//Misc Repairs
      'CLNCHK-AC':{
        'desc':'AC Clean and Check',
        'STA':149,
        'AHR':149,
        'CLA':0,
        'PRE':0,
        'ULT':0
      },
      'CLNCHK-FURN':{
        'desc':'Furnace Clean and Check',
        'STA':149,
        'AHR':149,
        'CLA':0,
        'PRE':0,
        'ULT':0
      },
      'DIAG':{
        'desc':'Diagnostic',
        'STA':119,
        'AHR':149,
        'CLA':119,
        'PRE':59.5,
        'ULT':0
      }
    }

    this.pl=pl||undefined;

    /*
    this.pl = ((pl) => { //get STD or AHR price level depending on time and/of day
        var wodate = new Date();
        let time = wodate.getHours();
        let day = wodate.getDay();
        return (
            (time > 17 ||
                day >= 6)
                ? 'AHR' : 'STA'
        );
    })();
    */

    document.getElementById(fbdom.search.pl).value = this.pl;

    document.getElementById(fbdom.search.book).value = 'Res Book';
    document.getElementById(fbdom.search.fltr).value = 'Task Description';

    document.getElementById(fbdom.search.book).addEventListener('change', switchBook);
    document.getElementById(fbdom.search.value).addEventListener('change', this.REFRESHbook);

    document.getElementById(fbdom.special.accleancheck).addEventListener('click',(ele)=>{ //add a clean and check
      this.ADDrepair({
        task:'CLNCHK-AC',
        desc:'AC Clean and Check'
      });
    });
    document.getElementById(fbdom.special.furncleancheck).addEventListener('click',(ele)=>{ //add a clean and check
      this.ADDrepair({
        task:'CLNCHK-FURN',
        desc:'Furnace Clean and Check'
      });
    });
    document.getElementById(fbdom.special.diagnostic).addEventListener('click',(ele)=>{ //add a clean and check
      this.ADDrepair({
        task:'DIAG',
        desc:'Diagnostic Fee'
      });
    });
  }

  /*Display functions ////////////////////////////////////////////
  */
  ADDrepair(row = {}){//Adds a repair display row
      let rlist = document.getElementsByClassName(sysdom.list.selected)[0].getElementsByClassName(sysdom.list.system.repairs)[0];
      let r = rlist.appendChild(document.createElement('div'));
      r.classList.add(sysdom.list.system.repair.cont);
      r.appendChild(document.createElement('div')).classList.add('vg-checkbox');
      if(row.appr){r.children[r.children.length-1].classList.add('vg-checkbox-checked')}
      r.children[r.children.length-1].addEventListener('click',(ele)=>{
        if(ele.target.classList.contains('vg-checkbox-checked')){
          ele.target.classList.remove('vg-checkbox-checked');
        }else{ele.target.classList.add('vg-checkbox-checked')}
      });
      r.appendChild(document.createElement('div')).innerText = row.task != undefined ? row.task : ''; //inrow.children[0].innerText;
      r.children[r.children.length - 1].classList.add(sysdom.list.system.repair.id);
      r.appendChild(document.createElement('div')).innerText = row.desc != undefined ? row.desc : ''; //inrow.target.parentNode.children[1].innerText;
      r.children[r.children.length - 1].classList.add(sysdom.list.system.repair.desc);

      r.appendChild(document.createElement('img')).src = '../images/icons/trash.png';
      r.children[r.children.length-1].classList.add(sysdom.buttons.delete);
      r.children[r.children.length-1].addEventListener('dblclick',(ele)=>{
        ele.target.parentNode.parentNode.removeChild(ele.target.parentNode);
      });

  }

  FILTERbook(flts = {}){ //Filter book, return filtered list
      var finds = [];
      var bad;
      if (this.book) {
          for (let x = 0; x < this.book.length; x++) {
              bad = false;
              for (let f in flts) {
                  if (this.book[x][f] && !this.book[x][f].includes(flts[f].toUpperCase()) || this.book[x][f] == '') {
                      bad = true;
                      break;
                  }
              }
              if (!bad) {
                  finds.push(this.book[x]);
              }
          }
      }
      return finds;
  }

  LOADbook(finds, pl){//Filter the book
      console.log(finds);
      let fbstable = document.getElementById(fbdom.table.cont);
      let row;
      let data;
      let val;
      let foundpl = false;
      fbstable.innerHTML = '';
      for (let x = 0; x < finds.length; x++) {
          row = document.createElement('tr');

          //set the repair select event (repair add)
          row.addEventListener('click', (ele) => {
              this.ADDrepair({
                  task: (ele.target.tagName == 'TR') ? ele.target.children[0].innerText : ele.target.parentNode.children[0].innerText,
                  desc: (ele.target.tagName == 'TR') ? ele.target.children[1].innerText : ele.target.parentNode.children[1].innerText
              });
          });
          for (let f in finds[x]) {
              val = '';
              if (f == 'desc' || f == 'num') {
                  val = finds[x][f];
              }
              else if (finds[x][f] == pl) {
                  foundpl = true;
                  if (f.includes('_')) {
                      val = finds[x]['sp_' + f.split('_')[1]];
                  } else { val = finds[x].sp }
              }
              if (val != '') {
                  data = document.createElement('td')

                  data.innerText = val;
                  row.appendChild(data);
              }
          }
          if (!foundpl) { alert('Select Price Level'); return false }

          fbstable.appendChild(row);
      }
  }

  REFRESHbook(ele){

  }

  ////////////////////////////////////////////////////////////////
}
