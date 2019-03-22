// This JavaScript file is created by Cision for our ticker module.
// Built to be used in combination with sharegraph.html, tickerLarge.html or tickerSmall.html

import './module.dependencies.js';

window.cision.websolution.tickers = function($) {
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

        // fetch the data
        var promiseTicker = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ticker", 'path': 'Ticker/' + accessKey });
        var promiseSharePerformance = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ticker performance", 'path': 'Ticker/' + accessKey + '/Performance' });
    
        Promise.all([promiseTicker, promiseSharePerformance])
            .then(function (results) {
                // we only get here if ALL promises fulfill
                var tickerData = results[0],
                    sharePerformanceData = results[1];

                var data = {
                    tickers: []
                };

                // var sortBySymbol = function (s) {
                //     return _.sortBy(s, "TickerSymbol");
                // };

                var sortedTickerData = tickerData.Instruments.sort(function (a, b) {
                    return a.TickerSymbol - b.TickerSymbol;
                });

                for (var instrumentIx = 0; instrumentIx < sortedTickerData.length; instrumentIx++) {
                    var instrument = sortedTickerData[instrumentIx],
                        lastDate = "2010-02-01T00:00:00.000000Z",
                        ticker;

                    for (var i = 0; i < instrument.Quotes.length; i++) {
                        var quote = instrument.Quotes[0];
                        if (quote.QuoteTime >= lastDate) {
                            ticker = quote;
                        }
                        lastDate = quote.QuoteTime;
                    }

                    var model = $.extend({}, ticker, texts);
                    model.TickerName = instrument.TickerName;
                    model.TickerSymbol = instrument.TickerSymbol;
                    model.TradeCurrency = instrument.TradeCurrency;
                    if (model.DeltaPercentage) {
                        model.DeltaPercentage = model.DeltaPercentage * 100;
                    }

                    model.Time = moment(model.QuoteTime).locale(settings.uiLanguage).format('HH:mm');
                    model.Date = moment(model.QuoteTime).locale(settings.uiLanguage).format('DD MMM YYYY');

                    var p = sharePerformanceData.Instruments[instrumentIx],
                        useKiloFormat = false, //om tusen
                        useMegaFormat = true, //om miljon
                        currency = settings.valueSuffix,
                        isPrefixedCurrency = false, //före el efter
                        kiloPrefix = " k", //prefix, sätts av user
                        megaPrefix = " M"; //prefix, sätts av user

                    var lastPrice = p.LastPrice || p.ClosePrice1D || -1;
                    var numberOfShares = p.NumberOfShares || -1;

                    var marketCap = numberOfShares * lastPrice;

                    model.mcapTotalRaw = Math.round(marketCap);
                    model.mcapTotalKilo = Math.round(marketCap / 1000);
                    model.mcapTotalMega = Math.round(marketCap / 1000000);

                    if (useKiloFormat) {
                        model.mcapTotal = model.mcapTotalKilo + kiloPrefix;
                    } else if (useMegaFormat) {
                        model.mcapTotal = model.mcapTotalMega + megaPrefix;
                    } else {
                        model.mcapTotal = model.mcapTotalRaw + megaPrefix;
                    }

                    if (isPrefixedCurrency) {
                        model.mcapTotal = currency + model.mcapTotal;
                    } else {
                        model.mcapTotal = model.mcapTotal + currency;
                    }

                    // Instead of returning a NaN, turn this into an empty string if needed
                    model.mcapTotal = model.mcapTotal || '';

                    if (model.Delta > 0) {
                        model.ArrowImageurl = settings.tickerImagePlus;
                    } else if (model.Delta < 0) {
                        model.ArrowImageurl = settings.tickerImageMinus;
                    } else {
                        model.ArrowImageurl = settings.tickerImageUnchanged;
                    }

                    data.tickers.push(model);
                }
                
                var tplElement = '#' + (settings.templateElement || 'templateTicker');
                var tplTarget = '#' + (settings.outputTargetElement || 'target-ticker');
                window.cision.websolution.common.modelToHtml(data, tplElement, tplTarget);
               
            })
            .catch(function (err) {
                // Will catch failure of first failed promise
                console.log("Failed:", err);
            });
    };

    return {
        render: render
    };
} (jQuery);
