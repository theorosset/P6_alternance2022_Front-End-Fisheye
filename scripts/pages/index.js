import { fetchPhotographers } from "../utils/utils.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

function redirectToPagePhotographer(photographers) {
  const articles = document.querySelectorAll("article");
  articles.forEach((article) => {
    article.addEventListener("click", (e) => {
      const articleClosest = article.closest("article");
      const articleId = articleClosest.dataset.id;
      document.location.href = `photographer.html?id=${articleId}`;
    });
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await fetchPhotographers();
  displayData(photographers);
  redirectToPagePhotographer(photographers);
}

init();
