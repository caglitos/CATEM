// ejemplo de un componente web personalizado, un botón con estilos y eventos personalizados
import { WebComponentBase } from "./webcomponent-base.js";

export class LicenciaturaCard extends WebComponentBase {
  static get observedAttributes() {
    return ["imagen", "titulo", "text", "document"];
  }

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  render() {
    const imagen = this.getAttribute("imagen") || "";
    const titulo = this.getAttribute("titulo") || "";
    const text = this.getAttribute("text") || "";
    const document = this.getAttribute("document") || "";

    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
        }

        .default {
          background: #eee;
          color: #222;
        }

        .primary {
          background: #007bff;
          color: white;
        }
      </style>

      <div
        class="program-card"
        style="
          background-image: url(&quot;${imagen}&quot;);
        "
      >
        <div class="program-content">
          <h3>${titulo}</h3>
          <p>${text}</p>
          <a href="${document}" class="btn btn-small">Mas Informacion</a>
        </div>
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

customElements.define("licenciatura-card", LicenciaturaCard);
