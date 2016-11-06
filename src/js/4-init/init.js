document.addEventListener("DOMContentLoaded", function(event) {

  webpPolyfill.evaluate($('img'));

  if ( $('.js-modalOpen').length ) {
    Portfolio.Global.Modal.init();
  }

});
