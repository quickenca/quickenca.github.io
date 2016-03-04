/* SiteCatalyst code version: H.22. 
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/* PLEASE KEEP THIS MODIFICATION HISTORY UPDATED
 * Date yyyy-mm-dd  Who?                What?
 * ===============  =========           ===========================================================
 * 2014-06-18       Evolytics (bcj)     add profilecharity.intuit.ca
 * 2014-12-08       Neil Axtell         Strip ww1. or ww2. prefix from incoming Domain (Jira:ESTR-2652)
 * 2014-12-16       Evolytics (bcj)     Update URS logic to account for updates to Google secure SEO and PPC referrals
 * 2014-12-16       Evolytics (bcj)     Update logic to recognize new ####.turbotaxonline.intuit.ca domains (####=tax year/tax centre)
 * 2014-12-16       Evolytics (bcj)     Changed rsid=null to rsid="" on line 46 to prevent issue with rsid.indexOf() later in library
 * 2014-12-31       Evolytics (bcj)     Add eVar40 logic
 * 2015-01-07       Evolytics (bcj)     Changed var rsid=""; to var rsid; on line 46
 * 2015-01-32       Evolytics (bcj)     Change eVar8 logic to populate on all pages if !="none tracked"
 * 2015-05-22       Evolytics (bcj)     Add 'direct' channel logic for new urs reports; Add wa.campaign before setting getValOnce(s.campaign)
 * 2015-11-30       Evolytics (bcj)     Update logic to recognize TY15 beyond production tax year domains AND TY15 / TY16 test/perf domains
 * 2015-12-17       Evolytics (bcj)     Add Optimizely integration logic
 * 2015-12-23       Evolytics (bcj)     URS updates re:google/yahoo PPC and SEO recognition
 * 2016-01-04       Evolytics (bcj)     Add Optimizely custom event tracking
 * 2016-01-14       Evolytics (bcj)     Add Optimizely 'login' custom event tracking
 * 2016-02-04       Evolytics (bcj)     Bug fix: Correct Optimizely 'revenue' syntax in optimizelyTrackEvent()
 * 2016-02-11       Evolytics (bcj)     Change Optimizely 'order_generated' to 'conversion_success'; evaluate prop8 instead of products
 */

/* START ESTR-2652 */
/*
 * If the given domain name starts with ww1. or ww2. remove it
 * Author: Neil Axtell
 */
function stripAAPrefix(domainName) {
    var strippedDomain = "";
    /* first check we have got something to work with! */
    if (null != domainName) {
        /* See if the given domain name has a ww1. or ww2. prefix */
        if (domainName.match(/^ww[1,2]\.\w*.*/)) {
            /* Domain name starts with a ww1. or ww2. prefix so we need to strip it off */ 
            var firstDotPosn = domainName.indexOf('.');
            strippedDomain = domainName.substr(firstDotPosn+1);
        } else {
            strippedDomain = domainName;
        }
    }
    
    return strippedDomain;
}
/* END ESTR-2652 */

if ("undefined" == typeof(wa)) {wa = new Object();}
wa.bu="gbd";

var curl=location.href.toLowerCase();

