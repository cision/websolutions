// This JavaScript file is created by Cision for our sharegraph module.
// Built to be used in combination with sharegraph.html

import './module.dependencies.js';

window.cision.websolution.sharegraph = function($){
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.sharegraph.accessKey,
        showVolume = false,
        today = moment().format('YYYY-MM-DD'),
        typeOfChart = "endOfDay",
        comparisonType = "price",
        actions = [],
        objChart;

    function init(options) {
        settings.endOfDayStartFrom = moment().subtract(6, 'months').format('YYYY-MM-DD'); // we default to displaying 6 months
        settings.endOfDayEndTime = moment().format('YYYY-MM-DD');

        if (options) {
            $.extend(settings, options);
        }

        if (!settings.isMiniShareGraph) {
            // render sharegraph wrapper for the extra elements
            var tplElement = '#' + (settings.templateElement || 'templatesharegraph');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-sharegraph-wrapper');
            window.cision.websolution.common.modelToHtml({}, tplElement, tplTarget);

            // set up our custom time periods and events
            initializeDatepickers();
            setupCustomActions();
            setupEvents();

            // render extras
            window.cision.websolution.tickers.render();
            window.cision.websolution.trades.render();
            window.cision.websolution.performance.render();
            window.cision.websolution.orderbook.render();
        }

        showEndOfDay();
    }

    function sharegraphPrintFix() {
        // fix for graph size issue on print
        var width = $('#' + settings.chartContainerId).width();
        var height = $('#' + settings.chartContainerId).height();
        var beforePrint = function () {
            objChart.setSize(width, height, false);
        };
        var afterPrint = function () {
            objChart.setSize.apply(this, this.resetParams);
        };

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    beforePrint();
                } else {
                    afterPrint();
                }
            });
        }

        // making sure the above fix works in Firefox
        window.onbeforeprint = beforePrint;
        window.onafterprint = afterPrint;
    }

    function initializeDatepickers() {
        $('#datePickerFrom input').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: false,
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            language: settings.uiLanguage,
            endDate: settings.endOfDayEndTime
        });
        $('#datePickerTo input').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            language: settings.uiLanguage,
            endDate: today
        });
        $('#datePickerFrom input').datepicker()
            .on("changeDate", function (e) {
                var target = e.delegateTarget.className;
                if (target.indexOf("date-input") != -1) {
                    if ($(this).val().length == 10) {
                        settings.endOfDayStartFrom = moment(e.date).format('YYYY-MM-DD');
                        showEndOfDay();
                        $("#periods div").removeClass("active");
                    }
                } else {
                    settings.endOfDayStartFrom = moment(e.date).format('YYYY-MM-DD');
                    showEndOfDay();
                    $("#periods div").removeClass("active");
                }
            }).on("hide", function (e) {
                $(this).val(settings.endOfDayStartFrom);
            });
        $('#datePickerTo input').datepicker()
            .on("changeDate", function (e) {
                var target = e.delegateTarget.className;
                if (target.indexOf("date-input") != -1) {
                    if ($(this).val().length == 10) {
                        settings.endOfDayEndTime = moment(e.date).format('YYYY-MM-DD');
                        showEndOfDay();
                        $("#periods div").removeClass("active");
                    }
                } else {
                    settings.endOfDayEndTime = moment(e.date).format('YYYY-MM-DD');
                    showEndOfDay();
                    $("#periods div").removeClass("active");
                }
            }).on("hide", function (e) {
                $(this).val(settings.endOfDayEndTime);
            });

        $('#datePickerFrom input').datepicker('update', settings.endOfDayStartFrom);
        $('#datePickerTo input').datepicker('update', settings.endOfDayEndTime);

        $('.date-picker').on('click', function () {
            $(this).find('input').datepicker('show');
        });
    }

    function setupEvents() {
        $('.dropdown-toggle').dropdown('update');

        $("#print-chart").on("click", function () {
            objChart.print();
        });
        $("#export-png-chart").on("click", function () {
            objChart.exportChart(null,
                {
                    type: 'image/png'
                });
        });
        $("#export-jpeg-chart").on("click", function () {
            objChart.exportChart({
                type: 'image/jpeg'
            });
        });
        $("#export-svg-chart").on("click", function () {
            objChart.exportChart({
                type: 'image/svg+xml'
            });
        });
        $("#export-pdf-chart").on("click", function () {
            objChart.exportChart({
                type: 'application/pdf',
                filename: 'my-pdf'
            });
        });
        $("#excel-download").on("click", function () {
            var listOfTickers = "";
            var selectedInstruments = $('#share-options-select .share-index.selected, #share-options-select .share-peer.selected');
            $($(selectedInstruments)).each(function () {
                var ticker = $(this).data("symbol");
                listOfTickers += ticker + ",";
            });

            window.open(
                settings.serviceEndpoint + "ShareHistory/" + window.cision.websolution.settings.sharegraph.shareHistoryKey + "/csv?indexSymbols=" + listOfTickers + "&mainInstrument=" + settings.mainInstruments[0].symbol,
                "exeldownload",
                ""
            );
        });
        $('#share-options-select li').on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $('#share-options-select .show-hide-instrument').on('click', function () {
            if (!$(this).hasClass("cision-disabled")) {
                $(this).toggleClass("selected");
                updateInstrumentSeries($(this));
            }
        });
        $('#share-options-select .chartComparisonType').on('click', function (event) {
            if (!$(this).hasClass("cision-disabled")) {
                $(this).toggleClass("selected");
                if ($(this).data("key") == "percent" && $(this).hasClass("selected")) {
                    $("#comparisonNone").removeClass("selected");
                }
                if ($(this).data("key") == "price" && $(this).hasClass("selected")) {
                    $("#comparisonPercent").removeClass("selected");
                }
                var arg = $(this).data("key");
                var delegate = actions[arg];

                if (delegate) {
                    delegate(event, $(this));
                }
            }
        });
        $('.action').on('click', function (event) {
            $("#periods div").removeClass("active");
            $(this).addClass("active");
            var arg = $(this).data("key");
            var delegate = actions[arg];

            if (delegate) {
                delegate(event, $(this));
            }
        });
    }

    function setupCustomActions() {
        actions["partofday"] = showPartOfDay;
        actions["endofday"] = showEndOfDay;
        actions["percent"] = showComparisonChart;
        actions["price"] = showPriceChart;
        actions["volume"] = function (evt, obj) {
            showVolume = $(obj).hasClass('selected');
            if (typeOfChart == "endOfDay") {
                showEndOfDay();
            } else {
                showPartOfDay();
            }
        };

        actions["dataPeriodDays1"] = function () {
            showPartOfDay();
        };
        actions["dataPeriodWeeks1"] = function () {
            settings.endOfDayStartFrom = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodMonths1"] = function () {
            settings.endOfDayStartFrom = moment().subtract(1, 'months').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodMonths3"] = function () {
            settings.endOfDayStartFrom = moment().subtract(3, 'months').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodMonths6"] = function () {
            settings.endOfDayStartFrom = moment().subtract(6, 'months').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodYears1"] = function () {
            settings.endOfDayStartFrom = moment().subtract(1, 'years').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodYears5"] = function () {
            settings.endOfDayStartFrom = moment().subtract(5, 'years').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodYears10"] = function () {
            settings.endOfDayStartFrom = moment().subtract(10, 'years').format('YYYY-MM-DD');
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
        actions["dataPeriodYearsAll"] = function () {
            settings.endOfDayStartFrom = '1998-09-07';
            settings.endOfDayEndTime = today;
            showEndOfDay();
        };
    }

    var setInstrumentVisibility = function (uniqueKey, makeVisible) {
        // var objChart = Highcharts.chart(settings.chartContainerId);
        
        $.each(objChart.series, function (idx, objSerie) {
            var objCurrentInstrument = objSerie.userOptions.objOriginal; /* the original object is attached above */

            if (objCurrentInstrument && objCurrentInstrument.UniqueKey == uniqueKey) {
                objSerie.setVisible(makeVisible);
            }
        });
    };

    var getPreferredColor = function (uniqueKey) {
        var color = null;
        try {
            $.each(settings.instrumentColors, function (idx, objInstrument) {
                // Is instrument listed
                if (objInstrument.uniqueKey == uniqueKey) {
                    color = objInstrument.preferredColor;
                }
            });
        } catch (e) {
            console.log(e);
        }

        return color;
    };

    function  showEndOfDay() {
        typeOfChart = "endOfDay";
        var proimiseEndOfDay = render({
            volumeOffset: -35,
            showVolume: showVolume,
            typeOfChart: 'EndOfDay',
            dateToStartFrom: settings.endOfDayStartFrom /*'2012-01-01'*/,
            dateToEnd: settings.endOfDayEndTime
        });

        proimiseEndOfDay.then(function () {
            if (!settings.isMiniShareGraph) {
                $('#datePickerFrom input').datepicker('update', settings.endOfDayStartFrom);
                $('#datePickerTo input').datepicker('update', settings.endOfDayEndTime);
                $('.share-index').removeClass("disabled");
            }

            reinitializeState();

            // fix for graph size issue on print
            sharegraphPrintFix();
        });
    }

    function  showPartOfDay() {
        typeOfChart = "partOfDay";
        var daysBack = 1;

        // day of week, if higher than 5 its on a weekend and we have no share data for that day
        var dow = parseInt(moment().format('d'));
        if (dow > 5) {
            daysBack = 3;
        }

        settings.endOfDayStartFrom = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
        settings.endOfDayEndTime = today;

        var promisePartOfDay = render({
            dateToStartFrom: settings.endOfDayStartFrom,
            dateToEnd: null,
            typeOfChart: 'PartOfDay',
            showVolume: showVolume
        });
        promisePartOfDay.then(function () {
            reinitializeState();

            $('#datePickerFrom input').datepicker('update', settings.endOfDayStartFrom);
            $('#datePickerTo input').datepicker('update', settings.endOfDayEndTime);
            $('.share-index').addClass("disabled");

            // fix for graph size issue on print
            sharegraphPrintFix();
        });
    }

    var reinitializeState = function() {
        $('.show-hide-instrument')
            .each(function () {
                var thisElement = $(this);
                updateInstrumentSeries(thisElement);
            });
    }

    var triggerAutomaticComparison = 0;
    /* This will be incremented for every peer-or-index added (decremented when removed) */
    var updateInstrumentSeries = function(element) {
        var $el = $(element);
        // var objChart = Highcharts.chart(settings.chartContainerId);
        var uniqueKey = $el.data("key");
        var triggerComparison = $el.data("triggercomparison");
        var makeVisible = $el.hasClass("selected");
        settings.endOfDayStartFrom = $('#datePickerFrom input').val();

        if (triggerComparison) {
            if (makeVisible) {
                triggerAutomaticComparison++;
            } else {
                triggerAutomaticComparison--;
            }

            triggerAutomaticComparison = (triggerAutomaticComparison >= 0 ? triggerAutomaticComparison : 0);

            // Set comparison type
            if (triggerAutomaticComparison > 0) {
                // Set Comparison since we have more instruments visible
                objChart.yAxis[0].setCompare('percent');
                $('#comparisonPercent').addClass("selected");
                $('#comparisonNone').removeClass("selected");
                objChart.yAxis[0].setExtremes(null);
            } else {
                objChart.yAxis[0].setCompare('none');
                $('#comparisonNone').addClass("selected");
                $('#comparisonPercent').removeClass("selected");

                // if the index is clicked to hide it highcharts needs a little time to set the new min value of the y-axis
                setTimeout(function () {
                    var ex = objChart.yAxis[0].getExtremes();
                    var minValue = ex.min <= 0 ? 0 : ex.min;
                    if (minValue >= 0) {
                        //set the min and return the values
                        objChart.yAxis[0].setExtremes(minValue, null, true, false);
                    }
                    else {
                        objChart.yAxis[0].setExtremes(null);
                    }
                }, 600);
            }
        }

        $.each(objChart.series,
            function (idx, objSerie) {
                var objCurrentInstrument = objSerie.userOptions.objOriginal;
                if (objCurrentInstrument && objCurrentInstrument.UniqueKey == uniqueKey) {
                    objSerie.setVisible(makeVisible);
                }
            });


        if (uniqueKey == 'INSIDERS' && makeVisible) {
            addInsiders(settings.endOfDayStartFrom, uniqueKey);
        }
        if (uniqueKey == 'DIVIDEND' && makeVisible) {
            addDividends(settings.endOfDayStartFrom, uniqueKey);
        }
        if ((uniqueKey == 'Regulatory PRM' || uniqueKey == 'Regulatory RPT') && makeVisible) {
            showReleasesOnChart(uniqueKey);
        }
    }

    function addDividends(startDate, uniqueKey) {
        // var objChart = Highcharts.chart(settings.chartContainerId);

        // Check if dividend are already selected
        var isFound = false;
        $.each(objChart.series,
            function (idx, objSerie) {
                var objCurrentInstrument = objSerie.userOptions.objOriginal;
                if (objCurrentInstrument && objCurrentInstrument.UniqueKey == settings.dividendsUniqueKey) {
                    isFound = true;
                }
            });

        if (!isFound) {
            // Add as new instrument
            window.cision.websolution.dividend.renderToGraph(objChart,
                {
                    startDate: startDate,
                    dividendsUniqueKey: uniqueKey
                });
        }
    }

    function addInsiders(startDate, uniqueKey) {
        // var objChart = Highcharts.chart(settings.chartContainerId);

        var isFound = false;
        $.each(objChart.series,
            function (idx, objSerie) {
                var objCurrentInstrument = objSerie.userOptions.objOriginal;
                if (objCurrentInstrument && objCurrentInstrument.UniqueKey == settings.insidersUniqueKey) {
                    isFound = true;
                }
            });

        if (!isFound) {
            window.cision.websolution.insiders.renderToGraph(objChart,
                {
                    startDate: startDate,
                    insidersUniqueKey: uniqueKey
                });
        }
    }

    function showComparisonChart() {
        // var objChart = Highcharts.chart(settings.chartContainerId);
        comparisonType = 'percent';

        $.each(objChart.series,
            function (i, serie) {
                if (serie.type !== 'flag' && serie.type !== 'column') {
                    serie.update({
                        compare: comparisonType
                    },
                        false);
                }
            });

        objChart.redraw();
        objChart.yAxis[0].setExtremes(null);
    }

    function showPriceChart() {
        // var objChart = Highcharts.chart(settings.chartContainerId);
        comparisonType = 'none';

        $.each(objChart.series,
            function (i, serie) {
                if (serie.type !== 'flag' && serie.type !== 'column') {
                    serie.update({
                        compare: comparisonType
                    },
                        false);
                }
            });

        objChart.redraw();
        var ex = objChart.yAxis[0].getExtremes();
        if (ex.dataMin < 0 || ex.min < 0) {
            //set the min and return the values
            objChart.yAxis[0].setExtremes(0, null, true, false);
        }
    }

    function showReleasesOnChart(uniqueKey) {
        // var objChart = Highcharts.chart(settings.chartContainerId);

        var promiseGraphReleases = window.cision.websolution.common.getModuleData({
            'accessKey': accessKey, 'module': "Share releases", 'path': 'Share/' + accessKey + '/Releases', 'postData': {
                startDate: settings.dateToStartFrom
            }
        });

        Promise.resolve(promiseGraphReleases).then(function (releaseData) {
            $.each(releaseData.Releases, function (idxIns, objReleasePackage) {
                var isVisible = objReleasePackage.Name == uniqueKey ? true : false;
                if (isVisible) {
                    var releaseSettings = window.cision.websolution.common.getIndicatorSettings(uniqueKey);
                    // This used in finding which series we are dealing with 
                    objReleasePackage.UniqueKey = objReleasePackage.Name;

                    var seriesData = [];
                    $.each(objReleasePackage.Releases, function (ix, objRelease) {
                        objRelease.PublishDateFormatted = moment(objRelease.PublishDate).locale(settings.uiLanguage).format();

                        seriesData.push({
                            x: moment(objRelease.PublishDate).format('X') * 1000,
                            title: releaseSettings.title || 'R',
                            text: objRelease.Title,
                            Release: objRelease
                        });
                    });

                    // required by highcharts
                    seriesData = seriesData.sort(function (a, b) {
                        var res = a.x - b.x;
                        if (res == 0)
                            return res;
                        return res < 0 ? -1 : 1;
                    });

                    // Add Releases to Graph
                    var objChartSeries = {
                        id: objReleasePackage.Name,
                        type: 'flags',
                        onSeries: releaseSettings.seriesId || '',
                        shape: releaseSettings.seriesShape || 'circlepin',
                        fillColor: releaseSettings.shapeColor || '',
                        color: releaseSettings.shapeOutlineColor || '',
                        style: { color: releaseSettings.shapeTextColor || '' },
                        name: objReleasePackage.Name,
                        data: seriesData,
                        cursor: 'pointer',
                        visible: isVisible,
                        // Extra data
                        objOriginal: objReleasePackage
                    };

                    if (settings.showReleaseLink) {
                        objChartSeries.events = {
                            click: function (e) {
                                var releaseUrl = e.point.Release.CwUrl;

                                if (settings.releaseLinkFormatter && settings.releaseLinkFormatter !== 'CISIONWIRE') {
                                    releaseUrl = settings.releaseLinkFormatter + e.point.Release.Id;
                                }
                                window.open(releaseUrl, '_blank');
                            }
                        };

                        objChartSeries.tooltip = {
                            pointFormat: '{point.Release.Title}'
                        };
                    }
                    objChart.addSeries(objChartSeries);
                }
            });
        }).catch(function (err) {
            console.log('Could not retrieve release data. ' + err.message);
        });
    }

    // this method can be used directly if none of our custom elements (actions, datepickers, downloads etc.) are needed
    // if so some settings will be required in the options object to get highcharts own implementation of the above elements
    var render = function(options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your sharegraph access key.");
            return;
        }
        var postData = {
            startDate: settings.dateToStartFrom,
            endDate: settings.dateToEnd,
            quoteType: settings.typeOfChart
        };

        // fetch the data
        var promiseSharegraph = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Sharegraph", 'path': 'Share/' + accessKey, 'postData': postData });

        return Promise.resolve(promiseSharegraph).then(function (shareData) {
            var seriesList = [],
                seriesVolumeList = [],
                isEndOfDay = settings.typeOfChart == 'EndOfDay';

            for (var ix = 0; ix < shareData.Instruments.length; ix++) {
                var objInstrument = shareData.Instruments[ix],
                    isVisible = false,
                    isMain = false;

                objInstrument.MarketPlace = $.trim(objInstrument.MarketPlace);

                // Check if this is a main instrument
                $.each(settings.mainInstruments, function (qix, objMainInstrument) {
                    if (objInstrument.TickerSymbol === objMainInstrument.symbol && objInstrument.MarketPlace === objMainInstrument.marketPlace) {
                        isVisible = true;
                        isMain = true;
                        if (objMainInstrument.isHidden === true) {
                            isVisible = false;
                        }
                    }
                });

                // This used in finding which series we are dealing with (in show/hide checkboxes)
                objInstrument.UniqueKey = objInstrument.TickerSymbol + objInstrument.MarketPlace + objInstrument.TradeCurrency;

                var points = [],
                    pointsEffectiveYield = [],
                    pointsVolume = [];

                $.each(objInstrument.Quotes, function (qix, objQuote) {
                    if (isEndOfDay) {
                        /* Remove Time*/
                        objQuote.QuoteTime = moment(objQuote.QuoteTime).format('YYYY-MM-DD') + 'T00:00:00Z';
                    } else {
                        /* Remove Seconds */
                        objQuote.QuoteTime = moment(objQuote.QuoteTime).format('YYYY-MM-DD[T]HH:mm') + ':00Z';
                    }
                    objQuote.DeltaPercentage = (objQuote.DeltaPercentage * 100).toFixed(2);
                    var patt = new RegExp("-");
                    var res = patt.test(objQuote.DeltaPercentage);
                    if (!res) {
                        objQuote.DeltaPercentage = '+' + objQuote.DeltaPercentage;
                    }
                    var quoteUnixTime = moment(objQuote.QuoteTime).format('X') * 1000;
                    points.push({
                        x: moment(objQuote.QuoteTime).format('X') * 1000,
                        y: objQuote.Price,
                        extras: objQuote.DeltaPercentage || 0
                    });

                    if (isMain) {
                        pointsVolume.push({
                            x: quoteUnixTime,
                            y: objQuote.Quantity
                        });
                    }
                });

                seriesList.push({
                    id: objInstrument.UniqueKey,
                    name: objInstrument.TickerSymbol,
                    data: points,
                    visible: isVisible,
                    color: getPreferredColor(objInstrument.UniqueKey),
                    tooltip: {
                        valueDecimals: 2,
                        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: ' + objInstrument.TradeCurrency + ' <b>{point.y}</b>' + (isEndOfDay ? ' ({point.extras}%)</span><br/>' : '')
                    },
                    showInNavigator: isMain && isVisible ? true : false,
                    zIndex: 10,
                    // Extra data
                    objOriginal: objInstrument
                });

                // Volume
                if (settings.showVolume && isMain && pointsVolume && pointsVolume.length > 0) {
                    seriesVolumeList.push({
                        id: objInstrument.UniqueKey + 'VOLUME',
                        name: objInstrument.TickerSymbol + ' [VOLUME]',
                        data: pointsVolume,
                        visible: isVisible,
                        color: getPreferredColor(objInstrument.UniqueKey + 'VOLUME'),
                        type: 'column',
                        yAxis: 1,
                        tooltip: {
                            valueDecimals: 2
                        },
                        zIndex: 9,
                        // Extra data
                        objOriginal: objInstrument
                    });
                }

                if (objInstrument.EffectiveYields && objInstrument.EffectiveYields.length > 0) {
                    // Process Effective Yield
                    var objInstrumentEffectiveYield = {
                        TickerName: objInstrument.TickerName + '/' + objInstrument.MarketPlace + ' [TR]',
                        TickerSymbol: objInstrument.TickerSymbol,
                        MarketPlace: objInstrument.MarketPlace,
                        TradeCurrency: objInstrument.TradeCurrency,
                        TickerType: 'EFFECTIVEYIELD',
                        UniqueKey: objInstrument.UniqueKey + settings.effectiveYieldSuffix,
                        Quotes: objInstrument.EffectiveYields
                    };

                    pointsEffectiveYield = [];
                    var objEffectiveYieldFirst = objInstrument.EffectiveYields[0];
                    $.each(objInstrument.EffectiveYields, function (eyix, objEffectiveYield) {
                        pointsEffectiveYield.push({
                            x: moment(objEffectiveYield.ObsDate).format('X') * 1000,
                            x1: objEffectiveYield.ObsDate,
                            y: objEffectiveYield.LastAdjReInv * objEffectiveYieldFirst.LastAdj / objEffectiveYieldFirst.LastAdjReInv
                        });
                    });

                    seriesList.push({
                        id: objInstrumentEffectiveYield.UniqueKey,
                        name: objInstrumentEffectiveYield.TickerName,
                        data: pointsEffectiveYield,
                        visible: false,
                        color: getPreferredColor(objInstrumentEffectiveYield.UniqueKey),
                        tooltip: {
                            valueDecimals: 2
                        },

                        // Extra data
                        objOriginal: objInstrumentEffectiveYield
                    });
                }
            }

            seriesList = seriesList.concat(seriesVolumeList);

            // Build and render the chart
            buildChart(seriesList);

        }).catch(function (err) {
            console.log(err.message);
        });
    }

    var buildChart = function (seriesList) {
        var objTitle = {
            text: settings.chartTitle
        };

        var objPlotOptions = {
            spline: {
                states: {
                    hover: {
                        lineWidth: settings.lineWidth + 3
                    }
                }
            },
            series: {
                turboThreshold: 100000,
                compare: settings.chartComparison,
                lineWidth: settings.lineWidth
            }
        };

        var objExporting = {
            enabled: settings.useHighchartsElements,
            sourceHeight: $("#" + settings.chartContainerId || "sharegraph-container").height(),
            sourceWidth: $("#" + settings.chartContainerId || "sharegraph-container").width()
        };

        var objScrollbar = {
            enabled: settings.enableScrollbar
        };

        var objLegend = {
            enabled: settings.enableLegend
        };

        var objYAxis = [{
            opposite: true
        }];
        var objXAxis = {
            type: 'datetime',
            gridLineWidth: settings.gridLineWidth
        };

        if (settings.showVolume) {
            objYAxis = [{
                height: settings.yAxisSize.share.height
            },
            {
                top: settings.yAxisSize.volume.top,
                height: settings.yAxisSize.volume.height
            }];

        }

        var objRangeSelector = {
            enabled: settings.useHighchartsElements,
            buttons: [],
            inputEnabled: true,
            inputDateFormat: "%Y-%m-%d",
            inputEditDateFormat: "%Y-%m-%d",
            inputDateParser: function (value) {
                value = value.split('-');
                return Date.UTC(
                    parseInt(value[0]),
                    parseInt(value[1]) - 1,
                    parseInt(value[2])
                );
            }
        };

        if (settings.typeOfChart == "partOfDay") {
            objRangeSelector.buttons = [{
                type: 'minute',
                count: 15,
                text: '15m'
            }, {
                type: 'minute',
                count: 30,
                text: '30m'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                text: 'All'
            }];
        } else {
            objRangeSelector.buttons = [{
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'week',
                count: 1,
                text: '1W'
            }, {
                type: 'month',
                count: 1,
                text: '1M'
            }, {
                type: 'month',
                count: 3,
                text: '3M'
            }, {
                type: 'month',
                count: 6,
                text: '6M'
            }, {
                type: 'year',
                count: 1,
                text: '1M'
            }, {
                type: 'all',
                text: 'All'
            }];
        }

        Highcharts.setOptions({
            lang: {
                rangeSelectorZoom: '',
                contextButtonTitle: window.cision.websolution.texts[settings.uiLanguage].TextDownload || 'Download',
                months: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['months'],
                weekdays: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['weekdays'],
                shortMonths: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['shortMonths'],
                rangeSelectorFrom: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['rangeSelectorFrom'],
                rangeSelectorTo: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['rangeSelectorTo'],
                downloadJPEG: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['downloadJPEG'],
                downloadPDF: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['downloadPDF'],
                downloadPNG: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['downloadPNG'],
                downloadSVG: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['downloadSVG'],
                printChart: window.cision.websolution.texts[settings.uiLanguage].calendarTexts['printChart']
            }
        });
       
        objChart = new Highcharts.StockChart({
            chart: {
                renderTo: settings.chartContainerId,
                defaultSeriesType: settings.defaultSeriesType,
                plotBackgroundColor: settings.plotBackgroundColor,
                plotBorderWidth: settings.plotBorderWidth,
                plotBackgroundImage: settings.backgroundImage
            },
            title: objTitle,
            xAxis: objXAxis,
            yAxis: objYAxis,
            plotOptions: objPlotOptions,
            rangeSelector: objRangeSelector,
            scrollbar: objScrollbar,
            legend: objLegend,
            exporting: objExporting,
            navigator: {
                enabled: settings.isMiniShareGraph ? false : settings.enableNavigator,
                maskFill: 'rgba(50, 50, 50, 0.2)',
                series: {
                    type: 'areaspline',
                    fillOpacity: 0.05,
                    dataGrouping: {
                        smoothed: true
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                text: window.cision.websolution.translationHelpers.getTranslation("TextDelayInfo") + " " + window.cision.websolution.translationHelpers.getTranslation("TextCredits"),
                href: ''
            },

            series: seriesList
        });

        var ex = objChart.yAxis[0].getExtremes();
        if (ex.dataMin < 0 || ex.min < 0) {
            //set the min and return the values
            objChart.yAxis[0].setExtremes(0, null, true, false);
        }
    };

    return {
        init: init,
        render: render,
        setVisibility: setInstrumentVisibility,
        reinitializeState: reinitializeState
    };
}(jQuery);