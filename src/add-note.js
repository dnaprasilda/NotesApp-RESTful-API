// Custom Element: Add Note Form
class AddNoteForm extends HTMLElement {
    constructor() {
        super();
        // Buat shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Definisikan template
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Gaya CSS untuk custom element */
                /* Gunakan gaya CSS sesuai kebutuhan */
                form {
                    width: 500px;
                    background-color: #ffffff;
                    padding: 2rem; /* Padding yang lebih besar */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan yang lebih halus */
                    border-radius: 10px;
                }
                /* Gaya CSS lainnya di sini */

                .submit {
                    width: auto;
                    padding: 1rem 2rem; /* Padding yang lebih besar */
                    font-size: 2rem; /* Ukuran font yang lebih besar */
                    color: #fff;
                    background-color: #10182c; /* Warna tombol yang serasi dengan navigasi */
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s; /* Transisi yang lebih cepat */
                }

                .submit:hover {
                    background-color: #f1b722; /* Warna hover yang lebih gelap */
                }

                /* Gaya untuk input yang tidak valid */
                input.error,
                textarea.error {
                    border-color: #ff4d4d; /* Warna border merah untuk input yang tidak valid */
                }

                /* Gaya untuk pesan kesalahan */
                .error-message {
                    color: #ff4d4d; /* Warna teks merah untuk pesan kesalahan */
                    font-size: 1.4rem; /* Ukuran font pesan kesalahan */
                    margin-top: 0.5rem; /* Margin atas untuk pesan kesalahan */
                    visibility: hidden; /* Pesan kesalahan awalnya disembunyikan */
                }
            </style>
            <form id="addNoteForm">
                <div class="row-control">
                    <label for="text">Judul</label>
                    <input type="text" id="text" placeholder="Masukkan Judul Catatan" spellcheck="false">
                    <div id="titleError" class="error-message"></div>
                </div>
                <div class="row-control">
                    <label for="desc">Deskripsi</label>
                    <textarea id="desc" placeholder="Masukkan Deskripsi Catatan" rows="4" spellcheck="false"></textarea>
                    <div id="descError" class="error-message"></div>
                </div>
                <button type="submit" class="submit">+</button>
            </form>
        `;

        // Salin konten template ke shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Tambahkan event listener untuk tombol submit
        shadow.querySelector('.submit').addEventListener('click', this.handleSubmit.bind(this));

        // Tambahkan event listener untuk input judul
        const titleInput = shadow.querySelector('#text');
        titleInput.addEventListener('input', () => {
            this.validateInput(titleInput, 'titleError');
        });

        // Tambahkan event listener untuk input deskripsi
        const descInput = shadow.querySelector('#desc');
        descInput.addEventListener('input', () => {
            this.validateInput(descInput, 'descError');
        });

        // Tambahkan event listener untuk menampilkan popup saat kursor berada di input yang belum diisi
        titleInput.addEventListener('mouseover', () => {
            if (!titleInput.value.trim()) {
                this.showPopup(titleInput, 'titleError', 'Harap isi judul catatan.');
            } else {
                this.hidePopup(titleInput, 'titleError');
            }
        });

        descInput.addEventListener('mouseover', () => {
            if (!descInput.value.trim()) {
                this.showPopup(descInput, 'descError', 'Harap isi deskripsi catatan.');
            } else {
                this.hidePopup(descInput, 'descError');
            }
        });
    }

    // Method untuk menangani submit form
    handleSubmit(event) {
        event.preventDefault(); // Mencegah aksi default dari form submit

        // Ambil nilai judul dan isi catatan dari input
        const titleInput = this.shadowRoot.getElementById('text');
        const descInput = this.shadowRoot.getElementById('desc');

        // Validasi input sebelum mengirimkan event
        const isValid = this.validateForm();

        if (isValid) {
            // Kirim event 'add-note' dengan detail data catatan
            this.dispatchEvent(new CustomEvent('add-note', {
                detail: {
                    title: titleInput.value.trim(),
                    body: descInput.value.trim()
                }
            }));

            // Kosongkan input setelah catatan dibuat
            titleInput.value = '';
            descInput.value = '';
        }
    }

    // Method untuk validasi input form
    validateForm() {
        const titleInput = this.shadowRoot.getElementById('text');
        const descInput = this.shadowRoot.getElementById('desc');

        let isValid = true;

        if (!titleInput.value.trim()) {
            this.setError(titleInput, 'titleError', 'Judul tidak boleh kosong');
            isValid = false;
        } else {
            this.clearError(titleInput, 'titleError');
        }

        if (!descInput.value.trim()) {
            this.setError(descInput, 'descError', 'Deskripsi tidak boleh kosong');
            isValid = false;
        } else {
            this.clearError(descInput, 'descError');
        }

        return isValid;
    }

    // Method untuk menampilkan popup
    showPopup(input, errorId, message) {
        const errorElement = this.shadowRoot.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.visibility = 'visible';
    }

    // Method untuk menyembunyikan popup
    hidePopup(input, errorId) {
        const errorElement = this.shadowRoot.getElementById(errorId);
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
    }

    // Method untuk menampilkan pesan error
    setError(input, errorId, errorMessage) {
        input.classList.add('error');
        const errorElement = this.shadowRoot.getElementById(errorId);
        errorElement.textContent = errorMessage;
    }

    // Method untuk menghapus pesan error
    clearError(input, errorId) {
        input.classList.remove('error');
        const errorElement = this.shadowRoot.getElementById(errorId);
        errorElement.textContent = '';
    }

    // Method untuk validasi input individu
    validateInput(input, errorId) {
        if (!input.value.trim()) {
            this.setError(input, errorId, 'Kolom ini tidak boleh kosong');
        } else {
            this.clearError(input, errorId);
        }
    }
}

// Daftarkan custom element ke dalam DOM
customElements.define('add-note', AddNoteForm);
