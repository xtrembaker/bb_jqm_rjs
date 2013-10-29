define([ "jquery","backbone" ], function( $, Backbone) {
  var ContactView = Backbone.View.extend({
    
  });
  
  $('#contact').bind('pageinit', function(){
    console.log('contact view pageinit');
  });
  
  return ContactView;
  
});