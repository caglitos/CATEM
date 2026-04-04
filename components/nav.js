import { WebComponentBase } from "./webcomponent-base.js";

export class NavigationBar extends WebComponentBase {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/css/styles.css" />
      
    <div class="nav">
        <div class="logo">
          <img src="/assets/imagotipo.svg" alt="Logo Universidad CATEM" />
        </div>

        <nav class="menu">
          <a href="#">Oferta educativa</a>
          <a href="#">CATEM Lab</a>
          <a href="#" class="btn btn-small">Contacto</a>
        </nav>
      </div>
    `;
  }

  bindEvents() {
    const btn = this.shadowRoot.querySelector("#btn");
    if (btn) {
      btn.addEventListener("click", this._clickHandler);
    }
  }

  disconnectedCallback() {
    const btn = this.shadowRoot?.querySelector("#btn");
    if (btn) {
      btn.removeEventListener("click", this._clickHandler);
    }
    super.disconnectedCallback();
  }

  _clickHandler() {
    this.dispatchEvent(
      new CustomEvent("my-click", {
        detail: {
          label: this.getAttribute("label") || "Botón",
        },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define("navigation-bar", NavigationBar);
