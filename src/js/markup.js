export default makeImagesMarkup;
import emptyImg from '../images/image-not-found.jpg';

function makeImagesMarkup(images) {

  return images.
    map(({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads
    }) => {
      let poster = emptyImg;
      if (webformatURL) {
        poster = webformatURL;
      }
      return `<div class="photo-card">
        <div class="thumb">
          <a class="link" href="${largeImageURL}">
            <img class="image" src="${poster}" alt="${tags}" loading="lazy" width="150" height="84" />
          </a>
        </div>
        <div class="info">
          <p class="info-item">
            <span>Likes</span>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <span>Views</span>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <span>Comments</span>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <span>Downloads</span>
            <span>${downloads}</span>
          </p>
        </div>
    </div>`
    })
    .join('');
}
