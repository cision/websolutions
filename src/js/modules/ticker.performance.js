// This JavaScript file is created by Cision for our ticker performance module.
// Built to be used in combination with sharegraph.html, tickerLarge.html or tickerSmall.html

import './module.dependencies.js';

window.cision.websolution.performance = function($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.ticker.accessKey,
        texts = window.cision.websolution.texts[settings.uiLanguage];

        var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ticker access key.");
            return;
        }

        var promiseTickerPerformance = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Share performance", 'path': 'Ticker/' + accessKey + '/Performance' });

        return Promise.resolve(promiseTickerPerformance).then(function (rawData) {
            var rawInstruments = rawData.Instruments;
            var instruments = $.extend(rawInstruments, texts);
            // var sortBySymbol = function (s) {
            //     return _.sortBy(s, "Symbol");
            // };
            var sortedPerformanceData = instruments.sort(function (a, b) {
                return a.TickerSymbol - b.Symbol;
            });
            var htmls = "";
            // Retrieve the Instrument
            var tplElement = '#' + (settings.templateElement || 'tplTickerPerformance');
            for (var instrumentIx = 0; instrumentIx < sortedPerformanceData.length; instrumentIx++) {
                var objInstrument = sortedPerformanceData[instrumentIx]; // TODO: find the correct instrument, in case we have many in the Module
                objInstrument.AthDateFormatted = moment(objInstrument.AthDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.LastUpdateFormatted = moment(objInstrument.LastUpdate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.AtlDateFormatted = moment(objInstrument.AtlDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.HighPriceYtdDateFormatted = moment(objInstrument.HighPriceYtdDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.LowPriceYtdDateFormatted = moment(objInstrument.LowPriceYtdDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.DividendDateFormatted = moment(objInstrument.DividendDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objInstrument.QuoteTimeFormatted = moment(objInstrument.QuoteTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
                objInstrument.KeyRatioTimeFormatted = moment(objInstrument.KeyRatioTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);

                var compositeModel = $.extend(objInstrument, texts, settings),
                    renderedHtml = $(tplElement).render(compositeModel, window.cision.websolution.formatHelpers);
                htmls += renderedHtml;
            }
            var tplTarget = '#' + (settings.outputTargetElement || 'target-share-performance'); 
            $(tplTarget).html(htmls);

        }).catch(function (err) { console.log('Could not retrieve share performance data. ' + err.message) });
    };

    return {
        render: render
    };
} (jQuery);