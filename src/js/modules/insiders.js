// This JavaScript file is created by Cision for our insider module.
// Built to be used in combination with insiders.html

import './module.dependencies.js';
import '../insiderTexts.js';

window.cision.websolution.insiders = !cision.websolution.settings.insider.accessKey ? {} : function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.insider.accessKey;

    var textsInsidersDescriptions = window.cision.websolution.texts[settings.uiLanguage].insidersDescriptions;

    function renderTransactionsList(options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your insiders access key.");
            return;
        }

        var postData = {
            startDate: settings.startDate,
            endDate: settings.endDate
        };

        var promiseInsiders = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Insiders", 'path': 'InsiderTrade/' + accessKey + '/TransactionsList', 'postData': postData });

        return Promise.resolve(promiseInsiders).then(function (rawData) {
            $.each(rawData.Transactions, function (idx, objTransaction) {
                objTransaction.TransactionDateFormatted = moment(objTransaction.TransactionDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objTransaction.SecurityTypeDescription = textsInsidersDescriptions.securityTypes[objTransaction.SecurityTypeId];
                objTransaction.TransactionTypeDescription = textsInsidersDescriptions.transactionTypes[objTransaction.TransactionTypeId];
                objTransaction.PositionDescription = textsInsidersDescriptions.positionTypes[objTransaction.PositionId];
                objTransaction.HolderTypeDescription = textsInsidersDescriptions.holderTypes[objTransaction.HolderTypeId];

                if (objTransaction.Comment)
                    objTransaction.Status = textsInsidersDescriptions.commentTypes[objTransaction.Comment.toLowerCase()] || objTransaction.Comment;
                else
                    objTransaction.Status = "";

                if (objTransaction.HolderName) {
                    objTransaction.HolderTypeDescription += ' [' + objTransaction.HolderName + ']';
                }
            });

            var tplElement = '#' + (settings.templateElement || 'tplInsiderTransactionsList');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-transactions');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve insiders data. ' + err.message) });
    };

    function renderToGraph(objChart, options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your insiders access key.");
            return;
        }

        var postData = {
            startDate: settings.startDate,
            endDate: settings.endDate
        };

        var promiseInsidersGraph = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Insiders", 'path': 'InsiderTrade/' + accessKey + '/TransactionsList', 'postData': postData });

        return Promise.resolve(promiseInsidersGraph).then(function (rawData) {
            var insiderSettings = window.cision.websolution.common.getIndicatorSettings(settings.insidersUniqueKey);

            var pointsInsiders = [];
            $.each(rawData.Transactions, function (idx, objTransaction) {
                objTransaction.TransactionDateFormatted = moment(objTransaction.TransactionDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objTransaction.DetailsLink = rawData.DetailsLink + objTransaction.InsiderName;
                objTransaction.PlusMinus = (objTransaction.Quantity > 0 ? '+' : '');
                objTransaction.TransactionTypeDescription = textsInsidersDescriptions.transactionTypes[objTransaction.TransactionTypeId];

                pointsInsiders.push({
                    x: moment(objTransaction.TransactionDate).format('X') * 1000,
                    title: insiderSettings.title || 'I',
                    text: objTransaction.InsiderName,
                    InsiderTransaction: objTransaction
                });
            });

            // required by highcharts
            pointsInsiders = pointsInsiders.sort(function (a, b) {
                var res = a.x - b.x;
                if (res == 0)
                    return res;
                return res < 0 ? -1 : 1;
            });

            var objInstrument = { UniqueKey: settings.insidersUniqueKey };
            var objChartSeries = {
                id: objInstrument.UniqueKey,
                name: settings.insidersUniqueKey,
                type: 'flags',
                data: pointsInsiders,
                visible: true,
                onSeries: insiderSettings.seriesId || '',
                shape: insiderSettings.shape || 'flag',
                fillColor: insiderSettings.shapeColor || '',
                color: insiderSettings.shapeOutlineColor || '',
                style: { color: insiderSettings.shapeTextColor || '' },
                zIndex: 20,
                // Extra data
                objOriginal: objInstrument
            };

            objChartSeries.tooltip = {
                useHTML: true,
                pointFormat: '<strong>{point.InsiderTransaction.InsiderName}</strong><br/>' +
                    '{point.InsiderTransaction.PlusMinus}{point.InsiderTransaction.Quantity} st ({point.InsiderTransaction.TransactionTypeDescription})'
            };

            objChart.addSeries(objChartSeries);

        }).catch(function (err) { console.log('Could not retrieve insiders data. ' + err.message) });
    };

    return {
        renderTransactionsList: renderTransactionsList,
        renderToGraph: renderToGraph
    };
}(jQuery);