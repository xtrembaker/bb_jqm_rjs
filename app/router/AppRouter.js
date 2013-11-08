/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(['backbone','views/HomeView','views/Page1View','views/Page2View'], function(Backbone, HomeView, Page1View, Page2View){
  console.log('on launch !');
  //return {};
  var AppRouter = Backbone.Router.extend({
    views : [], // Store all views object
    initialize : function(options){
      var that = this;
      var home = $('#home');
      var page1 = $('#page1');
      var page2 = $('#page2');
      var elements = home.add(page1).add(page2);
////      this.routes = {
////        '' : 'init',
////        'page1' : 'page1',
////        'page2' : 'page2'
////      };
//      
//      // events here are bind in the order they are called by jQm
//      elements.on('pagebeforecreate', function(evt){
//        console.log('pagebeforecreate on '+$(evt.target).attr('id'));
//        var page = $(evt.target).attr('id');
//        if(!(page in that.views)){
//          switch(page){
//            case 'home':
//              //that.views['home'] = new HomeView();
//              //$.mobile.changePage('#home', { transition: "slideup", changeHash: false, showLoadMsg : false});
//              break;
//            case 'page1':
//              that.views['page1'] = new Page1View();
//              //$.mobile.changePage('#page1', { transition: "slideup", changeHash: false});
//              break;
//            case 'page2':
//              that.views['page2'] = new Page2View();
//              //$.mobile.changePage('#page2', { transition: "slideup", changeHash: false});
//              break;
//          }
//          
//        }
//        if((page in that.views)){
//          that.views[page].pageBeforeCreate();
//        }
//      });
//      
//      elements.on('pagecreate', function(evt){
//        console.log('pagecreate on '+$(evt.target).attr('id'));
//        var page = $(evt.target).attr('id');
//        // Instancier la vue 
//        if((page in that.views)){
//          that.views[page].pageCreate();
//        }
//      });
//      
//      console.log(elements);
//      $(elements).bind('pageinit', function(evt){
//        console.log('pageinit from router');
//        var page = $(evt.target).attr('id');
//        // Instancier la vue 
//        if(!(page in that.views)){
//          switch(page){
//            case 'home':
//              //$.mobile.changePage('#home', { transition: "slideup", changeHash: false, showLoadMsg : false});
//              break;
//            case 'page1':
//              //$.mobile.changePage('#page1', { transition: "slideup", changeHash: false});
//              break;
//            case 'page2':
//              //$.mobile.changePage('#page2', { transition: "slideup", changeHash: false});
//              break;
//          }
//          
//        }
//      });
//      
//     
//      // Render
//      elements.on('pagebeforeshow', function(evt){
//        var page = $(evt.target).attr('id');
//        if((page in that.views)){
//          that.views[page].pageBeforeShow();
//        }
//      });
//      elements.on('pageshow', function(evt){
//        //return false;
//        var page = $(evt.target).attr('id');
//        if((page in that.views)){
//          that.views[page].pageShow();
//        }
//      });
      elements.on('pagehide', function(evt){
        var page = $(evt.target).attr('id');
        if((page in that.views)){
          that.views[page].pageHide();
        }
      });
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
      this.views['home'] = new HomeView();
      this.views['home'].render();
    },
    page1 : function(){
      $.mobile.changePage('#page1', { transition: "slideup", changeHash: false});
      this.views['page1'] = new Page1View();
      this.views['page1'].render();
    },
    page2 : function(){
      $.mobile.changePage('#page2', { transition: "slideup", changeHash: false });
      this.views['page2'] = new Page2View();
      this.views['page2'].render();
    }
  });
  return AppRouter;
});

