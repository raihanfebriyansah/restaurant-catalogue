import CONFIG from '../../../globals/config';

export default function detailRestaurants(restaurant) {
  const foods = restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('');
  const drinks = restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('');
  const reviews = restaurant.customerReviews.map((review) => `<section class="ulasan">
      <div class="header_ulasan">
        <h3>${review.name}</h3>
        <h3>${review.date}</h3>
      </div>
      <p>${review.review}</p>
    </section>`).join('');

  return `<header class="detail">
  <h1>Detail Restoran</h1>
</header>
<article class="container" style="margin-top: 2rem;">
  <header>
    <h2>${restaurant.name}</h2>
  </header>
  <section>
    <div class="grid-item">
      <div class="description">
        <div class="heading" style="margin-bottom: 2rem;">
          <h4>Alamat</h4>
          <h4>${restaurant.address}</h4>
        </div>
        <div class="heading">
          <h4>Kota</h4>
          <h4>${restaurant.city}</h4>
        </div>
        <p style="margin-top: 2rem;">${restaurant.description}</p>
        <section class="grid-item" style="margin-top: 1rem;">
          <div>
            <h4 style="margin-bottom: 1rem;">Menu makanan</h4>
            <ol class="menu">
              ${foods}
            </ol>
          </div>
          <div>
            <h4 style="margin-bottom: 1rem;">Menu minuman</h4>
            <ol class="menu">
              ${drinks}
            </ol>
          </div>
        </section>
        <div class="button_fav" id="likeContainer">
        </div>
      </div>
      <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" width="100%" alt="Gambar ${restaurant.name}">
    </div>
  </section>
</article>
<article class="container" style="margin-top: 2rem;">
  <header>
    <h2>Ulasan Pelanggan</h2>
  </header>
  ${reviews}
</article>`;
}
