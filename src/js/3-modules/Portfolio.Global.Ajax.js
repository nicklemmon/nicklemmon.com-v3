Portfolio.Global.Ajax = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$ajaxTrigger = $('.js-ajaxTrigger');
  },
  ajaxStuff: function( $thisElem ) {
    var targetVal = $thisElem.data('ajax-trigger');
    console.log(targetVal);

    $.ajax('ajax/' + targetVal + '.html', {
       success: function(data) {
          $("[data-ajax-target='" + targetVal + "']").html($(data));

          console.log('The content has been successfully loaded');
       },
       error: function() {
          console.log('An error occurred');
       }
    });
  },
  bindEvents: function() {
    this.$ajaxTrigger.on('click keypress', function(e) {
      e.preventDefault();

      console.log($(this));

      if ( e.which === 13 || e.type === 'click' ) {
        Portfolio.Global.Ajax.ajaxStuff( $(this) );
      }
    });
  }
}
