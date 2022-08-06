export function photographerFactory(data) {
  const { name, portrait, tagline, price, city, country, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    //create element
    const article = document.createElement("article");
    const img = document.createElement("img");
    const countryCity = document.createElement("p");
    const tagLine = document.createElement("p");
    const pricePhotographer = document.createElement("p");
    const h2 = document.createElement("h2");
    //set attribute or class
    article.setAttribute("data-id", id);
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de profil de ${name}`);
    countryCity.classList.add("countryCityPhotographer");
    tagLine.classList.add("tagLinePhotographer");
    pricePhotographer.classList.add("pricePhotographer");
    //texte of element
    h2.textContent = name;
    countryCity.innerText = `${city}, ${country}`;
    tagLine.innerText = `${tagline}`;
    pricePhotographer.innerText = `${price} €/jours`;
    //appendchild element
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(countryCity);
    article.appendChild(tagLine);
    article.appendChild(pricePhotographer);
    return article;
  }

  return { name, picture, getUserCardDOM };
}

export function mediaFactory(data) {
  const { title, image, likes, video } = data;
  function getMediaDom() {
    const divParent = document.querySelector(".photograph-section-media");

    //create element
    const divChild = document.createElement("div");
    const img = document.createElement("img");
    const source = document.createElement("source");
    const videoDom = document.createElement("video");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const i = document.createElement("i");

    //set attribute or class
    divChild.classList.add("media");

    if (image) {
      img.setAttribute("src", image);
      img.setAttribute("alt", `${title}`);
      img.classList.add("photographer-media");
    } else {
      source.setAttribute("src", video);
      source.setAttribute("type", "video/mp4");
      source.setAttribute("alt", `${title}`);
      videoDom.classList.add("photographer-media");
    }
    p.innerText = title;
    span.innerText = likes;
    i.setAttribute("aria-label", "likes");
    i.classList.add("fas");
    i.classList.add("fa-heart");
    divParent.appendChild(divChild);

    if (image) {
      divChild.appendChild(img);
    } else {
      divChild.appendChild(videoDom);
      videoDom.appendChild(source);
    }
    divChild.appendChild(p);
    p.appendChild(span);
    span.appendChild(i);
  }
  return { getMediaDom };
}
