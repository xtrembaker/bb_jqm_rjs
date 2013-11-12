/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define([ "jquery","backbone",'models/AppModel' ], function( $, Backbone, AppModel) {
  //var HomeModel = function(){};
  var HomeModel = AppModel.extend({
    url : 'http://api.civiliz.fr/1.0/fra/widgets/details/.json?slug=SpyCenter'
//    events : {
//      'request' : 'onRequestEvent',
//      'sync' : 'onSyncEvent'
//    },
    //initialize: function
  });
  
  return HomeModel;
});

