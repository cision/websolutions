// This JavaScript file is created by Cision for our sharegraph module.
// Built to be used in combination with sharegraph.html

import './module.dependencies.js';

cision.websolution.dividend = function ($) {
    var settings = cision.websolution.settings.general;
    var accessKey = cision.websolution.settings.ticker.accessKey;

    function renderToGraph(objChart, options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provider your dividend access key.");
            return;
        }

        var postData = {
            type: settings.dividendType || 'Annual',
            startDate: settings.startDate,
            endDate: settings.endDate
        };

        var promiseDividend = cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Dividend", 'path': 'Ticker/' + accessKey + '/Dividend', 'postData': postData });

        return Promise.resolve(promiseDividend).then(function (rawData) {
            var dividendSettings = cision.websolution.common.getIndicatorSettings(settings.dividendsUniqueKey);

            // TODO: emit an error when no instruments with data found
            var objPackage = rawData.Instruments[0];
            var pointsDividends = [];
            $.each(objPackage.Dividends, function (idx, objDividend) {
                pointsDividends.push({
                    x: moment(objDividend.EventDate).format('X') * 1000,
                    title: dividendSettings.title || 'D',
                    text: objDividend.Amount,
                    DividendTransaction: objDividend
                });
            });

            // required by highcharts
            pointsDividends = pointsDividends.sort(function (a, b) {
                var res = a.x - b.x;
                if (res == 0)
                    return res;
                return res < 0 ? -1 : 1;
            });

            var objInstrument = { UniqueKey: settings.dividendsUniqueKey };
            var objChartSeries = {
                id: objInstrument.UniqueKey,
                name: 'DIVIDENDS',
                type: 'flags',
                data: pointsDividends,
                onSeries: dividendSettings.seriesId || '',
                shape: dividendSettings.shape || 'squarepin',
                fillColor: dividendSettings.shapeColor || '',
                color: dividendSettings.shapeOutlineColor || '',
                style: { color: dividendSettings.shapeTextColor || '' },
                zIndex: 20,
                // Extra data
                objOriginal: objInstrument,
                visible: true
            };

            objChartSeries.tooltip = {
                useHTML: true,
                pointFormat: '<strong>{point.DividendTransaction.Amount}</strong>'
            };

            objChart.addSeries(objChartSeries);

        }).catch(function (err) { console.log('Could not retrieve dividend data. ' + err.message) });
    }

    return {
        renderToGraph: renderToGraph
    };
}(jQuery);