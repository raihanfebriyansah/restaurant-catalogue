import FavoriteRestaurants from './idb-favorite-restaurants';
import API_ENDPOINT from '../globals/api-endpoints';

class RestaurantsResource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async isRestaurantFavorite(id) {
    const favorites = await FavoriteRestaurants.getAllRestaurants(id);
    return favorites.some((restaurant) => restaurant.id === id);
  }
}

export default RestaurantsResource;
