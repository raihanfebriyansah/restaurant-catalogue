class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="sticky">
        <a href="/">
          <figure class="navlogo">
            <img src="images/logos/logo.png" alt="Burger Santuy" width="50" />
            <figcaption>
              <h5>DAFRA</h5>
            </figcaption>
          </figure>
        </a>
        <div>
          <ul class="navbar-item" id="mobile">
            <li><a class="nav-item active" href="#/">Beranda</a></li>
            <li><a class="nav-item" href="#/favorit">Favorit</a></li>
            <li><a class="nav-item" href="https://github.com/reeansa">Tentang Kami</a></li>
          </ul>
          <a id="hamburger" href="#">☰</a>
        </div>
        <ul class="navbar-item-desktop" id="desktop">
          <li><a class="nav-item active" href="#/">Beranda</a></li>
          <li><a class="nav-item" href="#/favorit">Favorit</a></li>
          <li><a class="nav-item" href="https://github.com/reeansa">Tentang Kami</a></li>
        </ul>
      </nav>`;

    const handleScroll = () => {
      const navbar = document.querySelector('#sticky');
      const hamburger = document.querySelector('#hamburger');
      const navItems = document.querySelectorAll('#desktop li a');
      const logoText = document.querySelector('.navbar .navlogo figcaption h5');
      if (window.innerWidth > 1200) {
        navItems.forEach((nav) => {
          const color = nav.classList.contains('active') ? '' : '#421908';
          nav.style.color = color;
        });
      }
      if (window.scrollY > 100) {
        navbar.classList.add('sticky', 'bg-flush-orange-50');
        hamburger.style.color = '#421908';
        logoText.style.color = '#421908';
        navItems.forEach((nav) => {
          const color = nav.classList.contains('active') ? '' : '#421908';
          nav.style.color = color;
        });
      } else {
        navbar.classList.remove('sticky', 'bg-flush-orange-50');
        logoText.style.color = '';
        hamburger.style.color = '';
        navItems.forEach((nav) => {
          const color = nav.classList.contains('active') ? '' : '';
          nav.style.color = color;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }
}

customElements.define('navbar-component', Navbar);