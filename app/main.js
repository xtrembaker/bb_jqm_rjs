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
    
    //w = new Worker("workers/SendData.js");
    //while(true){
      //var timeout = setTimeout(function(){
//        var Pi=0, n=1, c=100000;
//        for (var i=0;i<=c;i++) {
//          Pi=Pi+(4/n)-(4/(n+2));
//          n=n+4;
//        }
      //},0);
    //}
    
//    var testLoop = function(){
//      
//    }
//      var interval = setInterval(function(){
//        var start = new Date();
//        console.log(start.getTime() / 1000);
//        var Pi=0, n=1, c=1000000000;
//        for (var i=0;i<=c;i++) {
//          Pi=Pi+(4/n)-(4/(n+2));
//          n=n+4;
//        }
//        var end = new Date();
//        console.log(end.getTime() / 1000);
//      }, 15);
    

//      console.log('internval')
////      var date = new Date();
////      $('#home').append('<p>'+'coucou '+date.getTime()+'</p>');
//
////      console.log('end');
//        
//    }, 000);
//    w.onmessage = function(event){
//      var date = new Date();
//      $('#home').append('<p>'+event.data+' '+date.getTime()+'</p>');
//    };
//    w.postMessage('trigger !');



    var workerCreateDb = JSON.stringify({
      method : 'createDb',
      data : {
        shortName : 'civiliz',
        version : 2.0,
        displayName : 'CivilizDatabase',
        maxSize : 65536
      },
      trSuccess : function(){
        return true;
      },
      trError : function(){
        return false;
      }
    });
    
    //console.log(workerCreateDb);
    
    var dbWorker = new Worker("workers/DatabaseWorker.js");
    dbWorker.onmessage = function(event){
      console.log('creation de la db depuis le worker '+event.data);
    }
    dbWorker.postMessage(workerCreateDb);
    
    var insert = JSON.stringify({
       method : 'insertTable',
       data : {
         
       },
       trSuccess : function(){
        return true;
      },
      trError : function(){
        return false;
      }
    });
    
    dbWorker.postMessage(insert);
    
    //openDatabase('mytestdb', '1.0', 'my first database', 2 * 1024 * 1024);
    
    
//    app.db.connect({
//        trSuccess : syncProcess,
//        trError : function() {
//          alert('db creation failed');
//        }
//      });
      
      
      
//    function syncProcess() {
//      console.log('sync process');
//      errorDuringSync = false;
//      lib.loadingNotifier.show();
//      if (isFirstSync) {
//        //we can change page, we are sure that the DB has been created
//        lib.navigation.goTo('homeScreen');
//        // clean old data in tables places, timeline, published_ratings and
//        // cirteria (other than ratings)
//        app.placeMdl.emptyTable({
//          sqlSuccess : placeCb.emptyTableSuccess
//        });
//        app.criteriaMdl.emptyTable({
//          sqlSuccess : criteriaCb.emptyTableSuccess
//        });
//        app.ratingTimelineMdl.emptyTable({
//          sqlSuccess : ratingTimelineCb.emptyTableSuccess
//        });
//        // if debug clean saved ratings
//        if (app.debug) {
//          app.ratingMdl.emptyTable({});
//        }
//      }
//    }
    
//    app.dbShortName = 'civiliz';
//    app.dbVersion = 2.0;
//    app.dbDisplayName = 'CivilizDatabase';
//    app.dbMaxSize = 65536;
//    app.dbSchema = new SchemaSQL();
//
//    app.db = new Database(app.dbShortName,
//          app.dbVersion,
//          app.dbDisplayName,
//          app.dbMaxSize,
//          app.dbSchema,
//          app.debug
//        );
    
  require( [ "jquerymobile" ], function() {
    Backbone.history.start();
   });
});
