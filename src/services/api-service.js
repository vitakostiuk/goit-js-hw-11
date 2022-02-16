export default class ImageApiService {
  BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
    
  fetchImages() {
    // console.log(this);
    const queryParams = new URLSearchParams({
      key: '25731511-e5f7726e83d52bf5fe5f97cfd',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 6,
    })

    return fetch(`${this.BASE_URL}?${queryParams}`)
      .then(response => response.json()
        .then(data => {
          console.log(data);
          this.incrementPage();

          return data.hits;
      }))
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}