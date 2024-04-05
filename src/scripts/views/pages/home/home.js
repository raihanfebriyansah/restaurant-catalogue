import RestaurantsResource from '../../../data/restaurant-resource';
import { dataRestaurants } from './daftarRestoran';
import '../../../components/Header';

const home = {
  async render() {
    return `<article class="container" style="margin-bottom: 3rem;">
      <header>
        <h2>DAFRA?</h2>
      </header>
      <h5>
        Daftar Restoran Indonesia! Kami adalah sebuah platform yang didedikasikan untuk menyediakan informasi terkini
        tentang beragam restoran yang tersebar di seluruh Indonesia. DAFRA hadir sebagai solusi bagi Anda yang tengah
        mencari tempat makan yang sesuai dengan selera dan kebutuhan Anda. Kami memahami bahwa mencari restoran yang
        cocok untuk Anda bisa menjadi tugas yang menantang, terutama di tengah maraknya pilihan restoran yang ada saat
        ini. DAFRA bertujuan untuk menyederhanakan proses pencarian tersebut dengan menyajikan katalog restoran yang
        lengkap dan terpercaya, sehingga Anda dapat dengan mudah menemukan tempat makan yang sesuai dengan preferensi
        Anda, mulai dari restoran mewah hingga warung makan tradisional.<br><br>
          Tim DAFRA terdiri dari individu yang bersemangat dan berpengalaman dalam industri kuliner, yang secara berkala
          mengupdate informasi restoran-restoran terbaru untuk memastikan bahwa Anda mendapatkan akses ke informasi
          terkini. Kami juga memberikan ulasan dan rekomendasi dari tim ahli kami untuk membantu Anda dalam memilih
          restoran yang tepat sesuai dengan suasana, harga, dan jenis masakan yang Anda inginkan. Kami percaya bahwa
          kepuasan pelanggan adalah prioritas utama kami, oleh karena itu, kami selalu berusaha untuk meningkatkan
          pengalaman pengguna DAFRA agar semakin memuaskan. Kami juga terbuka untuk masukan dan saran dari Anda, karena
          kami percaya bahwa kolaborasi dengan pengguna adalah kunci keberhasilan kami dalam menyediakan layanan yang
          berkualitas.<br><br>
            Terima kasih telah memilih DAFRA sebagai teman setia Anda dalam menjelajahi dunia kuliner Indonesia. Segera
            temukan restoran favorit Anda bersama kami dan nikmati pengalaman kuliner yang tak terlupakan!
          </h5>
          </article>
          <article class="container" style="margin-bottom: 3rem;">
            <header>
              <h2>Daftar Restoran</h2>
            </header>
            <section id="daftar-restaurants" class="grid-container"></section>;
          </article>`;
  },

  async afterRender() {
    const dataResto = await RestaurantsResource.listRestaurants();
    const container = document.querySelector('#daftar-restaurants');
    dataResto.forEach((restaurants) => {
      container.innerHTML += dataRestaurants(restaurants);
    });
  },
};

export default home;
