![Cision logo](https://publish.ne.cision.com/content/images/cision_new_logo.png)


Websolutions
=====================

 We deliver release feeds, share graphs, subscription modules and other investor relations modules such as estimate, ownership and insider. Some of these web modules work together with Cisions main product Cision Point were costumers send out their releases to their recipients collected from our media database. 

 To see examples on all our modules and more information visit [our demosite](http://websolutions.ne.cision.com).
 
Installation
-------------------
This project requires to be installed with pnpm to be able to run out of the box since npm will flatten the project which destroys the folder structure.
To read more about how pnpm works go visit [their GitHub page](https://github.com/pnpm/pnpm). 
```javascript
npm i -g pnpm
pnpm i cision-websolutions
```

Run
-------------------
Make sure all dev dependencies are installed before running this. 
```javascript
npm run start
```

Build
-------------------
Make sure all dev dependencies are installed before running this. 
```javascript
npm run build-prod
```

General information
-------------------
 This is a Webpack version of the Cision Web Solutions modules and running this will create a cision bundle with all cision resources and dependencies. These modules are built using jQuery, they are modestly styled with Twitter's Bootstrap framework and JSRender is used as the template engine. To render graphs and charts we use Highstock. Highstock is required for the sharegraph, the Estimate history graph and the ownership pie charts. JQuery and Highcharts are loaded via CDN on the pages that require them to minimize the bundle size. This is done since they are big libraries that could already be included in a web application and it would in that case not make sense to load them again in the Cision bundle. Also we get to benefit from the CDN cache.

### Settings
 For all our modules we provide an accessKey or a unique identifier which is essential for the module to work. These examples are set up using Cisions example feeds and the identifiers will have to be changed. These are specified in the settings file together with all other module related settings. The settings file can be found in `src/js/settings.js`. These settings can be overridden for any given module and can be passed as an object in all init and render functions. For example, a few of the default settings in the smaller sharegraph in our package differ from those of the original sharegraph, so we want to override them.
```javascript
var options = {
    showVolume: false,
    typeOfChart: 'EndOfDay',
    isMiniShareGraph: true,
    accessKey: window.cision.websolution.settings.minisharegraph.accessKey
};
window.cision.websolution.sharegraph.init(options);
```

 ### Translations
 Translations for all the modules is found in  `src/js/texts.js`. We have full support for Swedish, English and Finnish. There is also limited support for Norwegian, German and Danish, but the translations are currently incomplete. Texts can be changed and new languages added by editing this file. The language code correlates to the uiLanguage setting.   


 ### Helpers
 Included in our websolutions bundle we have helpers for formatting date, time, numbers, and numbers with currency. Those helpers can be used in all jsrender scripts to directly format a spcific value. 
 
 Example of usage inside JSRender script tag with default formatting options stated in the settings file:
```javascript  
{{>~formatNumber(inputNumber)}}
```

 With override fomatting options passed as strings
```javascript
{{>~formatNumber(inputNumber, decimalPrecision, decimalSeparator, thousandSeparator)}}
```

 For date and time formatting, pass format string as second parameter
```javascript
{{>~formatTime(value, timeFormat)}}
{{>~formatDate(value, dateFormat)}} 
{{>~formatDateTime(value, dateTimeFormat)}}
```

This can also be used in javascript
```javascript
var formattedNumber = window.cision.websolution.formatHelpers.formatNumber(value, decimalPrecision, decimalSeparator, thousandSeparator)
```

 For more detailed information about the feeds we deliver, what they include and what filter options are available please read our technical white papers. They are found in the top right menu on [our demosite](http://websolutions.ne.cision.com). 

Web modules
-----------

### Release feeds
This feed is avaliable in JSON, XML and RSS and most customers implement this feed in their own way to make it fit seamlessly on their site. The most common way to use the feed is to collect the new data from Cision whenever the feed is updated. The feeds are updated every time a new relase is sent out or removed and there is a maximum delay of 2 minutes. As a faster alternative to polling the feed, we provide a **Notified Pull** solution where the server is notified of new content by an xml ping. This brings the delay time down to less than half a minute. 

### Media feeds
Very similar to our release feeds in regards to implemenation and examples, except for media files rather than press releases. The only difference apart from the type of content is an extra filter option on media type. This can be passed as a render option as MediaType: "Image" for example. For more examples on different filters that are available check out the technical white paper. 

### Subscription
Our subscription module does not have an example since it is a simple form that posts to the follopwing endpoint `https://publish.ne.cision.com/Subscription/SubscribeWithCaptcha`. It should be implemented with Googles reCAPTCHA for security purposes But if requested it can be used without it. 
Possible fields are language, phone number, e-mail, company among others. A complete list of the available fields and their format can be found in our technical white paper for the subscription at [our demosite](http://websolutions.ne.cision.com). There are some fields that are required for the submission to work such as:
```html
<input type="hidden" name="subscriptionUniqueIdentifier" value="[Identifier]"/> 
<input type="hidden" name="Replylanguage" value="[Replylanguage]"/>
```
subscriptionUniqueIdentifier is the identifier provided by Cision which is required to create subscriptions and is unique per subscription solution.
ReplyLanguage decides what language the emails are sent in, this does not need to match the language of the releasesa subscriber wants to subscribe to.

### Sharegraph
The sharegraph is built with highcharts JavaScript library Highstock and is easily customized with the help of our settings.js file where it is possible to set colors, shapes and more. A simple guide to what is easily changed via Cision settings is found in our 'redesign your sharegraph' presentation that is also found in the top right menu on [our demosite](http://websolutions.ne.cision.com). The most important thing to keep in mind when implementing this module is that the company shortname (ticker), market place and currency is correct for every main share, peer or index that is added to the settings.js file. Those must also be comunicated with Cision so that they are added to the feed. For the possibility to customize the sharegraph further anyone can download our sharegraph script separetly and, with the use of highcharts documentation and JSFiddle examples, create their own solution.

### Insider
Insider transactions are collected from Finansinspektionen (Swedish FSA) with the companys organisation number. The module is renderd into a simple table and is therefor easy to change driectly in the HTML file. 

### Estimate
This module collects all its data from SME.Direkt. For Annual, Querterly and Historical recommendations we simply render the data with some number and date formatting wrappers into simple Bootstrap styled tables. The Historical tab contains a linegraph rendered through highcharts with a few custimization options mostly regarding number formatting and currency prefix or sufix. The recommendations tab includes a simple table and a gradient status bar for recommendations on buying or selling that is based on pure html and css. 

### Ownership
This module displays different types of ownership data about the given company with Highcharts pie charts and Bootstraps tabs. All the charts are default Highcharts pie charts. Currently these pie charts are not customizable via settings. If they are to be customized it needs to be done by changing the Cision script for Ownership. The data is collected from Euroclear. 

### Share Calculator
The share calculator allows visitors to calculate the change in value over time of their share ownership. Selectable instruments are defined when setting up the module at Cision. The share price data is collected from Millistream.

### Calendar
In the Calendar module we display a list of upcoming or archived calendar events created in CisionPoint. It includeds the ability to filter on categories and display details about a given event.  

### Printed Material
Printed Material is a module where a client can create a list of print items that can be ordered via Cision that will be printed and delivered by mail. The list is created in CisionPoint and the module is the orderform.

Use of third party libraries 
----------------------------

 We host all the external scripts that are necessary for running this example code and have it compiled to one vendor script for easy access. These can all be provided separetly but needs to be rendered before our moduels are initialized. Please use the version stated below or higher if these scripts are loaded separate from our vendor script. 

### JQuery
By The JQuery Foundation, this is used in all JavaScript in these implementations of the Cision modules.

* **Version:** 3.3.1
* **License:** MIT 
* **Website:** [jquery.org](https://jquery.org/) 


### JQuery number plugin
JQuery plugin for number formatting created by Sam Sehnert.

* **Version:** 2.1.5
* **License:** MIT 
* **Website:** [teamdf.com](http://www.teamdf.com/web/jquery-number-format-redux/196/)


### JSRender
By Boris Moore, this is used to render the data collected from the JSON feeds.

* **Version:** 1.0.1
* **License:** MIT
* **Website:** [their website](http://www.jsviews.com/) 


### Moment JS
By Tim Wood, this is used to parse and format dates and times.

* **Version:** 2.24.0
* **License:** MIT
* **Website:** [momentjs.com](http://momentjs.com/)


### Highstock 
By Highsoft AS, this is used for all the charts in this application. 

* **Version:** 7.0.3
* **License:** To make changes to the charts, clients need their own [Highstock licence](https://shop.highsoft.com/highstock)
* **Website:** [api.highcharts.com/highstock](http://api.highcharts.com/highstock)


### Bootstrap 
By Twitter, Inc, this is used to make the layout and design smoother and the site responsive.

* **Version:** 4.2.1
* **License:** MIT
* **Website:** [getbootstrap.com](http://getbootstrap.com/)


### Bootstrap datepicker
Created by UX Solutions. To display date pickers with bootstrap styling.

* **Version:** 1.8.0
* **License:** Apache License v2.0
* **Website:** [bootstrap-datepicker.readthedocs.io](https://bootstrap-datepicker.readthedocs.io/en/latest/#)


### Font Awesome
Created by fortawesome. Used for displaying icons in some of our modules.

* **Version:** 5.7.1
* **Code license:** MIT
* **Fonts license:** SIL OFL 1.1
* **Icons license:** CC BY 4.0
* **Website:** [fontawesome.com](https://fontawesome.com/)
