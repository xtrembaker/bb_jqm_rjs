require([ "jquery","backbone",'router/AppRouter' ], function( $, Backbone, AppRouter) {
  
  $(document).on('mobileinit', function(){
    console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
//    $.mobile.autoInitializePage = false;
  });
  
    var router = new AppRouter();
    console.log(router);
    
  require( [ "jquerymobile" ], function() {
    Backbone.history.start();
   });
});
