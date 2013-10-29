// Set the require.js configuration for your application.
require.config({
  baseUrl : '.',

  // Initialize the application with the main application file, which is relative
  // to baseUrl
  deps : ['main'],
  
  // paths is relative to baseUrl ...
  paths : {
    // Libraries.
    jquery : '../vendor/jquery/jquery',
    underscore : '../vendor/underscore/underscore',
    jquerymobile : '../vendor/jquerymobile/jquerymobile',
    backbone : '../vendor/backbone/backbone',
    mustache : '../vendor/mustache/mustache',
    text : '../vendor/js/requirejs/text/2.0.3/text'
  },

  shim : {
    // Backbone library depends on lodash and jQuery.
    backbone : {
      deps : [
        'underscore',
        'jquery'
      ],
      exports : 'Backbone'
    }
  }
});
