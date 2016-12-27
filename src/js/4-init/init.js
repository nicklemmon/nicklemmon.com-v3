document.addEventListener('DOMContentLoaded', function(event) {
  //== modals/lightboxes
  if ($('.js-modalOpen').length) {
    Portfolio.Global.Modal.init();
  };

  //== skill cards
  if ($('.js-skillCard').length) {
    Portfolio.Global.SkillCard.init();
  };

  //== nav menu
  if ($('.js-menu').length) {
    Portfolio.Global.MenuBtn.init();
  };

  //== ajax object
  if($('.js-ajaxTrigger').length) {
    Portfolio.Global.Ajax.init();
  };
});
