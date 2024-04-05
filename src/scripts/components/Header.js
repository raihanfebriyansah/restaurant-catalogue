class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <header class="header">
                <figure>
                    <figcaption id="caption">
                        <h1>Selamat Datang</h1>
                        <h1>Website <span>DAFRA</span></h1>
                        <a href="#main" class="link-caption">Apa itu?</a>
                        <div class="arrow-down">
                            <a href="#main" class="arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 8 9" fill="none">
                                    <path
                                        d="M7.46416 3.88585L7.87085 4.29254C8.04305 4.46474 8.04305 4.74319 7.87085 4.91356L4.31143 8.47481C4.13923 8.64701 3.86077 8.64701 3.69041 8.47481L0.12915 4.91356C-0.0430502 4.74136 -0.0430502 4.46291 0.12915 4.29254L0.535837 3.88585C0.70987 3.71182 0.993817 3.71548 1.16419 3.89318L3.26723 6.10064V0.835703C3.26723 0.592057 3.46325 0.396042 3.70689 0.396042H4.29311C4.53675 0.396042 4.73277 0.592057 4.73277 0.835703V6.10064L6.83581 3.89318C7.00618 3.71365 7.29013 3.70999 7.46416 3.88585Z"
                                        fill="#FFF8ED" />
                                </svg>
                            </a>
                        </div>
                    </figcaption>
                </figure>
            </header>`;
  }
}

customElements.define('header-component', Header);
