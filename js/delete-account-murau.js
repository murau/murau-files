$(window).on("hashchange", function (e) {
  const newUrl = location.hash.replace(/^#/, "");

  if (newUrl === "/profile") {
    setTimeout(() => {
      $(".account .vtex-account__profile .c-muted-2").parents(".pr5-ns").after(`
					<button class="remove-account">Remover conta</button>
			`);
    }, 500);
  }
});

$(window).load(function () {
  const pageUrl = window.location.href.split(".com")[1];

  if (/account/.test(pageUrl)) {
    setTimeout(() => {
      $(".account .vtex-account__profile .c-muted-2").parents(".pr5-ns").after(`
					<button class="remove-account">Remover conta</button>
			`);
    }, 1000);
  }
});

$(document).ready(function () {
  $(document).on("click", ".account .remove-account", function () {
    $(".e-delete").fadeIn();
    $(".e-delete #step-01").fadeIn();
    $(".e-overlay").fadeIn();
  });

  $(document).on("click", ".account .e-overlay, .account .close", function () {
    $(".e-delete").fadeOut();
    $(".e-overlay").fadeOut();
    $(".e-delete #step-01").fadeOut();
    $(".e-delete #step-02").fadeOut();
    $(".e-delete #step-03").fadeOut();
  });

  $(document).on(
    "click",
    ".e-delete #step-01 .e-delete__button:not(.close)",
    function () {
      $(".e-delete #step-01").hide();
      $(".e-delete #step-02").fadeIn();
    }
  );

  $(document).on(
    "click",
    ".e-delete #step-02 .e-delete__button:not(.close)",
    function (e) {
      e.preventDefault();
      const clientEmail = $("#step-02").find("input").val();
      const url = `/api/dataentities/CL/search/?_where=userId=${vtxctx.login}&_fields=email,id`;
      $.getJSON(
        `https://vtex.planteamor.com.br/api-get.php?url=${encodeURIComponent(
          url
        )}&out=json&seller=murau`
      )
        .done(function (data) {
          $("#step-02").find("input").val("");
          if (data.length === 1 && data[0].email == clientEmail) {
            const userId = data[0].id;

            $.getJSON(
              `https://vtex.planteamor.com.br/api-get.php?url=/api/dataentities/CL/documents/${userId}&op=delete&seller=murau`
            )
              .done(function () {
                $(".e-delete #step-02").hide();
                $(".e-delete #step-03").fadeIn();
                $.ajax({
                  url: "/no-cache/user/logout",
                }).done();

                setTimeout(() => {
                  window.location.href = "/";
                }, 2000);
              })
              .fail(function () {
                alert("Ocorreu um problema, tente novamente!");
              });
          } else {
            alert("Email não encontrado, tente novamente!");
          }
        })
        .fail(function () {
          alert("Ocorreu um problema, tente novamente!");
        });
    }
  );
});
