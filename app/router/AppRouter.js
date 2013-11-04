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
      console.log(elements);
      $(elements).bind('pageinit', function(evt){
        console.log('home pageinit from router');
        var page = $(evt.target).attr('id');
        // Instancier la vue 
        if(!(page in that.views)){
          switch(page){
            case 'home':
              that.views['home'] = new HomeView();
              break;
            case 'page1':
              that.views['page1'] = new Page1View();
              break;
            case 'page2':
              that.views['page2'] = new Page2View();
              break;
          }
          
        }
      });
      
      //console.log('init appview');
      elements.on('pagebeforecreate', function(evt){
        //console.log('pagebeforecreate on '+that.$el.attr('id'));
        var page = $(evt.target).attr('id');
        // Instancier la vue 
        if((page in that.views)){
          that.views[page].pageBeforeCreate();
        }
      });
      // Render
      elements.on('pagebeforeshow', function(evt){
        var page = $(evt.target).attr('id');
        if((page in that.views)){
          that.views[page].pageBeforeShow();
        }
      });
      elements.on('pageshow', function(evt){
        //return false;
        var page = $(evt.target).attr('id');
        if((page in that.views)){
          that.views[page].pageShow();
        }
      });
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
    },
    
    page1 : function(){
      $.mobile.changePage('#page1', { transition: "slideup", changeHash: false});
    },
    page2 : function(){
      $.mobile.changePage('#page2', { transition: "slideup", changeHash: false});
    }
  });
  return AppRouter;
});

