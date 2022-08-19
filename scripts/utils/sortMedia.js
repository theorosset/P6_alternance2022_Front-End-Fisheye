import { mediaFactory } from "../factories/photographer.js";

export function setOrderBy(media, likes) {
  const filterBtn = document.querySelector("#filter");
  const allLi = document.querySelectorAll("li");

  allLi.forEach((li) => {
    li.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "Date":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Date <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          filterBtn.setAttribute("aria-label", "trier par date");
          e.target.setAttribute(
            "aria-label",
            `trier par ${e.target.innerText}`
          );
          dateSort(media);
          likes();
          break;
        case "Populaire":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Populaire <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          filterBtn.setAttribute("aria-label", "trier par popularité");
          e.target.setAttribute(
            "aria-label",
            `trier par ${e.target.innerText}`
          );
          popularitySort(media);
          likes();
          break;
        case "Titre":
          e.target.innerText = filterBtn.innerText;
          // eslint-disable-next-line quotes
          filterBtn.innerHTML = `Titre <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
          filterBtn.setAttribute("aria-label", "trier par Titre");
          e.target.setAttribute(
            "aria-label",
            `trier par ${e.target.innerText}`
          );
          titleSort(media);
          likes();
          break;
      }
    });
  });
}

//sort by popularity
function popularitySort(media) {
  const mediaSection = document.querySelector(".photograph-section-media");
  console.log(mediaSection);
  function sort(a, b) {
    return a.likes < b.likes ? 1 : a.likes == b.likes ? 0 : -1;
  }
  media.sort(sort);
  mediaSection.innerHTML = "";
  createMediaInDom(media);
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
}

export function createMediaInDom(allMedia) {
  allMedia.forEach((media) => {
    // eslint-disable-next-line no-undef
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
}
