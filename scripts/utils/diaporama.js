export function openDiapoOnClick(allMediaDOM, allMediaPhotographer) {
  const blocLightBox = document.querySelector(".bloc-lightBox");
  openLightBox(allMediaDOM, allMediaPhotographer);
  closeLightBox(blocLightBox);
}
/**
 *
 * @param {elementHTML} blocLightBox
 * close lightBox
 */
function closeLightBox(blocLightBox) {
  const cross = document.querySelector(".closeLightBox");
  const allMedia = document.querySelectorAll(".imageLightBox");

  cross.addEventListener("click", () => {
    blocLightBox.classList.toggle("displayNone");
    allMedia.forEach((media) => media.classList.add("displayNone"));
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
export function toggleLightBox(media) {
  const blocLightBox = document.querySelector(".bloc-lightBox");
  blocLightBox.classList.toggle("displayNone");
  displayHiddenPicture(media);
}

function openLightBox(allMediaDOM, allFetchMedia) {
  allMediaDOM.forEach((media) => {
    media.addEventListener("click", (event) => toggleLightBox(event.target));

    media.addEventListener("keydown", (e) => { 
      if (e.key === "Enter") { 
        toggleLightBox(media);
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
  switchPicture();
}

// add class displayNone
function displayHiddenPicture(media) {
  const imagesDOM = Array.from(document.querySelectorAll(".imageLightBox"));
  const imageClick = imagesDOM.find((image) => image.alt === media.alt);
  
  for (let i = 0; i < imagesDOM.length; i++) {
    const image = imagesDOM[i];
    image.classList.add("displayNone");
    imageClick.classList.remove("displayNone");
  }
}

/**
 *
 *  this function control prev and next picture click and arrow
 */
function switchPicture() {
  const imagesDOM = Array.from(document.querySelectorAll(".imageLightBox"));
  const chevronRight = document.querySelector(".fa-chevron-right");
  const chevronLeft = document.querySelector(".fa-chevron-left");

  let displayImage = imagesDOM.findIndex((image) => !image.classList.contains("displayNone"));
  
  //go to next picture
  function nextPicture() {
    imagesDOM[displayImage].classList.add("displayNone");
    displayImage++;
    if (imagesDOM.length <= displayImage) {
      displayImage = 0;
    }
    imagesDOM[displayImage].classList.remove("displayNone");
  }
  //go to previous picture
  function prevPicture() {
    imagesDOM[displayImage].classList.add("displayNone");
    displayImage--;
    if (displayImage < 0) {
      displayImage = imagesDOM.length - 1;
    }
    imagesDOM[displayImage].classList.remove("displayNone");
  }

  chevronRight.addEventListener("click", () => nextPicture());
  chevronRight.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
      nextPicture();
    }
  });

  chevronLeft.addEventListener("click", () => prevPicture());
  chevronLeft.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
      prevPicture();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextPicture();
    } else if (e.key === "ArrowLeft") {
      prevPicture();
    }
  });
}
