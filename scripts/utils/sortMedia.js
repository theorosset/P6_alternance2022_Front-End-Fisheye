/* eslint-disable no-case-declarations */
import { mediaFactory } from "../factories/photographerMedia.js";
import { openDiapoOnClick } from "./diaporama.js";

//function for event listener 
export function setOrderBy(media, likes) {
  const allLi = document.querySelectorAll("li");
  allLi.forEach((li) => {
    //add event listener for all Li
    li.addEventListener("click", (e) => setOnClick(e, media, likes));

    li.addEventListener("keydown", (e) => { 
      if (e.key === "Enter") { 
        setOnClick(e, media, likes); 
      }
    });
  });
}

/**
 * @param { Event } e 
 * @param { Object[] } media 
 * @param { function } likes 
 */
function setOnClick (e, media, likes) {
  const filterBtn = document.querySelector("#filter");

  //condition if click on data or popularity or title
  switch (e.target.innerText) {
    case "Date":
      e.target.innerText = filterBtn.innerText;
      filterBtn.innerHTML = "Date <i class=\"fas fa-chevron-down\" aria-hidden=\"true\"></i>";
      filterBtn.setAttribute("aria-label", "trier par date");
      e.target.setAttribute("aria-label", `trier par ${e.target.innerText}`);
      const mediaDateSort = dateSort(media);
      openDiapoOnClick(mediaDateSort, media);
      likes();
      break;
    case "Populaire":
      e.target.innerText = filterBtn.innerText;
      filterBtn.innerHTML = "Populaire <i class=\"fas fa-chevron-down\" aria-hidden=\"true\"></i>";
      filterBtn.setAttribute("aria-label", "trier par popularité");
      e.target.setAttribute("aria-label", `trier par ${e.target.innerText}`);
      const mediaPopSort = popularitySort(media);
      openDiapoOnClick(mediaPopSort, media);
      likes();
      break;
    case "Titre":
      e.target.innerText = filterBtn.innerText;
      filterBtn.innerHTML = "Titre <i class=\"fas fa-chevron-down\" aria-hidden=\"true\"></i>";
      filterBtn.setAttribute("aria-label", "trier par Titre");
      e.target.setAttribute("aria-label", `trier par ${e.target.innerText}`);
      const mediaTitleSort = titleSort(media);
      openDiapoOnClick(mediaTitleSort, media);
      likes();
      break;
  }
}
//sort by popularity
function popularitySort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  function sort(a, b) {
    return a.likes < b.likes ? 1 : a.likes == b.likes ? 0 : -1;
  }
  media.sort(sort);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
  const allMediaSort = document.querySelectorAll(".photographer-media");
  return Array.from(allMediaSort);
}

// sort by title
function titleSort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  function sort(a, b) {
    let titleA = a.title.split(" ").join("");
    a = titleA.toLowerCase();
    let titleB = b.title.split(" ").join("");
    b = titleB.toLowerCase();
    return a < b ? -1 : 1;
  }
  media.sort(sort);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
  const allMediaSort = document.querySelectorAll(".photographer-media");
  return Array.from(allMediaSort);
}

export function createMediaInDom(allMedia) {
  allMedia.forEach((media) => {
    const mediaModel = mediaFactory(media);
    mediaModel.getMediaDom();
  });
}

// sort by date
function dateSort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  function sort(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA < dateB ? 1 : dateA == dateB ? 0 : -1;
  }
  media.sort(sort);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
  const allMediaSort = document.querySelectorAll(".photographer-media");
  return Array.from(allMediaSort);
}
