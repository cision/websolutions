// This JavaScript file is created by Cision for our estimate module.
// Built to be used in combination with estimateannual.html

import './module.dependencies.js';

window.cision.websolution.estimate = cision.websolution.estimate || {};
window.cision.websolution.estimate.recommendations = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.estimate.accessKey,
        accessKeyTicker = window.cision.websolution.settings.estimate.accessKeyTicker;

    var renderHistory = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your Estimates access key.");
            return;
        }

        var postData = {
            startDate: settings.startDate,
            field: settings.field
        };

        var promiseEstimateHistoricalRecommendations = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Estimate", 'path': 'Estimate/' + accessKey + '/RecommendationsHistorical', 'postData': postData });

        return Promise.resolve(promiseEstimateHistoricalRecommendations).then(function (objRawData) {
            var objGroupedData = groupByMonth(objRawData);

            objGroupedData.Months = $.map(objGroupedData, function (value, key) {
                value.Month = key;

                return value;
            });
            var loopThrough = objRawData.BuyRecomendations.concat(objRawData.HoldRecomendations, objRawData.SellRecomendations);
            var lastDate = "2000-01-01";
            $(loopThrough).each(function (i, item) {
                if (item.Date >= lastDate) {
                    objGroupedData.LastDateFormatted = moment(item.Date).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                }
                lastDate = item.Date;
            });

            var tplElement = '#' + (settings.templateElement || 'template-recommendations-history-table');
            var tplTarget = '#' + (settings.outputTargetElement || 'historicRecommendation');
            window.cision.websolution.common.modelToHtml(objGroupedData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve historical estimates recommendations data. ' + err.message) });
    };

    var renderCurrent = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your Estimates access key.");
            return;
        }

        var promiseEstimateCurrentRecommendations = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Estimate", 'path': 'Estimate/' + accessKey + '/Recommendations' });

        return Promise.resolve(promiseEstimateCurrentRecommendations).then(function (objRawData) {
            var lastDate = "2000-01-01";

            for (var i = 0; i < objRawData.Recomendations.length; i++) {
                var objRecomendation = objRawData.Recomendations[i];

                if (objRecomendation.Date >= lastDate) {
                    objRawData.LastDate = objRecomendation.Date;
                    objRawData.LastDateFormatted = moment(objRecomendation.Date).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                }

                lastDate = objRecomendation.Date;
            }

            // Percentages
            objRawData.StrongBuyDistribution = Math.round(100 * objRawData.StrongBuy / objRawData.TotalCount);
            objRawData.BuyDistribution = Math.round(100 * objRawData.Buy / objRawData.TotalCount);
            objRawData.HoldDistribution = Math.round(100 * objRawData.Hold / objRawData.TotalCount);
            objRawData.SellDistribution = Math.round(100 * objRawData.Sell / objRawData.TotalCount);
            objRawData.StrongSellDistribution = Math.round(100 * objRawData.StrongSell / objRawData.TotalCount);

            // Calculate the Mean
            objRawData.Mean = (objRawData.StrongBuy / objRawData.TotalCount * 5)
                + (objRawData.Buy / objRawData.TotalCount * 4)
                + (objRawData.Hold / objRawData.TotalCount * 3)
                + (objRawData.Sell / objRawData.TotalCount * 2)
                + (objRawData.StrongSell / objRawData.TotalCount * 1);

            objRawData.MeanDistribution = Math.round(100 * objRawData.Mean / 5);

            objRawData.MeanDistribution = objRawData.MeanDistribution > 99 ? 99 : objRawData.MeanDistribution;
            objRawData.MeanDistribution = objRawData.MeanDistribution < 1 ? 1 : objRawData.MeanDistribution;

            var tplElement = '#' + (settings.templateElement || 'tplCurrentRecommendationDistribution');
            var tplTarget = '#' + (settings.outputTargetElement || 'currentRecommendationDistribution');
            window.cision.websolution.common.modelToHtml(objRawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve estimate recommendations data. ' + err.message) });
    };

    var renderTicker = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKeyTicker) {
            console.log("You must provide your Ticker access key.");
            return;
        }

        var promiseEstimateShareData = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Estimate share information", 'path': 'Ticker/' + accessKeyTicker });

        return Promise.resolve(promiseEstimateShareData).then(function (rawData) {
            var objInstrument = rawData.Instruments[0],
                lastDate = "2000-01-01";

            objInstrument.LatestQuote = {};

            for (var i = 0; i < objInstrument.Quotes.length; i++) {
                var objQuote = objInstrument.Quotes[i];

                if (objQuote.QuoteTime >= lastDate) {
                    objQuote.QuoteTimeFormatted = moment(objQuote.QuoteTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                    objInstrument.LatestQuote = objQuote;
                }

                lastDate = objQuote.QuoteTime;
            }

            var tplElement = '#' + (settings.templateElement || 'tplShareInformation');
            var tplTarget = '#' + (settings.outputTargetElement || 'shareinformation');
            window.cision.websolution.common.modelToHtml(objInstrument, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve estimate ticker data. ' + err.message) });
    };

    function groupByMonth(objRawData) {
        var objGroupedMatrix = {},
            objMeanValues = {},
            arr = objRawData.BuyRecomendations.concat(objRawData.HoldRecomendations, objRawData.SellRecomendations);
        arr = arr.sort(function (a, b) {
            if (a.Date < b.Date) return -1;
            if (a.Date > b.Date) return 1;
            return 0;
        });
        $.each(arr, function (ix, objEstimate) {
            // Limit Periods
            if (objEstimate.Date < settings.startDate || objEstimate.Date > settings.endDate) {
                return true; // Continue
            }

            var yearMonth = objEstimate.Date.substr(0, 7),
                aspect = '';
            objEstimate.key = objEstimate.Aspect + objEstimate.Type;

            switch (objEstimate.key) {
                case 'BuyStrong':
                    aspect = 'StrongBuy';
                    break;
                case 'BuyNeutral':
                    aspect = 'Buy';
                    break;
                case 'HoldNeutral':
                    aspect = 'Hold';
                    break;
                case 'SellNeutral':
                    aspect = 'Sell';
                    break;
                case 'SellStrong':
                    aspect = 'StrongSell';
                    break;
                default:
                    break;
            }

            if (!objGroupedMatrix.hasOwnProperty(yearMonth)) {
                objGroupedMatrix[yearMonth] = {
                    Date: objEstimate.Date,
                    Month: yearMonth,
                    MonthName: moment(objEstimate.Date).locale(settings.uiLanguage).format('MMM YYYY'),
                    StrongBuy: 0,
                    Buy: 0,
                    Hold: 0,
                    Sell: 0,
                    StrongSell: 0,
                    Mean: 0
                };
            }

            objGroupedMatrix[yearMonth][aspect] = objEstimate.Count;
            // Matrx Mean
            var objMonth = objGroupedMatrix[yearMonth];
            objMonth.TotalCount = objMonth.StrongBuy + objMonth.Buy + objMonth.Hold + objMonth.Sell + objMonth.StrongSell;
            // Calculate the Mean
            var meanValue = (objMonth.StrongBuy / objMonth.TotalCount * 5)
                + (objMonth.Buy / objMonth.TotalCount * 4)
                + (objMonth.Hold / objMonth.TotalCount * 3)
                + (objMonth.Sell / objMonth.TotalCount * 2)
                + (objMonth.StrongSell / objMonth.TotalCount * 1);

            objGroupedMatrix[yearMonth].Mean = meanValue.toFixed(4);


            if (!objMeanValues.hasOwnProperty(yearMonth)) {
                // Add the key
                objMeanValues[yearMonth] = [];
            }
            objMeanValues[yearMonth].push(objEstimate);

            return true; // Continue
        });

        return objGroupedMatrix;
    }

    return {
        renderCurrent: renderCurrent,
        renderHistory: renderHistory,
        renderTicker: renderTicker
    };
}(jQuery);
