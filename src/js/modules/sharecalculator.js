// This JavaScript file is created by Cision for our sharecalculator module.
// Built to be used in combination with sharecalculator.html

import './module.dependencies.js';

window.cision.websolution.sharecalculator = function($) {

    var settings = $.extend({}, window.cision.websolution.settings.general);
    var accessKey = window.cision.websolution.settings.sharecalculator.accessKey;
    var texts = window.cision.websolution.texts[settings.uiLanguage];

    var renderCalculator = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your sharecalculator access key.");
            return;
        }
        var postData = {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            tickerSymbol: "",
            quoteType: settings.typeOfCalclator

        };
        var promiseShareCalculator = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Share calculator", 'path': 'ShareCalculator/' + accessKey, 'postData': postData });

        Promise.resolve(promiseShareCalculator).then(function (calculatorData) {
            if (calculatorData.Instruments.length > 0) {
                RenderShareType(calculatorData);
            }
            else {
                console.log("You need to have instruments on your feed.");
                return;
            }
        });

    };

    function InitSettingsChanged() {
        $("#tbNumberOfShares").on("change", function () {
            if (this.value == "") {
                $("#tbAmount").removeAttr("disabled");
            }
            else {
                $("#tbAmount").attr("disabled", true);
            }
        });

        $("#tbAmount").on("change", function () {
            if (this.value == "") {
                $("#tbNumberOfShares").removeAttr("disabled");
            }
            else {
                $("#tbNumberOfShares").attr("disabled", true);
            }
        });
    }

    function RenderShareType(calculatorData) {
        calculatorData.Instruments = calculatorData.Instruments.sort(function (a, b) {
            return a.TickerSymbol > b.TickerSymbol;
        });

        calculatorData.Instruments[0].Checked = true;
        var tplElementShareType = '#' + (settings.templateElementShareType || 'template-sharecalclulator-sharetype');
        var tplTargetShareType = '#' + (settings.outputTargetElementShareType || 'sharecalclulator-sharetype-container');
        window.cision.websolution.common.modelToHtml({ Instruments: calculatorData.Instruments }, tplElementShareType, tplTargetShareType);

        var tplElement = '#' + (settings.templateElement || 'template-sharecalclulator');
        var tplTarget = '#' + (settings.outputTargetElement || 'sharecalclulator-container');
        window.cision.websolution.common.modelToHtml({ Instruments: calculatorData.Instruments }, tplElement, tplTarget, true);

        InitSettingsChanged();
    }

    var compute = function() {
        var resultsModel = $.extend(texts, settings);
        var historyModel = $.extend(texts, settings);

        //get the input values
        var shareType = $("#sharecalclulator-sharetype-container input[type='radio']:checked").val();
        var startDate = $("#shareCalculatorStartYear").val() + "-" + $("#shareCalculatorStartMonth").val() + "-" + $("#shareCalculatorStartDay").val();
        var endDate = $("#shareCalculatorEndYear").val() + "-" + $("#shareCalculatorEndMonth").val() + "-" + $("#shareCalculatorEndDay").val();
        var numberOfShares = $("#tbNumberOfShares").val();
        var holdingValue = $("#tbAmount").val();

        if (!accessKey) {
            console.log("You must provide your sharecalculator access key.");
            return;
        }

        var postData = {
            startDate: startDate,
            endDate: endDate,
            tickerSymbol: shareType,
            quoteType: settings.typeOfCalclator

        };
        var promiseShareCalculatorComputed = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Share calculator", 'path': 'ShareCalculator/' + accessKey, 'postData': postData });

        Promise.resolve(promiseShareCalculatorComputed).then(function (calculatorData) {
            //get first bcasue we filtered by ticker symbol in backend
            var instrument = calculatorData.Instruments[0];

            //show results 
            if (numberOfShares == "" && holdingValue == "") {
                resultsModel.RenderResults = false;
            }
            else {
                resultsModel.Results = GetResults(resultsModel, instrument, startDate, endDate, numberOfShares, holdingValue);
            }

            var tplElement = '#' + (settings.templateElement || 'template-sharecalclulator-results');
            var tplTarget = '#' + (settings.outputTargetElement || 'sharecalclulator-results-container');
            window.cision.websolution.common.modelToHtml(resultsModel, tplElement, tplTarget);

            //show history quetes
            var history = GetShareHistory(instrument.Quotes);

            historyModel.Quotes = history.Quotes;
            historyModel.PartOfDayHelp = history.PartOfDayHelp;

            var tplElementShareHistory = '#' + (settings.templateElementShareHistory || 'template-sharecalclulator-history');
            var tplTargetShareHistory = '#' + (settings.outputTargetElementShareHistory || 'sharecalclulator-history-container');
            window.cision.websolution.common.modelToHtml(historyModel, tplElementShareHistory, tplTargetShareHistory);
        });
    };

    function GetResults(resultsModel, instrument, startDate, endDate, numberOfShares, holdingValue) {
        var results = new Object();

        if (instrument.StartDateQuote == null || instrument.EndDateQuote == null) {
            resultsModel.RenderResults = false;
        }

        try {
            results.Currency = instrument.TradeCurrency;
            results.StartDateQuote = instrument.StartDateQuote;
            results.EndDateQuote = instrument.EndDateQuote;

            results.StartDateFormated = moment(instrument.StartDateQuote.QuoteTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
            results.EndDateFormated = moment(instrument.EndDateQuote.QuoteTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);

            if (numberOfShares == "") {
                results.NumberOfShares = parseInt(parseFloat(holdingValue) / results.StartDateQuote.Price);
            }
            else {
                results.NumberOfShares = numberOfShares;
            }

            results.StartValue = results.NumberOfShares * results.StartDateQuote.Price;
            results.StartPrice = results.StartDateQuote.Price;

            results.EndValue = results.NumberOfShares * results.EndDateQuote.Price;
            results.EndPrice = results.EndDateQuote.Price;
            results.Change = results.EndValue - results.StartValue;
            results.ChangePercent = (results.Change / results.StartValue) * 100;

            //Annualized Rate Formula: AP = ((P + G) / P) ^ (365 / n) - 1 (*100 %)
            var base = ((results.StartValue + results.Change) / results.StartValue);
            //days difference
            var diffDays = moment(endDate).diff(moment(startDate), 'days');

            results.ChangeAnnualizedPercent = (Math.pow(base, (365 / diffDays)) - 1) * 100;
            resultsModel.RenderResults = true;

            return results;

        } catch (e) {
            resultsModel.RenderResults = false;
        }
    }

    function GetShareHistory(quotes) {
        var history = new Object();

        history.PartOfDayHelp = false;
        quotes = quotes.reverse();

        //format time 
        for (var i = 0; i < quotes.length; i++) {
            quotes[i].QuoteTimeFormated = moment(quotes[i].QuoteTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
            if (quotes[i].QuoteType == "PartOfDay") {
                history.PartOfDayHelp = true;
            }
        }

        history.Quotes = quotes;
        return history;
    }

    function exportTableToCSV(filename) {
        var $tableInitial = $("#initial-investment");
        var $rowsInitial = $tableInitial.find('tr:has(td)');

        var tmpColDelim = String.fromCharCode(11);
        var tmpRowDelim = String.fromCharCode(0);

        // actual delimiter characters for CSV format
        var colDelim = ';';
        var rowDelim = '\r\n';

        // Grab text from results table into CSV formatted string 
        var csv = '';
        if ($rowsInitial.length > 0) {
            csv += $("#initial-investment-header").text() + " " + $("#initial-investment-type").text() + rowDelim;
            csv += formatRows($rows.map(grabRow));
            csv += rowDelim + rowDelim;
        }

        var $tableValue = $("#end-value");
        var $rowsValue = $tableValue.find('tr:has(td)');
        if ($rowsValue.length > 0) {
            csv += $("#end-value-header").text() + " " + $("#end-value-type").text() + rowDelim;
            csv += formatRows($rows.map(grabRow));
            csv += rowDelim + rowDelim;
        }

        var $tableHistory = $("#shareCalculatorHistory");
        var $headersHistory = $tableHistory.find('tr:has(th)')
        var $rowsHistory = $tableHistory.find('tr:has(td)')

        // Grab text from history table into CSV formatted string        
        csv += formatRows($headersHistory.map(grabRow));
        csv += rowDelim;
        csv += formatRows($rowsHistory.map(grabRow));

        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        // For IE (tested 10+)
        if (window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
                type: "text/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, filename);
        } else {
            $("#csvExport").attr({ 'download': filename, 'href': csvData });
            $("#csvExport")[0].click();
        }

        // Format the output so it has the appropriate delimiters
        function formatRows(rows) {
            return rows.get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim);
        }
        // Grab and format a row from the table
        function grabRow(i, row) {

            var $row = $(row);
            //for some reason $cols = $row.find('td') || $row.find('th') won't work...
            var $cols = $row.find('td');
            if (!$cols.length) $cols = $row.find('th');

            return $cols.map(grabCol)
                .get().join(tmpColDelim);
        }
        // Grab and format a column from the table 
        function grabCol(j, col) {
            var $col = $(col),
                $text = $col.text();

            return $text.replace('"', '""'); // escape double quotes
        }
    }

    var exportCsv = function() {
        var shareType = $("#sharecalclulator-sharetype-container input[type='radio']:checked").val();
        var startDate = $("#shareCalculatorStartYear").val() + $("#shareCalculatorStartMonth").val() + $("#shareCalculatorStartDay").val();
        var endDate = $("#shareCalculatorEndYear").val() + $("#shareCalculatorEndMonth").val() + $("#shareCalculatorEndDay").val();

        exportTableToCSV("ShareCalculator-" + shareType + "-" + startDate + "-" + endDate + "-.csv");
    }

    return {
        render: renderCalculator,
        compute: compute,
        exportCsv: exportCsv
    };
}(jQuery);