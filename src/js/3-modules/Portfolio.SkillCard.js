Portfolio.SkillCard = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$skillCard = $('.js-skillCard');
    this.$skillMsg = this.$skillCard.find('.card__msg');
  },
  toggleMsg: function($thisElem) {
    var $thisMsg = $thisElem.find(this.$skillMsg);

    $thisElem.toggleClass('is-inactive is-active');
    $thisMsg.toggleClass('is-hidden is-visible');
  },
  bindEvents: function() {
    this.$skillCard.on('click keypress', function(e) {
      e.preventDefault();

      if (e.which === 13 || e.type === 'click') {
        Portfolio.SkillCard.toggleMsg( $(this) );
      }
    });
  }
}
