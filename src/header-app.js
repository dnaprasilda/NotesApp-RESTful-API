class HeaderApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const bgColor = this.getAttribute('bgcolor') || 'black';

        this.shadowRoot.innerHTML = `
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
                    font-size: 3rem;
                }
                nav {
                    margin-top: 10px;
                    margin-right: 20px;
                    font-size: 15px
                }
                nav a {
                    color: white;
                    text-decoration: none;
                    margin: 0 8px;
                }
                nav a:hover {
                    text-decoration: none;
                    color: yellow;
                }
                
            </style>
            <header>
                <h1>Notes App</h1>
                <nav>
                    <a href="#">New Notes</a>
                    <a href="#">Completed</a>
                    <a href="#">Uncomplete</a>
                </nav>
            </header>
        `;
    }
}

customElements.define('header-app', HeaderApp);
