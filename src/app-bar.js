class AppBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Styling for app bar */
                <style>
                /* Styles for the header */
                header {
                    width: 100%;
                    display: flex;
                    min-height: 10vh;
                    background-color: #10182c; /* Warna yang lebih hangat untuk navigasi */
                    font-size: 3rem;
                    align-items: center;
                    justify-content: space-between; /* Menambahkan ruang di antara item navigasi */
                    padding: 0 3rem;
                                    }
                h1 {
                    letter-spacing: 2px;
                    color: white;
                    font-weight: bold;
                }
                
            </style>
            <header>
                <h1>Notes App</h1>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);
