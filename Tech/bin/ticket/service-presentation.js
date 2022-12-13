class ServicePresentation{
  constructor(){

  }

  dom = {
    cont: 'wo-presentation-cont',
    head: 'wo-presentaiton-header',
    button:{
      open:'button-open-presentation'
    },
    contract: cntrctform, //from vg-membership.js
    memlevel:'wo-present-membership',
    systems: 'wo-present-systems',
    system: {
      cont: 'wo-present-system',
      id: 'wo-present-system-id',
      repairs: 'wo-present-system-repairs',
      specials:{
        diagnostic:'wo-present-repair-diagnostic'
      },
      repair: {
        unapproved:'wo-present-repair-unapproved',
        cont: 'wo-present-repair',
        num: 'present-repair-num',
        desc: 'present-repair-desc',
        invst: 'present-repair-price',
        savings: 'present-repair-savings',
        appr: 'present-repair-appr'
      }
    },
    invest: {
      savings: 'wo-present-savings-today',
      regprice: 'wo-present-regprice-today',
      memprice: 'wo-present-memprice-today',
      conmonth: 'wo-present-contract-monthly'
    }
  }

  contents=``

  SETpresent = (wodata) => {
    console.log(wodata);
    if (wodata.sitems != null) {
      let slist = document.getElementById(prsdom.systems);

      let rprice=0; //temp for reg book price
      let mprice=0; //temp for mem book price
      slist.innerHTML = '';

      for (let x = 0; x < wodata.sitems.length; x++) {
        let s = slist.appendChild(document.createElement('div'));
        s.classList.add(prsdom.system.cont);
        s.appendChild(document.createElement('div')).innerText = this.wo.systems[x].id;
        let rlist = s.appendChild(document.createElement('div'));
        rlist.classList.add(prsdom.system.repairs);

        for (let y = 0; y < wodata.repairs[x].length; y++) {
          rprice = 0;
          mprice = 0;
          //tell what column repcost goes to

          //find the memebership cost (if any)

          //fill the difference
          let r = rlist.appendChild(document.createElement('div'));

          r.classList.add(prsdom.system.repair.cont);
          r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].desc;

          rprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.reg);
          r.appendChild(document.createElement('div')).innerText =  rprice;
          this.wo.build.regprice += (wodata.repairs[x][y].appr ? rprice : 0);

          if(wodata.repairs[x][y].task=='DIAG'){ //special case for diagnostic fee
            if(this.wo.hascntrct){
              mprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.cntrct);
            }else{mprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.reg);}
          }else{mprice = this.GETbookprice(wodata.repairs[x][y].task,this.wo.cntrct);}

          r.appendChild(document.createElement('div')).innerText = mprice;
          this.wo.build.memprice += (wodata.repairs[x][y].appr ? mprice : 0);
          r.appendChild(document.createElement('div')).innerText = rprice - mprice;
          this.wo.build.savings += (wodata.repairs[x][y].appr ? rprice - mprice :0);

          if(!wodata.repairs[x][y].appr){
            r.classList.add(prsdom.system.repair.unapproved);
          }
          r.appendChild(document.createElement('div')).innerText = wodata.repairs[x][y].appr ? 'YES':'NO';
        }
      }
      document.getElementById(prsdom.memlevel).innerText = this.rewardform.GETmemhead(document.getElementById(prsdom.contract.form.name).value) || this.wo.cntrct;
      document.getElementById(prsdom.invest.regprice).innerText = this.wo.build.regprice;
      document.getElementById(prsdom.invest.memprice).innerText = this.wo.build.memprice;
      document.getElementById(prsdom.invest.savings).innerText = this.wo.build.savings;
      document.getElementById(prsdom.invest.conmonth).innerText = this.rewardform.GETformprice();
    }
  }

}
