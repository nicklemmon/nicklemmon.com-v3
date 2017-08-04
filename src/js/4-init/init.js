document.addEventListener('DOMContentLoaded', function(event) {
  //== modals/lightboxes
  if ($('.js-modalOpen').length) {
    Portfolio.Modal.init();
  };

  //== skill cards
  if ($('.js-skillCard').length) {
    Portfolio.SkillCard.init();
  };

  //== nav menu
  if ($('.js-menu').length) {
    Portfolio.MenuBtn.init();
  };

  //== ajax object
  if($('.js-ajaxTrigger').length) {
    Portfolio.Ajax.init();
  };
});
