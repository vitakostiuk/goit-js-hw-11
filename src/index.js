import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import './sass/main.scss';
import ImageApiService from './services/api-service';
import makeImagesMarkup from './components/images-markup'

const refs = {
  form: document.querySelector('#search-form'),
  searchBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}

const imageApiService = new ImageApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch (e) {
  e.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loadMoreBtn.disabled = true;

  imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  
  imageApiService.resetPage();
  clearGallery();

  if (imageApiService.query === '') {
    Notify.warning('Enter a request');
    return;
  }

    imageApiService.fetchImages()
    .then(data => {
      imageApiService.incrementPage();
        if (data.hits.length === 0) {
          Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          return;
        }
      
      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      renderImages(data.hits);
      openLargeImage();
      
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.disabled = false;
  })
    .catch(err => handleError(err));
}

function renderImages (hits) {
  const markup = makeImagesMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function handleError (err) {
  refs.gallery.innerHTML = '';
  console.log(err.message);
  refs.loadMoreBtn.classList.add('is-hidden');

}

function onLoadMore() {
  refs.loadMoreBtn.disabled = true;

  imageApiService.fetchImages()
    .then(data => {
      imageApiService.incrementPage();

      renderImages(data.hits);
      openLargeImage().refresh();
      
      if (imageApiService.page * imageApiService.perPage >= data.totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.warning('We are sorry, but you have reached the end of search results.');
        return;
      } 

      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.disabled = false;
  })
    .catch(err => handleError(err));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function openLargeImage() {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  return lightbox;
}