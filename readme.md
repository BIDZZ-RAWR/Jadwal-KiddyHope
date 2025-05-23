<p align="center">
  <img src="icon.png" alt="Jadwal-KiddyHope" width="150"/>
</p>

<h1 align="center">Jadwal-KiddyHope</h1>

<p align="center">
  Aplikasi web modern untuk mengelola jadwal shift karyawan dengan antarmuka 3D yang elegan, tema gelap, dan fitur PWA. Dibuat untuk efisiensi dan kenyamanan.
</p>

<p align="center">
  <a href="https://BIDZZ-RAWR.github.io/Jadwal-KiddyHope" target="_blank">
    <img src="https://img.shields.io/badge/Demo-Live%20Site-blue?style=for-the-badge&logo=github" alt="Demo"/>
  </a>
  <a href="https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
  </a>
  <a href="https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/releases">
    <img src="https://img.shields.io/github/v/release/BIDZZ-RAWR/Jadwal-KiddyHope?color=orange&style=for-the-badge" alt="Release"/>
  </a>
  <a href="https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/stargazers">
    <img src="https://img.shields.io/github/stars/BIDZZ-RAWR/Jadwal-KiddyHope?style=social" alt="Stars"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/FullCalendar-%234098db.svg?style=flat-square&logo=calendar" alt="FullCalendar"/>
  <img src="https://img.shields.io/badge/PWA-%235A0FC8.svg?style=flat-square&logo=pwa" alt="PWA"/>
</p>

---

## 🚀 Tentang Jadwal-KiddyHope

**Jadwal-KiddyHope** adalah aplikasi web inovatif untuk mengelola jadwal shift karyawan dengan antarmuka yang **elegan**, **responsif**, dan **3D**. Dibangun dengan teknologi modern, aplikasi ini menawarkan pengalaman pengguna yang intuitif, mendukung **tema gelap** untuk kenyamanan mata, dan berfungsi sebagai **Progressive Web App (PWA)** untuk akses offline. Dirancang untuk tim KiddyHope, aplikasi ini membantu menyusun, melihat, dan berbagi jadwal shift dengan mudah.

