define([ "jquery","backbone",'text!template/page2.html' ], function( $, Backbone, TmplPage2) {
  var Page2View = Backbone.View.extend({
    el : '#page2',
    template : _.template(TmplPage2),
    render: function(){
      console.log('page2 render');
      this.$el.html(this.template);
    }
  });
  
  $('#contact').bind('pageinit', function(){
    console.log('contact view pageinit');
  });
  
  return Page2View;
  
});