class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="sticky">
        <a href="/">
          <figure class="navlogo">
            <img src="images/logos/logo.png" alt="Daftar Restoran" width="50" />
            <figcaption>
              <h5>DAFRA</h5>
            </figcaption>
          </figure>
        </a>
        <div>
          <ul class="navbar-item" id="mobile">
            <li><a class="active" href="#/">Beranda</a></li>
            <li><a class="" href="#/favorit">Favorit</a></li>
            <li><a class="" href="https://github.com/reeansa">Tentang Kami</a></li>
          </ul>
          <a id="hamburger" href="#">☰</a>
        </div>
        <ul class="navbar-item-desktop" id="desktop">
          <li><a class=" active" href="#/">Beranda</a></li>
          <li><a class="" href="#/favorit">Favorit</a></li>
          <li><a class="" href="https://github.com/reeansa">Tentang Kami</a></li>
        </ul>
      </nav>`;

    const handleScroll = () => {
      const navbar = document.querySelector('#sticky');
      const hamburger = document.querySelector('#hamburger');
      const navItems = document.querySelectorAll('#desktop li a');
      const logoText = document.querySelector('.navbar .navlogo figcaption h5');
      if (window.scrollY > 100) {
        navbar.classList.add('sticky', 'bg-flush-orange-50');
        hamburger.style.color = '#421908';
        logoText.style.color = '#421908';
        navItems.forEach((nav) => {
          const navItem = nav;
          navItem.style.color = navItem.classList.contains('active') ? '' : '#421908';
        });
      } else {
        navbar.classList.remove('sticky', 'bg-flush-orange-50');
        hamburger.style.color = '';
        logoText.style.color = '';
        navItems.forEach((nav) => {
          const navItem = nav;
          navItem.style.color = '';
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
  }
}
customElements.define('navbar-component', Navbar);
