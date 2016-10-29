Portfolio.Global.Modal = {
  cacheDom: function() {
    this.$openTrigger = $('.js-modalOpen');
    this.$closeTrigger = $('.js-modalClose');
  },
  openModal: function() {
    console.log('test');
  },
  closeModal: function() {
    console.log('test');
  },
  init: function() {
    this.cacheDom();
    console.log('firing');
  }
}
