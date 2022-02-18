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
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
    </div>`
    })
    .join('');
}
