// This JavaScript file is created by Cision for our newsfeed.
// Built to be used in combination with relese.html

import './module.dependencies.js';

window.cision.websolution.newsfeed =  function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.newsfeed.accessKey;

        var renderListing = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your newsfeed access key.");
            return;
        }

        var postData = {
            startDate: settings.startDate,
            endDate: settings.endDate,
            pageIndex: settings.pageIndex,
            pageSize: settings.pageSize,
            searchTerm: settings.searchTerm,
            separateFirstRelease: settings.separateFirstRelease,
            tags: settings.tags,
            regulatory: settings.regulatory
        };

        var promiseNewsfeed = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Newsfeed", 'path': 'NewsFeed/' + accessKey + '/Releases', 'postData': postData });

        return Promise.resolve(promiseNewsfeed).then(function (objResponse) {
            var objFirstRelease = null,
                releaseList = [];

            $.each(objResponse.Releases, function (idx, objRelease) {
                objRelease.PublishDateFormatted = moment(objRelease.PublishDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
                objRelease.DetailUrl = settings.serviceEndpoint + 'Release/' + objRelease.EncryptedId;
                objRelease.years = objRelease.PublishDateFormatted.slice(0, 4);

                objRelease.HasImage = objRelease.Images && objRelease.Images.length > 0;

                var encodedTitle = objRelease.EncodedUrl || objRelease.Title.toLowerCase().replace(/[öø]/g, "o").replace(/[åä]/g, "a").replace(/[éèëê]/g, "e").replace(/[ûü]/g, "u").replace(/[^a-z0-9]+/gi, '-').replace(/\-+/g, "-");
                objRelease.TitleForUrl = encodeURI(encodedTitle);

                objRelease.ThumbnailUrl = '';
                if (objRelease.Images.length > 0) {
                    objRelease.ThumbnailUrl = objRelease.Images[0].UrlTo400x400ArResized;
                }

                // Shorten text
                if (settings.introMaxLength && settings.introMaxLength > 0) {
                    if (objRelease.Intro.length > settings.introMaxLength) {
                        objRelease.Intro = $.trim(objRelease.Intro).substring(0, settings.introMaxLength) + "...";
                    }
                }

                if (settings.titleMaxLength && settings.titleMaxLength > 0) {
                    if (objRelease.Title.length > settings.titleMaxLength) {
                        objRelease.Title = $.trim(objRelease.Title).substring(0, settings.titleMaxLength) + "...";
                    }
                }

                if (settings.separateFirstRelease === true && objFirstRelease === null) {
                    objFirstRelease = objRelease;
                    if (objFirstRelease.HasImage) {
                        objFirstRelease.ImageUrl = objRelease.Images[0].DownloadUrl;
                    }
                } else {
                    releaseList.push(objRelease);
                }
            });

            objResponse.Releases = releaseList;

            objResponse = window.cision.websolution.common.setPagingItems(objResponse);

            // render first release
            if (settings.separateFirstRelease === true) {
                var tplElementTopRelease = '#' + (settings.templateElement || 'tplTopRelease');
                var tplTargetTopRelease = '#' + (settings.outputTargetElement || 'target-release-top');
                window.cision.websolution.common.modelToHtml(objFirstRelease, tplElementTopRelease, tplTargetTopRelease);
            }

            // render release list
            var tplElement = '#' + (settings.templateElement || 'tplReleaseList');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-release-list');
            window.cision.websolution.common.modelToHtml(objResponse, tplElement, tplTarget);

            if (releaseList.length < 1 && objFirstRelease === null) {
                window.cision.websolution.common.modelToHtml({}, "#tplnosearchResult", '#noSearchresult-container');
                $('#noSearchresult-container').show();
            } else {
                $('#noSearchresult-container').hide();
            }

        }).catch(function (err) { console.log('Could not retrieve newsfeed data. ' + err.message) });
    };

    var renderYears = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your newsfeed access key.");
            return;
        }

        var postData = {
            startYear: settings.newsfeedYearsStartYear
        };

        var promiseYears = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Newsfeed years", 'path': 'NewsFeed/' + accessKey + '/Years', 'postData': postData });

        return Promise.resolve(promiseYears).then(function (objResponse) {
            var yearList = [];

            $.each(objResponse.Years, function (idx, year) {
                yearList.push(year);
            });

            yearList.reverse();
            objResponse.Years = yearList;

            var tplElement = '#' + (settings.templateElement || 'tplArchive');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-archive');
            window.cision.websolution.common.modelToHtml(objResponse, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve newsfeed years data. ' + err.message) });
    };

    var renderDetail = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!settings.releaseIdentifier) {
            console.log("You must provide a release Encrypted ID.");
            return;
        }

        var promiseReleaseDetail = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Release detail", 'path': 'Release/' + settings.releaseIdentifier + '/Detail' });

        return Promise.resolve(promiseReleaseDetail).then(function (objResponse) {
            var objRelease = objResponse.Release;
            objRelease.PublishDateFormatted = moment(objRelease.PublishDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
            objRelease.DetailUrl = settings.serviceEndpoint + 'Release/' + objRelease.EncryptedId;

            objRelease.HasImage = objRelease.Images && objRelease.Images.length > 0;

            if (objRelease.Files) {
                $.each(objRelease.Files, function (idx, objFile) {
                    var ext = objFile.FileName.split('.').pop();
                    objFile.FileType = ext || 'unknown-file-extension';
                });
            }

            var tplElement = '#' + (settings.templateElement || 'tplReleaseDetail');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-release-detail');
            window.cision.websolution.common.modelToHtml(objRelease, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve release details. ' + err.message) });
    };

    // only used in hosted newsrooms
    var renderContactsAndAbout = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your newsroom access key.");
            return;
        }
        var postData = {
            siteKey: settings.siteKey
        };

        var promiseNewsroomContent = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Newsroom content", 'path': 'NewsRoom/' + accessKey, 'postData': postData });

        return Promise.resolve(promiseNewsroomContent).then(function (objResponse) {
            var $tplNewsroomAbout = $("#tplNewsroomAbout");
            var $targetNewsroomAbout = $("#target-newsroom-about");

            if ($tplNewsroomAbout.length && $targetNewsroomAbout.length) {
                window.cision.websolution.common.modelToHtml(objResponse, $tplNewsroomAbout, $targetNewsroomAbout);
            }

            var $tplLogoUrl = $("#tplNewsroomLogoUrl");
            var $targetLogoUrl = $("#target-newsroom-logo");

            if ($tplLogoUrl.length && $targetLogoUrl.length) {
                window.cision.websolution.common.modelToHtml(objResponse, $tplLogoUrl, $targetLogoUrl);
            }

            var $tplNewsroomContactListDetail = $("#tplNewsroomContactListDetail");
            var $targetNewsroomContactListDetail = $("#target-newsroom-contact-list-detail");

            if ($tplNewsroomContactListDetail.length && $targetNewsroomContactListDetail.length) {
                window.cision.websolution.common.modelToHtml(objResponse, $tplNewsroomContactListDetail, $targetNewsroomContactListDetail);
            }

            var $tplNewsroomContactListSidebar = $("#tplNewsroomContactListSidebar");
            var $targetNewsroomContactListSidebar = $("#target-newsroom-contact-list-sidebar");

            if ($tplNewsroomContactListSidebar.length && $targetNewsroomContactListSidebar.length) {
                window.cision.websolution.common.modelToHtml(objResponse, $tplNewsroomContactListSidebar, $targetNewsroomContactListSidebar);
            }

        }).catch(function (err) { console.log('Could not retrieve newsroom content. ' + err.message) });
    };

    var renderTags = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your newsfeed access key.");
            return;
        }

        var postData = {
            languageCodes: settings.uiLanguage,
            pageSize: 100
        };

        var promiseTags = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Newsfeed tags", 'path': 'Newsroom/' + accessKey + '/Tags', 'postData': postData });

        return Promise.resolve(promiseTags).then(function (objResponse) {
            var tagList = [];

            $.each(objResponse.Tags, function (idx, objRelease) {
                tagList.push(objRelease);
            });

            objResponse.Tags = tagList;
            objResponse.numberOfTags = tagList.length;

            var tplElement = '#' + (settings.templateElement || 'tplTags');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-tags');
            window.cision.websolution.common.modelToHtml(objResponse, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve newsfeed tags. ' + err.message) });
    };

    return {
        renderListing: renderListing,
        render: renderListing,
        renderDetail: renderDetail,
        renderYears: renderYears,
        renderContactsAndAbout: renderContactsAndAbout,
        renderTags: renderTags
    };
}(jQuery);