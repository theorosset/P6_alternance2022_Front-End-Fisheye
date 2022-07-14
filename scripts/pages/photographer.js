import { fetchPhotographers } from "../utils/utils.js";
function getUrlParams() {
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = params.get("id");
  return id;
}

async function main() {
  const idPhotographer = getUrlParams();
  const photographers = await fetchPhotographers(idPhotographer);
  console.log(photographers);
}
main();
