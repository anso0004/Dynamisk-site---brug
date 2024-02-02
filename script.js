window.addEventListener("DOMContentLoaded", init);

const produkter = "https://kea-alt-del.dk/t7/api/products";

let produkterTemplate;
let produkterContainer;

function init() {
  console.log("init");

  produkterTemplate = document.querySelector(".produkter_template");
  console.log("produkter_template", produkterTemplate);

  produkterContainer = document.querySelector(".produkter_container");
  console.log("produkter_container", produkterContainer);

  fetch(produkter)
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
    produkterClone.querySelector(".produkter_image_container").src = produkter.image_url;
    produkterClone.querySelector(".produkter_image_container").alt = `Picture of a ${produkter.name} beer`;
    produkterClone.querySelector(".produkter_overskrift").textContent = produkter.productdisplayname;
    produkterClone.querySelector(".produkter_sub_overskrift").textContent = produkter.articletype + produkter.brandname;
    produkterClone.querySelector(".produkter_sub_overskrift").textContent = `${produkter.articletype} || ${produkter.brandname}`;
    produkterClone.querySelector(".price_sale").textContent = produkter.discount;
    produkterClone.querySelector(".price").textContent = produkter.price;
    produkterClone.querySelector(".knap_koeb_div").textContent = "Køb her";
    produkterClone.querySelector(".udsolgt-tag").textContent = "Udsolgt";
    produkterClone.querySelector(".sale-tag").textContent = `${produkter.discount} %`;
    produkterContainer.appendChild(produkterClone);
  });
}
