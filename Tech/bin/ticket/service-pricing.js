
/* FlatRateBook Pricing
*/
export class FlatRatePricing {
  constructor(book){
    this.book = new ObjList(book);

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

  GETbookprice(tnum, tpl){
      let pl = 'pl';
      let count = '';
      let cnum = 1;

      if (this.book) {
          for (let x = 0; x < this.book.length; x++) {
              if (this.book[x].num == tnum ){
                  while (this.book[x][pl + count] != undefined) {
                      if (this.book[x][pl + count] == tpl) {
                          return Number(this.book[x]['sp' + count]);
                      }
                      count = '_' + cnum++;
                  }
              }
          }
      }
      for(let s in this.miscreps){
        if(s ==tnum){return this.miscreps[tnum][tpl] || 0}
      }
      return 0;
  }

  ////////////////////////////////////////////////////////////////
}
