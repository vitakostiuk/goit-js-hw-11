import './sass/main.scss';
import ImageApiService from './services/api-service';
import makeImagesMarkup from './components/images-markup'

const refs = {
  form: document.querySelector('#search-form'),
  searchBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
}
const imageApiService = new ImageApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch (e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.searchQuery.value;
  
  imageApiService.resetPage();
  clearGallery();

  if (imageApiService.query === '') {
    return alert ('Пустая строка');
  }

  imageApiService.fetchImages()
    .then(hits => {
      if (hits.length === 0) {
        return alert ('Неправильный запрос');
      }
        renderImages(hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
      })
    .catch(err => handleError(err));
}

function renderImages (hits) {
  const markup = makeImagesMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function handleError (err) {
  refs.gallery.innerHTML = '';
}

function onLoadMore(e) {
  imageApiService.fetchImages()
    .then(hits => {
      renderImages(hits);
      refs.loadMoreBtn.classList.remove('is-hidden');
    });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}