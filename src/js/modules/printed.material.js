// This JavaScript file is created by Cision for our printed material module.
// Built to be used in combination with printedMaterial.html

import './module.dependencies.js';

window.cision.websolution.printedMaterial = function ($) {

    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = (window.cision.websolution.settings.printedMaterial || {}).accessKey,
        texts = window.cision.websolution.texts[settings.uiLanguage],
        itemsList = [],
        categories = [],
        firstRunList = true,
        firstRunArchiveList = true;

    var formatPrintedItem = function (objItem) {
        objItem.PrintTimeFormatted = moment(objItem.PrintTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
        objItem.PrintTimeFormattedDate = moment(objItem.PrintTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);
        objItem.PrintTimeFormattedTime = moment(objItem.PrintTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.timeFormat);
        objItem.PublishTimeFormatted = moment(objItem.PublishTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);
        objItem.ArchiveTimeFormatted = moment(objItem.ArchiveTime).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateTimeFormat);

        objItem.MaxOrder = settings.maxAmountOfItems;

        if (objItem.LogoUrl > 0) {
            objItem.HasImage = true;
        } else {
            objItem.HasImage = false;
        }

        return objItem;
    };

    var getPostData = function () {
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!accessKey) {
            console.log("You must provide your printed material access key.");
            return;
        }

        return {
            languageCode: settings.uiLanguage,
            pageIndex: settings.PageIndex,
            pageSize: settings.PageSize || 50,
            startDate: settings.startDate,
            endDate: settings.endDate,
            category: settings.printedMaterialCategory
        };
    };

    var renderItemList = function (options) {
        if (options) {
            $.extend(settings, options);
        }

        var postData = getPostData();

        if (postData != null) {
            var promisePrintedMaterial = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Printed material", 'path': 'PrintedMaterial/' + accessKey, 'postData': postData });

            return Promise.resolve(promisePrintedMaterial).then(function (rawData) {
                $.each(rawData.Items, function (idx, objItem) {
                    objItem = formatPrintedItem(objItem);

                    if (firstRunList && objItem.CategoryName) {
                        categories.push(objItem.CategoryName);
                    }
                });

                var uniqueCategories = [];
                $.each(categories, function(i, el){
                    if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
                });

                if (firstRunList) {
                    texts.Categories = uniqueCategories;
                    var tplCategoryElement = '#' + (settings.categoriesTemplateElement || 'tplCategories');
                    var tplCategoryTarget = '#' + (settings.categoriesOutputTargetElement || 'target-categories');
                    window.cision.websolution.common.modelToHtml({}, tplCategoryElement, tplCategoryTarget);
                }

                var tplElement = '#' + (settings.templateElement || 'tplPrintedMaterialItemListing');
                var tplTarget = '#' + (settings.outputTargetElement || 'itemListTarget');
                window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

                firstRunList = false;

            }).catch(function (err) { console.log('Could not retrieve printed material data. ' + err.message) });
        }
    };

    var renderArchiveList = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        var postData = getPostData();

        if (postData != null) {
            var promisePrintedMaterial = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Printed material", 'path': 'PrintedMaterial/' + accessKey + '/Archive', 'postData': postData });

            return Promise.resolve(promisePrintedMaterial).then(function (rawData) {
                $.each(rawData.Items, function (idx, objItem) {
                    objItem = formatPrintedItem(objItem);

                    if (firstRunArchiveList && objItem.Categories) {
                        $.each(objItem.Categories, function (idx2, objCategory) {
                            categories.push(objCategory);
                        });
                    }
                    itemsList[objItem.ItemGuid] = objItem;
                });

                var uniqueCategories = [];
                $.each(categories, function(i, el){
                    if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
                });

                if (firstRunArchiveList) {
                    texts.Categories = uniqueCategories;
                    var tplCategoryElement = '#' + (settings.categoriesTemplateElement || 'tplCategories');
                    var tplCategoryTarget = '#' + (settings.categoriesOutputTargetElement || 'target-categories');
                    window.cision.websolution.common.modelToHtml({}, tplCategoryElement, tplCategoryTarget);
                }

                var tplElement = '#' + (settings.templateElement || 'tplPrintedMaterialArchiveListing');
                var tplTarget = '#' + (settings.outputTargetElement || 'archiveItemListTarget');
                window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

                firstRunArchiveList = false;

            }).catch(function (err) { console.log('Could not retrieve printed material data. ' + err.message) });
        }
    };

    var getItemByGuid = function (options) {
        var itemGuid = options.itemGuid;
        if (options) {
            $.extend(settings, options);
        }
        if (settings.accessKey) {
            accessKey = settings.accessKey;
        }
        if (!itemGuid) {
            console.log("You must provide an item guid.");
            return;
        }

        var promiseCalendarEvent = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Printed material", 'path': 'PrintedMaterial/' + accessKey + '/ItemDetail?itemguid=' + itemGuid });
        return Promise.resolve(promiseCalendarEvent).then(function (objEvent) {
            objResponse.PrintDateFormatted = moment(objResponse.PrintDate).locale(settings.uiLanguage).format(settings.dateFormatOptions.dateFormat);

            var tplElement = '#' + (settings.templateElement || 'tplItemDetail');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-item-detail');
            window.cision.websolution.common.modelToHtml(objEvent, tplElement, tplTarget);

        }).catch(function (err) { console.log(err.message) });
    };

    function appendLang() {
        $('.lang').each(function (idx) {
            var langugeCode = $(this).attr('data-id');
            if (texts.Languages.hasOwnProperty(langugeCode)) {
                $('#' + idx).append('<p>' + texts.Languages[langugeCode] + '</p>');
            }
        });
    }

    var retrievePrintedMaterials = function(pageIndex, pageSize, category) {
        var printedMaterialPromise = renderItemList({
            PageIndex: pageIndex,
            PageSize: pageSize,
            printedMaterialCategory: category || '',
            dateFormat: 'DD MMM',
            timeFormat: 'HH:mm',
            endDate: moment().add(5, 'years').format('YYYY-MM-DD')
        });
        printedMaterialPromise.then(function () {
            appendLang();

            $(".categories button").off().on("click", function () {
                $(".categories button").removeClass("active");
                $(this).addClass("active");
                retrievePrintedMaterials(settings.pageIndex, settings.pageSize, $(this).data("category"));
            });

            $("#btnOrder").click(function (evt) {
                var name = $('#name').val(),
                    company = $('#company').val(),
                    address = $('#address').val(),
                    code = $('#code').val(),
                    city = $('#city').val(),
                    country = $('#country').val();

                if (!name || !company || !address || !code || !city || !country) {
                    $('#frmOrder input').css('border', '1px solid #CCC').css('box-shadow', 'none');
                    if (name.length == 0) {
                        $('#name').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }
                    if (company.length == 0) {
                        $('#company').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }
                    if (address.length == 0) {
                        $('#address').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }
                    if (code.length == 0) {
                        $('#code').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }
                    if (city.length == 0) {
                        $('#city').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }
                    if (country.length == 0) {
                        $('#country').css('border', '1px solid #ce0202').css('box-shadow', '0 0 9px -3px #ce0202');
                    }

                } else {
                    var data = {
                        "Name": name,
                        "CompanyName": company,
                        "Address": address,
                        "PostCode": code,
                        "City": city,
                        "CountryCode": country,
                        "Items": []
                    };

                    $.each($('.validate'), function (idx) {
                        var quantityValue = $('#quantity-' + idx).val();
                        var guidValue = $('#guid-' + idx).val();

                        if (quantityValue.length > 0) {
                            data.Items.push({ ItemGuid: guidValue, Quantity: quantityValue });
                        }
                    });

                    $.post(window.cision.websolution.common.generateUrl('PrintedMaterial/' + accessKey + '/Order'), data)
                        .done(function (response) {
                            var order = response.Order,
                                html = '';

                            $('#printedMaterialModal').modal('show');
                            $('<h4>' + texts.TextPrintOrderSuccessHeader + '</h4>').appendTo('#responseTarget');
                            $.each(order.Items, function (idx) {
                                html += '<p>' + order.Items[idx].Quantity + 'x ' + $("[data-guid='" + order.Items[idx].ItemGuid + "']").text() + '</p>';
                            });
                            $('<p>' + texts.TextPrintOrderSuccess + '</p>' + html).appendTo('#responseTarget');

                        })
                        .fail(function () {
                            $('#printedMaterialModal').modal('show');
                            $('<h4>' + texts.TextPrintOrderFailHeader + '</h4>').appendTo('#responseTarget');
                            $('<p>' + texts.TextPrintOrderFail + '</p>').appendTo('#responseTarget');
                        });
                }

            });
        });
    }
    
    return {
        retrievePrintedMaterials: retrievePrintedMaterials,
        getItemByGuid: getItemByGuid,
        renderItemList: renderItemList,
        renderArchiveList: renderArchiveList
    };

}(jQuery);