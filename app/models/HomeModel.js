/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define([ "jquery","backbone" ], function( $, Backbone) {
  //var HomeModel = function(){};
  var HomeModel = Backbone.Model.extend({
    initialize : function(){
      this.on('request', this.onRequestEvent());
      this.on('sync', this.onSyncEvent());
    },
    url : 'http://api.civiliz.fr/1.0/fra/widgets/details/.json?slug=studioBleu',
//    events : {
//      'request' : 'onRequestEvent',
//      'sync' : 'onSyncEvent'
//    },
    onRequestEvent : function(){
      console.log('onRequestEvent from model');
      this.loader(true);
    },
    onSyncEvent : function(){
      console.log('onSyncEvent from model');
      this.loader(true);
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
    },
  });
  
  return HomeModel;
});

