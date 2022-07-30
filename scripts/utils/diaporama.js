console.log(document.querySelector("header"));
export function openDiapoOnClick(allMediaDOM, allMediaPhotographer) {
  const blocLightBox = document.querySelector(".bloc-lightBox");
  openLightBox(blocLightBox, allMediaDOM, allMediaPhotographer);
  closeLightBox(blocLightBox);
}
/**
 *
 * @param {elementHTML} blocLightBox
 * close lightBox
 */
function closeLightBox(blocLightBox) {
  const cross = document.querySelector(".closeLightBox");
  cross.addEventListener("click", () => {
    blocLightBox.classList.toggle("displayNone");
  });
}

/**
 *
 * @param {elementHTML} blocLightBox
 * @param {elementsHTML} allMedia
 * open lightBox
 */
function openLightBox(blocLightBox, allMediaDOM, allFetchMedia) {
  allMediaDOM.forEach((media) => {
    media.addEventListener("click", () => {
      blocLightBox.classList.toggle("displayNone");
      getPictures(allFetchMedia);
    });
  });
}

async function getPictures(allFetchMedia) {
  const div = document.querySelector(".lightBox");

  const chevronRight = document.querySelector(".fa-chevron-right");

  for (let i = 0; i < allFetchMedia.length; i++) {
    const media = allFetchMedia[i];
    const image = document.createElement("img");
    image.setAttribute("src", media.image);
    image.classList.add("imageLightBox");
    div.appendChild(image);
    image.insertAdjacentElement("afterend", chevronRight);
  }
  displayHiddenPicture();
  switchPicture();
}

function displayHiddenPicture() {
  const imagesDOM = document.querySelectorAll(".imageLightBox");
  for (let i = 1; i < imagesDOM.length; i++) {
    const image = imagesDOM[i];
    image.classList.add("displayNone");
  }
}

function switchPicture() {
  const imagesDOM = document.querySelectorAll(".imageLightBox");
  const chevronRight = document.querySelector(".fa-chevron-right");
  const chevronLeft = document.querySelector(".fa-chevron-left");
  let imageCount = 0;

  chevronRight.addEventListener("click", () => {
    imagesDOM[imageCount].classList.add("displayNone");
    imageCount++;
    if (imagesDOM.length <= imageCount) {
      imageCount = 0;
    }
    imagesDOM[imageCount].classList.remove("displayNone");
  });

  chevronLeft.addEventListener("click", () => {
    imagesDOM[imageCount].classList.add("displayNone");
    imageCount--;
    if (imageCount < 0) {
      imageCount = imagesDOM.length - 1;
    }
    imagesDOM[imageCount].classList.remove("displayNone");
  });
}
