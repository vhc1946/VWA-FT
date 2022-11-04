export var dashdom = {
  cont:'vg-wo-dash',
  buttons:{
    editToggle:'tech-wo-selector'
  },
  list:{
    cont:'vg-wo-list',
    item:{
      cont:'vg-wo-item',
      num:'vg-wo-item-num',
      name:'vg-wo-item-name',
      address:'vg-wo-item-address'
    }
  }
}

export var wodom = {
    cont: '',
    action:{
      save:'wo-action-save',
      close:'wo-action-close',
      delete:'wo-action-delete'
    },
    info: {
        num: 'wo-info-num',
        name: 'wo-info-customer',
        address: 'wo-info-address'
    }
}

export var cntrctform = {
    cont: 'wo-present-contract-cont',
    form: {
        cont: 'present-contract-opts',
        memappr: 'wo-contract-appr',
        desc: 'present-contract-opt-desc',
        quantity: 'present-contract-opt-quantity',
        appr: 'present-contract-opt-appr',
        name: 'present-contract-name',
        month: 'present-contract-monthly',

        inputs: {
            sys: 'present-contract-addsys',
            comp: 'present-contract-addcomp',
            stdfltr: 'present-contract-addstdflt',
            spcfltr: 'present-contract-addspcflt',
            humpad: 'present-contract-addhumpad',
            timesave: 'present-contract-addtimesave'
        }
    }
}

