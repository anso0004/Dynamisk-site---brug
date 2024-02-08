window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

let produkterTemplate;
let produkterContainer;

function init() {
  console.log("init");

  produkterTemplate = document.querySelector(".produkter_template");
  console.log("produkter template", produkterTemplate);

  produkterContainer = document.querySelector(".produkter_container");
  console.log("produkter container", produkterContainer);

  fetch(`https://kea-alt-del.dk/t7/api/products/?limit=200&category` + category)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProdukter(json);
    });
}

function showProdukter(produkterJSON) {
  let produkterClone;

  produkterJSON.forEach((produkter) => {
    console.log("Produkter", produkter);
    produkterClone = produkterTemplate.cloneNode(true).content;
    produkterClone.querySelector(".image_container").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkter.id}.webp`;
    produkterClone.querySelector(".image_container").alt = `Picture of ${produkter.name}`;
    produkterClone.querySelector(".produkter_overskrift").textContent = produkter.productdisplayname;
    //produkterClone.querySelector(".produkter_sub_overskrift").textContent = produkter.articletype + produkter.brandname;
    produkterClone.querySelector(".produkter_sub_overskrift").textContent = `${produkter.articletype} || ${produkter.brandname}`;
    // produkterClone.querySelector(".price_sale").textContent = produkter.discount;
    //produkterClone.querySelector(".price").textContent = produkter.price;
    //produkterClone.querySelector(".udsolgt-tag").textContent = "Udsolgt";

    //Udsalg, virker ikke helt
    // if (produkter.soldout) {
    //   console.log("udsolgt");
    //   produkterClone.querySelector(".produkter_image_container").classList.add(".udsolgt-tag");
    //   console.log("Produktet er udsolgt");
    // } else {
    //   produkterClone.querySelector(".udsolgt-tag").classList.add(".skjul");
    // }
    //produkterClone.querySelector(".beer_abv_data").textContent = beer.abv;

    //UDSOLGT SKILT
    if (produkter.soldout) {
      produkterClone.querySelector(".udsolgt-tag").classList.remove("skjul");
      produkterClone.querySelector(".image_container").classList.add("udsolgt");
      // produkterClone.querySelector(".produkter_article").classList.add("strong");
    }

    //UDSALG
    if (produkter.discount) {
      produkterClone.querySelector(".sale-tag").classList.remove("skjul");
      produkterClone.querySelector(".price_normal").classList.add("skjul");
      produkterClone.querySelector(".price_before").classList.remove("skjul");
      produkterClone.querySelector(".price_before").textContent = produkter.price;
      produkterClone.querySelector(".price_sale").classList.remove("skjul");
      produkterClone.querySelector(".price_sale").textContent = "DKK" + (produkter.price * (100 - produkter.discount)) / 100 + " ,-";
    }

    produkterClone.querySelector(".price_normal").textContent = produkter.price;

    produkterClone.querySelector(".sale-tag").textContent = produkter.discount + "%";

    produkterClone.querySelector(".knap_koeb").setAttribute("href", `produkt.html?id=${produkter.id}`);
    produkterClone.querySelector(".sale-tag").textContent = `${produkter.discount} %`;
    produkterContainer.appendChild(produkterClone);
  });
}
