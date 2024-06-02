import "./style.css";
import "./my-item";
import "./add-note";
import "./header-app";
import "./LoadingIndicator";


// Fungsi untuk menambahkan catatan ke DOM
function addNoteToDOM(id, title, desc, archived = false) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (archived) {
    card.classList.add("archived"); // Tambahkan kelas untuk styling catatan yang diarsipkan
  }
  card.setAttribute('data-id', id);
  card.innerHTML = `
    <h2>${title}</h2>
    <p class="ptag">${desc}</p>
    <div class="button-container">
      <button class="del">Del</button>
      <button class="ed">Edit</button>
      <button class="archive">Arsipkan</button>
      <button class="unarchive">Batal Arsipkan</button>
    </div>`;
  document.getElementById('notes').appendChild(card);

  // Tambahkan event listener untuk tombol arsipkan dan batal arsipkan
  card.querySelector('.archive').addEventListener('click', () => archiveNote(id, card));
  card.querySelector('.unarchive').addEventListener('click', () => unarchiveNote(id, card));
}


async function getNotes() {
  const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const responseData = await response.json();
  
  if (responseData.status === 'success' && Array.isArray(responseData.data)) {
    // Mengosongkan elemen 'notes' sebelum menambahkan catatan baru
    document.getElementById('notes').innerHTML = '';
    responseData.data.forEach(note => {
      addNoteToDOM(note.id, note.title, note.body);
    });
  } else {
    console.error('Expected an array of notes', responseData);
  }
}

gsap.from(".container", { duration: 1, y: 50, opacity: 0 });

async function createNote(title, body) {
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error('Gagal membuat catatan, silakan coba lagi.');
    }

    const data = await response.json();
    console.log('Catatan berhasil dibuat:', data);
  } catch (error) {
    alert(error.message); // Menampilkan pesan error menggunakan alert
  } finally {
    hideLoadingIndicator();
  }
}

// Fungsi untuk menghapus catatan dari server
async function deleteNote(id) {
  await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
    method: 'DELETE',
  });
}

// Fungsi untuk mengedit catatan di server
async function editNote(id, newTitle, newDesc) {
  const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle, body: newDesc }),
  });

  const data = await response.json();
  return data;
}

// Modifikasi fungsi archiveNote dan unarchiveNote untuk menerima elemen card
async function archiveNote(noteId, cardElement) {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Gagal mengarsipkan catatan.');
    }

    const data = await response.json();
    console.log(data.message); // "Note archived"
    cardElement.classList.add('archived'); // Tandai card sebagai diarsipkan

  } catch (error) {
    alert(error.message);
  }
}

async function unarchiveNote(noteId, cardElement) {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Gagal membatalkan pengarsipan catatan.');
    }

    const data = await response.json();
    console.log(data.message); // "Note unarchived"
    cardElement.classList.remove('archived'); // Hapus tanda arsip dari card

    
  } catch (error) {
    alert(error.message);
  }
}

// Event listener untuk tombol submit
document.querySelector(".submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#text").value;
  const descInput = document.querySelector('#desc').value;
  if (titleInput && descInput) {
    await createNote(titleInput, descInput);
    // Memanggil kembali fungsi getNotes() agar catatan terbaru ditampilkan setelah menambahkan catatan baru
    getNotes();
    // Mengosongkan nilai input setelah menambahkan catatan baru
    document.querySelector("#text").value = '';
    document.querySelector('#desc').value = '';
  }
});

// Event delegation untuk tombol delete dan edit
document.getElementById('notes').addEventListener('click', async (e) => {
  const card = e.target.closest(".card");
  if (e.target.classList.contains('del')) {
    const id = card.getAttribute('data-id');
    if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      await deleteNote(id);
      card.remove();
    }
  } else if (e.target.classList.contains('ed')) {
    const id = card.getAttribute('data-id');
    const oldTitle = card.querySelector("h2").innerText;
    const oldDesc = card.querySelector(".ptag").innerText;
    const newTitle = prompt("Masukkan judul baru:", oldTitle);
    const newDesc = prompt("Masukkan deskripsi baru:", oldDesc);
    if (newTitle && newDesc) {
      const updatedNote = await editNote(id, newTitle, newDesc);
      if (updatedNote) {
        card.querySelector("h2").innerText = newTitle;
        card.querySelector(".ptag").innerText = newDesc;
      } else {
        alert("Catatan tidak ditemukan.");
      }
    }
  }
});

// Memanggil fungsi getNotes saat aplikasi dimuat
getNotes();

function showLoadingIndicator() {
  // Pastikan element loading-indicator ada di CSS dan terlihat
  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList.add('loading-indicator');
  document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  // Pastikan element loading-indicator dihapus dari DOM
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    document.body.removeChild(loadingIndicator);
  }
}

// Contoh pemanggilan fungsi
showLoadingIndicator();
// Simulasikan delay dari network request
setTimeout(() => {
  hideLoadingIndicator();
}, 3000); // Delay 3 detik

