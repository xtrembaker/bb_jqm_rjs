define([ "jquery","backbone" ,'views/AppView','models/HomeModel','text!template/home.html'], function( $, Backbone,AppView,HomeModel, TmplHome) {
  //var AppView = new AppView();
  var HomeView = AppView.extend({
//    events : {
//      'pageinit #home' : 'test'
//      //'click .civiliz-thumbUp' : 'rateUp',
//      //'click .civiliz-thumbDown' : 'rateDown'
//    },
    homeModel : {},
    test: function(){
      alert('test');
    },
    el : '#home',
    template : _.template(TmplHome),
    pageBeforeShow : function(){
      this.homeModel = new HomeModel();
      //this.homeModel.loader.show();
      console.log('pageBeforeShow from HomeView');
      console.log(this);
      this.resetView();
      //this.beforeRender();
      
      this.homeModel.fetch({
        success : function(model, response, options){
          console.log(response);
          $('#resultHome').html(JSON.stringify(response));
        }
      });
//      $.when.apply(
//        $,
//        [homeModel.fetch({
//          success : function(model, response, options){
//            console.log(response);
//            $('#resultHome').html(JSON.stringify(response));
//          }
//        })]
//      ).done(function(){
//          console.log('deferred is done !');
//      });
      
//      for(var i=0;i<=1000000;i++){
//        console.log('yeah !');
//      }
//      $.mobile.loading('show',{
//        text : 'coucou',
//        textVisible : true
//      });
//      $.mobile.loading('hide');
      console.log('render home');
      //AppView.prototype.pageBeforeShow();
    },
    pageShow : function(){
      this.$el.html(this.template);
//      $.mobile.changePage('template/home.html', { transition: "slideup", changeHash: false});

//      var that = this;
//      setTimeout(function(){
//        $.mobile.loading('show', {
//            text: "COUCOU !!!"
//          });
//      }, 5000);
//      setTimeout(function(){
//        that.$el.html(that.template);
//        $.mobile.loading('hide');
//      }, 10000);
      //this.render();
    },
    resetView : function(){
      $('#resultHome').html();
    }
  });
  
//  $('#home').bind('pageinit', function(){
//    console.log('home view pageinit');
//  });
  
  return HomeView;
});