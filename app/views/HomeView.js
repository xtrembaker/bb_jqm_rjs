define([ "jquery","backbone" ,'text!template/home.html'], function( $, Backbone, TmplHome) {
  var HomeView = Backbone.View.extend({
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
//      $.mobile.loading('show',{
//        text : 'coucou',
//        textVisible : true
//      });
//      this.$el.html(this.template);
//      $.mobile.loading('hide');
//      console.log('render home');
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
      
    }
  });
  
//  $('#home').bind('pageinit', function(){
//    console.log('home view pageinit');
//  });
  
  return HomeView;
});