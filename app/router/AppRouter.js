/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(['backbone','views/HomeView','views/CguView','views/ContactView'], function(Backbone, HomeView, CguView, ContactView){
  console.log('on launch !');
  //return {};
  var AppRouter = Backbone.Router.extend({
    initialize : function(options){
//      $('#home').bind('pageinit', function(){
//        console.log('home paginit from router');
//      });
    },
    events : {
      'route:[name]' : 'test'
    },
    test : function(params){
      alert('test');
    },
    routes : {
      '' : 'home',
      'contact' : 'contact'
    },
    home : function(){
      console.log('home route !');
//      this.homeView = new HomeView();
//      this.homeView.render();
      //$.mobile.changePage('template/home.html', { transition: "slideup", changeHash: false});
    },
    contact : function(){
      console.log('contact route !');
      $.mobile.changePage('#contact', { transition: "slideup", changeHash: false});
      var contactView = new ContactView();
      //$.mobile.changePage('#contact');
    }
  });
  return AppRouter;
});

