define([ "jquery","backbone" ,'views/AppView','models/HomeModel','text!template/home.html'], function( $, Backbone,AppView,HomeModel, TmplHome) {
  //var AppView = new AppView();
  var HomeView = AppView.extend({
//    events : {
//      'pageinit #home' : 'test'
//      //'click .civiliz-thumbUp' : 'rateUp',
//      //'click .civiliz-thumbDown' : 'rateDown'
//    },
    test: function(){
      alert('test');
    },
    el : '#home',
    template : _.template(TmplHome),
    render : function(){
      this.resetView();
      //this.beforeRender();
      var homeModel = new HomeModel();
      console.log('HomeModel');
      console.log(homeModel);
      homeModel.fetch({
        success : function(model, response, options){
          console.log(response);
          $('#resultHome').html(JSON.stringify(response));
        }
      });
//      for(var i=0;i<=1000000;i++){
//        console.log('yeah !');
//      }
//      $.mobile.loading('show',{
//        text : 'coucou',
//        textVisible : true
//      });
      this.$el.html(this.template);
//      $.mobile.loading('hide');
      console.log('render home');
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