define(['jquery','backbone'], function($, Backbone){
  var AppModel = Backbone.Model.extend({
    //loader : false,
    initialize : function(params){
      console.log('params from appModel');
      //console.log(params);
      this.on('request', this.onRequestEvent());
      this.on('sync', this.onSyncEvent());
      this.on('error', function(){
        console.log('error !!!');
      });
    },
    onRequestEvent : function(){
      console.log('onRequestEvent from model');
      $(document).trigger('requeststart');
      //console.log(this.loader);
      //this.loader.show();
    },
    onSyncEvent : function(){
      console.log('onSyncEvent from model');
      $(document).trigger('syncdone');
//      this.loader.hide();
    }
//    loader : function(show){
//      if(show === true){
//        $.mobile.loading('show', {
//          text: 'blabla',
//          textVisible: true
//        });
//      }else{
//        $.mobile.loading('hide');
//      }
//    }
  });
  
  return AppModel;
});