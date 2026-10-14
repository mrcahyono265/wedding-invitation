# Undangan Akad Ridho & Zahra

Microsite undangan akad nikah yang responsif, dibangun dengan HTML, CSS, dan JavaScript tanpa proses build atau dependensi.

## Preview lokal

Buka `index.html` langsung di browser. Untuk menguji RSVP, jalankan lewat server statis lokal agar perilakunya menyerupai hosting.

## Publikasi

Panduan menerbitkan website di GitHub Pages tersedia di [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md).

## RSVP gratis dengan Google Sheets

RSVP dikirim ke Google Sheets melalui Google Apps Script. Ikuti panduan [docs/GOOGLE_SHEETS_RSVP.md](docs/GOOGLE_SHEETS_RSVP.md), lalu masukkan URL Web App berakhiran `/exec` ke konstanta `RSVP_ENDPOINT` dalam `app.js`.

## Sebelum membagikan undangan

- Isi jam akad pada kartu acara di `index.html`.
- Ubah `eventStart` di `app.js` menjadi jam akad yang pasti.
- Hubungkan `RSVP_ENDPOINT` sesuai panduan Google Sheets.
- Periksa kembali peta, tautan arah, dan tampilan mobile.

## Struktur proyek

```text
├── apps-script/Code.gs       # Penerima data RSVP untuk Google Sheets
├── assets/floral-garden.png  # Ilustrasi utama
├── docs/                     # Panduan publikasi dan RSVP
├── app.js                    # Interaksi, countdown, dan form RSVP
├── index.html                # Halaman undangan
└── styles.css                # Tampilan responsif
```
