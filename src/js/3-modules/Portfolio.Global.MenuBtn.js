Portfolio.Global.MenuBtn = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$menuBtn = $('.js-menuBtn');
    this.$menu = $('.js-menu');
  },
  toggleMenu: function() {
    this.$menu.toggleClass('is-collapsed is-expanded');
  },
  bindEvents: function() {
    this.$menuBtn.on('click keypress', function(e) {
      e.preventDefault();

      if ( e.which === 13 || e.type === 'click' ) {
        Portfolio.Global.MenuBtn.toggleMenu();
      }
    });
  }
}
