class AboutMe extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
    <style>
div {
  text-align: center;
}

    img {
      width: 3%;
      margin:10px;
    }
    </style>
  
    <div>
    <a href="https://github.com/purvitrivedi" target="_blank"><img src="styles/github.png" alt='github link'></a>
    <a href="https://purvitrivedi.com/" target="_blank"><img src="styles/website.png" alt='website link'></a>
    </div>
    <slot></slot>
`
  }

}

customElements.define('pt-about-me', AboutMe)