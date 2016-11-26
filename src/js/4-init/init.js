document.addEventListener('DOMContentLoaded', function(event) {
  //== modals/lightboxes
  if ( $('.js-modalOpen').length ) {
    Portfolio.Global.Modal.init();
  };

  //== skill cards
  if ( $('.js-skillCard').length ) {
    Portfolio.Global.SkillCard.init();
  };
});
