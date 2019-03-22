// This JavaScript file is created by Cision for our estimate module.
// Built to be used in combination with estimateannual.html

import './module.dependencies.js';

window.cision.websolution.estimate = cision.websolution.estimate || {};

window.cision.websolution.estimate.common = function ($) {
    var settings = window.cision.websolution.settings.general;

    function renderEstimateTab(name) {
        //prevent tab rendering if it is already rendered
        if (settings.estimateTabLoaded[name] != null) {
            return;
        }

        switch (name) {
            case "#target-estimate-annual": if (true) {
                window.cision.websolution.estimate.annual.render({
                    periodStart: (moment().year() - 2).toString(),
                    periodEnd: moment().year() + 1
                });
            }
                break;
            case "#target-estimate-quarterly": if (true) {
                window.cision.websolution.estimate.quarterly.render({
                    periodStart: (moment().year() - 1).toString() + '-Q1',
                    periodEnd: (moment().year() + 1) + '-Q1'// '2014-Q4'
                });
            }
                break;
            case "#target-estimate-historical": if (true) {
                window.cision.websolution.estimate.historical.render({
                    chartTitle: 'SALES, MSEK',
                    valuePrefix: '',
                    valueSuffix: ' MSEK',
                    dateFormatTooltip: "Do MMMM YYYY",
                    numberFormatOptions: {
                        decimalPrecision: 0
                    }
                });
            }
                break;
            case "#target-estimate-recommendations": if (true) {
                window.cision.websolution.estimate.recommendations.renderTicker({
                    dateFormat: settings.dateFormatOptions.dateFormat
                });
                window.cision.websolution.estimate.recommendations.renderCurrent({
                    dateFormat: settings.dateFormatOptions.dateFormat
                });
            }
                break;
            case "#target-estimate-historic-recommendations": if (true) {
                window.cision.websolution.estimate.recommendations.renderHistory({
                    startDate: moment().subtract(6, 'months').format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                });
            }
                break;
            default:
        }

        //save value that tab has been rendered
        settings.estimateTabLoaded[name] = true;
    }

    return {
        renderEstimateTab: renderEstimateTab
    };
}(jQuery);