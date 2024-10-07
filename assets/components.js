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
          <a href="/rules/characters/">Create a Character</a>
          <a href="/rules">Playing the Game</a>
          <a href="/lineages">Lineages</a>
          <a href="/heritages">Heritages</a>
          <a href="/backgrounds">Backgrounds</a>
          <a href="/classes">Classes</a>
          <a href="/talents">Talents</a>
          <a href="/spells">Spells</a>
          <a href="/items">Equipment</a>
      </nav>
    `;
  }
}

customElements.define('header-component', Header);