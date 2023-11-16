import DrawerInitiator from '../utils/drawer_initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      const mainContent = document.getElementById('isi-content');
      mainContent.tabIndex = -1;
      mainContent.focus();
      mainContent.tabIndex = 0;
    });

    const elements = document.querySelectorAll('a, button, input');
    elements.forEach((e) => {
      if (e.offsetWidth < 44 || e.offsetHeight < 44) {
        console.log('tes');
      }
    });
  }
}

export default App;
