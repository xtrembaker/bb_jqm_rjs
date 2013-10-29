define([ "jquery","backbone" ], function( $, Backbone) {
  var CguView = Backbone.View.extend({
    pageinit : function(){
      console.log('cgu view pageinit from object');
    }
  });
  
  $('#cgu').bind('pageinit', function(){
    CguView.pageinit();
  });
  
  return CguView;
  
});