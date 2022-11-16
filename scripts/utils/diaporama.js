let displayImageIndex;

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

  cross.addEventListener("click", () => {
    blocLightBox.classList.add("displayNone");
  });
  cross.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
      blocLightBox.classList.add("displayNone");
    }
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
  const imagesDOM = Array.from(document.querySelectorAll(".imageLightBox"));
  const blocLightBox = document.querySelector(".bloc-lightBox");
  blocLightBox.classList.toggle("displayNone");
  
  displayImageIndex = imagesDOM.findIndex((item) => item.getAttribute("alt") === media.getAttribute("alt"));
  displayHiddenPicture(media);
}

function openLightBox(allMediaDOM, allFetchMedia) {
  allMediaDOM.forEach((media) => {
    media.addEventListener("click", (event) => toggleLightBox(event.target));

    media.addEventListener("keydown", (e) => { 
      if (e.key === "Enter") { 
        toggleLightBox(e.target);
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
      const p = document.createElement("p");
      image.setAttribute("src", media.image);
      image.setAttribute("alt", `${media.title}`);
      image.classList.add("imageLightBox");
      p.classList.add("imageName");
      p.innerText = image.getAttribute("alt");
      div.appendChild(image);
      div.appendChild(p);
      image.insertAdjacentElement("afterend", chevronRight);
    }
    if (media.video) {
      const source = document.createElement("source");
      const videoDom = document.createElement("video");
      const p = document.createElement("p");
      videoDom.setAttribute("controls", "controls");
      source.setAttribute("src", media.video);
      source.setAttribute("type", "video/mp4");
      source.setAttribute("alt", `${media.title}`);
      videoDom.classList.add("imageLightBox");
      p.classList.add("imageName");
      p.innerText = source.getAttribute("alt");
      div.appendChild(videoDom);
      div.appendChild(p);
      videoDom.appendChild(source);
    }
  }
  switchPicture();
}

// add class displayNone
function displayHiddenPicture(media) {
  const imagesDOM = Array.from(document.querySelectorAll(".imageLightBox"));
  const pImageDOM = Array.from(document.querySelectorAll(".imageName"));

  const imageClick = imagesDOM.find((image) => image.alt === media.alt);
  let pOfimageClick = pImageDOM.find((p) => p.innerText === media.alt);

  if(!pOfimageClick) {
    pOfimageClick = pImageDOM.find((p) => p.innerText === media.firstChild.getAttribute("alt"));
  }
  for (let i = 0; i < imagesDOM.length; i++) {
    const image = imagesDOM[i];
    const p = pImageDOM[i];
    image.classList.add("displayNone");
    p.classList.add("displayNone");
    imageClick.classList.remove("displayNone");
    pOfimageClick.classList.remove("displayNone");
  }
}
//add display none
function addDisplayNone(pDisplayNone, imageDisplayNone) {
  pDisplayNone.classList.add("displayNone");
  imageDisplayNone.classList.add("displayNone");
}
//remove display none 
function removeDisplayNone(pDisplayNone, imageDisplayNone) {
  pDisplayNone.classList.remove("displayNone");
  imageDisplayNone.classList.remove("displayNone");
}
/**
 *
 *  this function control prev and next picture click and arrow
 */
function switchPicture() {
  const imagesDOM = Array.from(document.querySelectorAll(".imageLightBox"));
  const pImageDOM = Array.from(document.querySelectorAll(".imageName"));
  const chevronRight = document.querySelector(".fa-chevron-right");
  const chevronLeft = document.querySelector(".fa-chevron-left");

  //go to next picture
  function nextPicture() {
    addDisplayNone(pImageDOM[displayImageIndex],imagesDOM[displayImageIndex]);
    displayImageIndex++;
    if (imagesDOM.length <= displayImageIndex) {
      displayImageIndex = 0;
    }
    console.log(displayImageIndex);
    removeDisplayNone(pImageDOM[displayImageIndex],imagesDOM[displayImageIndex]);
  }
  //go to previous picture
  function prevPicture() {
    addDisplayNone(pImageDOM[displayImageIndex],imagesDOM[displayImageIndex]);
    displayImageIndex--;
    if (displayImageIndex < 0) {
      displayImageIndex = imagesDOM.length - 1;
    }
    removeDisplayNone(pImageDOM[displayImageIndex],imagesDOM[displayImageIndex]);
  }

  const nextPictureEvent = chevronRight.addEventListener("click", nextPicture);
  chevronRight.removeEventListener("click", nextPictureEvent);
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
