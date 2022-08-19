const dataJson = "./data.json";

export async function fetchPhotographers() {
  return fetch(dataJson)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
}

/**
 *
 * @param {Id} idPhotographer
 * @returns one photographer by Id
 *
 */
export async function fetchPhotographerById(idPhotographer) {
  return fetch(dataJson)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.photographers.find(({ id }) => {
        return id === parseInt(idPhotographer);
      });
    })
    .catch((err) => {
      return err;
    });
}

export async function fetchMediaByPhotographerId(idPhotographer) {
  return fetch(dataJson)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arrayOfMedia = [];
      
      data.media.forEach((media) => {

        if (media.photographerId === parseInt(idPhotographer)) {
          arrayOfMedia.push(media);
        }
      });
      return arrayOfMedia;
    })
    .catch((err) => {
      return err;
    });
}
