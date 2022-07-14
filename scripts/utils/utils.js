export async function fetchPhotographers(idPhotographer) {
  let dataJson = "../../data/photographers.json";
  if (!idPhotographer) {
    return fetch(dataJson)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  } else {
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
}
