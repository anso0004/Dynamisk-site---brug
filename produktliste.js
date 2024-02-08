const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch(`https://kea-alt-del.dk/t7/api/products/?limit=20&category=` + category)
  .then((res) => res.json())
  .then(showProdukter);

function showProdukter(products) {
  products.forEach(showProdukter);
}

produkterTemplate = document.querySelector(".produkter_template");
console.log("produkter template", produkterTemplate);

produkterContainer = document.querySelector(".produkter_container");
console.log("produkter container", produkterContainer);

function showProdukter(produkterJSON) {
  let produkterClone;

  produkterJSON.forEach((produkter) => {
    console.log("Produkter", produkter);
    produkterClone = produkterTemplate.cloneNode(true).content;
    produkterClone.querySelector(".image_container").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkter.id}.webp`;
    produkterClone.querySelector(".image_container").alt = `Picture of ${produkter.name}`;
    produkterClone.querySelector(".produkter_overskrift").textContent = produkter.productdisplayname;
    produkterClone.querySelector(".produkter_sub_overskrift").textContent = `${produkter.articletype} || ${produkter.brandname}`;

    //UDSOLGT SKILT
    if (produkter.soldout) {
      produkterClone.querySelector(".udsolgt-tag").classList.remove("skjul");
      produkterClone.querySelector(".image_container").classList.add("udsolgt");
    }

    //UDSALG
    if (produkter.discount) {
      produkterClone.querySelector(".sale-tag").classList.remove("skjul");
      produkterClone.querySelector(".price_normal").classList.add("skjul");
      produkterClone.querySelector(".price_before").classList.remove("skjul");
      produkterClone.querySelector(".price_before").textContent = "DKK " + produkter.price + " ,-";
      produkterClone.querySelector(".price_sale").classList.remove("skjul");
      produkterClone.querySelector(".price_sale").textContent = "DKK " + (produkter.price * (100 - produkter.discount)) / 100 + " ,-";
    }

    produkterClone.querySelector(".price_normal").textContent = "DKK " + produkter.price + ",-";
    produkterClone.querySelector(".sale-tag").textContent = produkter.discount + "%";
    //produkterClone.querySelector(".knap_koeb").setAttribute("href", `produkt.html?id=${produkter.id}`);
    produkterClone.querySelector("a").setAttribute("href", `produkt.html?id=${produkter.id}`);
    produkterClone.querySelector(".sale-tag").textContent = `${produkter.discount} %`;
    produkterContainer.appendChild(produkterClone);
  });
}
