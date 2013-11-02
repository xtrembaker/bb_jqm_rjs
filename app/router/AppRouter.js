/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(['backbone','views/HomeView','views/Page1View','views/Page2View'], function(Backbone, HomeView, Page1View, Page2View){
  console.log('on launch !');
  //return {};
  var AppRouter = Backbone.Router.extend({
    initialize : function(options){
//      $('#home').bind('pageinit', function(){
//        console.log('home pageinit from router');
//      });
//      $('#home').bind('pageshow', function(){
//        console.log('home pageshow from router');
//      });
//      $('#home').bind('pagecreate', function(){
//        console.log('home pagecreate from router');
//      });
    },
    events : {
      'route:[name]' : 'test',
      'request' : 'onRequestEvent',
      'sync' : 'onSyncEvent'
    },
    test : function(params){
      alert('test');
    },
    routes : {
      '' : 'home',
      'page1' : 'page1',
      'page2' : 'page2'
    },
    home : function(){
      $.mobile.changePage('#home', { transition: "slideup", changeHash: false});
      this.loader(true);
      this.homeView = new HomeView();
      this.homeView.render();
      this.loader(false);
    },
    
    page1 : function(){
      this.loader(true);
      console.log('page1 route !');
      var page1View = new Page1View();
      $.mobile.changePage('#page1', { transition: "slideup", changeHash: false});
      page1View.render();
      this.loader(false);
    },
    page2 : function(){
      this.loader(true);
      console.log('page2 route !');
      var page2View = new Page2View();
      $.mobile.changePage('#page2', { transition: "slideup", changeHash: false});
      page2View.render();
      this.loader(false);
    },
    loader : function(show){
      if(show === true){
        $.mobile.loading('show', {
          text: 'blabla',
          textVisible: true
        });
      }else{
        $.mobile.loading('hide');
      }
    },
    onRequestEvent : function(){
      console.log('onRequestEvent');
      this.loader(true);
    },
    onSyncEvent : function(){
      console.log('onSyncEvent');
      this.loader(true);
    }
  });
  return AppRouter;
});

