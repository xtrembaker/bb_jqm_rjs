define([ "jquery","backbone",'text!template/page1.html' ], function( $, Backbone, TmplPage1) {
  var Page1View = Backbone.View.extend({
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