let dom = {
    info:{
        client: 'invoice-info-client',
        street: 'invoice-info-street',
        city: 'invoice-info-city',
        lstreet: 'invoice-info-lstreet',
        lcity: 'invoice-info-lcity',
        invnum: 'invoice-info-invnum',
        invdate: 'invoice-info-invdate',
        terms: 'invoice-info-terms',
        custcode: 'invoice-info-custcode',
        reference: 'invoice-info-reference',
        wonum: 'invoice-info-wonum',
        wotype: 'invoice-info-wotype',
        location: 'invoice-info-location',
        strtdate: 'invoice-info-strtdate',
        compdate: 'invoice-info-compdate',
        subtotal: 'invoice-info-subtotal',
        total: 'invoice-info-total',
        description: 'invoice-info-description'
    }
}


let contents = `
    <img id='header-logo'src="../repo/assets/images/Header.jpg"/>  
    <div class="invoice-top">
        <div class="invoice-section-client">
            <div class="invoice-sectionhead">SOLD TO:</div>
            <div>
                <div class="${dom.info.client}">Client Name</div>
                <div class="${dom.info.street}">1234 Street Dr</div>
                <div class="${dom.info.city}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-location">
            <div class="invoice-sectionhead">JOB LOCATION:</div>
            <div>
                <div class="${dom.info.lstreet}">1234 Street Dr</div>
                <div class="${dom.info.lcity}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-info">
            <label class="invoice-sectionlabel">Invoice Number:</label><div class="${dom.info.invnum}">Test</div>
            <label class="invoice-sectionlabel">Invoice Date:</label><div class="${dom.info.invdate}">Test</div>
            <label class="invoice-sectionlabel">Terms:</label><div class="${dom.info.terms}">Test</div>
            <label class="invoice-sectionlabel">Customer Code:</label><div class="${dom.info.custcode}">Test</div>
            <label class="invoice-sectionlabel">Reference:</label><div class="${dom.info.reference}">Test</div>
            <label class="invoice-sectionlabel">Work Order #:</label><div class="${dom.info.wonum}">Test</div>
            <label class="invoice-sectionlabel">Work Order Type:</label><div class="${dom.info.wotype}">Test</div>
            <label class="invoice-sectionlabel">Job Location:</label><div class="${dom.info.location}">Test</div>
            <label class="invoice-sectionlabel">Starting Date:</label><div class="${dom.info.strtdate}">Test</div>
            <label class="invoice-sectionlabel">Completion Date:</label><div class="${dom.info.compdate}">Test</div>
        </div>
    </div>
    <div class="invoice-body">
        <div class="invoice-descbox">
            <div class="${dom.info.description}">Test Text</div>
        </div>
        <table class="invoice-totals">
            <tr>
                <td>
                    <label class="invoice-sectionlabel">Subtotal</label>
                </td>
                <td>
                    <div class="${dom.info.subtotal}">420.00</div>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="invoice-sectionlabel">Total Invoice</label>
                </td>
                <td>
                    <div class="${dom.info.total}">420.00</div>
                </td>
            </tr>
        </table>
    </div>
`

export var basicinvoice ={
    dom:dom,
    contents:contents
}