// This JavaScript file is created by Cision for our ownership module.
// Built to be used in combination with ownership.html

import './module.dependencies.js';

window.cision.websolution.ownership = function ($) {
    var settings = $.extend({}, window.cision.websolution.settings.general),
        accessKey = window.cision.websolution.settings.ownership.accessKey,
        texts = window.cision.websolution.texts[settings.uiLanguage];

    var renderLargestShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership Largest shareholders", 'path': 'Ownership/' + accessKey });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.TotalAmount = rawData.ShareHolders.length;
            rawData.DateFormatted = moment(rawData.Date).format(settings.dateFormatOptions.dateFormat);
            rawData.AmountInList = settings.LargestListShowCount;

            renderLargestShareholdersChart(rawData);

            var tplElement = '#' + (settings.templateElement || 'tplLargestShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-largestshareholders');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for largest shareholders. ' + err.message) });
    };

    var renderOwnershipTab = function(name) {
        //prevent tab rendering if it is already rendered
        if (settings.ownershipTabLoaded[name] != null) {
            return;
        }

        switch (name) {
            case "#target-largest": if (true) {
                renderLargestShareholders();
            }
            else { }
                break;
            case "#target-sharesizegroups": if (true) {
                renderShareSizeGroups();
            }
            else { }
                break;
            case "#target-area": if (true) {
                renderShareHolderAreas();
            }
            else { }
                break;
            case "#target-grouped": if (true) {
                renderLargestGroupedShareholders();
            }
            else { }
                break;
            default:
        }

        //save value that tab has been rendered
        settings.ownershipTabLoaded[name] = true;
    }

    function getChartOptions(rawData, dataArray) {
        return { // make into setting
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                text: 'Source Cision/Euroclear'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: rawData.Name,
                data: dataArray
            }]
        };
    }

    var renderLargestShareholdersChart = function (rawData) {
        // Build Data Series
        var dataArray = [],
            othersPercent = 100;
        $.each(rawData.ShareHolders, function (ix, objShareHolder) {
            if (objShareHolder.Number <= settings.LargestPieShowCount) {
                othersPercent -= objShareHolder.OwnershipPercent;

                dataArray.push({
                    name: objShareHolder.Name,
                    y: objShareHolder.OwnershipPercent
                });
            }
        });

        if (othersPercent > 0) {
            dataArray.push({
                name: 'Others',
                y: othersPercent,
                sliced: true
            });
        }
        var chartOptions = getChartOptions(rawData, dataArray);
        Highcharts.chart('container-largest-shareholders-chart', chartOptions);
    };

    var renderNewShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership new shareholders", 'path': 'Ownership/' + accessKey + '/NewShareHolders' });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            var tplElement = '#' + (settings.templateElement || 'tplNewShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-newshareholders');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for new shareholders. ' + err.message) });
    };

    var renderShareSizeGroups = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership size groups", 'path': 'Ownership/' + accessKey + '/ShareSizeGroups'});

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            var tplElement = '#' + (settings.templateElement || 'tplShareSizeGroupsListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-sharesizegroups');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for share size groups. ' + err.message) });
    };

    var renderShareHolderAreas = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership shareholder areas", 'path': 'Ownership/' + accessKey + '/ShareHolderAreas' });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            // Trying to reorder Areas so that they are translatable
            // The available areas are: Sweden, USA, Nordic, Europe, World
            var reorderedAreas = [];
            settings.ownershipAreasNames = settings.ownershipAreasNames || {};
            var textsAreaNames = texts.TextOwnershipAreaNames || {};
    
            var objAreaSweden = rawData.Areas.filter(function (el) { 
                return el.AreaName == 'SVERIGEBOENDE' 
            });
            if (objAreaSweden) {
                objAreaSweden.AreaName = textsAreaNames.Sweden || objAreaSweden.AreaName;
                reorderedAreas.push(objAreaSweden[0]);
            }

            var objAreaUsa = rawData.Areas.filter(function (el) { 
                return el.AreaName == 'USA' 
            });
            if (objAreaUsa) {
                objAreaUsa.AreaName = textsAreaNames.Usa || objAreaUsa.AreaName;
                reorderedAreas.push(objAreaUsa[0]);
            }

            var objAreaNordic = rawData.Areas.filter(function (el) { 
                return el.AreaName == 'ÖVRIGA NORDEN' 
            });
            if (objAreaNordic) {
                objAreaNordic.AreaName = textsAreaNames.Nordic || objAreaNordic.AreaName;
                reorderedAreas.push(objAreaNordic[0]);
            }

            var objAreaEurope = rawData.Areas.filter(function (el) { 
                return el.AreaName == 'ÖVRIGA EUROPA (EXKL SVERIGE OCH NORDEN)' 
            });
            if (objAreaEurope) {
                objAreaEurope.AreaName = textsAreaNames.Europe || 'ÖVRIGA EUROPA' /* objAreaEurope.AreaName */;
                reorderedAreas.push(objAreaEurope[0]);
            }

            var objAreaWorld = rawData.Areas.filter(function (el) { 
                return el.AreaName == 'ÖVRIGA VÄRLDEN' 
            });
            if (objAreaWorld) {
                objAreaWorld.AreaName = textsAreaNames.World || objAreaWorld.AreaName;
                reorderedAreas.push(objAreaWorld[0]);
            }

            var objAreaTotal = rawData.Areas.filter(function (el) { 
                return el.OwnershipPercent == 100
            });
            if (objAreaTotal) {
                objAreaTotal.AreaName = textsAreaNames.Total || objAreaTotal.AreaName;
            }

            rawData.Areas = reorderedAreas;
            rawData.Total = objAreaTotal[0];

            rawData.DateFormatted = moment(rawData.Date).format('ll');

            renderShareHolderAreasChart(rawData);

            var tplElement = '#' + (settings.templateElement || 'tplShareShareHolderAreasListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-shareholderareas');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for shareholder areas. ' + err.message) });
     
    };

    var renderShareHolderAreasChart = function (rawData) {
        // Build Data Series
        var dataArray = [];

        $.each(rawData.Areas, function (ix, objArea) {
            if (objArea.OwnershipPercent < 100) {
                dataArray.push({
                    name: objArea.AreaName,
                    y: objArea.OwnershipPercent
                });
            }
        });
        var chartOptions = getChartOptions(rawData, dataArray);
        Highcharts.chart('target-shareholderareas-chart', chartOptions);
    };

    var renderLargestGroupedShareholders = function (options) {
        if (options) {
            $.extend(settings, options);
        }
        if (!accessKey) {
            console.log("You must provide your ownership access key.");
            return;
        }

        var promiseOwnership = window.cision.websolution.common.getModuleData({ 'accessKey': accessKey, 'module': "Ownership largest grouped shareholders", 'path': 'Ownership/' + accessKey + '/LargestGroupedShareHolders' });

        return Promise.resolve(promiseOwnership).then(function (rawData) {
            rawData.TotalAmount = rawData.ShareHolders.length;
            rawData.DateFormatted = moment(rawData.Date).format('ll');

            rawData.AmountInList = settings.LargestListShowCount;
            renderLargestGroupedShareholdersChart(rawData);

            var tplElement = '#' + (settings.templateElement || 'tplLargestShareholdersListing');
            var tplTarget = '#' + (settings.outputTargetElement || 'target-largestgroupedshareholders');
            window.cision.websolution.common.modelToHtml(rawData, tplElement, tplTarget);

        }).catch(function (err) { console.log('Could not retrieve ownership data for largest grouped shareholders. ' + err.message) });
    };

    var renderLargestGroupedShareholdersChart = function (rawData) {
        // Build Data Series
        var dataArray = [],
            othersPercent = 100;
        //        options.LargestPieShowCount = 10;
        $.each(rawData.ShareHolders, function (ix, objShareHolder) {
            if (objShareHolder.Number <= settings.LargestPieShowCount) {
                othersPercent -= objShareHolder.OwnershipPercent;

                dataArray.push({
                    name: objShareHolder.Name,
                    y: objShareHolder.OwnershipPercent
                });
            }
        });

        if (othersPercent > 0) {
            dataArray.push({
                name: 'Others',
                y: othersPercent,
                sliced: true
            });
        }

        var chartOptions = getChartOptions(rawData, dataArray);
        Highcharts.chart('container-largest-grouped-shareholders-chart', chartOptions);
    };

    return {
        renderLargestShareholders: renderLargestShareholders,
        renderNewShareholders: renderNewShareholders,
        renderShareSizeGroups: renderShareSizeGroups,
        renderShareHolderAreas: renderShareHolderAreas,
        renderShareHolderAreasChart: renderShareHolderAreasChart,
        renderLargestGroupedShareholders: renderLargestGroupedShareholders,
        renderOwnershipTab: renderOwnershipTab
    };

}(jQuery);