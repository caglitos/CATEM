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
      
    <div class="container footer-content">
        <img src="/assets/whatsapp-icon.svg" alt="WhatsApp Icon" />
        <span>
          <a href="tel:+14698359627">+1 469 835 9627</a>
        </span>
        <img src="/assets/mail-icon.svg" alt="Email Icon" />
        <span>
          <a href="mailto:aetncion@ucatem.mx">atencion@ucatem.mx</a>
        </span>
        <img src="/assets/linkedin-icon.png" alt="LinkedIn Icon" />
        <span>
          <a href="https://www.linkedin.com/company/universidadcatem" target="_blank" rel="noopener noreferrer">
            UCATEM
          </a>
        </span>
        <img src="/assets/facebook-icon.svg" alt="Facebook Icon" />
        <span>
          <a href="https://www.facebook.com/universidadcatem" target="_blank" rel="noopener noreferrer">
            UCATEM
          </a>
        </span>  
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

customElements.define("footer-component", NavigationBar);
