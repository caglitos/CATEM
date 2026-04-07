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
    const stylesUrl = new URL("../css/styles.css", import.meta.url).href;
    const whatsappIcon = new URL("../assets/whatsapp-icon.svg", import.meta.url)
      .href;
    const mailIcon = new URL("../assets/mail-icon.svg", import.meta.url).href;
    const linkedinIcon = new URL("../assets/linkedin-icon.png", import.meta.url)
      .href;
    const facebookIcon = new URL("../assets/facebook-icon.svg", import.meta.url)
      .href;

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="${stylesUrl}" />
      
    <div class="container footer-content">
        <img src="${whatsappIcon}" alt="WhatsApp Icon" />
        <span>
          <a target="_blank" rel="noopener noreferrer" href="tel:+14698359627">+1 469 835 9627</a>
        </span>
        <img src="${mailIcon}" alt="Email Icon" />
        <span>
          <a target="_blank" rel="noopener noreferrer" href="mailto:aetncion@ucatem.mx">atencion@ucatem.mx</a>
        </span>
        <img src="${linkedinIcon}" alt="LinkedIn Icon" />
        <span>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/universidadcatem">
            UCATEM
          </a>
        </span>
        <img src="${facebookIcon}" alt="Facebook Icon" />
        <span>
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/universidadcatem'">
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
