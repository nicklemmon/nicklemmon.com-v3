// Evaluate all <img> tags for the webp polyfill
// See https://github.com/FallingSnow/webp-polyfill


document.addEventListener("DOMContentLoaded", function(event) {

  webpPolyfill.evaluate($('img'));

  if ( $('js-modalOpen').length ) {
    Portfolio.Global.Modal.init();
  }

});
