document.addEventListener("DOMContentLoaded", function(event) {

  //== webP polyfill
  webpPolyfill.evaluate($('img'));

  //== modals/lightboxes
  if ( $('.js-modalOpen').length ) {
    Portfolio.Global.Modal.init();
  }

  //== rellax parallax plugin
  var rellax = new Rellax('.js-parallax', {speed: -1})

});
