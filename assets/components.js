class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1><a href="/">Intrepid Role-Playing</a></h1>
      </header>

      <!-- Hamburger button for smaller screens -->
      <button class="menu-btn" onclick="toggleMenu()">☰ Menu</button>

      <!-- Navigation menu -->
      <nav id="menu">
          <a href="/characters">Character Creation</a>
          <a href="/rules">Playing the Game</a>
          <a href="/lineages">Lineages</a>
          <a href="/heritages">Heritages</a>
          <a href="/backgrounds">Backgrounds</a>
          <a href="/classes">Classes</a>
          <a href="/talents">Talents</a>
          <a href="/spells">Spells</a>
          <a href="/equipment">Equipment</a>
      </nav>
    `;
  }
}

customElements.define('header-component', Header);

class VersionComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    fetch('/assets/versions.json')
      .then(response => response.json())
      .then(json => {
        const latestVersion = json.versions[0]; // Get first item from versions array
        this.querySelector("#version").innerHTML = latestVersion.version;
      })
      .catch(error => {
        console.error('Error fetching version:', error);
        this.querySelector("#version").innerHTML = "?.?.?";
      });
  }

  render() {
    this.innerHTML = `
      Version <a id="version" href="/version">Loading...</a>
    `;
  }
}

customElements.define('version-component', VersionComponent);