const getNotes = () => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
  
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllNotes(responseJson.data);
      }
    };
  
    xhr.onerror = function () {
      showResponseMessage('Gagal memuat daftar catatan');
    };
  
    // Membuat GET request dan menetapkan target URL
    xhr.open('GET', 'https://notes-api.dicoding.dev/v2/notes');
  
    // Mengirimkan request
    xhr.send();
  };
  
  const postNote = (title, body) => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
  
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        showResponseMessage('Catatan berhasil ditambahkan');
      }
    };
  
    xhr.onerror = function () {
      showResponseMessage('Gagal menambahkan catatan');
    };
  
    // Membuat POST request dan menetapkan target URL
    xhr.open('POST', 'https://notes-api.dicoding.dev/v2/notes');
  
    // Menetapkan header content-type
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    // Mengirimkan request dengan data catatan baru
    xhr.send(JSON.stringify({ title, body }));
  };
  
  const deleteNote = (id) => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
  
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        showResponseMessage('Catatan berhasil dihapus');
      }
    };
  
    xhr.onerror = function () {
      showResponseMessage('Gagal menghapus catatan');
    };
  
    // Membuat DELETE request dan menetapkan target URL
    xhr.open('DELETE', `https://notes-api.dicoding.dev/v2/notes/${id}`);
  
    // Mengirimkan request
    xhr.send();
  };
  
  // Fungsi untuk menampilkan pesan respons
  const showResponseMessage = (message = 'Cek koneksi Anda') => {
    console.log(message);
  };
  
  // Fungsi untuk merender semua catatan ke dalam DOM
  const renderAllNotes = (notes) => {
    const notesElement = document.getElementById('notes');
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.innerText = note.title;
      notesElement.appendChild(noteElement);
    });
  };
  
  // Contoh penggunaan fungsi
  getNotes(); // Untuk mendapatkan dan menampilkan daftar catatan
  postNote('Judul Catatan', 'Isi dari catatan'); // Untuk menambahkan catatan baru
  deleteNote('id_catatan'); // Ganti 'id_catatan' dengan ID catatan yang ingin dihapus
  