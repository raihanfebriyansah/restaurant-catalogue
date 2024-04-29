import UrlParser from "../../../routes/url-parser";
import RestaurantsResource from "../../../data/restaurant-resource";
import detailRestaurants from "./detail-restaurants";
import LikeButtonInitiator from "../../../utils/like-button-initiator";

let likeButtonContainer;
const Detail = {
  async render() {
    return '<article id="detail_restaurants"></article>';
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantsResource.detailRestaurants(url.id);
    const detailContainer = document.querySelector("#detail_restaurants");
    detailContainer.innerHTML = detailRestaurants(detail);

    likeButtonContainer = document.getElementById("likeContainer");
    LikeButtonInitiator.init({
      likeButtonContainer,
      restaurant: {
        id: detail.id,
        name: detail.name,
        description: detail.description,
        city: detail.city,
        rating: detail.rating,
        pictureId: detail.pictureId,
      },
    });
  },
};

export default Detail;
