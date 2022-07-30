import { fetchPhotographerById } from "../service/service.js";
import { fetchPhotographers } from "../service/service.js";
import { openDiapoOnClick } from "../utils/diaporama.js";
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
//function main
async function main() {
  //get id
  const idPhotographer = getUrlParams();
  const getOnePhotographer = await fetchPhotographerById(idPhotographer);

  //import media of photographer
  const mediaPhotographer = await getMediaById(idPhotographer);

  //insert element in dom
  insertInDom(getOnePhotographer);
  setAndRemovePositionInDom();

  //get all media for set diapo
  const allMediaDOM = document.querySelectorAll(".photographer-media");
  openDiapoOnClick(allMediaDOM, mediaPhotographer);
}

async function getMediaById(id) {
  let arrayOfMedia = [];
  const { media } = await fetchPhotographers();
  media.forEach((media) => {
    if (media.photographerId === parseInt(id)) {
      const mediaModel = mediaFactory(media);
      mediaModel.getMediaDom();
      arrayOfMedia.push(media);
    }
  });
  return arrayOfMedia;
}

main();
