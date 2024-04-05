import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.buttons = button;
    this.drawers = drawer;
    this.contents = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this.buttons,
      drawer: this.drawers,
      content: this.contents,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.contents.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
