define([ "jquery","backbone",'views/AppView','text!template/page1.html' ], function( $, Backbone,AppView, TmplPage1) {
  var Page1View = AppView.extend({
    el : '#page1',
    template : _.template(TmplPage1),
    pageinit : function(){
      console.log('cgu view pageinit from object');
    },
    render: function(){
      this.$el.html(this.template);
    }
  });
  
  return Page1View;
  
});