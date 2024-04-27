import UrlParser from '../../../routes/url-parser';
import RestaurantsResource from '../../../data/restaurant-resource';
import FavoriteRestaurants from '../../../data/idb-favorite-restaurants';
import detailRestaurants from './detail-restaurants';
import { like, liked } from './like';

let likeButtonContainer;
const Detail = {

  async render() {
    return '<article id="detail_restaurants"></article>';
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantsResource.detailRestaurants(url.id);
    const detailContainer = document.querySelector('#detail_restaurants');
    detailContainer.innerHTML = detailRestaurants(detail);

    likeButtonContainer = document.getElementById('likeContainer');
    const isFavorite = await RestaurantsResource.isRestaurantFavorite(detail.id);
    if (isFavorite) {
      likeButtonContainer.innerHTML = liked;
    } else {
      likeButtonContainer.innerHTML = like;
    }

    likeButtonContainer.addEventListener('click', async () => {
      await this.toggleFavorite(detail);
    });
  },

  async toggleFavorite(restaurants) {
    const isFavorite = await RestaurantsResource.isRestaurantFavorite(restaurants.id);
    if (isFavorite) {
      await this.removeFavorite(restaurants.id);
      // likeButtonContainer.innerHTML = like;
      // eslint-disable-next-line no-console
      console.log('Restaurant removed from favorites.');
    } else {
      await this.saveFavorite(restaurants);
      // likeButtonContainer.innerHTML = liked;
      // eslint-disable-next-line no-console
      console.log('Restaurant added to favorites.');
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Restaurant Favorit', {
        body: isFavorite ? 'Restoran dihapus dari daftar favorit.' : 'Restoran ditambahkan ke daftar favorit.',
        icon: 'icons/icon-192x192.png',
      });

      notification.addEventListener('click', () => {
        window.location.href = `#/detail/${restaurants.id}`;
      });
    }
  },

  async saveFavorite(restaurants) {
    await FavoriteRestaurants.putRestaurants(restaurants);
  },

  async removeFavorite(restaurantId) {
    await FavoriteRestaurants.deleteRestaurants(restaurantId);
  },

};

export default Detail;
