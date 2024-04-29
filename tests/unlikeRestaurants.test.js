import FavoriteRestaurants from "../src/scripts/data/idb-favorite-restaurants";
import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";

describe("Unliking A Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurants.putRestaurants({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurants.deleteRestaurants(1);
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="hapus dari favorit"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="tambahkan ke favorit"]')
    ).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeContainer"),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestaurants.getAllRestaurants()).toEqual([]);
  });

  it("should not throw error if the unliked restaurant is not in the list", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeContainer"),
      restaurant: {
        id: 1,
      },
    });
    await FavoriteRestaurants.deleteRestaurants(1);

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurants.getAllRestaurants()).toEqual([]);
  });
});
