export async function fetchPhotographers(id) {
  let data = "../../data/photographers.json";
  if (!id) {
    return fetch(data)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  } else {
    return fetch(data)
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        return err;
      });
  }
}
