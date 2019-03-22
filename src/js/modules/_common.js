
window.cision.websolution.translationHelpers = function () {
    function getTranslation(key) {
        return window.cision.websolution.texts[window.cision.websolution.settings.general.uiLanguage][key];
    }
   
    return {
        getTranslation: getTranslation
    };
}();

window.cision.websolution.helpers = function() {
    function map(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
          var currentKey = keys ? keys[index] : index;
          results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    }

    return {
        map: map,
        findWhere: findWhere,
        uniq: uniq,
        sortBy: sortBy
    };
}

window.cision.websolution.common = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        texts = window.cision.websolution.texts[settings.uiLanguage];

    function generateUrl(path) {
        var url = settings.useProxyHandler
            ? settings.proxyHandler + '?url=' + settings.serviceEndpoint + path
            : settings.serviceEndpoint + path;

        return url;
    }

    var modelToHtml = function (data, tplElement, tplTargetElement, includeDatepickerSettings) {
        var compositeModel = $.extend(data, texts, settings);
        if (includeDatepickerSettings) {
            compositeModel = $.extend(compositeModel, GetDatePickerSettings());
        }
        var helpers = $.extend(window.cision.websolution.formatHelpers, window.cision.websolution.translationHelpers);
        var renderedHtml = $(tplElement).render(compositeModel, helpers);
        $(tplTargetElement).html(renderedHtml);
    };

    var setPagingItems = function (data) {
        var totalFound = data.TotalFoundReleases || data.TotalFound;

        data.PreviousPageExists = data.PageIndex > 0;
        data.PreviousPageIndex = Math.max(1, data.PageIndex - 1);
        data.NextPageIndex = data.PageIndex + 1;
        data.NextPageExists = (data.PageIndex * data.PageSize) < totalFound;
        data.PageCount = Math.ceil(totalFound / data.PageSize);

        return data;
    };

    var getModuleData = function (options) {
        if (!options) {
            console.log("You must provide the accesskey and module path");
            return;
        }
        if (!options.accessKey) {
            // we have checks before this so this should never happen but better safe then sorry
            console.log('You must provide the ' + options.module + ' access key');
            return;
        }

        var url = generateUrl(options.path);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: options.postData || null
            })
                .done(function (result) {
                    console.log('Successfully retrieved ' + options.module + ' data');
                    resolve(result);
                })
                .fail(function (xhr, status, err) {
                    console.log('Could not retrieve ' + options.module + ' data');
                    reject(status + err.message);
                });
        });
    };

    function GetDatePickerSettings() {
        var dateSettings = new Object();

        dateSettings.Years = [];
        dateSettings.Months = [];
        dateSettings.Days = [];

        for (var i = settings.startDateYear; i <= moment().year(); i++) {
            dateSettings.Years.push(i);
        }

        for (var i = 1; i <= 12; i++) {
            dateSettings.Months.push(leftPad(i, 2));
        }

        for (var i = 1; i <= 31; i++) {
            dateSettings.Days.push(leftPad(i, 2));
        }

        dateSettings.StartDateSelectedYear = moment().year() - 1;
        dateSettings.EndDateSelectedYear = moment().year();

        dateSettings.SelectedMonth = leftPad(moment().month() + 1, 2);
        dateSettings.SelectedDay = leftPad(moment().date(), 2);

        return dateSettings;
    }

    function leftPad(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    function getIndicatorSettings(uniqueKey) {
        var indicatorSettings = {};
        // Find out which series to attach it onto and fetch other settings
        $.each(settings.indicatorsOnSeries, function (ix, objSetting) {
            if (uniqueKey == objSetting.uniqueKey) {
                // Found
                indicatorSettings = objSetting;
            }
        });

        return indicatorSettings;
    }

    return {
        getModuleData: getModuleData,
        modelToHtml: modelToHtml,
        generateUrl: generateUrl,
        getIndicatorSettings: getIndicatorSettings,
        setPagingItems: setPagingItems
    };
}(jQuery);