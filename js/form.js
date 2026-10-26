document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('caption-form');
    const templateInput = document.getElementById('template');
    const namaInput = document.getElementById('nama');
    const hargaInput = document.getElementById('harga');
    const kategoriInput = document.getElementById('kategori');
    const catatanInput = document.getElementById('catatan');
    
    const previewBox = document.getElementById('caption-preview');
    const btnCopy = document.getElementById('btn-copy');
    const btnReset = document.getElementById('btn-reset');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        clearErrors();

        if (namaInput.value.trim() === '') {
            showError('nama-error', '⚠️ Nama barang wajib diisi!');
            isValid = false;
        }

        if (hargaInput.value.trim() === '') {
            showError('harga-error', '⚠️ Harga barang wajib diisi!');
            isValid = false;
        }

        if (!isValid) return;
        const template = templateInput.value;
        const nama = namaInput.value.trim();
        const harga = hargaInput.value.trim();
        const kategori = kategoriInput.value.trim();
        const catatan = catatanInput.value.trim();

        // Format Catatan & Kategori jika ada
        const infoCatatan = catatan ? ` (${catatan})` : '';
        const infoKategori = kategori ? ` Kategori: ${kategori}.` : '';

        let generatedCaption = '';


        if (template === '1') {
            generatedCaption = `🔥 PROMO HARI INI! Dapatkan ${nama} kualitas terbaik hanya dengan harga $${harga}.${infoKategori}${infoCatatan} Yuk buruan pesan sebelum kehabisan!`;
        } else if (template === '2') {
            generatedCaption = `✨ Rekomendasi item pilihan: ${nama}! Cuma $${harga} aja.${infoKategori}${infoCatatan} Buruan checkout sekarang!`;
        } else {
            generatedCaption = `Ready Stock! ${nama} - Harga $${harga}.${infoKategori}${infoCatatan} Hubungi kami untuk pemesanan.`;
        }

        previewBox.textContent = generatedCaption;
        btnCopy.classList.remove('hidden');
    });

    // Event Listener untuk Reset
    btnReset.addEventListener('click', () => {
        form.reset();
        clearErrors();
        previewBox.textContent = 'Silakan isi form di atas dan klik tombol untuk menghasilkan caption.';
        btnCopy.classList.add('hidden');
    });

    // Event Listener untuk Salin Teks
    btnCopy.addEventListener('click', () => {
        const textToCopy = previewBox.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Teks caption berhasil disalin ke clipboard!');
        });
    });

    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function clearErrors() {
        document.getElementById('nama-error').textContent = '';
        document.getElementById('harga-error').textContent = '';
    }
});