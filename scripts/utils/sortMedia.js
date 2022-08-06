import { mediaFactory } from "../factories/photographer.js";

export function popularitySort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  console.log(mediaSection);
  function tri(a, b) {
    return a.likes < b.likes ? 1 : a.likes == b.likes ? 0 : -1;
  }
  media.sort(tri);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
}

// Tri par titre
export function titleSort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  function tri(a, b) {
    let titleA = a.title.split(" ").join("");
    a = titleA.toLowerCase();
    let titleB = b.title.split(" ").join("");
    b = titleB.toLowerCase();
    return a < b ? -1 : 1;
  }
  media.sort(tri);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
}

export function createMediaInDom(allMedia) {
  allMedia.forEach((media) => {
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(media);
    mediaModel.getMediaDom();
  });
}

export function dateSort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  function tri(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA < dateB ? 1 : dateA == dateB ? 0 : -1;
  }
  media.sort(tri);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
}
