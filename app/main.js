require([ "jquery","backbone",'router/AppRouter' ], function( $, Backbone, AppRouter) {
  
  $(document).on('mobileinit', function(){
    console.log('mobileinit');
//    $.mobile.ajaxEnabled = false;
//    $.mobile.linkBindingEnabled = false;
//    $.mobile.hashListeningEnabled = false;
//    $.mobile.pushStateEnabled = false;
  });
  
    var test = new AppRouter();
    // Instantiates a new Backbone.js Mobile Router
    //this.router = new Mobile();
    
  require( [ "jquerymobile" ], function() {
    // Instantiates a new Backbone.js Mobile Router
    //this.router = new Mobile();
    console.log('jquerymobile is instanciated');
    $.mobile.changePage('template/home.html', { transition: "slideup", changeHash: false});
//    //console.log($.mobile.ajaxEnabled);
    Backbone.history.start();
   });

  } );
