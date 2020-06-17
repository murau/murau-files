const links = [{
    order: 1,
    title: "Novidades",
    url: "/novidades?PS=24&O=OrderByReleaseDateDESC",
  },
  {
    order: 2,
    title: "Coleção",
    url: "/roupa?PS=24&O=OrderByReleaseDateDESC",
    childs: [{
        title: "Blusas",
        url: "/roupa/blusas?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Body",
        url: "/roupa/body?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Calça",
        url: "/roupa/calca?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Camisas",
        url: "/roupa/camisas?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Casacos",
        url: "/roupa/casacos?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Coletes",
        url: "/roupa/coletes?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Conjuntos",
        url: "/roupa/conjuntos?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Cropped",
        url: "/roupa/Cropped?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Jaquetas",
        url: "/roupa/Jaquetas?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Macacão",
        url: "/roupa/macacao?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Saias",
        url: "/roupa/saias?PS=24&O=OrderByReleaseDateDESCC",
      },
      {
        title: "Shorts",
        url: "/roupa/shorts?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Short-saia",
        url: "/roupa/short-saia?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "T-Shirt",
        url: "/roupa/T-Shirt?PS=24&O=OrderByReleaseDateDESC",
      },
      {
        title: "Vestidos",
        url: "/roupa/vestidos?PS=24&O=OrderByReleaseDateDESC",
      },
    ],
  },
  {
    order: 3,
    title: "Acessórios",
    url: "/acessorios",
    childs: [{
        title: "Cintos",
        url: "/acessorios/Cintos",
      },
      {
        title: "Colares",
        url: "/acessorios/Colares",
      },
      {
        title: "Bolsas",
        url: "/acessorios/Bolsas",
      },
    ],
  },
  {
    order: 4,
    title: "Sale",
    url: "/sale",
  },
];

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
let maskName = Inputmask({
  clearMaskOnLostFocus: true,
  regex: "[A-Za-z \u00C0-\u017F.-]*",
  showMaskOnFocus: false,
  showMaskOnHover: false,
  clearIncomplete: true,
});
let maskEmail = Inputmask({
  mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
  greedy: false,
  casing: "lower",
  onBeforePaste: function (pastedValue, opts) {
    pastedValue = pastedValue.toLowerCase();
    return pastedValue.replace("mailto:", "");
  },
  definitions: {
    "*": {
      validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]",
    },
    "-": {
      validator: "[0-9A-Za-z-]",
    },
  },
  clearIncomplete: true,
  clearMaskOnLostFocus: true,
  showMaskOnFocus: false,
  showMaskOnHover: false,
});
maskName.mask(document.querySelectorAll("[name=nome]"));
maskEmail.mask(document.querySelectorAll("[name=email]"));

