import FavoriteRestaurants from "../src/scripts/data/idb-favorite-restaurants";
import { itActsAsFavoriteResaturantModel } from "./contracts/favoriteRestaurantContract";

describe("Favorite Restaurant Idb Contract Test Implementation", () => {
  afterEach(async () => {
    (await FavoriteRestaurants.getAllRestaurants()).forEach(
      async (restaurant) => {
        await FavoriteRestaurants.deleteRestaurants(restaurant.id);
      }
    );
  });

  itActsAsFavoriteResaturantModel(FavoriteRestaurants);
});
