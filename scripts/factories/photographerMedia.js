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
        img.setAttribute("tabindex", "0");
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
      span.classList.add("numberOfLikes");
      i.setAttribute("aria-label", "likes");
      i.setAttribute("tabindex", "0");
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
  