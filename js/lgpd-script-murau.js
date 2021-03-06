$(document).ready(function () {
  !localStorage.getItem("accept-lgpd") && $(".e-lgpd").show();

  $(
    ".e-lgpd .e-lgpd__content__button button, .e-lgpd .e-lgpd__content__button"
  ).click(function () {
    localStorage.setItem("accept-lgpd", true);
    $(".e-lgpd").fadeOut();
  });
});
