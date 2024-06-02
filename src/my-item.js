class MyItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styling for note item */
                .notes {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    grid-gap: 2rem;
                    padding: 3rem;
                  }
                  
                  .card {
                    background: #fff;
                    padding: 2rem; /* Padding yang lebih besar */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan yang lebih halus */
                    border-radius: 10px; /* Border radius yang lebih besar */
                    padding: 2rem; /* Padding yang lebih besar */
                    transition: transform 0.3s; /* Transisi untuk hover */
                    height: auto; /* Menyesuaikan tinggi kartu */
                  }
                  
                  .card:hover {
                    transform: translateY(-5px); /* Efek hover yang menaikkan card */
                    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
                  }
                  
                  .card h2 {
                    font-size: 18px; /* Ukuran font yang lebih besar */
                    margin-bottom: 1rem; /* Margin bawah untuk judul */
                  }
                  
                  .card p {
                    font-size: 14px; /* Ukuran font yang lebih besar */
                    color: #666; /* Warna teks yang lebih lembut */
                    line-height: 1.3; /* Tinggi baris yang lebih besar */
                    max-height: 7.5rem; /* Tinggi maksimum untuk 5 baris, asumsikan line-height 1.5rem */
                    overflow-y: auto;
                  }
                  
                  .button-container {
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 2rem; /* Margin atas untuk tombol */
                  }
                  
                  .del,
                  .ed {
                    padding: 1rem 2rem; /* Padding yang lebih besar */
                    font-size: 1.6rem; /* Ukuran font yang lebih besar */
                    color: #fff;
                    background: #eb5757; /* Warna latar untuk tombol delete */
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s; /* Transisi yang lebih cepat */
                  }
                  
                  .ed {
                    background: #27ae60; /* Warna latar untuk tombol edit */
                    margin-left: 1rem; /* Jarak antara tombol delete dan edit */
                  }
                  
                  .del:hover,
                  .ed:hover {
                    background-color: #cd2c2c; /* Warna hover untuk tombol delete */
                  }
                  
                  .ed:hover {
                    background-color: #219653; /* Warna hover untuk tombol edit */
                  }
            </style>
            <li>
            <h2>${title}</h2>
            ${this.getAttribute('title')}
            <p class="ptag">${desc}</p>
            ${this.getAttribute('body')}
            <div class="button-container">
            <button class="del">Del</button>
            <button class="ed">Edit</button>
            </div>
        </li>
        `;
    }
    
}

customElements.define('my-item', MyItem);
