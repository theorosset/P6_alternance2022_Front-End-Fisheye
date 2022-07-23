import { fetchPhotographerById} from "../service/service.js";
import { fetchMediaPhotographerById} from "../service/service.js";

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
  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  const photographeHeader = document.querySelector(".photograph-header");
  const btnContact = document.querySelector(".contact_button");

  photographeHeader.insertBefore(userCardDOM, btnContact);
}

function setAndRemovePositionInDom() {
  const btnContact = document.querySelector(".contact_button");
  const img = document.querySelector(".photograph-header article img");
  btnContact.insertAdjacentElement("afterend", img);
  const price = document.querySelector(".pricePhotographer");
  price.style.display = "none";
}

async function main() {
  const idPhotographer = getUrlParams();
  const photographer = await fetchPhotographerById(idPhotographer);
  const media = await fetchMediaPhotographerById(idPhotographer)
  
  insertInDom(photographer);
  setAndRemovePositionInDom();
}
main();
