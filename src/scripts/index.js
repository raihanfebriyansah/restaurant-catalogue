import 'regenerator-runtime';
import '../styles/main.css';
import './components/Navbar';
import './components/Footer';
import App from './views/app';
import checkNotification from './utils/check-notification';

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('.navbar-item'),
  navbar: document.querySelector('.navbar'),
  textElement: document.querySelector('.navlogo figcaption h5'),
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  checkNotification();
  const navbarLinks = document.querySelectorAll('.navbar-item-desktop li a');
  navbarLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      navbarLinks.forEach((navLink) => navLink.classList.remove('active'));
      event.target.classList.add('active');
    });
  });
  app.renderPage();
});
