// This JavaScript file is created by Cision for our media feed.
// Built to be used in combination with media-listing.html

import './module.dependencies.js';

window.cision.websolution.mediafeed = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.mediafeed.accessKey;

        var renderListing = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your mediafeed access key.");
            return;
        }

        var postData = {
            mediaRestriction: settings.mediaRestriction,
            startDate: settings.startDate,
            endDate: settings.endDate,
            pageIndex: settings.pageIndex,
            pageSize: settings.pageSize,
            tags: settings.tags
        };

        var promiseMediafeed = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Mediafeed", 'path': 'NewsRoom/' + accessKey + '/Medias', 'postData': postData });

        return Promise.resolve(promiseMediafeed).then(function (objResponse) {
            var mediaList = { Images: [], Videos: [], Embedded: [], Medias: [] };
            $.each(objResponse.Medias, function (idx, objMedia) {
                objMedia.CreateDate = moment(objMedia.CreateDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                objMedia.ThumbnailUrlImage = objMedia.UrlTo200x200ArResized || objMedia.UrlTo200x200Thumbnail;
                objMedia.DownloadUrl = objMedia.LargeThumbnailUrl || objMedia.DownloadUrl;

                if (objMedia.MediaType === "Image") {
                    mediaList.Images.push(objMedia);
                }
                if (objMedia.MediaType === "Embedded") {
                    objMedia.EmbeddedItem = objMedia.EmbedCode;
                    mediaList.Embedded.push(objMedia);
                }
                if (objMedia.MediaType === "Video") {
                    mediaList.Videos.push(objMedia);
                }

                mediaList.Medias.push(objMedia);
            });
            if (objResponse.PageIndex <= 0) {
                // We seem to handle the page index differently for the newsfeed and mediafeed. 
                // This is a quickfix, when there is time this should be changed in papi instead
                objResponse.PageIndex = 1;
            }
            objResponse = window.cision.websolution.common.setPagingItems(objResponse);

            objResponse.Images = mediaList.Images.reverse();
            objResponse.Medias = mediaList.Medias.reverse();
            objResponse.Videos = mediaList.Videos.reverse();
            objResponse.Embedded = mediaList.Embedded.reverse();

            var tplElement = '#' + (settings.templateElement || 'tplMediaList');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-media-list');
            window.cision.websolution.common.modelToHtml(objResponse, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve mediafeed data. ' + err.message) });
    };

    var renderThumbnails = function (options) {
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
            mediaRestriction: 'image',
            startDate: settings.startDate,
            endDate: settings.endDate,
            pageIndex: settings.pageIndex,
            pageSize: settings.pageSize
        };

        var promiseMediafeedThumbnails = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Mediafeed thumbnails", 'path': 'NewsRoom/' + accessKey + '/Medias', 'postData': postData });

        return Promise.resolve(promiseMediafeedThumbnails).then(function (objResponse) {
            var imagesList = { Images: [] };
            $.each(objResponse.Medias, function (idx, objMedia) {
                if (objMedia.MediaType === "Image") {
                    objMedia.CreateDate = moment(objMedia.CreateDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
                    objMedia.ThumbnailUrl = objMedia.UrlTo200x200ArResized || objMedia.ThumbnailUrl;
                    imagesList.Images.push(objMedia);
                }
            });

            imagesList.PageIndex = objResponse.PageIndex;
            imagesList.PageSize = objResponse.PageSize;

            imagesList.Images = imagesList.Images.reverse();

            var tplElement = '#' + (settings.templateElement || 'tplThumbnailList');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-thumbnail');
            window.cision.websolution.common.modelToHtml(imagesList, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve mediafeed thumbnails. ' + err.message) });
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
            mainTypes: 'Media'
        };

        var promiseMediafeedTags = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Mediafeed tags", 'path': 'Newsroom/' + accessKey + '/Tags', 'postData': postData });

        return Promise.resolve(promiseMediafeedTags).then(function (objResponse) {
            var tagList = [];

            $.each(objResponse.Tags, function (idx, objRelease) {
                tagList.push(objRelease);
            });

            objResponse.Tags = tagList;
            objResponse.numberOfTags = tagList.length;

            var tplElement = '#' + (settings.templateElement || 'tplTags');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-tags');
            window.cision.websolution.common.modelToHtml(objResponse, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve mediafeed tags. ' + err.message) });
    };

    return {
        renderListing: renderListing,
        render: renderListing,
        renderThumbnails: renderThumbnails,
        renderTags: renderTags
    };
}(jQuery);