export var prsdom = {
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

export var sysdom = { //System DOM
    cont:'wo-setup-cont',
    input: {
        tagid: "wo-setup-sys-tagid"
    },
    buttons:{
      approver:{
        toggle:'vg-checkbox',
        approved:'vg-checkbox-checked'
      },
      delete:'vg-deleter'
    },

    list: {
        cont: 'wo-sys-list',
        system: {
            cont: 'wo-sys',
            button: 'wo-sys-button',
            tagid: 'wo-sys-tagid',
            area: 'wo-sys-area',
            repairs: 'wo-sys-repairs',
            repair: {
                cont: 'wo-sys-repair',
                id: 'wo-sys-repair-id',
                desc: 'wo-sys-repair-desc',
            }
        },
        selected: 'wo-sys-selected',
        buttonimg:{
          selected:'../bin/assets/icons/angle-down.png',
          nonselected:'../bin/assets/icons/angle-right.png'
        }
    }
};

export var fbdom = { //Flate Rate DOM
    cont: 'wo-setup-repair',
    special:{
      diagnostic:'flatrate-repair-diagnostic',
      furncleancheck:'flatrate-repair-furn-cleancheck',
      accleancheck:'flatrate-repair-ac-cleancheck'
    },
    search: {
        book: 'wo-repair-search-book',
        value: 'wo-repair-search-value',
        pl: 'wo-repair-search-pl',
        fltr: 'wo-repair-search-column'
    },
    table: {
        cont: 'flatrate-search-table',
        row: {
            cont: '',
            task: 'flatrate-taskid',
            desc: 'flatrate-desc',
            value: 'flatrate-value'
        }
    },
    lists: {
        pls: 'flatrate-book-pl-list'
    }
}

export var wotabdom ={  //WO data from JONAS
    ARSubledgerCode:'ARCode',              //"AR",
    ApprovedForBillingDate:'ApprBillDate', //"null"
    ArrivalDate:'ArrDate',                 //"2022-10-11T00:00:00Z"
    ArrivalTime:'ArrTime',                 //"1031"
    BillEquipment:'bEquip',                //"D"
    BillLabour:'bLabor',                   //"D"
    BillMaterial:'bMats',                  //"D"
    BillOther:'bOther',                    //"D"
    BillTravel:'bTravel',                  //"D"
    BillType:'bType',                      //"F"
    CertifiedPayrollRequired:'CertPay',    //"N"
    CompletelyBilled:'CompBill',           //"N"
    ContactName:'ContactName',             //"TESTING"
    CustomerCode:'CustCode',               //"*VOGMISC"
    DispatchDate:'dispDate',               //"2022-10-11T00:00:00Z"
    DispatchEstimatedHours:'dispEstHours', //2
    DispatchPriority:'dispPri',            //"10"
    DispatchTime:'dispTime',               //"1031"
    EquipmentRateTable:'EquipRateTab',     //"MASTER"
    FederalTaxApplicable:'FedTax',         //"N"
    FinalCertifiedPayroll:'FinalCertPay',  //"N"
    FlatRateBook:'FRBook',                 //"RES"
    IncludeBillTo:'IncludeBT',             //"N"
    JobAddressLine1:'JobAddy1',            //"*123 VOGEL"
    LabourRateTable:'LabRateTab',          //"MASTER"
    MergeQuoteIntoPrepbill:'MergeQintoP',  //"N"
    MobileWorkOrder:'mobWO',               //"M"
    OrderDate:'OrderDate',                 //"2022-10-11T00:00:00Z"
    PriceLevel:'PriceLvl',                 //"CLA"
    PrintedYetDaily:'PrintYet',            //"N"
    ProvinceStateCode:'State',             //"MO"
    SalesCategoryCode:'saleCat',           //"       350"
    SalesTaxApplicable:'SalesTax',         //"E"
    SalesTaxGroup:'SalesTaxGrp',           //"MOMONTX"
    ScheduleTime:'schTime',                //"1031"
    ScheduledCompletionDate:'schCompDate', //"2022-10-11T00:00:00Z"
    ScheduledCompletionTime:'schCompTime', //"1032"
    ScheduledDate:'schDate',               //"2022-10-11T00:00:00Z"
    ScheduledForTechnician:'sch4Tech',     //"20221011@1031"
    TakenBy:'TakenBy',                     //"  132"
    TechnicianID:'TecchID',                //"132"
    TerritorySalespersonCode:'EstCode',    //"HSE"
    TimeArrived:'TimeArrived',             //"1031"
    TravelMUTable:'TravMUTab',             //"MASTER"
    UpdateToCarrier:'UpdCarrier',          //"N"
    WOStatusCode:'WOStatus',               //"O"
    WasMobileBilled:'MobBilled',           //"N"
    WorkOrderCategory:'WOCat',             //"1"
    WorkOrderNumber:'WONum',               //"00024530"
    WorkOrderTicketPrinted:'WOTick'       //"N"
}

export var custtabdom ={   //Customer Data from JONAS
  ARSubledgerCode:'ARCode',              //"AR"
  AddressLine1:'Addy1',                  //"*123 VOGEL"
  AmtTotalToDateSales:'TotalSales',      //250
  CreatedDate:'CreateDate',              //"2020-12-30T00:00:00Z"
  CreatedTime:'CreateTime',              //"1159"
  CustomerCode:'CustCode',               //"*VOGMISC"
  CustomerName:'CustName',               //"MISC VOGEL"
  CustomerQuote:'CustQuote',             //"A"
  DateLastTransaction:'LastTrans',       //"2022-11-04T00:00:00Z"
  FinanceChargeCode:'FinCode',           //"    0"
  FiscalYearBackTwoYears:'FisBackTwo',   //"2019"
  FiscalYearCurrent:'FisCurrent',        //"2021"
  FiscalYearPrevious:'FisPrev',          //"2020"
  PrintDelinquencyLetter:'PrnLetter',    //"Y"
  PrintStatement:'PrnState',             //"Y"
  ProvinceStateCode:'State',             //"MO"
  SalesPersonCode:'EstCode',             //"HSE"
  SalesTaxApplicable:'SalesTax',         //"E"
  SalesTaxGroup:'SalesTaxGrp',           //"MOMONTX"
  UserID:'UserID',                       //"VOGCH"
  YTDSalesCurrentYear:'SalesCurrYr',     //250
  YearOpened:'Opened'                    //"2020-12-30T00:00:00Z"
}

export var sitabdom = {    //Service Items data from JONAS
  ARSubledgerCode:'ARCode',              //"AR"
  CustomerCode:'CustCode',               //"*VOGMISC"
  EquipmentModelNumber:'Model',          //"58sbo"
  LineNumber:'LnNum',                    //"00008"
  LineNumberUnique:'LnNumU',             //"00008"
  Manufacturer:'Manf',                   //"Carrier"
  Quantity:'Qty',                        //1
  SerialNumber:'Serial',                 //"1111111"
  Status:'Status',                       //"A"
  TagDescription:'TagDesc',              //"Furance"
  TagID:'TagID'                          //"1"
}

export var convert=(map,obj={})=>{
  let tobj={};
  for(let o in obj){
    if(map[o]){
      tobj[map[o]]=obj[o];
    }
  }
  return tobj;
}