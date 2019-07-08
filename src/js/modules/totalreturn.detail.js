// This JavaScript file is created by Cision for our totalReturn module.
// Built to be used in combination with totalReturn.overview.html

import './module.dependencies.js';

window.cision.websolution.totalReturn = cision.websolution.totalReturn || {};

window.cision.websolution.totalReturn.detail = !window.cision.websolution.settings.totalreturn ? {} : function ($) {
    var settings = $.extend({ excludeKeys: [], preferredColors: {} }, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.totalreturn.accessKey,
        chart;

    var texts = cision.websolution.texts[settings.uiLanguage];

    var render = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        if (!accessKey) {
            console.log("You must provide your access key.");
            return;
        }

        var postData = {
            //startDate: settings.startDate,
            //endDate: settings.endDate
        };

        if (settings.intervalType) {
            postData.intervalType = settings.intervalType;

            if (settings.intervalType.toLowerCase() === 'custom') {
                postData.startDate = settings.startDate;
                if (settings.endDate) { 
                    postData.endDate = settings.endDate;
                }
            }
        }
        if (settings.intervalLength) { postData.intervalLength = settings.intervalLength; }

        var promiseOverview = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "TotalReturn Detail", 'path': 'TotalReturn/' + accessKey + '/Detail', 'postData': postData });

        return Promise.resolve(promiseOverview).then(function (dataObj) {
            renderChart(dataObj);
            renderCustomSummary(dataObj);
            renderSummaryList(dataObj);

            if (options.callback) {
                // Find Current and Start dates
                try {
                    var objInstrument = dataObj.Instruments[0];
                    options.callback(objInstrument.CustomSummary.DateStart, objInstrument.CustomSummary.DateCurrent);
                } catch (e) {
                    console.log(e); 
                }
            }
            settings.startDate = moment(objInstrument.CustomSummary.DateStart).format('YYYY-MM-DD');
            // TODO: Should we ignore end-date if not explicitly changed??? In order to let API decide Current date???
            settings.endDate = moment(objInstrument.CustomSummary.DateCurrent).format('YYYY-MM-DD');
        }).catch(function (err) { console.log('Could not retrieve total return data. ' + err.message); });
    };

    var renderChart = function (rawData) {
        var seriesData = transformData(rawData);

        createChart(seriesData);
    };

    var renderCustomSummary = function (rawData) {
        var compositeModel = $.extend({}, rawData, texts, settings);
        var tplElement = '#' + (settings.templateElementCustomSummary || 'tplTotalReturnCustomSummary');
        var renderedHtml = $(tplElement).render(compositeModel, cision.websolution.formatHelpers);

        var tplTarget = '#' + (settings.outputTargetElement || 'target-total-return-detail-custom-summary');
        $(tplTarget).html(renderedHtml);
    };

    var renderSummaryList = function (rawData) {
        var rows = [];
        var model = { tickers: [], rows: [] };
        var tickers = [];
        $.each(rawData.Instruments, function (_ix, objInstrument) {
            tickers.push({
                TickerType: objInstrument.TickerType,
                TickerName: objInstrument.TickerName,
                TickerSymbol: objInstrument.TickerSymbol,
                MarketPlace: objInstrument.MarketPlace,
                TradeCurrency: objInstrument.TradeCurrency
            });

            $.each(objInstrument.Summaries, function (_ix, objItem) {
                if (settings.excludeKeys.indexOf(objItem.Key) !== -1) {
                    return true;
                }
                if (!rows[objItem.Key]) {
                    rows[objItem.Key] = { Key: texts.totalReturnDescriptions.intervalKeys[objItem.Key] || objItem.Key, tickers: [] };
                }

                rows[objItem.Key]['tickers'].push(objItem);
            });
        });

        model.tickers = tickers;
        model.rows = Object.values(rows);

        var compositeModel = $.extend({}, model, texts, settings);
        var tplElement = '#' + (settings.templateElementListing || 'tplTotalReturnListing');

        var renderedHtml = $(tplElement).render(compositeModel, cision.websolution.formatHelpers);
        var tplTarget = '#' + (settings.outputTargetElementListing || 'target-total-return-detail-listing');

        $(tplTarget).html(renderedHtml);

        var tplElementCagr = '#' + (settings.templateElementCagrListing || 'tplTotalReturnCAGRListing');

        var renderedHtmlCagr = $(tplElementCagr).render(compositeModel, cision.websolution.formatHelpers);
        var tplTargetCagr = '#' + (settings.outputTargetElementCagr || 'target-total-return-detail-cagr-listing');

        $(tplTargetCagr).html(renderedHtmlCagr);
    };

    function transformData(objData) {
        var seriesList = [];

        $.each(objData.Instruments, function (_ix, objInstrument) {
            var key = objInstrument.TickerSymbol + ' / ' + objInstrument.MarketPlace + ' / ' + objInstrument.TradeCurrency;

            if (objInstrument.EffectiveYields && objInstrument.EffectiveYields.length > 0) {
                key = objInstrument.TickerSymbol + ' / ' + objInstrument.MarketPlace + ' / ' + objInstrument.TradeCurrency + ' [TR]';
                var objSeriesEY = {
                    id: key,
                    name: objInstrument.TickerName + ' (' + objInstrument.TickerSymbol + ') [TR]',
                    data: []
                };
                var objEffectiveYieldFirst = objInstrument.EffectiveYields[0];
                $.each(objInstrument.EffectiveYields, function (_ix, objEffectiveYield) {
                    objEffectiveYield.Date = moment(objEffectiveYield.ObsDate).format('YYYY-MM-DD') + 'T00:00:00Z';

                    objSeriesEY.data.push([
                        1000 * moment(objEffectiveYield.Date).format('X'),
                        100 * (objEffectiveYield.LastAdjReInv - objEffectiveYieldFirst.LastAdjReInv) / objEffectiveYieldFirst.LastAdjReInv
                    ]);
                });

                seriesList.push(objSeriesEY);
            }

            if (objInstrument.Quotes && objInstrument.Quotes.length > 0) {
                key = objInstrument.TickerSymbol + ' / ' + objInstrument.MarketPlace + ' / ' + objInstrument.TradeCurrency;
                var objSeriesPrice = {
                    id: key,
                    name: objInstrument.TickerName + ' (' + objInstrument.TickerSymbol + ')',
                    data: []
                };
                var objQuoteFirst = objInstrument.Quotes[0];
                $.each(objInstrument.Quotes, function (_ix, objQuote) {
                    objQuote.Date = moment(objQuote.QuoteTime).format('YYYY-MM-DD') + 'T00:00:00Z';

                    objSeriesPrice.data.push([
                        1000 * moment(objQuote.Date).format('X'),
                        100 * (objQuote.Price - objQuoteFirst.Price) / objQuoteFirst.Price
                    ]);
                    //seriesData[key].data.push({
                    //    x: 1000 * moment(objQuote.Date).format('X'),
                    //    y: 100 * (objQuote.Price - objQuoteFirst.Price) / objQuoteFirst.Price
                    //});
                });

                seriesList.push(objSeriesPrice);
            }
        });

        return { series: seriesList };
    }

    // Create a graph and set standard settings like colours, tooltips
    function createChart(seriesData) {
        var
            objXAxis = {
                type: 'datetime'
            },

            objYAxis = {
            },

            objTooltip = {
                valueDecimals: 1,
                shared: true,
                useHTML: true
            },

            objPlotOptions = {
                spline: {
                    states: {
                        hover: {
                            //lineWidth: settings.lineWidth + 3
                        }
                    }
                },
                series: {
                    //turboThreshold: 100000,
                    //compare: 'none', //"percent",
                    lineWidth: settings.lineWidth
                    //dataLabels: {
                    //    enabled: true,
                    //    format: '{point.y:.0f}%'
                    //}
                }
            };


        var objPlotOptions2 = {
            spline: {
                states: {
                    hover: {
                        lineWidth: settings.lineWidth + 3
                    }
                }
            },
            series: {
                turboThreshold: 100000,
                compare: settings.chartComparison || 'none',
                lineWidth: settings.lineWidth
            }
        };

        chart = new Highcharts.Chart({
            chart: {
                type: 'spline',
                renderTo: 'container-total-return-detail-chart',
                defaultSeriesType: 'spline'
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


    var initDetailDatePickers = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        $('#' + (settings.datePickerStart || 'datePickerStart') + ' input')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                language: settings.uiLanguage
            })
            .on("changeDate", function (e) {
                if (settings.setDetailLoadingState) { settings.setDetailLoadingState(true); }
                settings.startDate = moment(e.date).format('YYYY-MM-DD');

                render({
                    excludeKeys: settings.excludeKeys,
                    startDate: settings.startDate,
                    endDate: settings.endDate,
                    callback: settings.callback,
                    intervalType: 'Custom'
                });
            });

        $('#' + (settings.datePickerEnd || 'datePickerEnd') + ' input')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                language: settings.uiLanguage
            })
            .on("changeDate", function (e) {
                if (settings.setDetailLoadingState) { settings.setDetailLoadingState(true); }
                settings.endDate = moment(e.date).format('YYYY-MM-DD');

                render({
                    excludeKeys: settings.excludeKeys,
                    startDate: settings.startDate,
                    endDate: settings.endDate,
                    callback: settings.callback,
                    intervalType: 'Custom'
                });
            });
    };

    return {
        chartObj: chart,
        initDatePickers: initDetailDatePickers,
        render: render
    };
}(jQuery);
