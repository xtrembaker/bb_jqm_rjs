define([ "jquery","backbone" ], function( $, Backbone) {
  var HomeView = Backbone.View.extend({
    events : {
      'pageinit #home' : 'test'
      //'click .civiliz-thumbUp' : 'rateUp',
      //'click .civiliz-thumbDown' : 'rateDown'
    },
    test: function(){
      alert('test');
    }
  });
  
  $('#home').bind('pageinit', function(){
    console.log('home view pageinit');
  });
  
  return HomeView;
});