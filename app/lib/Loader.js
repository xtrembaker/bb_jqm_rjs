/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(){
  
  var Loader = function (params){
    this.defaultOptions = {
      
    };
    this.options = $.extend({},this.defaultOptions, params);
  };
  
  Loader.prototype = {
    count : 0,
    show : function(params){
      this.count++;
      params = $.extend({},this.options, params);
      $.mobile.loading('show', params);
    },
    hide : function(){
      this.count--;
      if(this.count <= 0){
        $.mobile.loading('hide');
      }
    }
  };
  return Loader;
});

