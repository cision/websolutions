// This JavaScript file is created by Cision for our totalReturn module.
// Built to be used in combination with totalReturn.dividend.html

import './module.dependencies.js';

window.cision.websolution.totalReturn.dividend = !window.cision.websolution.settings.totalreturn ? {} : function ($) {
    var settings = $.extend({ excludeKeys: [], preferredColors: {} }, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.totalreturn.accessKey,
        chart;

    var texts = window.cision.websolution.texts[settings.uiLanguage] ||
        window.cision.websolution.texts["en"] ||
        {
            totalReturnDescriptions: {
                intervalKeys: {}
            }
        };

    var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        if (!accessKey) {
            console.log("You must provide your access key.");
            return;
        }

        var promiseDividend = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "TotalReturn Dividend", 'path': 'TotalReturn/' + accessKey + '/Dividend' });

        return Promise.resolve(promiseDividend).then(function (dataObj) {
            var seriesData = transformData(dataObj.Instruments[0]);

            createChart(seriesData);

            renderListing(seriesData);

        }).catch(function (err) { console.log('Could not retrieve total return data. ' + err.message); });
    };

    function transformData(objData) {
        var
            objSeriesAnnual = {
                name: texts.totalReturnDescriptions.titles["DividendType_Annual"] || "Annual",
                data: []
            },
            objSeriesBonus = {
                name: texts.totalReturnDescriptions.titles["DividendType_Bonus"] || "Bonus",
                data: []
            },
            categories = [];

        $.each(objData.AnnualDividends, function (_ix, objItem) {
            var objDate = moment(objItem.EventDate);
            var year = objDate.year() - 1;

            objItem["Year"] = year;

            objItem["Type"] = objSeriesAnnual.name;

            objSeriesAnnual.data.push({ x: year, y: objItem.AmountAdjusted });
        });

        $.each(objData.BonusDividends, function (_ix, objItem) {
            var objDate = moment(objItem.EventDate);

            var year = objDate.year() - 1;
            objItem["Year"] = year;
            objItem["Type"] = objSeriesBonus.name;

            objSeriesBonus.data.push({ x: year, y: objItem.AmountAdjusted });
        });

        var rows = objData.AnnualDividends.concat(objData.BonusDividends);
        rows = rows.sort(function (a, b) { return a.EventDate > b.EventDate ? -1 : 1; });

        return { categories: categories, series: [objSeriesBonus, objSeriesAnnual], rows: rows };
    }

    var renderListing = function (objData) {
        var model = { rows: objData.rows };
        
        //model.rows = Object.values(rows);

        var compositeModel = $.extend({}, model, texts, settings);
        var tplElement = '#' + (settings.templateElementListing || 'tplTotalReturnDividendListing');

        var renderedHtml = $(tplElement).render(compositeModel, window.cision.websolution.formatHelpers);
        var tplTarget = '#' + (settings.outputTargetElement || 'target-total-return-dividend-listing');

        $(tplTarget).html(renderedHtml);
    };

    // Create a graph and set standard settings like colours, tooltips
    function createChart(seriesData) {
        var
            objXAxis = {
                categories: seriesData.categories
            },

            objYAxis = {
                min: 0,
                title: {
                    text: '',
                    margin: 0
                }
            },

            objTooltip = {
                valueDecimals: 2,
                //valueSuffix: ' Kr',
                shared: true,
                useHTML: true
            },

            objPlotOptions = {
                column: {
                    stacking: 'normal'
                }/*,
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }*/
            };

        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: 'container-total-return-dividend-chart',
                defaultSeriesType: 'column'
            },

            series: seriesData.series,

            xAxis: objXAxis,
            yAxis: objYAxis,

            //Set the format on the tooltip
            tooltip: objTooltip,

            //Defines and set the line settings
            plotOptions: objPlotOptions,

            //legend: objLegend,

            credits: {
                enabled: false
            },

            title: {
                text: settings.chartTitle
            }
        });

        return chart;
    }

    return {
        render: render
    };
}(jQuery);
