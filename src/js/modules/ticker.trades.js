// This JavaScript file is created by Cision for our ticker trades module.
// Built to be used in combination with trades.html

import './module.dependencies.js';

window.cision.websolution.trades = function($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.ticker.accessKey;

        var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ticker access key.");
            return;
        }
        var promiseTickerTrades = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ticker Trades", 'path': 'Ticker/' + accessKey + '/Trades' });

        Promise.resolve(promiseTickerTrades).then(function (rawData) {
            // Retrieve the Instrument
            var objInstrument = rawData.Instruments[0]; // TODO: find the correct instrument, in case we have many in the Module
            $.each(objInstrument.Trades, function (idx, objTrade) {
                objTrade.TradeTimeFormatted = moment(objTrade.TradeTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
            });

            var tplElement = '#' + (settings.templateElement || 'tplTickerTrades');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-trades');
            window.cision.websolution.common.modelToHtml(objInstrument, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve trades data. ' + err.message) });
    };

    return {
        render: render
    };
} (jQuery);