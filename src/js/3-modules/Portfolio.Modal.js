Portfolio.Modal = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },

  cacheDom: function() {
    this.$body = $( 'body' );
    this.$modal = $( '.js-modal' );
    this.$overlay = $( '.js-modalOverlay' );
    this.$openTrigger = $( '.js-modalOpen' );
    this.$closeTrigger = $( '.js-modalClose' );
  },

  pressIn: function( $thisElem ) {
    $thisElem
      .removeClass('is-inactive')
      .addClass('is-active');
  },

  pressOut: function() {
    this.$openTrigger
      .removeClass( 'is-active' )
      .addClass( 'is-inactive' );
  },

  openModal: function( $thisElem ) {
    var thisHref = $thisElem.attr( 'href' ),
        $targetModal = $( "[data-target='" + thisHref + "']" ),
        $targetModalImages = $targetModal.find( '.portfolioImage__img' ),
        $parentOverlay = $targetModal.closest( '.modal__overlay' );

    $targetModal
      .removeClass( 'is-hidden' )
      .addClass( 'is-visible' );

    $parentOverlay
      .removeClass( 'is-hidden' )
      .addClass( 'is-visible' );

    this.$body.addClass( 'u-overflow--hidden' );

    $targetModalImages.each(function() { // lazy loading loop to replace data attribute temporarily storing path for the image
      var $this = $( this );

      if ( $this[0].hasAttribute( 'srcset' ) ) {
        var $thisDataVal = $this.attr( 'data-srcset' );

        $this.attr( 'srcset', $thisDataVal );
      }

      else if ( $this[0].hasAttribute( 'src' ) ) {
        var $thisDataVal = $this.attr( 'data-src' );

        $this.attr('src', $thisDataVal);
      }
    })
  },

  closeModal: function() {
    this.$modal
      .removeClass( 'is-visible' )
      .addClass( 'is-hidden' );

    this.$overlay
      .removeClass( 'is-visible' )
      .addClass( 'is-hidden' );

    this.$body.removeClass( 'u-overflow--hidden' );
  },

  bindEvents: function() {
    this.$openTrigger.on( 'click keypress', function(e) {
      var $this = $( this );

      e.preventDefault();

      if ( e.which === 13 || e.type === 'click' ) {
        Portfolio.Modal.openModal( $this );
        Portfolio.Modal.pressIn( $this );
      }
    });

    this.$closeTrigger.on( 'click', function() {
      Portfolio.Modal.closeModal();
      Portfolio.Modal.pressOut();
    });

    $( document ).on( 'keyup', function( e ) {
      if (e.keyCode === 27) {
        Portfolio.Modal.closeModal();
        Portfolio.Modal.pressOut();
      }
    });
  }
}
