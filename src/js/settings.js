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

    orderbook: {
        accessKey: 'D10D291AD2FB4056ACFC1E6D75DDCF2E'
    },

    ownership: {
        accessKey: '79B318BC2D6A4088BD690116403614CA'
    },

    estimate: {
        accessKey: '441EC33DF7534A1F9E9708E319A1A607',
        accessKeyTicker: '4F7F3DD44FA34928A4F592D7F772D52C'
    },

    ticker: {
        accessKey: '4F7F3DD44FA34928A4F592D7F772D52C'
    },

    sharegraph: {
        accessKey: '42BD7A23C7774A43A9F67DC11E22C10C',
        shareHistoryKey: '992FAAB4CA9A43A5B576D2638E5E8775'
    },

    sharecalculator: {        
        accessKey: 'E3B999AB39524308B86284367E86EDC4'
    },

    minisharegraph: {
        accessKey: '42BD7A23C7774A43A9F67DC11E22C10C'
    },

    newsfeed: {
        accessKey: 'A275C0BF733048FFAE9126ACA64DD08F'
    },

    mediafeed: {
        accessKey: 'A275C0BF733048FFAE9126ACA64DD08F'
    },

    insider: {
        accessKey: '9D35823245AC45F799175AAF7C9F6A3D'   
    },

    calendar: {
        accessKey: 'EFE3E2777A4F4E9DA0E98982315281BA'
    },

    printedMaterial: {
        accessKey: '30384BEE368745F3AF5F6BFB3D7D5471'
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