if (typeof(s_account)=="undefined"){

/* Capture rsid and internal filters */
var rsid;
var internalFilter;
var smallDomain = stripAAPrefix(window.location.hostname.toLowerCase());    /* ESTR-2652 */

/* First check those sites that don't use only one Intuit country domain */
/* QBO */
if(smallDomain=="intuitglobal.com"||smallDomain=="quickbooksenligne.intuit.ca"||smallDomain=="quickbooks.intuit.ca"){
    rsid="intuitca-qbo";
    internalFilter="javascript:,intuitglobal.com,quickbooksenligne.intuit.ca,quickbooks.intuit.ca";
    wa.defaultSiteName="qbenligne";
    wa.defaultSiteGroup="mkt";
}

/* QBO CA*/
if(smallDomain=="global.intuit.com"||smallDomain=="quickbooksonline.intuit.ca"||smallDomain=="www.quickbooksonline.intuit.ca"||smallDomain=="shop.qbo.ca"||smallDomain=="www.shop.qbo.ca"||smallDomain=="qbo.ca"||smallDomain=="iworkformyself.ca"||smallDomain=="www.iworkformyself.ca"){
    rsid="intuitca-qbo";
    internalFilter="javascript:,quickbooksonline.intuit.ca";
    wa.defaultSiteName="qbo";
    wa.defaultSiteGroup="app";
    
}

/*GoPayment*/
if(smallDomain=="gopayment.intuit.ca"||smallDomain=="www.gopayment.intuit.ca"||smallDomain=="shop.gopayment.ca"||smallDomain=="www.shop.gopayment.ca"||smallDomain=="apply.gopayment.ca"){
    rsid="intuitca-gopayment";
    internalFilter="javascript:,gopayment.intuit.ca";
    wa.defaultSiteName="gopayment.ca";
    wa.defaultSiteGroup="mkt";
}

/* Ca. quicktax*/
if(smallDomain=="quicktax.intuit.ca"||smallDomain=="shop.quicktax.ca"||smallDomain=="www.quicktax.intuit.ca"||smallDomain=="www.shop.quicktax.ca"||smallDomain=="turbotax.intuit.ca"||smallDomain=="shop.turbotax.ca"||smallDomain=="www.turbotax.intuit.ca"||smallDomain=="impotrapide.intuit.ca"||smallDomain=="blog.turbotax.ca"||smallDomain=="shop.impotrapide.ca"){
    rsid="intuitca-turbotax";
    internalFilter="javascript:,quicktax.intuit.ca,quicktax.ca,turbotax.intuit.ca,turbotax.ca,impotrapide.intuit.ca,turbotaxonline.intuit.ca";
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "quicktax.intuit.ca":
        case "www.quicktax.intuit.ca":
            wa.defaultSiteName="qtca";
            break;
        case "shop.quicktax.ca":
        case "www.shop.quicktax.ca":
            wa.defaultSiteName="shopqtca";
            break;
        case "turbotax.intuit.ca":
        case "www.turbotax.intuit.ca":
            wa.defaultSiteName="ttca";
            break;
        case "shop.turbotax.ca":
            wa.defaultSiteName="shopttca";
            break;
        case "shop.impotrapide.ca":
            wa.defaultSiteName="shopirca";
            break;
        case "impotrapide.intuit.ca":
            wa.defaultSiteName="irca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/*Ca. TaxCentre*/
if(smallDomain=="tc.turbotaxonline.ca" || smallDomain=="tc.turbotaxonline.intuit.ca"){
    rsid="intuitca-turbotaxglobal";
    wa.defaultSiteName="taxcentre";
    wa.defaultSiteGroup="app";
}

/*Ca. tto*/
var ttoPatt = /^20\d\d\.turbotaxonline\.(intuit\.)?ca/i, //turbotaxonline regex pattern
    qtoPatt = /^20\d\d\.quicktaxonline\.ca/i; //quicktaxonline regex pattern

if(ttoPatt.test(smallDomain) || qtoPatt.test(smallDomain) || smallDomain === "turbotaxonline.intuit.ca") {
    rsid="intuitca-turbotaxonline";
    internalFilter="javascript:,quicktaxonline.ca,turbotaxonline.ca,turbotaxonline.intuit.ca";
    wa.defaultSiteGroup="app";

    if(/^20\d\d\./.test(smallDomain)) {
        var taxYear = smallDomain.split('.')[0],
            product = (smallDomain.indexOf('turbotaxonline') > -1) ? 'ttoca' : ((smallDomain.indexOf('quicktaxonline') > -1) ? 'qtoca' : '');

        wa.defaultSiteName = taxYear + product; //eg: 2015ttoca || 2008qtoca
    } else {
        wa.defaultSiteName = smallDomain; //eg: turbotaxonline.intuit.ca
    }
}



/*Ca. Quicken*/
if(smallDomain=="quicken.intuit.ca"||smallDomain=="shop.quicken.ca"||smallDomain=="www.shop.quicken.ca"||smallDomain=="www.quicken.ca"){
    rsid="intuitca-quicken";
    internalFilter="javascript:,quicken.intuit.ca,quicken.ca";
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "www.quicken.ca":
        case "quicken.intuit.ca":
            wa.defaultSiteName="qnca";
            break;
        case "www.shop.quicken.ca":
        case "shop.quicken.ca":
            wa.defaultSiteName="shopqnca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}
/* Ca. Proadvisor*/
if(smallDomain=="proadvisor.intuit.ca"||smallDomain=="conseillerspro.intuit.ca"||smallDomain=="shop.proadvisor.ca"){
    rsid="intuitca-proadvisor";
    internalFilter="javascript:,proadvisor.intuit.ca,conseillerspro.intuit.ca";
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "proadvisor.intuit.ca":
            wa.defaultSiteName="proadvisorca";
            break;
        case "conseillerspro.intuit.ca":
            wa.defaultSiteName="conseillerca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/* Small optimisation - check for the country before doing individual domain name checks */
if (rsid == null && smallDomain.indexOf(".intuit.ca") != -1) {
    /* Its definitely a Canadian Domain */
    /* Ca. Cart*/
    if(smallDomain=="secure.intuit.ca"){
        rsid="intuitca-intuitca";
        internalFilter="javascript:,secure.intuit.ca";
        wa.defaultSiteName="intuitca";
        wa.defaultSiteGroup="mtg";
    }

    /* Ca. support*/
    if(smallDomain=="support.intuit.ca"){
        rsid="intuitca-supportca";
        internalFilter="javascript:,support.intuit.ca";
        wa.defaultSiteName="intuitca";
        wa.defaultSiteGroup="sup";
    }
    
    /* Ca. corp*/
    if(smallDomain=="intuit.ca"||smallDomain=="www.intuit.ca"){
        rsid="intuitca-intuitca";
        internalFilter="javascript:,intuit.ca";
        wa.defaultSiteName="intuitca";
        wa.defaultSiteGroup="mkt";
    }

    /* Mobile QuickBooks*/
    if(smallDomain=="m.quickbooks.intuit.ca"||smallDomain=="www.m.quickbooks.intuit.ca"){
        rsid="intuitca-quickbooksmobile";
        internalFilter="javascript:,m.quickbooks.intuit.ca";
        wa.defaultSiteName="quickbooksmobileca";
        wa.defaultSiteGroup="mkt";
    }

    /* Mobile Turbotax*/
    if(smallDomain=="m.turbotax.intuit.ca"||smallDomain=="www.m.turbotax.intuit.ca"){
        rsid="intuitca-turbotaxmobile";
        internalFilter="javascript:,m.turbotax.intuit.ca";
        wa.defaultSiteName="turbotaxmobileca";
        wa.defaultSiteGroup="mkt";
    }
    
    /* Mobile Profile*/
    if(smallDomain=="m.profile.intuit.ca"||smallDomain=="www.m.profile.intuit.ca"){
        rsid="intuitca-profilemobile";
        internalFilter="javascript:,m.profile.intuit.ca";
        wa.defaultSiteName="profilemobileca";
        wa.defaultSiteGroup="mkt";
    }


    /* Mobile Quicken*/
    if(smallDomain=="m.quicken.intuit.ca"||smallDomain=="www.m.quicken.intuit.ca"){
        rsid="intuitca-quickenmobile";
        internalFilter="javascript:,m.quicken.intuit.ca";
        wa.defaultSiteName="quickenmobileca";
        wa.defaultSiteGroup="mkt";
    }

    /* Mobile Accountant*/
    if(smallDomain=="m.accountant.intuit.ca"||smallDomain=="www.m.accountant.intuit.ca"){
        rsid="intuitca-accountantmobile";
        internalFilter="javascript:,m.accountant.intuit.ca";
        wa.defaultSiteName="accountantmobileca";
        wa.defaultSiteGroup="mkt";
    }

    /* Mobile GoPayment*/
    if(smallDomain=="m.gopayment.intuit.ca"||smallDomain=="www.m.gopayment.intuit.ca"){
        rsid="intuitca-gopaymentmobile";
        internalFilter="javascript:,m.gopayment.intuit.ca";
        wa.defaultSiteName="gopaymentmobileca";
        wa.defaultSiteGroup="mkt";
    }

    /* Ca. Profile*/
    if(smallDomain=="profile.intuit.ca"||smallDomain=="profilefrancais.intuit.ca"||smallDomain=="www.profile.intuit.ca"||smallDomain=="www.profilefrancais.intuit.ca"){
        rsid="intuitca-profile,intuitca-accountanttaxglobal";
        internalFilter="javascript:,profile.intuit.ca,profilefrancais.intuit.ca";
        wa.defaultSiteGroup="mkt";
        switch (smallDomain)
        {
            case "profile.intuit.ca":
            case "www.profile.intuit.ca":
                wa.defaultSiteName="pfenca";
                break;
            case "profilefrancais.intuit.ca":
            case "www.profilefrancais.intuit.ca":
                wa.defaultSiteName="pffrca";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /* Ca. Profile Review*/
    if(smallDomain=="profilereview.intuit.ca"||smallDomain=="www.profilereview.intuit.ca"){
        rsid="intuitca-profilereview,intuitca-accountanttaxglobal";
        internalFilter="javascript:,profilereview.intuit.ca";
        wa.defaultSiteGroup="mkt";
        switch (wa.siteLanguage)
        {
            case "en":
                wa.defaultSiteName="prenca";
                break;
            case "fr":
                wa.defaultSiteName="prfrca";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /* Ca. Profile Charity*/
    if(smallDomain=="profilecharity.intuit.ca"||smallDomain=="www.profilecharity.intuit.ca"){
        rsid="intuitca-profilecharity,intuitca-accountanttaxglobal";
        internalFilter="javascript:,profilecharity.intuit.ca";
        wa.defaultSiteGroup="mkt";
        switch (wa.siteLanguage)
        {
            case "en":
                wa.defaultSiteName="pcenca";
                break;
            case "fr":
                wa.defaultSiteName="pcfrca";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /* Ca. Accountant*/
    if(smallDomain=="www.accountant.intuit.ca"||smallDomain=="accountant.intuit.ca"||smallDomain=="comptable.intuit.ca"||smallDomain=="www.comptable.intuit.ca"){
        rsid="intuitca-accountant";
        internalFilter="javascript:,accountant.intuit.ca,comptable.intuit.ca";
        wa.defaultSiteGroup="mkt";
        switch (smallDomain)
        {
            case "www.accountant.intuit.ca":
            case "accountant.intuit.ca":
                wa.defaultSiteName="acctca";
                break;
            case "www.comptable.intuit.ca":
            case "comptable.intuit.ca":
                wa.defaultSiteName="comptableca";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }
    

    /* Ca. Quickbooks*/
    if(smallDomain=="quickbooks.intuit.ca"||smallDomain=="shop.quickbooks.ca"||smallDomain=="www.shop.quickbooks.ca"||smallDomain=="www.quickbooks.intuit.ca"||
       smallDomain=="succespme.intuit.ca"||smallDomain=="www.succespme.intuit.ca"||smallDomain=="quickbooksintervention.ca"||smallDomain=="pages.quickbooksintervention.ca"){
        rsid="intuitca-quickbooks";
        internalFilter="javascript:,quickbooks.intuit.ca,shop.quickbooks.ca,succespme.intuit.ca";
        wa.defaultSiteGroup="mkt";
        switch (smallDomain)
        {
            case "quickbooks.intuit.ca":
            case "www.quickbooks.intuit.ca":
                wa.defaultSiteName="qbca";
                break;
            case "shop.quickbooks.ca":
            case "www.shop.quickbooks.ca":
                wa.defaultSiteName="shopqbca";
                break;
            case "succespme.intuit.ca":
            case "www.succespme.intuit.ca":
                wa.defaultSiteName="spmeca";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /* Ca. Blog Intuit.ca*/
    if(smallDomain=="blog.intuit.ca"){
        rsid="intuitca-quickbooksglobal,intuitcaintuitca-blog";
        internalFilter="javascript:,blog.intuit.ca";
        wa.defaultSiteName="blog.intuit.ca";
    }
    
    /* Ca. Merchant Services*/
    if(smallDomain=="merchantservices.intuit.ca"||smallDomain=="merchant.quickbooks.ca"){
        rsid="intuitca-merchantservices";
        internalFilter="javascript:,merchantservices.intuit.ca";
        wa.defaultSiteGroup="app";
        switch (smallDomain)
        {
            case "merchantservices.intuit.ca":
                wa.defaultSiteName="merchantca";
                break;
            case "merchant.quickbooks.ca":
                wa.defaultSiteName="merchantquickbooks";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /* Ca. Enterprise*/
    if(smallDomain=="enterprise.intuit.ca"||smallDomain=="www.enterprise.intuit.ca"){
        rsid="intuitca-enterprise";
        internalFilter="javascript:,enterprise.intuit.ca";
        wa.defaultSiteName="qbesca";
        wa.defaultSiteGroup="mkt";
    }
    
    /* End of Canadian Domains */ 
} else if (rsid == null && smallDomain.indexOf(".co.uk") != -1) {
    /* Its a UK Domain */
    /* UK support*/
    if(smallDomain=="support.intuit.co.uk"){
        rsid="intuitca-supportcouk";
        internalFilter="javascript:,support.intuit.co.uk";
        wa.defaultSiteName="intuituk";
        wa.defaultSiteGroup="sup";
    }

    /* UK corp*/
    if(smallDomain=="www.intuit.co.uk"||smallDomain=="intuit.co.uk"){
        rsid="intuitca-intuitcouk";
        internalFilter="javascript:,intuit.co.uk";
        wa.defaultSiteName="intuituk";
        wa.defaultSiteGroup="mkt";
    }

    /*UK Quickbooks*/
    if(smallDomain=="www.quickbooks.co.uk"||smallDomain=="shop.quickbooks.co.uk"||smallDomain=="www.shop.quickbooks.co.uk"||smallDomain=="quickbooks.co.uk"||smallDomain=="quickbooks.intuit.co.uk"||smallDomain=="shop.intuit.co.uk"){
        rsid="intuitca-intuitcouk";
        internalFilter="javascript:,quickbooks.co.uk,quickbooks.intuit.co.uk";
        wa.defaultSiteGroup="mkt";
        switch (smallDomain)
        {
            case "www.quickbooks.co.uk":
            case "quickbooks.co.uk":
            case "quickbooks.intuit.co.uk":
                wa.defaultSiteName="qbuk";
                break;
            case "www.shop.quickbooks.co.uk":
            case "shop.quickbooks.co.uk":
            case "shop.intuit.co.uk":
                wa.defaultSiteName="shopqbuk";
                break;
            default:
                wa.defaultSiteName=smallDomain;
        }
    }

    /*UK QB Get started*/
    if(smallDomain=="getstarted.quickbooks.co.uk"){
        rsid="intuitca-getstartedcouk";
        internalFilter="javascript:,getstarted.quickbooks.co.uk";
        wa.defaultSiteName="qbgetstarteduk";
        wa.defaultSiteGroup="mkt";
    };

    /*UK Small Business Britain*/
    if(smallDomain=="smallbusinessbritain.intuit.co.uk"||smallDomain=="www.smallbusinessbritain.intuit.co.uk"||smallDomain=="www.smallbusinessbritain.co.uk"||smallDomain=="smallbusinessbritain.co.uk"){
        rsid="intuitca-smallbusinessbritain";
        internalFilter="javascript:,smallbusinessbritain.intuit.co.uk,smallbusinessbritain.co.uk";
        wa.defaultSiteName="sbbuk";
        wa.defaultSiteGroup="mkt";
    }
} else {
    /* its something else */
    /* IN support*/
    if(smallDomain=="support.intuit.co.in"){
        rsid="intuitca-supportcoin";
        internalFilter="javascript:,support.intuit.co.in";
        wa.defaultSiteName="intuitin";
        wa.defaultSiteGroup="sup";
    }
    
    /* Singapore */
    if(smallDomain=="quickbooks.intuit.sg"||smallDomain=="www.quickbooks.intuit.sg"){
        rsid="intuitca-quickbookssg";
        internalFilter="javascript:,quickbooks.intuit.sg";
        wa.defaultSiteName="quickbooks.intuit.sg";
        wa.defaultSiteGroup="mkt";
    }
    
}

/* See if we are running is local DEV, TEST or PERF environments */
/* Local */
var exp = "^(MIS|EDM|mis|edm){1}[a-zA-Z0-9]+(\.corp\.intuit\.net)$";
var regex = new RegExp(exp);
/* ESTR-2652: Added detection of "Localhost" */
if(regex.test(smallDomain) || smallDomain.indexOf("localhost") > -1) {
  rsid="inuitcadev";
  internalFilter="javascript:,intuit.ca,quickbooks.co.uk,intuit.co.uk,intuit.co.in,turbotaxonline.ca";
  wa.defaultSiteName="testsite";
  wa.defaultSiteGroup="testgroup";
}

/* Test or PERF */
if(smallDomain.indexOf("test")>-1 || smallDomain.indexOf("perf")>-1){
    rsid="inuitcadev";
    internalFilter="javascript:,intuit.ca,quickbooks.co.uk,intuit.co.uk,intuit.co.in,turbotaxonline.ca";
    wa.defaultSiteName="testsite";
    wa.defaultSiteGroup="testgroup";
    if (smallDomain.indexOf("turbotaxonline.ca") !== -1 || smallDomain.indexOf("turbotaxonline.intuit.ca") !== -1){
        wa.defaultSiteGroup="TTOtestgroup";
        if (smallDomain.indexOf("2016") !== -1){
            wa.defaultSiteName="2016TTOtestsite";
        } else if (smallDomain.indexOf("2015") !== -1){
            wa.defaultSiteName="2015TTOtestsite";            
        } else if (smallDomain.indexOf("2014") !== -1){
            wa.defaultSiteName="2014TTOtestsite";
        } else if (smallDomain.indexOf("2013") !== -1){
            wa.defaultSiteName="2013TTOtestsite";
        } else if (smallDomain.indexOf("2012") !== -1){
            wa.defaultSiteName="2012TTOtestsite";
        } else if (smallDomain.indexOf("2011" !== -1)){
            wa.defaultSiteName="2011TTOtestsite";
        } else if (smallDomain.indexOf("2010" !== -1)){
            wa.defaultSiteName="2010TTOtestsite";
        } else {
            wa.defaultSiteName="TTOUnknowntestsite";
        }
    }
}

if( rsid==null && (smallDomain.indexOf("vm")>-1 || smallDomain.indexOf("int-app")>-1 || smallDomain.indexOf("turbotaxonline")>-1 ) ){
    rsid="inuitcadev";
    internalFilter="javascript:,intuit.ca,quickbooks.co.uk,intuit.co.uk,intuit.co.in,turbotaxonline.ca";
    wa.defaultSiteGroup="TTOtestgroup";
    wa.defaultSiteName="TTODEVtestsite";
}

if( rsid==null && smallDomain.indexOf("pharos")>-1  ) {
    rsid="inuitcadev";
    internalFilter="javascript:,intuit.ca,quickbooks.co.uk,intuit.co.uk,intuit.co.in,turbotaxonline.ca";
    wa.defaultSiteName="testsite";
    wa.defaultSiteGroup="testgroup";
}

/* Set multi-suite report suites */
if (rsid=="intuitca-turbotax"||rsid=="intuitca-turbotaxonline"&&rsid.indexOf("intuitca-turbotaxglobal")==-1){rsid+=",intuitca-turbotaxglobal,intuit";};
if (rsid=="intuitca-merchantservices"||rsid=="intuitca-merchantquickbooks"||rsid=="intuitca-gopayment"&&rsid.indexOf("intuitca-merchantglobal")==-1){rsid+=",intuitca-merchantglobal";};
if (rsid=="intuitca-quickbooks"||rsid=="intuitca-qbo"||rsid.indexOf("intuitca-merchantglobal")>-1||rsid=="intuitca-enterprise"&&rsid.indexOf("intuitca-quickbooksglobal")==-1) {rsid+=",intuitca-quickbooksglobal";};
if (rsid.indexOf("intuitca-quickbooksglobal")>-1||rsid.indexOf("intuitca-turbotaxglobal")>-1||rsid.indexOf("intuitca-supportca")>-1||rsid.indexOf("intuitca-intuitca")>-1||rsid.indexOf("intuitca-accountant")>-1||rsid.indexOf("intuitca-proadvisor")>-1||rsid.indexOf("intuitca-")>-1||rsid.indexOf("intuitca-profile")>-1||
    rsid.indexOf("intuitca-quickbooksmobile")>-1||rsid.indexOf("intuitca-turbotaxmobile")>-1||rsid.indexOf("intuitca-profilemobile")>-1||rsid.indexOf("intuitca-quickenmobile")>-1||rsid.indexOf("intuitca-accountantmobile")>-1||rsid.indexOf("intuitca-gopaymentmobile")>-1
    &&rsid.indexOf("intuitca-canadaglobal")==-1){rsid+=",intuitca-canadaglobal";};

var s_account=rsid;

} else {

/* s_account already has a value */
/* Capture rsid and internal filters */
var rsid=s_account;
var smallDomain = stripAAPrefix(window.location.hostname.toLowerCase());    /* ESTR-2652 */

/* Ca. support*/
if(rsid=="intuitca-supportca"){
    wa.defaultSiteName="intuitca";
    wa.defaultSiteGroup="sup";
}

/* UK support*/
if(rsid=="intuitca-supportcouk"){
    wa.defaultSiteName="intuituk";
    wa.defaultSiteGroup="sup";
}

/* IN support*/
if(rsid=="intuitca-supportcoin"){
    wa.defaultSiteName="intuitin";
    wa.defaultSiteGroup="sup";
}

/* Ca. corp*/
if(rsid=="intuitca-intuitca"){
    wa.defaultSiteName="intuitca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile QuickBooks*/
if(rsid=="intuitca-quickbooksmobile"){
    wa.defaultSiteName="quickbooksmobileca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile TurboTax*/
if(rsid=="intuitca-turbotaxmobile"){
    wa.defaultSiteName="turbotaxmobileca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile Accountant*/
if(rsid=="intuitca-accountantmobile"){
    wa.defaultSiteName="accountantmobileca";
    wa.defaultSiteGroup="mkt";
}


/* Mobile Profile*/
if(rsid=="intuitca-profilemobile"){
    wa.defaultSiteName="profilemobileca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile Quicken*/
if(rsid=="intuitca-quickenmobile"){
    wa.defaultSiteName="quickenmobileca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile GoPayment*/
if(rsid=="intuitca-gopaymentmobile"){
    wa.defaultSiteName="gopaymentmobileca";
    wa.defaultSiteGroup="mkt";
}

/* Mobile GoPayment*/
if(rsid=="intuitca-gopayment"){
    wa.defaultSiteName="gopaymentca";
    wa.defaultSiteGroup="mkt";
}

/* Singapore */
if(rsid=="intuitca-quickbookssg"){
    wa.defaultSiteName="quickbooks.intuit.sg";
    wa.defaultSiteGroup="mkt";
}

/* Ca. quicktax*/
if(rsid=="intuitca-turbotax"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "quicktax.intuit.ca":
        case "www.quicktax.intuit.ca":
            wa.defaultSiteName="qtca";
            break;
        case "shop.quicktax.ca":
        case "www.shop.quicktax.ca":
            wa.defaultSiteName="shopqtca";
            break;
        case "turbotax.intuit.ca":
        case "www.turbotax.intuit.ca":
            wa.defaultSiteName="ttca";
            break;
        case "shop.turbotax.ca":
            wa.defaultSiteName="shopttca";
            break;
        case "impotrapide.intuit.ca":
            wa.defaultSiteName="irca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/*Ca. tto*/
if(rsid=="intuitca-turbotaxonline"){
    wa.defaultSiteGroup="app";
    switch (smallDomain)
    {
        case "ww1.2013.turbotaxonline.ca":
            wa.defaultSiteName="2013ttoca";
            break;
        case "ww2.2013.turbotaxonline.ca":
            wa.defaultSiteName="2013ttoca";
            break;      
        case "ww1.2012.turbotaxonline.ca":
            wa.defaultSiteName="2012ttoca";
            break;
        case "ww2.2012.turbotaxonline.ca":
            wa.defaultSiteName="2012ttoca";
            break;
        case "ww1.2011.turbotaxonline.ca":
            wa.defaultSiteName="2011ttoca";
            break;
        case "ww2.2011.turbotaxonline.ca":
            wa.defaultSiteName="2011ttoca";
            break;
        case "2010.turbotaxonline.ca":
            wa.defaultSiteName="2010ttoca";
            break;
        case "2009.quicktaxonline.ca":
            wa.defaultSiteName="2009qtoca";
            break;
        case "2009.turbotaxonline.ca":
            wa.defaultSiteName="2009ttoca";
            break;
        case "2008.quicktaxonline.ca":
            wa.defaultSiteName="2008qtoca";
            break;
        case "2008.turbotaxonline.ca":
            wa.defaultSiteName="2008ttoca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}


/*CA.TaxCentre
*/
if(rsid=="intuitca-turbotaxglobal"&&(smallDomain=="ww1.tc.turbotaxonline.ca"||smallDomain=="ww2.tc.turbotaxonline.ca")){
    wa.defaultSiteName="taxcentre";
    wa.defaultSiteGroup="app";
}


/*Ca. Quicken*/
if(rsid=="intuitca-quicken"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "www.quicken.intuit.ca":
        case "quicken.intuit.ca":
            wa.defaultSiteName="qnca";
            break;
        case "www.shop.quicken.ca":
        case "shop.quicken.ca":
            wa.defaultSiteName="shopqnca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/* Ca. Profile*/
if(rsid=="intuitca-profile"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "profile.intuit.ca":
        case "www.profile.intuit.ca":
            wa.defaultSiteName="pfenca";
            break;
        case "profilefrancais.intuit.ca":
        case "www.profilefrancais.intuit.ca":
            wa.defaultSiteName="pffrca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/* Ca. Accountant*/
if(rsid=="intuitca-accountant"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "www.accountant.intuit.ca":
        case "accountant.intuit.ca":
            wa.defaultSiteName="acctca";
            break;
        case "www.comptable.intuit.ca":
        case "comptable.intuit.ca":
            wa.defaultSiteName="comptableca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/* Ca. Proadvisor*/
if(rsid=="intuitca-proadvisor"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "proadvisor.intuit.ca":
            wa.defaultSiteName="proadvisorca";
            break;
        case "conseillerspro.intuit.ca":
            wa.defaultSiteName="conseillerca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}
/* Ca. qbo*/
if(rsid=="intuitca-qbo"){
    if (curl.indexOf("intuit.ca/quickbooks-online/start")>-1){
    wa.defaultSiteName="qbo";
    wa.defaultSiteGroup="mkt";
    }
    if (curl.indexOf("intuit.ca/quickbooks-en-ligne/commencer")>-1){
    wa.defaultSiteName="qbenligne";
    wa.defaultSiteGroup="mkt";
    }  
}

/* Ca. Quickbooks*/
if(rsid=="intuitca-quickbooks"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "quickbooks.intuit.ca":
        case "www.quickbooks.intuit.ca":
            wa.defaultSiteName="qbca";
            break;
        case "shop.quickbooks.ca":
        case "www.shop.quickbooks.ca":
            wa.defaultSiteName="shopqbca";
            break;
        case "succespme.intuit.ca":
        case "www.succespme.intuit.ca":
            wa.defaultSiteName="spmeca";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/* Ca. Merchant Services*/
if(rsid=="intuitca-merchantservices"){
    wa.defaultSiteName="merchantca";
    wa.defaultSiteGroup="app";
}

/* Ca. Enterprise*/
if(rsid=="intuitca-enterprise"){
    wa.defaultSiteName="qbesca";
    wa.defaultSiteGroup="mkt";
}

/* UK corp*/
if(rsid=="intuitca-intuitcouk"){
    wa.defaultSiteName="intuituk";
    wa.defaultSiteGroup="mkt";
}

/*UK Quickbooks*/
if(rsid=="intuitca-intuitcouk"){
    wa.defaultSiteGroup="mkt";
    switch (smallDomain)
    {
        case "www.quickbooks.co.uk":
        case "quickbooks.co.uk":
        case "quickbooks.intuit.co.uk":
            wa.defaultSiteName="qbuk";
            break;
        case "www.shop.quickbooks.co.uk":
        case "shop.quickbooks.co.uk":
        case "shop.intuit.co.uk":
            wa.defaultSiteName="shopqbuk";
            break;
        default:
            wa.defaultSiteName=smallDomain;
    }
}

/*UK QB Get started*/
if(rsid=="intuitca-getstartedcouk"){
    wa.defaultSiteName="qbgetstarteduk";
    wa.defaultSiteGroup="mkt";
};

/*UK Small Business Britain*/
if(rsid=="intuitca-smallbusinessbritain"){
    wa.defaultSiteName="sbbuk";
    wa.defaultSiteGroup="mkt";
}

/* Test*/
if(rsid=="inuitcadev"){
    wa.defaultSiteName="testsite";
    wa.defaultSiteGroup="testgroup";
    if (smallDomain.indexOf("turbotaxonline.ca") !== -1){
        wa.defaultSiteGroup="TTOtestgroup";
        if (smallDomain.indexOf("2013") !== -1){        
            wa.defaultSiteName="2013TTOtestsite";        
        } else if (smallDomain.indexOf("2012") !== -1){        
            wa.defaultSiteName="2012TTOtestsite";
        } else if (smallDomain.indexOf("2011" !== -1)){
            wa.defaultSiteName="2011TTOtestsite";
        } else if (smallDomain.indexOf("2010" !== -1)){
            wa.defaultSiteName="2010TTOtestsite";
        } else {
            wa.defaultSiteName="TTOUnknowntestsite";
        }
    }
}

/* Set multi-suite report suites */
if (rsid=="intuitca-turbotax"||rsid=="intuitca-turbotaxonline"&&rsid.indexOf("intuitca-turbotaxglobal")==-1){rsid+=",intuitca-turbotaxglobal";};
if (rsid=="intuitca-merchantservices"||rsid=="intuitca-merchantquickbooks"||rsid=="intuitca-gopayment"&&rsid.indexOf("intuitca-merchantglobal")==-1){rsid+=",intuitca-merchantglobal";};
if (rsid=="intuitca-quickbooks"||rsid=="intuitca-qbo"||rsid.indexOf("intuitca-merchantglobal")>-1||rsid=="intuitca-enterprise"&&rsid.indexOf("intuitca-quickbooksglobal")==-1) {rsid+=",intuitca-quickbooksglobal";};
if (rsid.indexOf("intuitca-quickbooksglobal")>-1||rsid.indexOf("intuitca-turbotaxglobal")>-1||rsid.indexOf("intuitca-supportca")>-1||rsid.indexOf("intuitca-intuitca")>-1||rsid.indexOf("intuitca-accountant")>-1||rsid.indexOf("intuitca-proadvisor")>-1||rsid.indexOf("intuitca-")>-1||rsid.indexOf("intuitca-profile")>-1||
    rsid.indexOf("intuitca-quickbooksmobile")>-1||rsid.indexOf("intuitca-turbotaxmobile")>-1||rsid.indexOf("intuitca-profilemobile")>-1||rsid.indexOf("intuitca-quickenmobile")>-1||rsid.indexOf("intuitca-accountantmobile")>-1||rsid.indexOf("intuitca-gopaymentmobile")>-1
    &&rsid.indexOf("intuitca-canadaglobal")==-1){rsid+=",intuitca-canadaglobal";};
    
s_account=rsid;

}

function analyticsClick(obj,linkName,event)
{
    s=s_gi(s_account);
    s.eVar6 = s.prop6 = linkName; //used for link tracking

    s.linkTrackVars = "eVar6,prop6,prop2,prop5,prop7";  //prop,evar6 linkname, 2 site, 5 rsid,7 language
    if (event) {
        s.events = event;
        s.linkTrackVars += ",events";
    // remove event serialization (if any) before adding to list of events to track
        s.linkTrackEvents = (event.indexOf(':') >= 0) ? event.substr(0,event.indexOf(':')) : event;
    } else {
    s.linkTrackEvents = "None";
  }
    var lt=obj.href!=null?s.lt(obj.href):"";
    if (lt=="") { s.tl(obj,'o',linkName); }
}

var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters=internalFilter
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Page Name Plugin Config
s.siteID=""            // leftmost value in pagename
s.defaultPage=""       // filename to add when none exists
s.queryVarsList=""     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=""   // page name component separator
s.pathExcludeList=""   // elements to exclude from the path
*/

var rurl=document.referrer.toLowerCase();
var rdomain=rurl.replace(/(\/\/[^\/]+\/).*/,'$1');
var cleanDomain=rdomain.replace(/www.|http:|https:|\//g,"");

var atgShopperId = getCookie("SHOPPER_USER_ID");
var urlRegExp = /(\w+):\/\/([\w.:-]+)\/?([\w.\/-]*\/)?([^\/?]*)\??(\S*)/;
var urlArray = curl.match(urlRegExp);
var defaultPath = (urlArray[3] != undefined) ? urlArray[3] : "";
if (urlArray[4]) {defaultPage = urlArray[4];}
    else
    {if (!urlArray[4]) {defaultPage="index";}  else {defaultPage="";}}
if (wa.defaultSiteGroup != "sup" && defaultPage){
    defaultPage=defaultPage.replace(/.php|.aspx|.asp|.jsp|.cfm|\.com|.shtml|.html|.htm/g,'');
}
if (defaultPath) {defaultPath=defaultPath.replace(/\/$/g,'');}
// if (defaultPath) {defaultPath=defaultPath.replace(/\//g,': ');}

if (wa.siteName == null || typeof wa.siteName == "undefined")
   {wa.siteName=wa.defaultSiteName;} else {wa.siteName=wa.siteName.toLowerCase();}
if (wa.pageDir == null || typeof wa.pageDir == "undefined")
   {wa.pageDir=defaultPath;} else {wa.pageDir=wa.pageDir.toLowerCase();}
if (wa.pageSubDir == null || typeof wa.pageSubDir == "undefined")
   {wa.pageSubDir="";} else {wa.pageSubDir=wa.pageSubDir.toLowerCase();}
if (wa.pageDetail == null || typeof wa.pageDetail == "undefined")
   {wa.pageDetail=defaultPage;} else {wa.pageDetail=wa.pageDetail.toLowerCase();}
if (wa.pageFunc == null || typeof wa.pageFunc == "undefined")
   {wa.pageFunc="";} else {wa.pageFunc=wa.pageFunc.toLowerCase();}
if (wa.siteGroup == null || typeof wa.siteGroup == "undefined")
   {wa.siteGroup=wa.defaultSiteGroup;} else {wa.siteGroup=wa.siteGroup.toLowerCase();}
if (wa.events) {s.events = wa.events};

if (wa.bu!= null) {s.eVar1=s.prop1=wa.bu};
if (s.prop1!="") {s.eVar2=s.prop2=s.prop1+":"+wa.siteName;} else {s.eVar2=s.prop2=wa.siteName;}
if (s.prop2) {s.eVar3=s.prop3=s.prop2+":"+wa.siteGroup;} else {s.eVar3=s.prop3=wa.siteGroup;}
if (wa.siteGroup == "sup" || wa.pageDir.indexOf("education")>-1) //Only use full path for support sites and 'education' pages
{
    var ary = wa.pageDir.split("\/");
    if (ary.length >= 4)
        wa.pageDir = ary[0] + "\/" + ary[1];

    if (wa.pageDir) s.pageName=wa.pageDir;
    if (wa.pageSubDir) s.pageName=s.pageName?s.pageName+"/"+wa.pageSubDir:wa.pageSubDir;
}
if (s.pageName){s.pageName=s.pageName.replace(/;jsessionid.*$/,'')};
if (wa.pageDetail){wa.pageDetail=wa.pageDetail.replace(/;jsessionid.*$/,'');}
if (s.pageName) {s.prop4=s.eVar4=s.pageName+" |"+s.prop3;}
    else {s.prop4=s.eVar4=wa.pageDetail+" |"+s.prop3;}
if (wa.pageDetail) s.pageName=s.pageName?s.pageName+"/"+wa.pageDetail+" |"+s.prop3:wa.pageDetail+" |"+s.prop3;

/* Plugin Config */
s.ActionDepthTest=true;
s.usePlugins=true
function s_doPlugins(s) {
    /* Add calls to plugins here */

    if(rdomain){
        var srdomain=rdomain.substring(rdomain.indexOf('//')+2,rdomain.length-1);
        if(srdomain.indexOf('intuit.ca')>-1 ||srdomain.indexOf('turbotaxonline.ca')>-1 && !s.inList(srdomain,s.linkInternalFilters,",")) {
            s.prop37=s.eVar37=srdomain;
        }
    }

    /* Set Landing Page and Second Page Event */
    if(s.ActionDepthTest){
        s.pdvalue=s.getActionDepth("s_depth");
    if(s.pdvalue == 1)
        s.events=s.apl(s.events,'event50',',',2)
    if(s.pdvalue == 2)
        s.events=s.apl(s.events,'event51',',',2)
    }
    s.ActionDepthTest=false;

    /* getPagename v2.1 */
//AM    if(!s.pageType && !s.pageName)
//AM        s.pageName=s.getPageName();

    /* Capture channel and hierarchy based on url path */
    var getSeg=document.location.pathname.split("/");
    s.channel=getSeg[1];
    s.prop3=getSeg[2];
    if (s.prop3) { s.eVar3="D=c3";};

    /* Capture external campaigns: getQueryParam 2.3 */
    if (!s.campaign) {
        s.campaign=s.getQueryParam('cnm');
        if(!s.campaign) { s.campaign=s.getQueryParam('cid'); }
        wa.campaign=s.campaign;
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
    }

    if (!s.eVar14) {
        s.eVar14=s.getQueryParam('src');
        s.eVar14=s.getValOnce(s.eVar14,'s_src',0);
    }
    s.prop14=s.getQueryParam('src');

    /* First Touch attribution for campaign values */
    s.prop25=s.eVar25=s.campaign;

////////////////////////////////////////////////////////////
/*              BEGIN EVOLYTICS CUSTOM                    */
////////////////////////////////////////////////////////////

    wa.rurl=document.referrer;
    wa.curl=location.href.toLowerCase();
    wa.curl=(wa.curl.indexOf("#__utm")>-1) ? wa.curl.substr(0,wa.curl.indexOf("#__utm")) : wa.curl; //strip all google cookie details from wa.curl, if found
    
    if(wa.rurl) {
        wa.rurl=wa.rurl.toLowerCase();
        wa.rdomain=wa.rurl.replace(/(\/\/[^\/]+\/).*/,'$1');
        wa.cleanDomain=wa.rdomain.replace(/www.|http:|https:|\//g,"");
        wa.rPath=wa.rurl.replace(wa.rdomain,"");
        //aggregate referrals from webmail by host (ie//36ohk6dgmcd1n-c.c.yom.mail.yahoo.net > mail.yahoo.net)
        wa.cleanDomain=(wa.cleanDomain.indexOf("mail")>-1) ? wa.spliceDelimitedString(wa.cleanDomain,'.',3) : wa.cleanDomain;
    }
    
    //traffic from the specified domain(s) will NOT be tracked as referral in URS logic   //update
    wa.internalHostArray=["intuit.ca","turbotax.ca","turbotaxonline.ca","impotrapide.ca","gopayment.ca","intuitglobal.ca","quicktax.ca",
                            "quicken.ca","proadvisor.ca","quickbooks.ca","quickbooksintervention.ca","qbo.ca","iworkformyself.ca"];
    wa.isInternalHost=function() {
        for(var i=0;i<wa.internalHostArray.length;i++) {
            if(wa.curl.indexOf(wa.internalHostArray[i])>-1) {
                    wa.isInternal=true;break;
                } 
                else {wa.isInternal=false;
                }
        }}

    wa.isInternalHost(); //evaluate whether to execute the code below 
    
        /*
            wa.getQueryString()
            -    Get any value from the query string.  Pass in the query parameter being searched for
            -        pv_queryParam - accepts multiple comma-delimited param names; will return value of first param found
            -        pv_url - optional - if NOT provided, defaults to current page url/address;
        */
        wa.getQueryString=function(pv_queryParam,pv_url) {
            var returnVal,fullSubString,splitSubString;
            fullSubString=(pv_url) ? pv_url.slice(pv_url.indexOf("?")+1) : window.location.search.substring(1);
            
            subStringArray = fullSubString.split("&");
            queryParamArray = pv_queryParam.split(",");
            
            for (i=0;i<subStringArray.length;i++) {//loop through params in query string
                paramValue = subStringArray[i].split("=");        
                for(ii=0;ii<queryParamArray.length;ii++) {//loop through params in pv_queryParam
                    if (paramValue[0] == queryParamArray[ii]) {
                        returnVal=(paramValue[1]) ? unescape(paramValue[1]) : "";
                        returnVal=returnVal.replace(/\+/g," ");//replace "+" with " " to be consistent with s.getQueryParam();
                        returnVal=returnVal.replace(/^\s+|\s+$/g, "");//trim trailing and leading spaces from string
                        return returnVal;
                    }
                }
            }
        }

        /*
            wa.getCookie()
            - c_name = name of cookie to retrieve
        */
        wa.getCookie=function(c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
            return "";
        }

        /*
            wa.setCookie()
            - c_name = name of cookie to create
            - value = value to assign to cookie
            - expiredays = number of days until cookie should expire
        */
        wa.setCookie=function(c_name,value,expiredays) {
            var exdate=new Date();
            var h=window.location.hostname;
            h=h.split('.');h=h.splice(h.length-2,2);//grab lst 2 positions of hostname (ie//"example.com")
            h=h.join('.');
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? ";path=/" : ";path=/;expires="+exdate.toGMTString())+";domain="+h;
        }

        /*
            wa.isVarEmpty()
            - Validate if variable is null, undefined or blank ("")
            -   pv_sVar
        */
        wa.isVarEmpty=function(pv_sVar) {
            if ( (pv_sVar==null) || (typeof(pv_sVar)=="undefined" || (pv_sVar=="")) ) {
                return true;
            } else {
                return false;
            }
        }

        /*
            wa.spliceDelimitedString()
            - Truncate length of delimited string to specified length (remove from left of string)
            -   pv_string
            -   pv_delimiter
            -   pv_length
        */
        wa.spliceDelimitedString=function(pv_string,pv_delimiter,pv_length) {
            var pv_string = pv_string.split(pv_delimiter);                          //split into array
            if(pv_string.length>pv_length) {                                        //check length against desired length
                pv_string = pv_string.splice(pv_string.length-pv_length,pv_length); //remove first X items
            }
            pv_string = pv_string.join(pv_delimiter);                               //convert array to string
            return(pv_string);
        }
        
        /*
            wa.crossVisitParticipation()
            - Build/Retrieve Cookie for Cross Visit Participation
            -   pv_cookieName
            -   pv_cookieValue
            -   pv_returnLength
            -   pv_delimiter
            -   pv_cookieExpire
        */
        wa.crossVisitParticipation=function(pv_cookieName,pv_cookieValue,pv_returnLength,pv_delimiter,pv_cookieExpire) {
            var cookieValue = (pv_cookieValue) ? pv_cookieValue.replace("'","") : "";
            var cookieArray = (wa.getCookie(pv_cookieName)) ? wa.getCookie(pv_cookieName).split(",") : "";
            var returnValue
            
            if(cookieValue) {
                if((cookieArray=="none") || (wa.isVarEmpty(cookieArray))){ //does the cookie exist, with data?
                    newCookieArray=[cookieValue]; //build the new array with pv_cookieValue
                    wa.setCookie(pv_cookieName,newCookieArray,pv_cookieExpire); //create the new cookie
                    return(cookieValue); //return new string
                } else {
                    var mostRecent = cookieArray[0];
                    if(mostRecent!=cookieValue) { //is the current pv_cookieValue same as last?
                        cookieArray.unshift(cookieValue); //if not, add it
                        if(cookieArray.length>=pv_returnLength) { cookieArray.length=pv_returnLength }; //make sure array length matches pv_returnLength
                        wa.setCookie(pv_cookieName,cookieArray,pv_cookieExpire); //update the cookie with new values
                    }
                }
            }
            returnValue=(cookieArray) ? cookieArray.reverse().join(pv_delimiter) : ""; //build the return string using pv_delimiter
            return(returnValue);
        }

        wa.socialNetworkArray=[
            "12seconds.tv","backtype.com","bebo.com","blogspot.com","brightkite.com","cafemom.com","ceounplugged.homestead.com",
            "classmates.com","community.freshbooks.com","community.intuit.com","dailymotion.com","delicious.com","digg.com",
            "diigo.com","disqus.com","en.wikipedia.org","facebook.com","financialsoft.about.com","flickr.com","flixster.com",
            "fotolog.com","friendfeed.com","friendster.com","hi5.com","identi.ca","imeem.com","intensedebate.com","jaiku.com",
            "linkedin.com","livejournal.com","macworld.com","mister-wong.com","mixx.com","mylife.com","myspace.com","myyearbook.com",
            "netvibes.com","ning.com","orkut.com","photobucket.com","pinterest.com","plurk.com","plus.google.com","readwriteweb.com",
            "reddit.com","slideshare.net","smallbiztrends.com","smallbusinesscomputing.com","smugmug.com","stumbleupon.com","t.co",
            "tagged.com","theappleblog.com","tumblr.com","twine.com","twitter.com","vimeo.com","wordpress.com","xanga.com",
            "yelp.com","youtube.com","yuku.com","zooomr.com"
        ];
        /*
            wa.isSocial()
            - Determine if referring domain is a social network based on wa.socialNetworkArray
        */
        wa.isSocial=function(pv_rDomain) {
            var returnVal=false;
            for(var i=0;i<wa.socialNetworkArray.length;i++){
                if(pv_rDomain==wa.socialNetworkArray[i]) {
                    returnVal=true;
                    break;
                }
            }
            return(returnVal);
        }

        
        if(wa.campaign){wa.cid=wa.campaign;}
        
        if(wa.cid) { wa.ursvar=wa.campaign=wa.cid; }
        if(wa.campaign=="" && wa.cleanDomain=="") {
            wa.ursvar="";
        } else {
            wa.orgDomains=[
                ["bing","q"],["a9","*,q"],["abacho","q"],["ah-ha","q"],["alexa","q"],["allesklar","wo,words"],["alltheweb","q,query"],
                ["altavista","q"],["aol","query"],["arianna","query,b1"],["asiaco","query,qry"],["ask","q,ask"],["atlas","q"],
                ["austronaut","begriff,suche"],["auyantepui","clave"],["bluewin","qry,q"],["centrum","q"],["club-internet","q"],
                ["dino-online","query"],["dircom","req"],["dmoz","search"],["dogpile","q,qkw"],["eniro","q"],["euroseek","string,query"],
                ["exalead","q"],["excite","search,s,qkw"],["findlink","key"],["findwhat","mt"],["fireball","q"],["freeserve","q"],
                ["gigablast","q"],["go2net","general"],["goeureka","key"],["google","q,as_q,as_epq,as_oq"],["googlesyndication","url"],["googleadservices","q"],
                ["greekspider","keywords"],["hotbot","query,mt"],["ilor","q"],["iltrovatore","q"],["indexnanacoil","q"],["infoseek","qt,q"],
                ["infospace","qkw"],["iwon","searchfor"],["ixquick","query"],["jubii","query,soegeord"],["jyxo","s"],
                ["kanoodle","query"],["kataweb","q"],["kvasir","q"],["live","q"],["looksmart","qt,key,querystring"],["lycos","query,mt,q,qry"],
                ["mamma","query"],["metacrawler","q,general,qry"],["msn","q,mt"],["mywebsearch","searchfor"],["mysearch","searchfor"],
                ["netex","srchkey,keyword"],["netscape","search,searchstring,query"],["netster","keywords"],["nettavisen","query,q"],
                ["ninemsn","q"],["nlsearch","qr"],["nomade","mt,s"],["northernlight","qr"],["oozap","query"],["overture","keywords"],
                ["ozu","q"],["passagen","q"],["quick","ftxt_query"],["savvy","s"],["scrubtheweb","keyword,q"],["wwwsearchcom","q"],
                ["searchalot","q"],["searchhippo","q"],["sensis","find"],["seznam","w"],["soneraplaza","qt"],["splatsearch","searchstring"],
                ["sprinks","terms"],["spray","query"],["srch","q"],["supereva","q"],["teoma","q"],["thunderstone","q"],["tiscalich","key"],
                ["tjohoo","soktext,mt,query"],["track","qr"],["truesearch","query"],["tygo","s"],["vinden","query"],["virgilio","qs"],
                ["vivisimo","query"],["voila","kw"],["walla","q"],["wanadoo","fkw"],["web","su"],["webcrawler","qkw,search,searchtext"],
                ["webwatch","findindb"],["wepa","query"],["wisenut","q"],["xpsn","kwd"],["ya","q"],["yahoo","p,va,vp,vo"],["ynet","q"],["zerx","search"]
            ];
            
            wa.domainFound="";            
            for(var i=0;i<wa.orgDomains.length;i++) {
                if(wa.rurl.indexOf(wa.orgDomains[i][0]+".")>=1) {
                    wa.domainFound=wa.orgDomains[i][0];

                        //loop through possible query string parameters in attempt to locate keyword(s)
                    var aryQueryParams=wa.orgDomains[i][1].split(',');
                    for(var iii=0,max2=aryQueryParams.length;iii<max2;iii++){
                        wa.parsekw=wa.getQueryString(aryQueryParams[iii],wa.rurl);
                        if(wa.parsekw){ break; }
                    }
                    
                    if(wa.parsekw) {
                        if(wa.ursvar) { //paid search channel
                            wa.ppckw=wa.parsekw;
                            wa.ursvar=wa.cid;
                            wa.trafficType="ppc";
                            break;
                        } else { //orgnic search channel
                            wa.ursvar=wa.cleanDomain+" [seo]";
                            wa.natkw=wa.parsekw;
                            wa.trafficType="seo";
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }

            if(!wa.parsekw && !wa.campaign && wa.cleanDomain) {
                if(wa.isSocial(wa.cleanDomain)) { //social channel
                    wa.ursvar=wa.cleanDomain+" [soc]";
                    wa.ursSocial=wa.cleanDomian;
                    wa.trafficType="social";
                } else { //referral channel                
                    for(var i=0;i<wa.internalHostArray.length;i++) {
                        if(wa.cleanDomain.indexOf(wa.internalHostArray[i])<0) {
                            wa.ursvar=wa.cleanDomain+" [ref]";
                            wa.trafficType="ref";
                        } else {
                            wa.ursvar=wa.trafficType="";
                            break;
                        }
                    }
                }
            }
            //account for yahoo secure search traffic (no keyword provided)
            if(wa.domainFound === "yahoo" && wa.cleanDomain.indexOf("search.yahoo.com") > -1) {
                if(!wa.cid) {
                    wa.ursvar=wa.cleanDomain+" [seo]";
                    wa.natkw=wa.parsekw="not provided|yahoo";
                    wa.trafficType="seo"; //organic|seo
                } else if(wa.cid && wa.cid.indexOf('ppc_') > -1) {
                    wa.trafficType = 'ppc';
                    wa.ppckw = wa.parsekw = 'not provided|yahoo';
                }
            }

            if(wa.domainFound==="google") {
                if(!wa.cid) {
                    //account for organic google secure (encrypted) search traffic (no keyword provided)
                    //wa.cleanDomain=wa.domainFound; //enable this line to aggregate all google properties into "google [seo]"
                    wa.googleEsrc=wa.getQueryString("esrc",wa.rurl);
                    if((!wa.parsekw && wa.googleEsrc) || (wa.rdomain.indexOf("://www.google.")>0 && wa.rPath=="")) { //secure search...                
                        wa.ursvar = wa.cleanDomain + " [seo]";
                        wa.natkw=wa.parsekw="(not provided)";//"not provided|google"
                        wa.trafficType="seo";
                    } else if(wa.campaign && wa.campaign.indexOf("ppc_")===0 && !wa.parsekw){ //if has cnm that begins with "ppc_", but no keyword found in referring url, assume ppc...
                        wa.ppckw=wa.parsekw="(not provided)";//"not provided|google"
                        wa.trafficType="ppc";                
                    }
                } else if(wa.cid && wa.cid.indexOf('ppc_') > -1) {
                    wa.trafficType = 'ppc';
                    wa.ppckw = wa.parsekw = '(not provided)';
                }
            }
        }
        if(!wa.trafficType && wa.campaign) {
            if(wa.campaign.indexOf("_")>-1) {
                wa.campaignPrefix=wa.campaign.split("_")[0];
                if(!isNaN(wa.campaignPrefix)) { wa.campaignPrefix="em"; }
            } else {
                wa.campaignPrefix=wa.campaign;
            }
            wa.trafficType=wa.campaignPrefix;
        }
        
            /*
                wa.sessionChannelWithDirect 
                - Anonymous function, requires the following inputs:
                    * .trafficType > Value is determined by urs logic above; represents marketing channel
                    * .ursValue > Value is determined by urs logic above; represents tracking code, referring domain, etc
                    * .cookieName > Determines the cookie name or sessionStorage key name
                - The anonymous function returns an object containing the following properties:
                    * .trafficType > Marketing channel; Returns "direct" for direct visits with no prior/known channel
                    * .ursvarDirect > URS value (full cid, etc, not just channel); Includes "direct" as noted for .trafficType
                - Dependencies:
                    * Requires wa.isVarEmpty()
                    * Requires wa.getCookie()
                    * Requires wa.setCookie()
            */
        wa.sessionChannelWithDirect=(function(pv_object){
            var retVal={},
                isSessionStorage=false;//(sessionStorage)?true:false;
            var trafficType=(pv_object.trafficType)?pv_object.trafficType:"direct";
            var stored,current,isReStore=false;
            
                //get stored value to compare with new (current) trafficType
            if(isSessionStorage){
                stored  = sessionStorage.getItem(pv_object.cookieName);
                stored  = (wa.isVarEmpty(stored)) ?"":stored;
                current = trafficType;
                current = (wa.isVarEmpty(current))?"":current;
            } else {
                stored  = wa.getCookie(pv_object.cookieName);
                stored  = (wa.isVarEmpty(stored)) ?"":stored;
                current = trafficType;
                current = (wa.isVarEmpty(current))?"":current;
            }
            
                //perform comparison and determine whether or not to update cookie/sessionStorage
            if(stored && stored!="" && stored!=current) { //stored channel exists, not same as current channel
                retVal.trafficType=(current!="direct")?current:stored;
                isReStore=true; //update cookie/sessionStorage
            } else if(stored && stored===current) { //stored and current mtach exactly
                retVal.trafficType=stored;
            } else if(!stored) { //nothing stored
                retVal.trafficType=current;
                isReStore=true; //update cookie/sessionStorage
            }

                //update cookie/sessionStorage
            if(isReStore) {
                if(isSessionStorage){
                    sessionStorage.setItem(pv_object.cookieName,retVal.trafficType);
                } else{
                    wa.setCookie(pv_object.cookieName,retVal.trafficType);
                }
            }
            
            retVal.ursvarDirect=(retVal.trafficType==="direct") ? "direct" : pv_object.ursValue;                
            
            return(retVal);
        })({ //pass in current trafficType and cookie/sessionStorage key name
            trafficType :wa.trafficType,
            ursValue    :wa.ursvar,
            cookieName  :"sc_ca_sessChannel"
        });

            //set final direct value for wa.campaignStack and wa.campaignStackDirect
        wa.campaignStack=wa.crossVisitParticipation("sc_ca_cmp_cvp",wa.trafficType,5," > ",30);//remember last 5 campaign channels for 90 days
        wa.campaignStackDirect=wa.crossVisitParticipation("sc_ca_cmp_cvp-d",wa.sessionChannelWithDirect.trafficType,5," > ",30);//remember last 5 campaign channels for 90 days

        ////POPULATE SITECATALYST VARIABLES////

        if(wa.ursvar) { //search keywords
            s.eVar30=(wa.natkw) ? wa.natkw : "(not organic search)";s.prop30=(s.eVar30)?"D=v30":"";
            s.eVar29=(wa.ppckw) ? wa.ppckw : "(not paid search)";s.prop29=(s.eVar29)?"D=v29":"";
        }
        s.eVar28=wa.ursvar;
        s.prop28=s.eVar68=(s.eVar28)?"D=v28":""; //urs var
        s.eVar24=wa.campaignStack;s.prop24=(s.eVar24)?"D=v24":""; //campaign stacking/cross-visit participation (sc_ca_cmp_cvp cookie)
        
        //urs w/direct
        s.eVar21=wa.sessionChannelWithDirect.ursvarDirect;
        s.prop9=(s.eVar21)?"D=v21":""; //ursvarDirect
        s.eVar26=wa.campaignStackDirect;s.prop68=(s.eVar26)?"D=v26":"";//urs channel stacking w/direct (sc_ca_cmp_cvp-d cookie)
        
        
        if(rsid){s.prop5=rsid.replace(/intuitca-/g,"");}
        if(wa.testCell) { s.eVar47=wa.testCell;s.prop47="D=v47"; } //wa.testCell populated in T&T offer to identify test/experience assignment
            
    if(wa.productId) {
        if(!wa.isVarEmpty(wa.productId) && wa.productId.toLowerCase()!="none tracked"){ //do not populate with default/placeholder value
            s.eVar8=wa.productId; //(original|purchase)
        }
        s.prop8=wa.productId; //populate prop any time prod id is available
    }

    //if in a frame check document.referrer for param
    wa.iref=(top!=self) ? wa.getQueryString('iref',document.referrer) : wa.iref=wa.getQueryString('iref');
    s.eVar22=wa.iref;
    s.eVar22=s.getValOnce(s.eVar22,'s_v22',0);
    if (s.eVar22) { s.prop22="D=v22";};

    
////////////////////////////////////////////////////////////
/*                END EVOLYTICS CUSTOM                    */
////////////////////////////////////////////////////////////   
    
    /* Enhanced download tracking */
    s.url=s.downloadLinkHandler();
    if(s.url){
        //Track FileName
                s.eVar20=s.url.substring(s.url.lastIndexOf("/")+1,s.url.length);
                s.prop20=s.eVar20;
                    s.events=s.apl(s.events,"event23",",",2)
                    s.prop19=s.getPreviousValue(s.pageName,'gpv_p19','event23');
                    s.eVar19=s.prop19;
        //Track eVar & Event
                    s.linkTrackVars="eVar20,eVar19,prop20,prop19,events"
                    s.linkTrackEvents="event23"
    }

    /* Site Search */
    if(s.prop31){
        s.prop31=s.prop31.toLowerCase();
        s.eVar31=s.prop31;
        var t_search=s.getValOnce(s.eVar31,'ev31',0);
        if(t_search){
            s.events=s.apl(s.events,"event47",",",2);
        }
    }
    /* Search Orgination Page */
    s.prop49=s.getPreviousValue(s.pageName,'gpv_p49','event47');
    if (s.prop49) {s.eVar49="D=c49";};

    /* getNewRepeat v1.2 */
    s.prop16=s.getNewRepeat();
    s.eVar16="D=c16";

    /* Capture page url */
    var pageUrl=document.URL;
    if (pageUrl.indexOf('confirm-order.jsp')>-1){
        pageUrl=document.URL.split('?');
        s.eVar27=pageUrl[0];
        s.prop27="D=v27";
    }else{
        s.eVar27=pageUrl;
        s.prop27="D=v27";
    }

    /* Capture channel parameter "src" */
    s.eVar14=s.getQueryParam('src');
    s.eVar14=s.getValOnce(s.eVar14,'s_v14',30);
    if (s.eVar14) {s.prop14="D=v14";};

    /* Capture brand ID */
    s.eVar11=s.getQueryParam('_brand');
    if (s.eVar11) {s.prop11="D=v11";};

    /* Capture discount code */
    s.eVar23=s.getQueryParam('priorityCode');
    if (s.eVar23) {s.prop23="D=v23";};

    /* Capture page load time */
    if (typeof time1 != 'undefined') {
    var clientTime, clientBucket = '';
    var time2 = new Date().getTime();
    if (time1 && time2) { clientTime = (time2 - time1); }
    if (clientTime < 500) { clientBucket = '0-500ms'; }
    else if (clientTime < 1000) { clientBucket = '500-1000ms'; }
    else if (clientTime < 5000) { clientBucket = '1000-5000ms'; }
    else if (clientTime < 7500) { clientBucket = '5000-7500ms'; }
    else if (clientTime < 10000) { clientBucket = '7500-10000ms'; }
    else if (clientTime < 11000) { clientBucket = '10000-11000ms'; }
    else if (clientTime >= 11000) { clientBucket = '> 11000ms'; }
    s.prop39 = clientBucket; } else {
    s.prop39 = 'undefined';}
    if (s.prop39) {s.eVar39="D=c39";};

    /* Copy props to eVars */
    //if (s.prop47) {s.eVar47="D=c47";};
    if (s.prop13) {s.eVar13="D=c13";};
    if (s.prop7) {s.eVar7="D=c7";};
    
        //copy purchaseID to prop/eVar
    s.eVar40=(s.purchaseID)?s.purchaseID:""; 

    ///////////// BEGIN OPTIMIZELY CUSTOM EVENT TRACKING 2016-01-04 /////////////
        wa.firedOptimizelyEvents = wa.firedOptimizelyEvents || []; //optimizely events that have fired since the last page load
        /**
         * @desc initiates optimizely event/goal calls
         * @param pv_event {string} - optimizely event
         * @param pv_revenue {string=} - amount of purchase
         * @example optimizelyTrackEvent('account_created','19.99');
         */
        function optimizelyTrackEvent(pv_event,pv_revenue){
            if(wa.firedOptimizelyEvents.indexOf(pv_event) < 0) {
                try{
                    var valueInCents = (pv_revenue) ? pv_revenue*100 : 0;
                    window['optimizely'] = window['optimizely'] || [];
                    window.optimizely.push(["trackEvent", pv_event, {"revenue": valueInCents}]);
                    wa.firedOptimizelyEvents.push(pv_event);
                } catch(e) { /* ignore */ }
            }
        }


        var aryEvents = (s.events) ? s.events.split(',') : [];
 
         /**
         * @desc Login (Login (e2)): 
         */
        if(aryEvents.indexOf('event2') > -1) {
            optimizelyTrackEvent("login");
        }

         /**
         * @desc Account Created Goal API Call (Account Created (e25)): 
         */
        if(aryEvents.indexOf('event25') > -1) {
            optimizelyTrackEvent("account_created");
        }

        /**
         * @desc Auth Verification Goal API Call (TTO-SIN Auth (e83)):
         */
        if(aryEvents.indexOf('event83') > -1) {
            optimizelyTrackEvent("auth_SIN");
        }

        /**
         * @desc Import Usage Goal API Call (My CRA Account v75 === 'yes'):
         */
        if(s.eVar75 && /^yes$/i.test(s.eVar75)) {
            optimizelyTrackEvent("import_generated");
        }

        /**
         * @desc Orders (Core Product) Goal API Call ('purchase' event AND core (paid) product sku (2 stand, 3 prem, 4 h&b):
         */
        if(aryEvents.indexOf('purchase') > -1) {
            if(s.products) {
                var optProducts = s.products;
                optProducts = optProducts.split(',');
                for(var i = 0, max = optProducts.length; i < max; i++) {
                    var tmpOptProduct = optProducts[i].split(';'),
                        purchasedProduct = s.prop8 || tmpOptProduct[1]; // evaluate products string as backup
                    if(/^(2|3|4)$/.test(purchasedProduct)) {
                        var orderPrice = (tmpOptProduct[3]) ? tmpOptProduct[3] : '';
                        optimizelyTrackEvent("conversion_success", orderPrice);
                        break;
                    }
                }
            }
        }
    ///////////// END OPTIMIZELY CUSTOM EVENT TRACKING 2016-01-04 /////////////
}

    //grab s_vi cookie value when available, placing it in wa._scId variable
    //  to reference wa._scId, poll the variable for a value after document.ready
    if(typeof(jQuery)!="undefined") {
        jQuery(document).ready(function(){
            wa.get_scId=setInterval(function() {
                wa.s_d_cookie=s.d.cookie.split("; ");
                for(var i=0,max=wa.s_d_cookie.length;i<max;i++) {
                    if(wa.s_d_cookie[i].split("=")[0]=="visitorID" || wa.s_d_cookie[i].split("=")[0]=="s_vi") {
                        wa._scId=(wa.s_d_cookie[i].split("=")[1]);
                        break;
                    }
                }                  
                if(wa._scId) {
                    clearInterval(wa.get_scId);
                }
            },1000); //check for s_vi cookie every 1 second until found
            wa.get_scId;
        });
    }    
    
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

/**
 * @desc Optimizely Adobe Analytics SiteCatalyst Integration
 * @see https://help.optimizely.com/hc/en-us/articles/200039985-Integrating-Optimizely-with-Adobe-Analytics
 */
try{
    window.optimizely = window.optimizely || [];
    window.optimizely.push("activateSiteCatalyst");
} catch(e) { /* ignore */ }


s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Utility: inList v1.0 - find out if a value is in a list
 */

s.inList=new Function("v","l","d",""
+"var s=this,ar=Array(),i=0,d=(d)?d:',';if(typeof(l)=='string'){if(s."
+"split)ar=s.split(l,d);else if(l.split)ar=l.split(d);else return-1}e"
+"lse ar=l;while(i<ar.length){if(v==ar[i])return true;i++}return fals"
+"e;");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Plugin: getActionDepth v1.0 - Returns the current
 * page number of the visit
 */
s.getActionDepth=new Function("c",""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
+ "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
+ "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");
/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
/*
 * Plugin: downloadLinkHandler 0.5 - identify and report download links
 */
s.downloadLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");
/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="intuitcanada"
s.trackingServer="ci.intuit.ca"
s.trackingServerSecure="sci.intuit.ca"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,r"
+"s);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(windo"
+"w.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im"
+".s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;i"
+"m.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\""
+"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s"
+"=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y="
+"y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('goo"
+"gle')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+="
+"(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe."
+"substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt"
+"(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=="
+"'visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'"
+"){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=="
+"'AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider"
+"')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';e"
+"lse if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q"
+"='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if"
+"(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.subst"
+"ring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.l"
+"inkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this"
+",\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e."
+"srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h"
+"=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathn"
+"ame.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCas"
+"e?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot"
+"(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r"
+"\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE"
+"')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').in"
+"dexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.p"
+"t(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs"
+"=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';"
+"for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]"
+"&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.lin"
+"ks.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
+"){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh("
+"s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if"
+"(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='"
+"):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynami"
+"cAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s."
+"fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\""
+"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;"
+"if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m["
+"t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<"
+"g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.subst"
+"ring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n"
+"+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;"
+"if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"s"
+"cript\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e"
+"){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}ret"
+"urn m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)"
+"for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s."
+"dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDel"
+"ay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10"
+"+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta="
+"-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if"
+"(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;t"
+"cf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.jav"
+"aEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5"
+"){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y"
+"\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)w"
+"hile(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.b"
+"rowserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.w"
+"d.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return"
+" '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s"
+"_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i"
+"<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk="
+"0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s."
+"fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta"
+");qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t"
+"(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.lo"
+"cation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns"
+"6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=pa"
+"rseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUp"
+"perCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorName"
+"space,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,s"
+"tate,zip,events,products,linkName,linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,"
+"cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDom"
+"ainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,"
+"linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s."
+"wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}