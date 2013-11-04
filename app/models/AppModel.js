define(['jquery','backbone'], function($, Backbone){
  var AppModel = Backbone.Model.extend({
    initialize : function(){
      this.on('request', this.onRequestEvent());
      this.on('sync', this.onSyncEvent());
    },
    onRequestEvent : function(){
      console.log('onRequestEvent from model');
      this.loader(true);
    },
    onSyncEvent : function(){
      console.log('onSyncEvent from model');
      //this.loader(false);
    },
    loader : function(show){
      if(show === true){
        $.mobile.loading('show', {
          text: 'blabla',
          textVisible: true
        });
      }else{
        $.mobile.loading('hide');
      }
    }
  });
  
  return AppModel;
});