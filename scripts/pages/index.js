import { fetchPhotographers } from "../service/service.js";
import { photographerFactory } from "../factories/photographer.js";

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    //eslint-disable-next-line
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

function settingPhotographerRedirections() {
  const articles = document.querySelectorAll("article");
  articles.forEach((article) => {
    article.addEventListener("click", () => {
      const articleId = article.dataset.id;
      document.location.href = `photographer.html?id=${articleId}`;
    });
  });
}

async function main() {
  // Récupère les datas des photographes
  const { photographers } = await fetchPhotographers();
  displayData(photographers);
  settingPhotographerRedirections(photographers);
}

main();
