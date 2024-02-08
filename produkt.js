window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams", urlParams);
const id = urlParams.get("id");

const produkt = `https://kea-alt-del.dk/t7/api/products/${id}`;

function init() {
  console.log("init");

  fetch(produkt)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProdukt(json);
    });
}

function showProdukt(produktJSON) {
  console.log(produktJSON);
  document.querySelector(".brødkrummesti_produkt").textContent = produktJSON.productdisplayname;
  document.querySelector(".overskrift_h3").textContent = produktJSON.productdisplayname;
  document.querySelector(".brand").textContent = produktJSON.brandname;
  document.querySelector(".artikeltype").textContent = produktJSON.articletype;
  document.querySelector(".pris").textContent = produktJSON.price;
  document.querySelector(".produkt_img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
}

init();
