import { fetchPhotographers } from "../service/service.js";
import { photographerFactory } from "../factories/photographer.js";

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

function settingPhotographerRedirections() {
  const articles = document.querySelectorAll("article");

  function redirection(article) {
    const articleId = article.dataset.id;
    document.location.href = `photographer.html?id=${articleId}`;
  }

  articles.forEach((article) => {
    article.addEventListener("click", () => redirection(article));
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        redirection(article);
      }
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
