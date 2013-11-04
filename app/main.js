require([ "jquery","backbone",'router/AppRouter' ], function( $, Backbone, AppRouter) {
  
  $(document).on('mobileinit', function(){
    console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
  });
  
    var router = new AppRouter();
    
//    $('#home').bind('pagebeforeshow', function(){
//      console.log('pagebeforeshow from main');
//      console.log(router.views);
//    });
    
    // Instantiates a new Backbone.js Mobile Router
    //this.router = new Mobile();
//    $(document).bind('pageinit', function(event){
//      console.log('pageinit called from main');
//      console.log(event);
////      console.log('pagehide');
////      console.log($(event.target).attr('id'));
////      var page = $(event.target).attr('id');
////      if(page in router.views){
////        console.log('cette page existe dans le router !');
////        router.views[page].onPageHide();
////      }
//    });
    
  require( [ "jquerymobile" ], function() {
    // Instantiates a new Backbone.js Mobile Router
//    this.router = new Mobile();
//    console.log('jquerymobile is instanciated');
//    $.mobile.changePage('template/home.html', { transition: "slideup", changeHash: false});
//    //console.log($.mobile.ajaxEnabled);
    Backbone.history.start();
   });

  } );
