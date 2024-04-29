/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
import cutDescription from './cut-description';
import CONFIG from '../../../globals/config';

const START = 1;
const NUMBER_OF_IMAGES = 100;

function image(restaurant) {
  for (let i = START; i < START + NUMBER_OF_IMAGES; i += 1) {
    const source = document.createElement('source');
    source.media = '(max-width: 600px)';
    source.srcset = `${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}`;

    const img = document.createElement('img');
    img.className = 'lazyload';
    img.src = `${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}`;
    img.alt = restaurant.name;

    const picture = document.createElement('picture');
    picture.append(source);
    picture.append(img);

    return picture.outerHTML;
  }
}

const restaurantList = (restaurants) => `<article class="card" tabindex="0">
    <figure>
      ${image(restaurants)}
      <figcaption>
        <h6 class="city">${restaurants.city}</h6>
        <h6 class="rating">${restaurants.rating}%</h6>
      </figcaption>
    </figure>
    <div class="text-card">
      <h5>${restaurants.name}</h5>
      <p>${cutDescription(restaurants.description, 10)}</p>
      <a href="#/detail/${restaurants.id}">Lihat Detail</a>
    </div>
  </article>`;

export default restaurantList;
