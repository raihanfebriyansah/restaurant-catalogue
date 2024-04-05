import { potongDeskripsi } from '../home/potongDeskripsi.js';
import CONFIG from '../../../globals/config.js';

export const daftarFavorite = (restaurants) => `<article class="card" tabindex="0">
    <figure>
    <img src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="Gambar ${restaurants.name}">
      <figcaption>
        <h6 class="city">${restaurants.city}</h6>
        <h6 class="rating">${restaurants.rating}%</h6>
      </figcaption>
    </figure>
    <div class="text-card">
      <h5>${restaurants.name}</h5>
      <p>${potongDeskripsi(restaurants.description, 10)}</p>
      <a href="#/detail/${restaurants.id}">Lihat Detail</a>
    </div>
  </article>`;
