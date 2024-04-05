import FavoriteRestaurants from '../../../data/idb-favorite-restaurants';
import { daftarFavorite } from './daftarFavorite';

const home = {
  async render() {
    return `
    <article>
      <header class="detail">
        <h1>Daftar Restoran Favorit</h1>
      </header>
      <section id="daftar-restaurants" class="grid-container" style="margin-top: 5rem;"></section>
      <p id="favorite-none"></p>
    </article>`;
  },

  async afterRender() {
    const dataFavorite = await FavoriteRestaurants.getAllRestaurants();
    const container = document.querySelector('#daftar-restaurants');
    const favoriteNone = document.querySelector('#favorite-none');
    if (dataFavorite.length === 0) {
      favoriteNone.innerHTML = `
        Belum ada restoran favorit yang ditambahkan :(
      `;
    }
    dataFavorite.forEach((restaurants) => {
      container.innerHTML += daftarFavorite(restaurants);
    });
  },
};

export default home;
