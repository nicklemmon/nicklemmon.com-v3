Portfolio.Global.Modal = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$body = $('body');
    this.$modal = $('.js-modal');
    this.$overlay = $('.js-modalOverlay');
    this.$openTrigger = $('.js-modalOpen');
    this.$closeTrigger = $('.js-modalClose');
  },
  openModal: function($thisElem) {
    var thisHref = $thisElem.attr('href');
    var $targetModal = $("[data-target='" + thisHref + "']");
    var $parentOverlay = $targetModal.closest('.modal__overlay');

    $targetModal.removeClass('is-hidden').addClass('is-visible');
    $parentOverlay.removeClass('is-hidden').addClass('is-visible');
    this.$body.addClass('u-overflow--hidden');
  },
  closeModal: function() {
    this.$modal.removeClass('is-visible').addClass('is-hidden');
    this.$overlay.removeClass('is-visible').addClass('is-hidden');
    this.$body.removeClass('u-overflow--hidden');
  },
  bindEvents: function() {
    this.$openTrigger.on('click keypress', function(e) {
      e.preventDefault();

      if (e.which === 13 || e.type === 'click') {
        Portfolio.Global.Modal.openModal($(this));
      }
    });

    this.$overlay.on('click', function() {
      Portfolio.Global.Modal.closeModal();
    });
  }
}
