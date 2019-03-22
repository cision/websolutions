// This JavaScript file is created by Cision for our estimate module.
// Built to be used in combination with estimateannual.html

import './module.dependencies.js';

window.cision.websolution.estimate = cision.websolution.estimate || {};
window.cision.websolution.estimate.quarterly = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.estimate.accessKey;

        function render(options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your estimate access key.");
            return;
        }

        var promiseEstimateQuarterly = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Estimate quarterly", 'path': 'Estimate/' + accessKey + '/Quarterly' });

        return Promise.resolve(promiseEstimateQuarterly).then(function (dataObj) {
            var periodList = transformKeyFigures(dataObj.QuarterlyKeyFigures);

            var lastDate = "2000-01-01";
            $(periodList).each(function (i, item) {
                if (item.Date >= lastDate) {
                    periodList.LastDateFormatted = moment(item.Date).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                }
                lastDate = item.Date;
            });

            var tplElement = '#' + (settings.templateElement || 'template-estimate-quarterly');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-estimate-quarterly');
            window.cision.websolution.common.modelToHtml({ PeriodList: periodList }, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve quarterly estimates data. ' + err.message) });
    };

    function transformKeyFigures(keyFigures) {
        // Rearrange KeyFigures in a columnar format
        var periodsWithActual = {},
            objHorizontalMatrix = {}; // {"2011-Q3":{"Sales":123, "EPS": 2345, ...}, "2012-Q1": {EPS, ...}}

        $.each(keyFigures, function (ix, objKeyFigure) {
            if (objKeyFigure.Type.toLowerCase() === 'actual') {
                periodsWithActual[objKeyFigure.Period] = objKeyFigure.Type;
            }
        });

        settings.periodStart = settings.periodStart.toString();
        settings.periodEnd = settings.periodEnd.toString();

        $.each(keyFigures, function (ix, objKeyFigure) {
            var isEstimate = objKeyFigure.Type.toLowerCase() === 'estimate',
                colName = objKeyFigure.Period + '-' + objKeyFigure.Type.toLowerCase(),
                colHHeader = objKeyFigure.Period + (isEstimate ? settings.suffixEstimate : settings.suffixActual),
                date = objKeyFigure.Date;


            // Limit Periods
            if (objKeyFigure.Period < settings.periodStart || objKeyFigure.Period > settings.periodEnd) {
                return true; // Continue
            }
            if (settings.hideEstimateIfActualExists && isEstimate && periodsWithActual.hasOwnProperty(objKeyFigure.Period)) {
                return true; // Continue
            }
            if (!objHorizontalMatrix.hasOwnProperty(colName)) {
                // Add the key
                objHorizontalMatrix[colName] = {
                    "Name": colName,
                    "Header": colHHeader,
                    "Period": objKeyFigure.Period,
                    "IsEstimate": isEstimate,
                    "Date": date
                };
            }

            if (objKeyFigure.Currency == settings.estimateCurrency.toUpperCase() || settings.estimateCurrency == '') {
                // only add values for the given currency if any is given
                objHorizontalMatrix[colName][objKeyFigure.Field] = objKeyFigure.Average;
                if (isEstimate) {
                    objHorizontalMatrix[colName][objKeyFigure.Field + '_Count'] = objKeyFigure.Count || 0;
                }
                //objHorizontalMatrix[colName][objKeyFigure.Field + '_Date'] = objKeyFigure.Date;
            }

            return true; // Continue
        });

        // Change to array
        var colList = $.map(objHorizontalMatrix, function (value) {
            return value;
        });

        return colList;
    }

    return {
        render: render
    };
}(jQuery);