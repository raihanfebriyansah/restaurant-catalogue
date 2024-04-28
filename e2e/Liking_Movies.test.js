const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorit");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#favorite-none");
  I.see("Belum ada restoran favorit yang ditambahkan :(");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.amOnPage("/");
  I.wait(2);
  I.seeElement("#daftar-restaurants");

  const firstRestaurantText = locate(".card .text-card h5").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurantText);
  const firstRestaurantAction = locate(".card .text-card a").first();
  I.click(firstRestaurantAction);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorit");
  I.seeElement("#daftar-restaurants");
  const likedRestaurantTitle = await I.grabTextFrom(".card .text-card h5");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario("unliking one restaurant", async ({ I }) => {
  I.amOnPage("/");

  I.wait(2);
  I.seeElement("#daftar-restaurants");

  const firstRestaurantAction = locate(".card .text-card a").first();
  I.click(firstRestaurantAction);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorit");

  I.seeElement("#daftar-restaurants");

  const likedRestaurrantAction = locate(".card .text-card a").first();
  I.click(likedRestaurrantAction);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.wait(1);

  I.amOnPage("/#/favorit");
  I.see("Belum ada restoran favorit yang ditambahkan :(", "#favorite-none");
});
