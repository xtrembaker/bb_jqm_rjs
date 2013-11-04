define(['jquery','backbone'], function($, Backbone){
  var AppView = Backbone.View.extend({
    initialize : function(){
      var that = this;
//      console.log('init appview');
//      this.$el.on('pagebeforecreate', function(){
//        console.log('pagebeforecreate on '+that.$el.attr('id'));
//      });
//      // Render
//      this.$el.on('pagebeforeshow', this.pageBeforeShow());
//      this.$el.on('pageshow', function(){
//        console.log('pageshow on '+that.$el.attr('id'));
//      });
//      this.$el.on('pagehide', function(evt){
//        console.log('pagehide');
//        console.log(evt);
//        //this.pageHide(evt);
//      });
    },
    pageBeforeCreate : function(){
      console.log('pageBeforeCreate');
    },
    pageBeforeShow : function(){
      console.log('pageBeforeShow');
      this.render();
    },
    pageShow : function(){
      console.log('pageShow');
    },
    pageHide : function(){
      console.log('pageHide');
      console.log(this.$el.attr('id'));
      this.$el.html('');
    }
  });
  return AppView;
});