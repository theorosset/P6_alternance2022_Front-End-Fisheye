import { fetchPhotographerById } from "../service/service.js";
import { fetchPhotographers } from "../service/service.js";
import { openDiapoOnClick } from "../utils/diaporama.js";
import { photographerFactory } from "../factories/photographer.js";
import {
  dateSort,
  popularitySort,
  titleSort,
  createMediaInDom,
} from "../utils/sortMedia.js";

/**
 * recovery parameter of url
 * @returns {id}
 */
function getUrlParams() {
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = params.get("id");
  return id;
}

//insert element with model in dom
function insertInDom(photographer) {
  //for header photographer

  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  const photographeHeader = document.querySelector(".photograph-header");
  const btnContact = document.querySelector(".contact_button");

  photographeHeader.insertBefore(userCardDOM, btnContact);

  //for contact
  const name = document.querySelector(".photograph-header article h2");
  const titleForm = document.querySelector(".modal header h2");
  titleForm.innerText += ` ${name.innerText}`;
}

//set position
function setAndRemovePositionInDom() {
  const btnContact = document.querySelector(".contact_button");
  const img = document.querySelector(".photograph-header article img");
  btnContact.insertAdjacentElement("afterend", img);
  const price = document.querySelector(".pricePhotographer");
  price.style.display = "none";
}

//filter
function dropDownFilter() {
  const filterBtn = document.querySelector("#filter");
  const ul = document.querySelector(".filterChoose");
  const iconDown = document.querySelector(".fa-chevron-down");
  const iconUp = document.querySelector(".fa-chevron-up");
  filterBtn.addEventListener("click", () => {
    ul.classList.toggle("displayNone");
    iconDown.style.display = iconDown.style.display === "none" ? "" : "none";
    iconUp.style.display = iconUp.style.display === "none" ? "" : "none";
  });
}

async function setOrderBy(media) {
  const filterBtn = document.querySelector("#filter");
  const allLi = document.querySelectorAll("li");
  console.log(filterBtn.innerHTML);
  allLi.forEach((li) => {
    li.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "Date":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Date <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          dateSort(media);
          break;
        case "Populaire":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Populaire <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          popularitySort(media);
          break;
        case "Titre":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Titre <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          titleSort(media);
          break;
      }
    });
  });
}

async function getMediaById(id) {
  let arrayOfMedia = [];
  const { media } = await fetchPhotographers();
  media.forEach((media) => {
    //voir pour trier ici direct
    if (media.photographerId === parseInt(id)) {
      arrayOfMedia.push(media);
    }
  });
  return arrayOfMedia;
}

//function main
async function main() {
  //get id
  const idPhotographer = getUrlParams();
  const getOnePhotographer = await fetchPhotographerById(idPhotographer);
  //voir pour trier ici aussi
  //import media of photographer
  const mediaPhotographer = await getMediaById(idPhotographer);
  //insert element in dom
  insertInDom(getOnePhotographer);
  createMediaInDom(mediaPhotographer);
  setAndRemovePositionInDom();

  //get all media for set diapo
  const allMediaDOM = document.querySelectorAll(".photographer-media");
  openDiapoOnClick(allMediaDOM, mediaPhotographer);

  //filter dropDown
  dropDownFilter();
  setOrderBy(mediaPhotographer);
}

main();
