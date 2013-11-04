define([ "jquery","backbone",'views/AppView','text!template/page2.html' ], function( $, Backbone, AppView,TmplPage2) {
  var Page2View = AppView.extend({
    el : '#page2',
    template : _.template(TmplPage2),
    render: function(){
      this.$el.html(this.template);
    }
  });
  
  $('#contact').bind('pageinit', function(){
    console.log('contact view pageinit');
  });
  
  return Page2View;
  
});