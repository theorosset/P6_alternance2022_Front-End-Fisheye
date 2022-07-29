console.log(document.querySelector("header"));
export function openDiapoOnClick(allMediaDOM, mediaPhotographer) {
  const overlay = document.querySelector(".lightBox");
  openLightBox(overlay, allMediaDOM);
  closeLightBox(overlay);
  getPictures(mediaPhotographer);
}

/**
 *
 * @param {elementHTML} overlay
 * close lightBox
 */
function closeLightBox(overlay) {
  console.log(overlay);
  overlay.addEventListener("click", () => {
    overlay.classList.toggle("displayNone");
  });
}

/**
 *
 * @param {elementHTML} overlay
 * @param {elementsHTML} allMedia
 * open lightBox
 */
function openLightBox(overlay, allMediaDOM) {
  allMediaDOM.forEach((media) => {
    media.addEventListener("click", () => {
      overlay.classList.toggle("displayNone");
    });
  });
}

async function getPictures(media) {
  const div = document.querySelector(".lightBox");
  const img = document.querySelector("img");

  media.forEach((media) => {
    console.log(media);
  });
}
