var injectedCode = 'function(){window._alert = alert; alert = function(msg){console.log(msg);}}';
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injectedCode +')();'));
(document.body || document.head || document.documentElement).appendChild(script);