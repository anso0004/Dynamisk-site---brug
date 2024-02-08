const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams", urlParams);
const kategori = urlParams.get("category");

fetch(`https://kea-alt-del.dk/t7/api/categories`)
  .then((res) => res.json())
  .then(visKategorier);

function visKategorier(kategorier) {
  kategorier.forEach(showCategory);
}

function showCategory(category) {
  console.log("kategori");
  const template = document.querySelector("#kategorier_template").content;
  const categoryClone = template.cloneNode(true);
  categoryClone.querySelector("a").textContent = category.category;
  categoryClone.querySelector("a").href = `produktliste.html?category=${category.category}`;
  document.querySelector(".lettergroup ol").appendChild(categoryClone);
}
