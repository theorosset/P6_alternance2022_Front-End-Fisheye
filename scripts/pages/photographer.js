import { fetchPhotographerById } from "../service/service.js";
import { fetchMediaByPhotographerId } from "../service/service.js";
import { openDiapoOnClick } from "../utils/diaporama.js";
import { photographerFactory } from "../factories/photographer.js";
import { createMediaInDom, setOrderBy } from "../utils/sortMedia.js";
/**
 * recovery parameter of url
 * @returns {id}
 */
function getUrlParams() {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const id = params.get("id");
  return id;
}

function likes() {
  const iconHeart = document.querySelectorAll(".fa-heart");

  iconHeart.forEach((like) => {
    like.addEventListener("click", (e) => {
      let numberOfLike = parseInt(e.path[1].innerText);
      numberOfLike += 1;
      e.path[1].innerHTML = `${numberOfLike}<i aria-label="likes" class="fas fa-heart" aria-hidden="true"></i>`;
      setTotalLikes();
    });
  });
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

//like total
function setTotalLikes() {
  const totalLikesDOM = document.querySelector(".likesTotal p");
  let totalLikes = 0;
  const likes = document.querySelectorAll(".numberOfLikes");
  likes.forEach((like) => {
    const number = parseInt(like.innerText);
    totalLikes += number;
  });
  return (totalLikesDOM.innerText = totalLikes);
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
  //take element in dom
  const filterBtn = document.querySelector("#filter");
  const ul = document.querySelector(".filterChoose");
  const iconDown = document.querySelector(".fa-chevron-down");
  const iconUp = document.querySelector(".fa-chevron-up");

//event dropDown
  filterBtn.addEventListener("click", () => {
    ul.classList.toggle("displayNone");
    iconDown.style.display = iconDown.style.display === "none" ? "" : "none";
    iconUp.style.display = iconUp.style.display === "none" ? "" : "none";
  });
}


//function main
async function main() {
  //get id
  const idPhotographer = getUrlParams();
  const getOnePhotographer = await fetchPhotographerById(idPhotographer);

  //import media of photographer
  const mediaPhotographer = await fetchMediaByPhotographerId(idPhotographer);
  //insert element in dom
  insertInDom(getOnePhotographer);
  createMediaInDom(mediaPhotographer);
  setAndRemovePositionInDom();

  //get all media for set diapo
  const allMediaDOM = document.querySelectorAll(".photographer-media");
  openDiapoOnClick(allMediaDOM, mediaPhotographer);

  //filter dropDown
  dropDownFilter();
  setOrderBy(mediaPhotographer, likes);
  likes();
  setTotalLikes();
}

main();
