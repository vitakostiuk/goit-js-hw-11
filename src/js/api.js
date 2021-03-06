const axios = require('axios').default;

export default class ImageApiService {
  BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
    
  async fetchImages() {
    // console.log(this);
    const queryParams = new URLSearchParams({
      key: '25731511-e5f7726e83d52bf5fe5f97cfd',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    })

  //   return fetch(`${this.BASE_URL}?${queryParams}`)
  //     .then(response => response.json())
  // }
    
  // return axios.get(`${this.BASE_URL}?${queryParams}`)
  //     .then(response => response.data)
    
    const response = await axios.get(`${this.BASE_URL}?${queryParams}`);
    return response.data;
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

  getPage() {
    return this.page;
  }

  resetPage() {
    this.page = 1;
  }

}