🔗 **Demo Langsung**: [Jadwal-KiddyHope](https://BIDZZ-RAWR.github.io/Jadwal-KiddyHope)

### ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **Antarmuka 3D** | Efek visual 3D pada kartu, tombol, dan tabel untuk pengalaman interaktif yang modern. |
| **Tabel Shift** | Tampilan tabel responsif dengan kolom tetap, mendukung geser di perangkat mobile. |
| **Kalender Interaktif** | Integrasi FullCalendar untuk visualisasi jadwal berbasis tanggal. |
| **Tema Gelap/Terang** | Pilihan tema untuk kenyamanan mata, dengan warna shift yang kontras (misalnya, `#2ecc71` untuk Pagi di tema gelap). |
| **PWA** | Dukungan offline dan instalasi sebagai aplikasi di perangkat mobile/desktop. |
| **Cetak & PDF** | Ekspor jadwal ke PDF atau cetak dalam format A4 lanskap dengan warna solid (misalnya, `#a8e6cf` untuk Pagi). |
| **Pencarian & Filter** | Cari karyawan berdasarkan nama atau filter shift (Pagi, Sore, PS, Libur). |
| **Berbagi Jadwal** | Bagikan jadwal via WhatsApp, Telegram, Email, atau salin link. |
| **Ringkasan Shift** | Statistik jumlah shift per karyawan dalam tabel ringkas. |


---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik untuk aksesibilitas.
- **CSS3**: Efek 3D, tema gelap/terang, dan desain responsif.
- **JavaScript**: Logika interaktif untuk tabel, kalender, dan PWA.
- **FullCalendar**: Visualisasi jadwal berbasis kalender.
- **Font Awesome**: Ikon modern untuk antarmuka yang kaya.
- **html2canvas & jsPDF**: Ekspor jadwal ke PDF.
- **Service Worker**: Dukungan PWA untuk akses offline.

---

## 📦 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan **Jadwal-KiddyHope** di lokal Anda:

### Prasyarat
- [Node.js](https://nodejs.org/) (opsional, untuk server lokal).
- Browser modern (Chrome, Firefox, Edge).
- Koneksi internet untuk CDN (atau cache lokal untuk offline).

### Langkah-Langkah
1. **Kloning Repositori**:
   ```bash
   git clone https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope.git
   cd Jadwal-KiddyHope
   ```

2. **Jalankan Server Lokal**:
   - Dengan **Live Server** (VS Code):
     - Instal ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
     - Klik kanan `index.html` > "Open with Live Server".
   - Dengan **Python**:
     ```bash
     python -m http.server 8000
     ```
   - Buka `http://localhost:8000` di browser.

3. **Uji PWA**:
   - Pastikan `service-worker.js` dan `manifest.json` ada di root folder.
   - Buka **DevTools > Application > Service Workers** untuk memeriksa caching.
   - Instal aplikasi dengan klik ikon "Install" di browser.

4. **Deploy ke GitHub Pages** (opsional):
   - Push perubahan ke branch `main`.
   - Aktifkan GitHub Pages di **Settings > Pages** (pilih branch `main`, folder `/ (root)`).
   - Akses di `https://BIDZZ-RAWR.github.io/Jadwal-KiddyHope`.

---

## 🎮 Cara Penggunaan

1. **Akses Aplikasi**:
   - Buka [demo](https://BIDZZ-RAWR.github.io/Jadwal-KiddyHope) atau jalankan di localhost (`http://localhost:8000`).

2. **Navigasi**:
   - Gunakan tombol **Tabel** atau **Kalender** untuk beralih tampilan.
   - Klik **Hari Ini** atau **Besok** untuk filter cepat.
   - Geser tabel di perangkat mobile untuk melihat semua kolom.

3. **Pencarian & Filter**:
   - Ketik nama karyawan di kolom pencarian.
   - Pilih shift (P, S, PS, X) dari dropdown filter.

4. **Ekspor & Berbagi**:
   - Klik **Cetak** atau **PDF** untuk menghasilkan dokumen A4 lanskap.
   - Klik **Export** untuk unduh CSV.
   - Klik **Bagikan** untuk membagikan via WhatsApp, Telegram, Email, atau salin link.

5. **Tema Gelap**:
   - Klik ikon bulan/matahari di pojok kanan bawah untuk beralih tema.

6. **PWA**:
   - Instal aplikasi dari browser untuk akses cepat.
   - Uji offline dengan mematikan koneksi internet.

---

## 🖼️ Struktur Proyek

```
Jadwal-KiddyHope/
├── index.html          # Halaman utama
├── styles.css          # Gaya dengan efek 3D dan tema gelap
├── script.js           # Logika interaktif
├── manifest.json       # Konfigurasi PWA
├── service-worker.js   # Caching untuk PWA
├── favicon.png         # Ikon situs
├── icon.png    # Ikon PWA
```

---

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Ikuti langkah-langkah berikut untuk berkontribusi:

1. **Fork Repositori**:
   - Klik tombol "Fork" di [GitHub](https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope).

2. **Buat Branch**:
   ```bash
   git checkout -b fitur/penambahan-anda
   ```

3. **Lakukan Perubahan**:
   - Tambahkan fitur, perbaiki bug, atau tingkatkan dokumentasi.
   - Pastikan kode sesuai dengan [ESLint](https://eslint.org/) dan [Prettier](https://prettier.io/).

4. **Commit dan Push**:
   ```bash
   git add .
   git commit -m "Menambahkan fitur X"
   git push origin fitur/penambahan-anda
   ```

5. **Buat Pull Request**:
   - Buka PR di GitHub dengan deskripsi perubahan Anda.

### Pedoman Kontribusi
- Baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail.
- Ikuti [Kode Etik](CODE_OF_CONDUCT.md).
- Laporkan bug atau usulkan fitur di [Issues](https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/issues).

---

## 🐞 Melaporkan Bug

Jika menemukan bug:
1. Buka [Issues](https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/issues/new).
2. Jelaskan:
   - Langkah untuk mereproduksi bug.
   - Perilaku yang diharapkan vs aktual.
   - Browser dan perangkat yang digunakan.
   - Screenshot atau log error (dari **DevTools > Console**).

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE). Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode sesuai ketentuan lisensi.

---

## 🙌 Kredit

<p align="center">
  Created with <i class="fas fa-heart"></i> by <strong>Muhammad Abid</strong>
</p>

- **Pengembang**: Muhammad Abid ([@BIDZZ-RAWR](https://github.com/BIDZZ-RAWR))
- **Desain UI**: Efek 3D dan tema gelap dibuat dengan inspirasi modern web design.
- **Pustaka**:
  - [FullCalendar](https://fullcalendar.io/) untuk kalender interaktif.
  - [Font Awesome](https://fontawesome.com/) untuk ikon.
  - [html2canvas](https://html2canvas.hertzen.com/) dan [jsPDF](https://parall.ax/products/jspdf) untuk ekspor PDF.

---

## 🌍 Versi Bahasa Inggris

### About Jadwal-KiddyHope
**Jadwal-KiddyHope** is a modern web application for managing employee shift schedules with an elegant 3D interface, dark/light themes, and PWA support. Designed for the KiddyHope team, it offers an intuitive way to organize, view, and share schedules.

🔗 **Live Demo**: [Jadwal-KiddyHope](https://BIDZZ-RAWR.github.io/Jadwal-KiddyHope)

### Key Features
- **3D Interface**: Interactive 3D effects on cards, buttons, and tables.
- **Shift Table**: Responsive table with fixed columns, swipeable on mobile.
- **Interactive Calendar**: FullCalendar integration for date-based views.
- **Dark/Light Themes**: Comfortable viewing with contrasting shift colors.
- **PWA**: Offline support and app installation.
- **Print & PDF**: Export schedules to PDF or print in A4 landscape.
- **Search & Filter**: Search employees or filter by shift type.
- **Share Schedules**: Share via WhatsApp, Telegram, Email, or copy link.
- **Shift Summary**: Employee shift statistics in a concise table.

---

## ⭐ Beri Bintang!

Jika Anda menyukai proyek ini, beri ⭐ di [GitHub](https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope) dan bagikan dengan teman Anda! Kontribusi dan feedback Anda sangat berarti.

<p align="center">
  <a href="https://github.com/BIDZZ-RAWR/Jadwal-KiddyHope/stargazers">
    <img src="https://img.shields.io/github/stars/BIDZZ-RAWR/Jadwal-KiddyHope?style=social" alt="Stars"/>
  </a>
</p>