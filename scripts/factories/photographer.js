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
    article.setAttribute("tabindex", "0");
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