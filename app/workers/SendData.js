/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//self.addEventListener('message', function(e) {
  var interval = setInterval(function(){
    self.postMessage('coucou');
  }, 1000);
  
//}, false);
