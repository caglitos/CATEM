import { WebComponentBase } from "./webcomponent-base.js";

export class NavigationBar extends WebComponentBase {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
    this._linkClickHandler = this._linkClickHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
  }

  render() {
    const logoUrl = new URL("../assets/imagotipo.svg", import.meta.url).href;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          gap: 1rem;
        }

        .logo img {
          height: 64px;
          object-fit: contain;
        }

        .menu {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .menu a {
          text-decoration: none;
          color: #ffffff;
          font-family: "Source Sans Pro", sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .btn {
          display: inline-block;
          background: #d82323;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .btn:hover {
          background: #a81414;
        }

        .burger {
          display: none;
          background: transparent;
          border: 0;
          cursor: pointer;
          padding: 0.25rem;
        }

        .burger span {
          display: block;
          width: 24px;
          height: 2px;
          margin: 5px 0;
          background: #ffffff;
          transition: 0.2s ease;
        }

        @media (max-width: 768px) {
          .nav {
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: 18px 16px;
          }

          .logo img {
            height: 52px;
          }

          .burger {
            display: inline-block;
          }

          .menu {
            display: none;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            width: 100%;
            margin-top: 0.75rem;
          }

          .menu.open {
            display: flex;
          }

          .menu a {
            font-size: 1rem;
          }
        }

        @media (min-width: 769px) {
          .menu {
            display: flex !important;
          }
        }
      </style>

      <div class="nav">
        <div class="logo">
          <img src="${logoUrl}" alt="Logo Universidad CATEM" />
        </div>

        <button id="btn" class="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="menu" class="menu">
          <a href="#">Oferta educativa</a>
          <a href="#">CATEM Lab</a>
          <a href="#" class="btn btn-small">Contacto</a>
        </nav>
      </div>
    `;
  }

  bindEvents() {
    const btn = this.shadowRoot.querySelector("#btn");
    const links = this.shadowRoot.querySelectorAll("#menu a");

    if (btn) {
      btn.addEventListener("click", this._clickHandler);
    }

    links.forEach((link) => {
      link.addEventListener("click", this._linkClickHandler);
    });

    window.addEventListener("resize", this._resizeHandler);
  }

  disconnectedCallback() {
    const btn = this.shadowRoot?.querySelector("#btn");
    const links = this.shadowRoot?.querySelectorAll("#menu a") || [];

    if (btn) {
      btn.removeEventListener("click", this._clickHandler);
    }

    links.forEach((link) => {
      link.removeEventListener("click", this._linkClickHandler);
    });

    window.removeEventListener("resize", this._resizeHandler);

    super.disconnectedCallback();
  }

  _clickHandler() {
    const menu = this.shadowRoot?.querySelector("#menu");
    const btn = this.shadowRoot?.querySelector("#btn");
    if (!menu || !btn) return;

    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  }

  _linkClickHandler() {
    const menu = this.shadowRoot?.querySelector("#menu");
    const btn = this.shadowRoot?.querySelector("#btn");
    if (!menu || !btn) return;

    if (window.innerWidth <= 768) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  }

  _resizeHandler() {
    const menu = this.shadowRoot?.querySelector("#menu");
    const btn = this.shadowRoot?.querySelector("#btn");
    if (!menu || !btn) return;

    if (window.innerWidth > 768) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  }
}

customElements.define("navigation-bar", NavigationBar);