function alert(alertMessage, type = "warning") {
  toastr.options = {
    closeButton: true,
    debug: false,
    extendedTimeOut: "1000",
    hideDuration: "1000",
    hideEasing: "linear",
    hideMethod: "fadeOut",
    newestOnTop: true,
    onclick: null,
    positionClass: "toast-bottom-center",
    preventDuplicates: true,
    progressBar: true,
    showDuration: "300",
    showEasing: "swing",
    showMethod: "fadeIn",
    timeOut: "5000",
  };
  toastr[type](alertMessage);
}
const murau = {
  buyTogether: (el) => {
    let parent = el.offsetParent.parentNode;
    let sku1value = parent.querySelector('.item1 select').value;
    let sku2value = parent.querySelector('.item2 select').value;
    if (Number(sku1value) > 0 && Number(sku2value) > 0) {
      let items = [{
        id: sku1value,
        quantity: 1,
        seller: '1'
      }, {
        id: sku2value,
        quantity: 1,
        seller: '1'
      }];
      vtexjs.checkout.addToCart(items)
        .done(function (orderForm) {
          murau.updateMiniCart(orderForm.items.length);
          new Modal(document.querySelector("#murau-mini-cart")).show();
        });
    } else {
      alert('Selecione os tamanhos desejados.');
    }
  },
  parseValues: (v) => {
    return parseInt(v) / 100;
  },
  updateMiniCart: (qtd) => {
    let cartqtd = document.querySelectorAll(".cartQtd");
    for (let cartQtd of cartqtd) {
      cartQtd.textContent = qtd;
    }
    let portalmc = document.querySelector(".portal-minicart-ref");
    let dropcart = document.querySelector(".vtexsc-cart");
    let newdropcart = document.createElement("div");
    newdropcart.setAttribute("id", "dropcart");
    newdropcart.classList.add("col-12");
    if (qtd === 0) {
      newdropcart.innerHTML =
        "<div class='d-flex justify-content-center align-items-center h-100'><h4 class='titleDropCart'>Sua sacola está vazia.</h4></div>";
    } else {
      let titleDropCart = document.createElement("h4");
      titleDropCart.classList.add(
        "titleDropCart",
        "pb-3",
        "mb-3",
        "border-bottom"
      );
      titleDropCart.innerHTML = `<span class='badge badge-pill badge-secondary cartQtd'>${qtd}</span> Ite${
        qtd > 1 ? "ns" : "m"
        } na sacola <i class="fa-fw fas fa-shopping-bag"></i>`;
      if (dropcart) newdropcart.innerHTML = dropcart.cloneNode(true).innerHTML;
      newdropcart.insertBefore(titleDropCart, newdropcart.firstChild);
    }
    portalmc.insertBefore(newdropcart, portalmc.firstChild);
    portalmc.classList.add("row", "h-100");
    let cartcheckout = document.querySelector(".cartCheckout");
    cartcheckout.setAttribute("href", "/checkout/#/cart");
    cartcheckout.textContent = "Finalizar compra";
    cartcheckout.classList.add(
      "mt-5",
      "btn",
      "btn-primary",
      "btn-block",
      "text-light",
      "text-uppercase",
      "font-weight-light"
    );
    dropcart.parentNode.removeChild(dropcart);
  },
  tipTitle: () => {
    tippy("a[title]", {
      content: (el) => el.getAttribute("title"),
    });
    let hasTitle = document.querySelectorAll("[title]");
    for (let removeTitle of hasTitle) {
      removeTitle.removeAttribute("title");
    }
  },
  areYouMobile: () => {
    let body = document.querySelector("body");
    let header = body.querySelector("header");
    let toggler = header.querySelector(".navbar-toggler");
    if (toggler.offsetParent) {
      body.classList.add("mobile");
      header.classList.add("mobile");
      header.classList.remove("fixed-top");
    } else {
      body.classList.remove("mobile");
      header.classList.remove("mobile");
    }
  },
  userColorScheme: () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "dark";
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    )
      return "light";
  },
  userReducedMotion: () => {
    if (window.matchMedia)
      return window.matchMedia("(prefers-reduced-motion)").matches;
    return false;
  },
};
vtexjs.checkout.getOrderForm().done((orderForm) => {
  murau.updateMiniCart(orderForm.items.length);
});
window.addEventListener("resize", () => murau.areYouMobile());
window.addEventListener("scroll", () => {
  let bodyHeader = document.querySelectorAll("body, header");
  if (window.pageYOffset > 100) {
    for (let element of bodyHeader) {
      element.classList.add("scroll");
      if (
        element.localName === "header" &&
        typeof element.className === "string" &&
        !element.className.includes('mobile')
      ) element.classList.add("fixed-top");
    }
  } else {
    for (let element of bodyHeader) {
      element.classList.remove("scroll");
      if (element.localName === "header") element.classList.remove("fixed-top");
    }
    murau.areYouMobile();
  }
});
let anchorlinks = document.querySelectorAll('a[href^="#"]');
for (let item of anchorlinks) {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    let hashval = item.getAttribute("href");
    if (!hashval.replace("#", "").length) return;
    let target = document.querySelector(hashval);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    history.pushState(null, null, hashval);
  });
}
window.addEventListener("click", (e) => {
  let target = e.target;
  if (
    target.parentNode.className &&
    typeof target.parentNode.className === "string" &&
    target.parentNode.className.includes("cartSkuRemove")
  ) {
    e.preventDefault();
    let index = target.parentNode.getAttribute("data-index");
    vtexjs.checkout.getOrderForm().then((orderForm) => {
      let item = orderForm.items[index];
      let quantity = item.quantity;
      vtexjs.checkout
        .removeItems([{
          index: index,
          quantity: quantity,
        }, ])
        .done((orderForm) => {
          murau.updateMiniCart(orderForm.items.length);
          console.log(`Item (${item.name}) removido da sacola com sucesso!`);
        });
    });
    return;
  }
  if (
    target.className &&
    typeof target.className === "string" &&
    target.className.includes("buy-button") &&
    target.getAttribute("href").includes("cart/add")
  ) {
    e.preventDefault();
    let sku = target
      .getAttribute("href")
      .split("sku=")
      .pop()
      .split("&qty=")
      .shift();
    vtexjs.checkout
      .addToCart([{
        id: sku,
        quantity: 1,
        seller: 1
      }])
      .done((orderForm) => {
        murau.updateMiniCart(orderForm.items.length);
        new Modal(document.querySelector("#murau-mini-cart")).show();
      });
    return;
  }
  if (target.id === "login") {
    document.body.style.overflow = "hidden";
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    return;
  }
  if (target.className &&
    typeof target.className === "string" &&
    target.className.includes("cNewsletter")
  ) {
    e.preventDefault();
    let nome = target.parentNode.querySelector("[name=nome]").value.trim();
    if (!nome) return alert("Preencha o campo nome.");
    let email = target.parentNode.querySelector("[name=email]").value;
    if (!email) return alert("Preencha o campo e-mail.");
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<div>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) return alert("Digite um e-mail válido.");
    let disabled = (value = true) => (target.disabled = value);
    disabled(true);
    fetch(`/api/dataentities/NL/search?email=${email}&_fields=email`)
      .then((response) => response.json())
      .then((emailChk) => {
        if (emailChk && emailChk.length) {
          alert("O e-mail informado já foi cadastrado.", "info");
          localStorage.setItem("userRegistered", true);
          return disabled(false);
        }
        fetch("/api/dataentities/NL/documents", {
            method: "POST",
            body: JSON.stringify({
              nome: nome,
              email: email
            }),
            headers: {
              Accept: "application/vnd.vtex.ds.v10+json",
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.json())
          .then((json) => {
            let modalNewsContent = document.querySelector(".modalNewsContent");
            if (modalNewsContent && modalNewsContent.length)
              modalNewsContent.innerHTML = `
<h2><span class="font-weight-light">Obrigado,</span> ${nome.split(' ')[0]}!</h2><br />
O seu e-mail foi cadastrado com sucesso.<br />
<button class="btn btn-primary rounded-0 btn-block text-uppercase font-weight-bold" data-dismiss="modal" aria-label="Close">Ir para o site</button></div>
            `;
            alert("Cadastro realizado com sucesso.", "success");
            localStorage.setItem("userRegistered", true);
            console.log(json);
            return disabled(false);
          })
          .catch((err) => {
            console.log(err);
            alert(
              "Ocorreu um erro ao registrar seu e-mail. Tente novamente mais tarde.",
              "error"
            );
          });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Ocorreu um erro ao registrar seu e-mail. Tente novamente mais tarde.",
          "error"
        );
      });
    return disabled(false);
  }
});
let zoomImages = document.querySelectorAll("#show ul.thumbs li a");
if (zoomImages && zoomImages.length) {
  let productCarouselImages = `
<div id="productImages" class="carousel slide mb-4" data-ride="carousel">
    <ol class="carousel-indicators">
`;
  for (i = 0; i < zoomImages.length; i++) {
    productCarouselImages += `
        <li data-target="#productImages" data-slide-to="${i}"${
      i === 0 ? ' class="active"' : ""
      }></li>
    `;
  }
  productCarouselImages += `
    </ol>
<div class="carousel-inner">
`;
  for (i = 0; i < zoomImages.length; i++) {
    let img = zoomImages[i].getAttribute("zoom");
    let thumb = zoomImages[i].getAttribute("rel");
    productCarouselImages += `
        <div class="carousel-item${i === 0 ? " active" : ""}">
            <a href="${img}" class="d-block">
                <img src="${thumb}" class="img-fluid img-thumbnail" alt="${
      document.title
      }" title="${document.title}" />
            </a>
        </div>
    `;
  }
  productCarouselImages += `
</div>
<a class="carousel-control-prev" href="#productImages" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Anterior</span>
</a>
<a class="carousel-control-next" href="#productImages" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Próxima</span>
</a>
</div>
`;
  document.querySelector(".apresentacao").innerHTML = productCarouselImages;
  document.addEventListener("DOMContentLoaded", () => {
    new Carousel(document.querySelector("#productImages"), {
      interval: false,
      pause: false,
      keyboard: true,
    });
    new SimpleLightbox({
      elements: document.querySelectorAll("#productImages .carousel-item a"),
    });
  });
}
document.addEventListener("readystatechange", () => {
  murau.tipTitle();
});
document
  .querySelector("#searchBox")
  .addEventListener("hidden.bs.collapse", () => {
    murau.areYouMobile();
    document.querySelector('header').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
const noty = async () => {
  if (!("Notification" in navigator)) {
    console.log("Esse browser não suporta notificações desktop");
  } else {
    if (Notification.permission !== "denied") {
      await Notification.requestPermission();
    }
  }
};
murau.areYouMobile();
document.addEventListener("DOMContentLoaded", () => {
  murau.tipTitle();
  const modals = document.querySelectorAll("[data-toggle=modal]");
  for (let modal of modals) {
    modal.addEventListener("click", (evt) => {
      evt.preventDefault();
      let target = document.querySelector(
        evt.target.getAttribute("data-target")
      );
      if (target) new Modal(target).show();
    });
  }
  const tabPills = document.querySelectorAll("[data-toggle=pill]");
  for (let tabPill of tabPills) {
    new Tab(tabPill);
  }
  if (document.querySelector('body.produto') && !document.querySelector("body.produto .skuList"))
    document.body.classList.add("no-variations");
  links.sort(compareValues("order"));
  let HTMLmenuNavigation = `<ul class="navbar-nav m-0 m-auto text-light text-center text-uppercase">`;
  for (let link of links) {
    if (link.url && !link.childs) {
      HTMLmenuNavigation += `<li class="nav-item"><a class="nav-link" href="${link.url}">${link.title}</a></li>`;
    } else if (link.childs) {
      link.childs.sort(compareValues("title"));
      HTMLmenuNavigation += `
              <li class="nav-item dropdown megamenu">
                  <a href="${link.url}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">${link.title}</a>
                  <div aria-labelledby="megamenu" class="dropdown-menu">
                      <div class="container">
                          <div class="row w-100 bg-white rounded-0 m-0 shadow">
                              <div class="col-12">
                                  <div class="p-4">
                                      <ul class="list-unstyled">
              `;
      for (let child of link.childs) {
        HTMLmenuNavigation += `
                      <li class="nav-item"><a href="${child.url}" class="nav-link text-small pb-0">${child.title}</a></li>
                  `;
      }
      HTMLmenuNavigation += `
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </li>
              `;
    }
  }
  HTMLmenuNavigation += `</ul>`;
  document.querySelector("#MainMenu").innerHTML = HTMLmenuNavigation;
  /* let sliderDesk = document.querySelector('.sliderDesktop');
  let sliderMobi = document.querySelector('.sliderMobile');
  let deskBanner = sliderDesk ? sliderDesk.querySelectorAll('.box-banner') : [];
  let mobiBanner = sliderMobi ? sliderMobi.querySelectorAll('.box-banner') : [];
  let HTMLhomeDeskImages = "";
  for (let db of deskBanner) {
    let link = db.querySelector("a").href ?? "#";
    let image = db.querySelector("img").src ?? null;
    let content = "";
    if (
      db.nextElementSibling &&
      typeof db.nextElementSibling.className === "string" &&
      db.nextElementSibling.className.includes('content')
    ) {
      content = db.nextElementSibling.innerHTML;
    }
    HTMLhomeDeskImages += `
    <a href="${link}" class="d-block" data-aos="fade-up">
    <div class="banner" style="background-image: url('${image}')">
      ${content}
    </div>
    </a>
    `;
  }
  if (sliderDesk) sliderDesk.innerHTML = HTMLhomeDeskImages;
  let HTMLhomeMobiImages = "";
  for (let mb of mobiBanner) {
    let link = mb.querySelector("a").href ?? "#";
    let image = mb.querySelector("img").src ?? null;
    let content = "";
    if (
      mb.nextElementSibling &&
      typeof mb.nextElementSibling.className === "string" &&
      mb.nextElementSibling.className.includes('content')
    ) {
      content = mb.nextElementSibling.innerHTML;
    }
    HTMLhomeMobiImages += `
    <a href="${link}" class="d-block" data-aos="fade-up">
    <div class="banner" style="background-image: url('${image}')">
      ${content}
    </div>
    </a>
    `;
  }
  if (sliderMobi) sliderMobi.innerHTML = HTMLhomeMobiImages; */

  /* Animate on scroll library */
  let aosJs = document.createElement('script');
  aosJs.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
  document.body.append(aosJs);

  aosJs.onload = () => {
    let aosCss = document.createElement('link');
    aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    aosCss.rel = 'stylesheet';
    document.head.append(aosCss);

    let aosInit = document.createElement('script');
    aosInit.innerHTML = `AOS.init();`;
    document.body.append(aosInit);
  }

  /* Infinite Scrolling */
  if (document.querySelector('body.busca')) {
    let getSearchUrl = () => {
      let url, preg = /\/buscapagina\?.+&PageNumber=/i,
        pregCollection = /\/paginaprateleira\?.+PageNumber=/i;

      for (el of document.querySelectorAll('script:not([src])')) {
        const content = el.innerHTML;
        if (content.includes('buscapagina')) url = preg.exec(content);
        if (content.includes('paginaprateleira')) url = pregCollection.exec(content);
      }

      if (typeof url === "object" && typeof url[0] !== "undefined")
        return url[0].replace("paginaprateleira", "buscapagina");

      return "";
    }

    let
      resultItems = document.querySelector('.resultItemsWrapper [id*="ResultItems"]'),
      searchUrl = getSearchUrl(),
      currentPage = 1,
      moreResults = true,
      isLoading = false;

    isLoadMore = () => {
      if (!resultItems) return;
      let
        lastDiv = resultItems
        .querySelectorAll('.last')[
          resultItems
          .querySelectorAll('.last')
          .length - 1
        ],
        lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight,
        pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastDivOffset - 20 && moreResults && !isLoading) {
        let next = currentPage + 1;
        isLoading = true;
        fetch(searchUrl.replace(/pagenumber\=[0-9]*/i, `PageNumber=${next}`)).then(async (response) => {
          if (response.ok) {
            let html = await response.text();
            if (!html.length) {
              moreResults = false;

              return window.dispatchEvent(new Event('murau.noMoreResults'));
            }

            let htmlObj = document.createElement('div');
            htmlObj.innerHTML = html;
            if (htmlObj.firstElementChild.nodeName === "META")
              htmlObj.firstElementChild.remove();

            resultItems.firstChild.appendChild(htmlObj.querySelector('ul'));

            return window.dispatchEvent(new Event('murau.isLoaded'));
          }
        }).then(() => isLoading = false).catch((err) => console.log(err.message));
        currentPage++;
        isLoadMore();
      }
    }
    window.addEventListener("scroll", () => {
      isLoadMore();
    });
  }

  /* Buy together */
  let buyTogether = document.querySelector('section.buy-together'),
    suggestionsId = [],
    productData = [];

  if (buyTogether) {
    vtexjs.catalog.getCurrentProductWithVariations()
      .done(function (product) {
        let activeProduct = product.skus.filter((i) => {
          return i.available;
        });
        if (!activeProduct.length) return;
        buyTogether.classList.add(
          'd-flex',
          'align-items-center',
          'flex-column',
          'py-3',
          'mt-3'
        )
        fetch(`/api/catalog_system/pub/products/crossselling/suggestions/${product.productId}`)
          .then((response) => response.json().then((suggestions) => {
            if (suggestions && suggestions.length) {
              suggestions
                .forEach(suggestion => {
                  if (suggestionsId.includes(suggestion.productId)) return;
                  suggestionsId.push(suggestion.productId);
                  vtexjs.catalog.getProductWithVariations(suggestion.productId)
                    .done(function (variations) {
                      let item1Select = '',
                        item2Select = '';
                      productData[product.productId] = [];
                      for (let i = 0; i < product.skus.length; i++) {
                        const item = product.skus[i];
                        if (!item.available) return;
                        const tamanho = item.dimensions.Tamanho;
                        if (tamanho) {
                          item1Select += `
                                <option value="${item.sku}">
                                ${tamanho}
                                </option>
                                `;
                        }
                        productData[product.productId].push(item);
                      };
                      productData[suggestion.productId] = [];
                      for (let i = 0; i < variations.skus.length; i++) {
                        const item = variations.skus[i];
                        if (!item.available) return;
                        const tamanho = item.dimensions.Tamanho;
                        if (tamanho) {
                          item2Select += `
                                <option value="${item.sku}">
                                ${tamanho}
                                </option>
                                `;
                        }
                        productData[suggestion.productId].push(item);
                      }
                      buyTogether.innerHTML = `
                      <h2 style="font-family: 'Satisfy',cursive; font-size: 2.5rem; margin-top: 30px;">Aproveite e compre junto</h2>
                      <div class="row w-100" id="var${suggestion.productId}">
                      <div class="col-8">
                          <div class="row">
                              <div class="col-5 d-flex flex-column justify-align-center align-items-center item1">
                                  <div style="
                                  background-image: url(${activeProduct[0].image});
                                  position: relative;
                                  display: inline-block;
                                  width: 200px;
                                  height: 200px;
                                  background-size: contain;
                                  background-position: center;">
                                  </div>
                                  <div class="display-5">${product.name}</div>
                                  <div class="productPrice">
                                      <p class="d-flex flex-column justify-align-center align-items-center">
                                          <s class="text-nowrap text-muted d-block">${activeProduct[0].listPriceFormated}</s>
                                          <em class="text-nowrap d-block">Por: <strong>${activeProduct[0].bestPriceFormated}</strong></em>
                                      </p>
                                  </div>
                                  <div class="selectItem">
                                    <label>
                                      Tamanho:
                                      <select name="variations">
                                      <option>Selecione</option>
                                      ${item1Select}
                                      </select>
                                    </label>
                                  </div>
                              </div>
                              <div class="col-1 d-flex justify-align-center align-items-center">
                                <span class="display-1">+</span>
                              </div>
                              <div class="col-5 d-flex flex-column justify-align-center align-items-center item2">
                                  <div style="
                                    background-image: url(${variations.skus[0].image});
                                    width: 200px;
                                    height: 200px;
                                    display: inline-block;
                                    position: relative;
                                    background-size: contain;
                                    background-position: center;
                                  ">
                                  </div>
                                  <div class="display-5">${suggestion.productName}</div>
                                  <div class="productPrice">
                                      <p class="d-flex flex-column justify-align-center align-items-center">
                                        <s class="text-nowrap text-muted d-block">${variations.skus[0].listPriceFormated}</s>
                                        <em class="text-nowrap d-block">Por: <strong>${variations.skus[0].bestPriceFormated}</strong></em>
                                      </p>
                                  </div>
                                  <div class="selectItem">
                                    <label>
                                      Tamanho:
                                      <select name="variations">
                                      <option>Selecione</option>
                                      ${item2Select}
                                      </select>
                                    </label>
                                  </div>
                              </div>
                              <div class="col-1 d-flex justify-align-center align-items-center">
                                <span class="display-1">=</span>
                              </div>
                          </div>
                      </div>
                      <div class="col-4 d-flex justify-content-center align-items-center flex-column box-compre">
                          <p class="d-flex flex-column justify-align-center align-items-center m-0">
                              <em>
                                  Compre os 2 por <h3 class="font-weight-bold">
                                  ${(murau
                                    .parseValues(variations.skus[0].bestPrice)
                                    +
                                    murau
                                    .parseValues(activeProduct[0].bestPrice))
                                    .toLocaleString('pt-BR', {
                                      minimumFractionDigits: 2,
                                      style: 'currency',
                                      currency: 'BRL'
                                    })}
                                  </h3>
                              </em>
                              <span class="font-weight-light">
                                  ou apenas <strong>${variations.skus[0].installments}x</strong> de <strong>
                                  ${(murau
                                      .parseValues(variations.skus[0].installmentsValue)
                                      +
                                    murau
                                      .parseValues(activeProduct[0].installmentsValue))
                                      .toLocaleString('pt-BR', {
                                      minimumFractionDigits: 2,
                                      style: 'currency',
                                      currency: 'BRL'
                                    })}</strong>
                              </span>
                          </p>
                          <p>
                              <button class="btn-block btn-lg btn btn-primary text-nowrap" onclick="event.preventDefault();murau.buyTogether(this)">Comprar junto</button>
                          </p>
                      </div>
                  </div>
                      `;
                    });
                });
            }
          }));
      });
  }

  /* Newsletter */
  let modalNewsletter = document.querySelector('#modalNewsletter');
  if (!localStorage.getItem('userRegistered')) {
    if (Number(localStorage.getItem('userClosed')) >= 3) return;
    new Modal(modalNewsletter).toggle();
  }

  modalNewsletter.addEventListener('hide.bs.modal', (evt) => {
    let userClosedCount = Number(localStorage.getItem('userClosed')) + 1;
    localStorage.setItem('userClosed', userClosedCount);
  }, false);
});