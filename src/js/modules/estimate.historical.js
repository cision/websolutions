// This JavaScript file is created by Cision for our estimate module.
// Built to be used in combination with estimateannual.html
import './module.dependencies.js';
window.cision.websolution.estimate = cision.websolution.estimate || {};
window.cision.websolution.estimate.historical = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.estimate.accessKey,
        chart;

    var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your access key.");
            return;
        }

        var postData = {
            field: settings.field
        };

        var promiseEstimateHistorical = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Estimate historical", 'path': 'Estimate/' + accessKey + '/Historical', 'postData': postData });

        return Promise.resolve(promiseEstimateHistorical).then(function (dataObj) {
            var seriesList = transformKeyFigures(dataObj);

            createChart(seriesList);

        }).catch(function (err) { console.log('Could not retrieve historical estimates data. ' + err.message) });
    };

    function reloadChart(fiedType) {
        switch (fiedType) {
            case 'SALES':
                settings.chartTitle = 'SALES, MSEK';
                settings.valueSuffix = ' MSEK';
                settings.numberFormatOptions = {
                    decimalPrecision: 0
                };
                break;

            case 'VOLUMES':
                settings.chartTitle = 'VOLUME, MT';
                settings.valueSuffix = ' MT';
                settings.numberFormatOptions = {
                    decimalPrecision: 0
                };
                break;

            case 'EBIT':
                settings.chartTitle = 'EBIT, MSEK';
                settings.valueSuffix = ' MSEK';
                settings.numberFormatOptions = {
                    decimalPrecision: 0
                };
                break;

            case 'DPS':
                settings.chartTitle = 'DPS, SEK';
                settings.valueSuffix = ' SEK';
                settings.numberFormatOptions = {
                    decimalPrecision: 2
                };
                break;

            case 'EPS':
                settings.chartTitle = 'EPS, SEK';
                settings.valueSuffix = ' SEK';
                settings.numberFormatOptions = {
                    decimalPrecision: 2
                };
                break;

            default:
                break;
        }

        render({
            field: fiedType
        });

        $("#historicDataHeader a.active").removeClass("active");
        if (fiedType) {
            $("#historicalDataHeader" + fiedType).addClass("active");
        } else {
            $("#historicalDataHeaderSALES").addClass("active");
        }
    }

    function transformKeyFigures(objData) {

        var keyFigures = objData.HistoricalKeyFigures,
            objSeriesList = {};

        $.each(keyFigures, function (ix, objKeyFigure) {
            var notToAdd = objKeyFigure.Field == "EBIT" && objKeyFigure.Unit == "Percent";
            if (!notToAdd) {
                var isEstimate = objKeyFigure.Type.toLowerCase() === 'estimate',
                    key = objKeyFigure.Period + '_y' + (isEstimate ? '' : '_actual');

                if (!objSeriesList.hasOwnProperty(key)) {
                    // Add the key
                    objSeriesList[key] = {
                        id: key,
                        name: objKeyFigure.Period,
                        type: (isEstimate ? 'line' : 'scatter'),
                        data: []
                    };
                }
                if (objKeyFigure.Currency == settings.estimateCurrency.toUpperCase() || settings.estimateCurrency == '') {
                    // only add values for the given currency if any is given
                    objSeriesList[key].data.push([moment(objKeyFigure.Date).valueOf(), objKeyFigure.Average]);
                }
            }
        });

        return $.map(objSeriesList, function (value, key) {
            return value;
        });

    }

    // Create a graph and set standard settings like colours, tooltips
    function createChart(seriesList) {
        var objXAxis = {
            labels: {
                formatter: function () {
                    return getDateFormated(this.value);
                }
            },
            tickPixelInterval: 150
        },
            objYAxis = {
                labels: {
                    formatter: function () {
                        return window.cision.websolution.formatHelpers.formatNumber(this.value.toString(), settings.numberFormatOptions.decimalPrecision, settings.numberFormatOptions.decimalSeparator, settings.numberFormatOptions.thousandSeparator);
                    }
                },
                title: {
                    text: '',
                    margin: 0
                }
            },
            // Set the format on the tooltip
            objTooltip = {
                formatter: function () {
                    var head;

                    if (this.series.type === 'line') {
                        head = settings.tooltipHeaderEstimate;
                    } else {
                        head = settings.tooltipHeaderReal;
                    }
                    return '<span style="text-align:center;font-size:130%;"> ' + head + this.series.name + '</span><br/>' +
                        settings.dateString + getDateFormated(this.x) + '<br/>' +
                        settings.amountString + window.cision.websolution.formatHelpers.formatNumber(this.y, settings.numberFormatOptions.decimalPrecision, settings.numberFormatOptions.decimalSeparator, settings.numberFormatOptions.thousandSeparator) + ' ' + settings.valueSuffix;
                }
            },
            objPlotOptions = {
                line: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 3
                        }
                    },

                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                symbol: 'circle',
                                radius: 4,
                                lineWidth: 1
                            }
                        }
                    }
                }
            },
            objLegend = {
                enabled: true,
                borderColor: '#DBDBDB',
                margin: 20,
                labelFormatter: function () {
                    var head;
                    if (this.type === 'line') {
                        head = settings.tooltipHeaderEstimate;
                    } else {
                        head = settings.tooltipHeaderReal;
                    }

                    return head + this.name;
                }
            };

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'historicalDataContainer',
                defaultSeriesType: 'line'/*,
                events: {
                    load: requestData(type)
                }*/
            },

            series: seriesList,

            xAxis: objXAxis,
            yAxis: objYAxis,

            //Set the format on the tooltip
            tooltip: objTooltip,

            //Defines and set the line settings
            plotOptions: objPlotOptions,

            legend: objLegend,

            credits: {
                enabled: false
            },

            title: {
                text: settings.chartTitle
            }
        });

        return chart;
    }

    // Returns the date format ISO/other
    function getDateFormated(dateNumber) {
        var formatString = 'YYYY-MM-DD';

        switch (settings.uiLanguage) {
            case "EN":
                formatString = 'MM/DD/YYYY';
                break;
            case "SV":
                formatString = 'YYYY-MM-DD';
                break;
            default:
                formatString = 'YYYY-MM-DD';
                break;
        }

        return moment(new Date(dateNumber)).format(formatString);
    }

    return {
        render: render,
        reloadChart: reloadChart
    };
}(jQuery);
