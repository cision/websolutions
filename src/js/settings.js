// This JavaScript file is created by Cision and holds settings for all our client modules.
// This file works as a config file for all the modules and here you will find general settings 
// and a specific sektion for each module with its access key that is used to fetch the data from our API. 

window.cision = {};
window.cision.websolution = cision.websolution || {};
window.cision.websolution.settings = cision.websolution.settings || {};

window.cision.websolution.settings = {
    general: {
        // Settings that apply to all modules 
        serviceEndpoint: '//publish.ne.cision.com/papi/',
        uiLanguage: 'sv',
        useProxyHandler: false,
        // proxyHandler: 'ProxyCallsHttpHandler.ashx',
        startDate: '',
        endDate: '',
        pageIndex: 0,
        pageSize: 50,
        numberFormatOptions: {
            thousandSeparator: ' ',
            decimalSeparator: ',',
            decimalPrecision: 2
        },
        dateFormatOptions: {
            dateTimeFormat: 'DD MMM YYYY HH:mm',
            dateFormat: 'DD MMM YYYY',
            timeFormat: 'HH:mm'
        },		
        // Newsfeed specific settings
        separateFirstRelease: false,
        introMaxLength: 155,
        titleMaxLength: null,
        newsfeedYearsStartYear: 1980,

        // ownership specific settings
        LargestPieShowCount: 25,
        LargestListShowCount: 25,

        // Calendar specific settings
        separateFirstEvent: false,

        // Printed Material specific settings
        printedMaterialCategory: '',
        maxAmountOfItems: 10, // max amount of items a user can order in one request

        // Ticker specific settings
        tickerImageMinus: "images/down.png",
        tickerImagePlus: "images/up.png",
        tickerImageUnchanged: "images/unadjusted.png",

        //Share calculator specific settings
        startDateYear: 2007,

        // Sharegraph specific settings
        chartContainerId: 'sharegraph-container',
        chartTitle: '',
        backgroundImage: '',
        lineWidth: 2,
        gridLineWidth: 0,
        plotBackgroundColor: 'white',
        plotBorderWidth: 0,
        defaultSeriesType: 'spline', //area, areaspline, bar, column, line, pie, scatter, spline, candlestick or ohlc, arearange, areasplinerange and columnrange.
        chartComparison: 'none', /* Default comparison type */
        typeOfChart: 'EndOfDay',
        showHorisontalTicker: true,
        useHighchartsElements: false, // enabling highcharts own exports and range selectors, can be used if cisions custom ones are removed 
        enableLegend: false,
        enableScrollbar: false,
        enableNavigator: true,
        dividendType: 'Annual', // Annual, Bonus, Monthly, Quarterly, HalfYear 
        effectiveYieldSuffix: 'EFFECTIVEYIELD',
        yAxisSize: { share: { top: 0, height: 250 }, volume: { top: 300, height:80 } }, // sizes for the share graph and the volume graph. only applies when volume is displayed
        mainInstruments: [ /* Array of instruments to consider primary while others become Peers and Indexes */
            { symbol: 'TEL2 B', marketPlace: 'XSTO', currency: 'SEK', name: 'Tele 2', hasEffectiveYield: false }
        ],
        indexInstruments: [
            { symbol: 'OMXSPI', marketPlace: 'XSTO', currency: 'SEK', name: 'OMX Stockholm PI' }
        ],
        peersInstruments: [
            //{ symbol: 'TEL2 B', marketPlace: 'XSTO', currency: 'SEK', name: 'Tele 2' }
        ],
        instrumentColors: [
            { uniqueKey: 'TEL2 BXSTOSEK', preferredColor: '#f27b7b' },
            { uniqueKey: 'OMXSPIXSTOSEK', preferredColor: '#4286f4' },
            { uniqueKey: 'TEL2 BXSTOSEKVOLUME', preferredColor: '#c46464' }
        ],
        // Displaying releases, reports, insiders and dividend in the graph.
        // If the indicators should be attached to a line in the graph add correct symbol, marketplace and currency as seriesId otherwise it will stick to the bottom
        // shape = squarepin, flag or circlepin
        indicatorsOnSeries: [
            { uniqueKey: 'Regulatory RPT', translationKey: 'TextReport', seriesId: 'TEL2 BXSTOSEK', shape: 'circlepin', title: 'R', shapeColor: '#f27b7b', shapeOutlineColor: '#f27b7b', shapeTextColor: 'white' },  
            { uniqueKey: 'Regulatory PRM', translationKey: 'TextPress', seriesId: '', shape: 'circlepin', title: 'P', shapeColor: '#f27b7b', shapeOutlineColor: '#f27b7b', shapeTextColor: 'white' },
            { uniqueKey: 'INSIDERS', translationKey: 'TextInsider', shape: 'flag', title: 'INS', shapeColor: '#a4c5fc', shapeOutlineColor: '#4970af', shapeTextColor: 'black' },
            { uniqueKey: 'DIVIDEND', translationKey: 'TextDividend', shape: 'squarepin', title: 'U', shapeColor: '#ecefbf', shapeOutlineColor: '#bec18d', shapeTextColor: 'black' }  
        ],
        // Sharegraph releases specific settings
        showReleaseLink: true,
        enableReleasesOnIntraday: true,
        releaseLinkFormatter: 'https://publish.ne.cision.com/Release/ViewReleaseHtml/',

        // Estimates specific settings
        estimateCurrency: '', // should never be necessary, filters out data with specific currency in the same data set 
        field: 'SALES' /* default historical graph choose between SALES/EBIT/DPS/EPS */,
        valuePrefix: '',
        valueSuffix: ' SEK',
        tooltipHeaderEstimate: "Estimate - ",
        tooltipHeaderReal: "Actual - ",
        tooltipDateLabel: "",
        tooltipAmountLabel: "",
        suffixEstimate: ' FC',
        suffixActual: '',
        periodStart: '',
        periodEnd: '',
        dateString: "",
        amountString: "",
        hideEstimateIfActualExists: true,

        //stores data if ownership tab is rendered
        ownershipTabLoaded: [],
        //stores data if estimate tab is rendered
        estimateTabLoaded: []
    },

    // AccessKeys for all modules to fetch the data. 
    // Cision accessKeys added for demo purposes, these should be changed into client specific ones. 
    // Tele2 is used as a demo client for all the share data since Cision is not listed on a swedish stock exchange. 
    orderbook: {
        accessKey: '6C4EC853924B4CA4903CB24B0922882A'
    },

    ownership: {
        accessKey: 'E8581513D3E04B25BB4F616A41315FDC'
    },

    totalreturn: {
        accessKey: '53B91163F6FE459693A6A109CB5C8274'
    },

    estimate: {
        accessKey: 'F8D4BD57FD654EEABF8CDCF520FA9B98',
        accessKeyTicker: 'FDC260DD9AEE461996F9A400C3E67649'
    },

    ticker: {
        accessKey: 'FDC260DD9AEE461996F9A400C3E67649'
    },

    sharegraph: {
        accessKey: '11B2CD3AAAF1481AA7DBEC5820ED615F',
        shareHistoryKey: '8CD21721350E43968E4FE52299AE02F1'
    },

    sharecalculator: {        
        accessKey: '18C3B618661C4D7ABF1C622D5DDA0672'
    },

    minisharegraph: {
        accessKey: '11B2CD3AAAF1481AA7DBEC5820ED615F'
    },

    newsfeed: {
        accessKey: 'F32103526F704E469FB808E4CF5225D0'
    },

    mediafeed: {
        accessKey: 'F32103526F704E469FB808E4CF5225D0'
    },

    insider: {
        accessKey: '8E7CD4D865004D2987EB25D23CF7830F'   
    },

    calendar: {
        accessKey: '737CB5BF989D43D6844C27F294CA9238'
    },

    printedMaterial: {
        accessKey: 'F9AAF9CA0154483C9CBF5A65E215A892'
    },
	dividend: {
        accessKey: ''
    }
};

// Switch moment language
try {
    moment.locale(cision.websolution.settings.general.uiLanguage);
} catch (e) {
    console.log(e);
}

try {
    Highcharts.setOptions({
        lang: {
            decimalPoint: cision.websolution.settings.general.numberFormatOptions.decimalSeparator,
            thousandsSep: cision.websolution.settings.general.numberFormatOptions.thousandSeparator
        }
    });
} catch (e) {
    console.log(e);
}
