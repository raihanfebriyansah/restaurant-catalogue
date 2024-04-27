/* eslint-disable max-len */
// eslint-disable-next-line object-curly-newline
// import jest, { describe, beforeEach, it, expect } from 'jest'; // Import the 'jest' package and the 'describe' function
import Detail from '../src/scripts/views/pages/detail/detail'; // Import modul yang akan diuji
import RestaurantsResource from '../src/scripts/data/restaurant-resource';
import FavoriteRestaurants from '../src/scripts/data/idb-favorite-restaurants';

jest.mock('../src/scripts/data/restaurant-resource'); // Mock module restaurant-resource
jest.mock('../src/scripts/data/idb-favorite-restaurants'); // Mock module idb-favorite-restaurants

describe('Integration Test for Like and Unlike Restaurants', () => {
  beforeEach(() => {
    // Clear all mocks' calls and instances before each test
    jest.clearAllMocks();
  });

  it('should like a restaurant', async () => {
    // Set up mock behavior for isRestaurantFavorite and putRestaurants methods
    RestaurantsResource.isRestaurantFavorite.mockResolvedValueOnce(false); // Restaurant is not yet favorited
    FavoriteRestaurants.putRestaurants.mockResolvedValueOnce(); // Mock successful adding to favorites

    // Render detail and simulate like button click
    await Detail.afterRender();
    const detailContainer = document.querySelector('#detail_restaurants');
    const likeButtonContainer = document.getElementById('likeContainer');
    likeButtonContainer.click();

    // Verify that the restaurant is added to favorites
    expect(RestaurantsResource.isRestaurantFavorite).toHaveBeenCalled();
    expect(FavoriteRestaurants.putRestaurants).toHaveBeenCalled();
    expect(detailContainer.innerHTML).toContain('liked');
  });

  it('should unlike a restaurant', async () => {
    // Set up mock behavior for isRestaurantFavorite and deleteRestaurants methods
    RestaurantsResource.isRestaurantFavorite.mockResolvedValueOnce(true); // Restaurant is already favorited
    FavoriteRestaurants.deleteRestaurants.mockResolvedValueOnce(); // Mock successful removing from favorites

    // Render detail and simulate like button click
    await Detail.afterRender();
    const detailContainer = document.querySelector('#detail_restaurants');
    const likeButtonContainer = document.getElementById('likeContainer');
    likeButtonContainer.click();

    // Verify that the restaurant is removed from favorites
    expect(RestaurantsResource.isRestaurantFavorite).toHaveBeenCalled();
    expect(FavoriteRestaurants.deleteRestaurants).toHaveBeenCalled();
    expect(detailContainer.innerHTML).toContain('like');
  });
});
