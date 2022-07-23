let dataJson = "../../data/photographers.json";

export async function fetchPhotographers() {
    return fetch(dataJson)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      }); 
  }

export async function fetchPhotographerById(idPhotographer){
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

export async function fetchMediaPhotographerById(id){
    return fetch(dataJson)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
         data.media.forEach((media)=> { 
          console.log(media.photographerId);
          if(media.photographerId === parseInt(id)){
            mediaFactory(media).getMediaDom()
          }
         })
        
      })
      .catch((err) => {
        return err;
      });
}