define(['jquery','backbone','lib/Loader'], function($, Backbone, Loader){
    var AppView = Backbone.View.extend({
    loader: false,
    initialize : function(){
      var that = this;
      this.loader = new Loader({text: 'Chargement', textVisible: true});
      $(document).bind('requeststart', function(){
        console.log('requestart was called');
        that.loader.show();
      });
      $(document).bind('syncdone', function(){
        console.log('syncdone was called');
        that.loader.hide();
      });
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
    pageCreate : function(){
      console.log('pagecreate');
    },
    pageBeforeShow : function(){
      console.log('pageBeforeShow from AppView');
      //this.render();
    },
    render : function(){
      console.log('render from AppView');
      this.pageBeforeShow();
      this.pageShow();
    },
    pageBeforeHide: function(){
      console.log('pageBeforeHide from AppView');
    },
    pageHide : function(){
      console.log('pageHide from AppView');
//      console.log(this.$el.attr('id'));
      this.$el.html('');
    }
//    pageBeforeRender : function(){
//      console.log('pageBeforeRender from AppView');
//    },
//    render : function(){
//      console.log('render from AppView');
//    },
//    pageAfterRender : function(){
//      console.log('pageAfterRender from AppView');
//    }
  });
  return AppView;
});