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
 * @param {elementsHTML} allMediaDOM  media in dom
 * @param { data } allFetchMedia  media in data.json
 *
 * this function open lightBox
 */
function openLightBox(blocLightBox, allMediaDOM, allFetchMedia) {

  allMediaDOM.forEach((media) => {
    media.addEventListener("click", () => blocLightBox.classList.toggle("displayNone"));
    media.addEventListener("keydown", (e) => { 
      if (e.key === "Enter") { 
        return blocLightBox.classList.toggle("displayNone"); 
      }
    });
  });
  displayPictures(allFetchMedia);
}

/**
 *
 * @param { data } allFetchMedia media in data.json
 *
 * this function insert media in lightbox
 */
function displayPictures(allFetchMedia) {
  const div = document.querySelector(".lightBox");

  const chevronRight = document.querySelector(".fa-chevron-right");

  for (let i = 0; i < allFetchMedia.length; i++) {
    const media = allFetchMedia[i];
    if (media.image) {
      const image = document.createElement("img");
      image.setAttribute("src", media.image);
      image.setAttribute("alt", `${media.title}`);
      image.classList.add("imageLightBox");
      div.appendChild(image);
      image.insertAdjacentElement("afterend", chevronRight);
    }
    if (media.video) {
      const source = document.createElement("source");
      const videoDom = document.createElement("video");
      videoDom.setAttribute("controls", "controls");
      source.setAttribute("src", media.video);
      source.setAttribute("type", "video/mp4");
      source.setAttribute("alt", `${media.title}`);
      videoDom.classList.add("imageLightBox");
      div.appendChild(videoDom);
      videoDom.appendChild(source);
    }
  }
  displayHiddenPicture();
  switchPicture();
}

// add class displayNone
function displayHiddenPicture() {
  const imagesDOM = document.querySelectorAll(".imageLightBox");
  for (let i = 1; i < imagesDOM.length; i++) {
    const image = imagesDOM[i];
    image.classList.add("displayNone");
  }
}

/**
 *
 *  this function control prev and next picture click and arrow
 */
function switchPicture() {
  const imagesDOM = document.querySelectorAll(".imageLightBox");
  const chevronRight = document.querySelector(".fa-chevron-right");
  const chevronLeft = document.querySelector(".fa-chevron-left");

  let imageCount = 0;

  //go to next picture
  function nextPicture() {
    imagesDOM[imageCount].classList.add("displayNone");
    imageCount++;
    if (imagesDOM.length <= imageCount) {
      imageCount = 0;
    }
    imagesDOM[imageCount].classList.remove("displayNone");
  }
  //go to previous picture
  function prevPicture() {
    imagesDOM[imageCount].classList.add("displayNone");
    imageCount--;
    if (imageCount < 0) {
      imageCount = imagesDOM.length - 1;
    }
    imagesDOM[imageCount].classList.remove("displayNone");
  }

  chevronRight.addEventListener("click", () => nextPicture());

  chevronLeft.addEventListener("click", () => prevPicture());

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextPicture();
    } else if (e.key === "ArrowLeft") {
      prevPicture();
    }
  });
}
