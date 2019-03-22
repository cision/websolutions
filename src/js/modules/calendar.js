// This JavaScript file is created by Cision for our calendar module.
// Built to be used in combination with calendar.html

import './module.dependencies.js';

window.cision.websolution.calendar = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = (window.cision.websolution.settings.calendar || {}).accessKey,
        categories = [],
        firstRunEvent = true;

    var getPostData = function () {
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your Calendar access key.");
            return;
        }

        return {
            languageCode: settings.uiLanguage,
            pageIndex: settings.pageIndex,
            pageSize: settings.pageSize || 50,
            startDate: settings.startDate,
            endDate: settings.endDate,
            category: settings.calendarCategory
        };
    };

    var formatEvent = function (objEvent) {
        objEvent.EventTimeFormatted = moment(objEvent.EventTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
        objEvent.EventTimeFormattedDate = moment(objEvent.EventTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
        objEvent.EventTimeFormattedTime = moment(objEvent.EventTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.timeFormat);
        objEvent.EventWeekDay = moment(objEvent.EventTime).locale(settings.uiLanguage).format("dddd");
        if (objEvent.LogoUrl > 0) {
            objEvent.HasImage = true;
        } else {
            objEvent.HasImage = false;
        }
        objEvent.PublishTimeFormatted = moment(objEvent.PublishTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
        objEvent.ArchiveTimeFormatted = moment(objEvent.ArchiveTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
        objEvent.ICalUrl = settings.serviceEndpoint + 'Calendar/' + accessKey + '/EventDetailIcs' +
            '?eventGuid=' + objEvent.EventGuid +
            '&languageCode=' + settings.uiLanguage;

        objEvent.EventDuration = moment.duration(objEvent.EventDuration, "minutes").asHours();
        objEvent.EndDateWeekDay = moment(objEvent.EventTime).add(objEvent.EventDuration, "hours").locale(settings.uiLanguage).format("dddd");
        objEvent.EndDateFormattedDate = moment(objEvent.EventTime).add(objEvent.EventDuration, "hours").format(settings.dateFormatOptions.dateFormat);
        objEvent.EndDateFormattedTime = moment(objEvent.EventTime).add(objEvent.EventDuration, "hours").format(settings.dateFormatOptions.timeFormat);
        objEvent.IsOneDay = objEvent.EventTimeFormattedDate == objEvent.EndDateFormattedDate;

        return objEvent;
    };

    var renderEventList = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        var postData = getPostData();

        if (postData != null) {
            var promiseCalendarEvents = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Calendar events", 'path': 'Calendar/' + accessKey, 'postData': postData });

            return Promise.resolve(promiseCalendarEvents).then(function (rawData) {
                var objFirstEvent = null;
                $.each(rawData.Events, function (idx, objEvent) {
                    objEvent = formatEvent(objEvent, settings);

                    if (firstRunEvent && objEvent.Categories) {
                        $.each(objEvent.Categories, function (idx2, objCategory) {
                            categories.push(objCategory);
                        });
                    }
                    if (settings.separateFirstEvent === true && objFirstEvent === null && settings.calendarCategory == '') {
                        objFirstEvent = objEvent;
                        if (objEvent.HasImage) {
                            objFirstEvent.LogoUrl = objEvent.LogoUrl;
                        }
                    }
                });

                var uniqueCategories = [];
                $.each(categories, function(i, el){
                    if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
                });

                if (settings.separateFirstEvent === true && settings.calendarCategory == '') {
                    rawData.Events.shift();
                }

                var tplElement = '#' + (settings.templateElement || 'tplCalendarEventListing');
                var tplTarget = '#' + (settings.outputTargetElement || 'eventListTarget');
                window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

                if (settings.separateFirstEvent && firstRunEvent && objFirstEvent) {
                    var tplTopElement = '#' + (settings.topEventTemplateElement || 'tplTopEvent');
                    var tplTopTarget = '#' + (settings.topEventOutputTargetElement || 'target-event-top');
                    window.cision.websolution.common.modelToHtml(objFirstEvent, tplTopElement, tplTopTarget);
                }

                if (firstRunEvent) {
                    texts.Categories = uniqueCategories;
                    var tplCategoryElement = '#' + (settings.categoriesTemplateElement || 'tplCategories');
                    var tplCategoryTarget = '#' + (settings.categoriesOutputTargetElement || 'target-categories'); 
                    window.cision.websolution.common.modelToHtml({}, tplCategoryElement, tplCategoryTarget);
                }

                firstRunEvent = false;

            }).catch(function (err) { console.log(err.message) });
        }
    };

    var renderSidebarCalendar = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        var postData = getPostData();

        if (postData != null) {
            var promiseSidebarCalendarEvents = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Sidebar calendar", 'path': 'Calendar/' + accessKey, 'postData': postData });

            return Promise.resolve(promiseSidebarCalendarEvents).then(function (rawData) {
                var objFirstEvent = null;
                $.each(rawData.Events, function (idx, objEvent) {
                    objEvent = formatEvent(objEvent);

                    if (firstRunEvent && objEvent.Categories) {
                        $.each(objEvent.Categories, function (idx2, objCategory) {
                            categories.push(objCategory);
                        });
                    }

                    if (settings.separateFirstEvent === true && objFirstEvent === null && settings.calendarCategory == '') {
                        objFirstEvent = objEvent;
                        if (objEvent.HasImage) {
                            objFirstEvent.LogoUrl = objEvent.LogoUrl;
                        }
                    }
                });

                var uniqueCategories = [];
                $.each(categories, function(i, el){
                    if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
                });

                if (settings.separateFirstEvent === true && settings.calendarCategory == '') {
                    rawData.Events.shift();
                }

                var tplElement = '#' + (settings.templateElement || 'tplSidebarCalendar');
                var tplTarget = '#' + (settings.outputTargetElement || 'sidebarCalendarTarget');
                window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

                firstRunEvent = false;

            }).catch(function (err) { console.log(err.message) });
        }
    };

    var renderArchiveList = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        var postData = getPostData();

        if (postData != null) {
            var promiseArchivedCalendarEvents = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Calendar archive", 'path': 'Calendar/' + accessKey + '/Archive', 'postData': postData });

            return Promise.resolve(promiseArchivedCalendarEvents).then(function (rawData) {
                $.each(rawData.Events, function (idx, objEvent) {
                    objEvent = formatEvent(objEvent);
                });

                var tplElement = '#' + (settings.templateElement || 'tplCalendarArchiveListing');
                var tplTarget = '#' + (settings.calendarOutputTargetElement || 'archiveEventListTarget');
                window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

            }).catch(function (err) { console.log(err.message) });
        }
    };

    var getEventByGuid = function (options) {
        if (!options.eventGuid) {
            console.log("You must provide an event guid.");
            return;
        }
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your Calendar access key.");
            return;
        }

        var postData = {
            eventguid: options.eventGuid,
            LanguageCode: settings.uiLanguage
        };

        var promiseCalendarEvent = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Calendar event", 'path': 'Calendar/' + accessKey + '/EventDetail', 'postData': postData });

        return Promise.resolve(promiseCalendarEvent).then(function (objEvent) {
            objEvent = formatEvent(objEvent);

            var tplElement = '#' + (settings.templateElement || 'tplEventDetail');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-event-detail');
            window.cision.websolution.common.modelToHtml(objEvent, tplElement, tplTarget);

        }).catch(function (err) { console.log(err.message) });
    };

    function queryObj() {
        var result = {};
        var queryString = location.search.slice(1);
        var re = /([^&=]+)=([^&]*)/g;
        var m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
    }

    return {
        getEventByGuid: getEventByGuid,
        renderEventList: renderEventList,
        renderArchiveList: renderArchiveList,
        renderSidebarCalendar: renderSidebarCalendar,
        queryObj: queryObj
    }
}(jQuery);
