import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurants = {
  async getRestaurants(id) {
    if (!id) {
      return;
    }

    await (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async putRestaurants(restaurant) {
    if (!Object.prototype.hasOwnProperty.call(restaurant, 'id')) {
      return;
    }

    await (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurants(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurants;
