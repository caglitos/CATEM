export class WebComponentBase extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.onConnected();
  }

  disconnectedCallback() {
    this.onDisconnected();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.onAttributeChanged(name, oldValue, newValue);
      this.render();
      this.bindEvents();
    }
  }

  /**
   * Sobrescribe este método en las clases hijas
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
        }
      </style>
      <slot></slot>
    `;
  }

  /**
   * Sobrescribe este método si necesitas eventos
   */
  bindEvents() {}

  /**
   * Hook al conectar el componente al DOM
   */
  onConnected() {}

  /**
   * Hook al desconectar el componente del DOM
   */
  onDisconnected() {}

  /**
   * Hook cuando cambian atributos observados
   */
  onAttributeChanged(name, oldValue, newValue) {}
}
