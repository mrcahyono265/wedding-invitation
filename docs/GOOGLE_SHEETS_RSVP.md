# Menghubungkan RSVP ke Google Sheets

Integrasi ini memakai Google Sheets dan Google Apps Script gratis dari akun Google Anda. Tidak membutuhkan API key, kartu pembayaran, atau server sendiri.

## 1. Buat spreadsheet

1. Buat Google Sheet baru.
2. Ubah nama tab pertama menjadi `RSVP`.
3. Tambahkan judul kolom pada baris pertama:

   | Waktu | Nama | Kehadiran | Tamu dewasa | Tamu anak-anak |
   | ----- | ---- | --------- | ----------- | -------------- |

## 2. Tambahkan Apps Script

1. Dari spreadsheet, buka **Extensions → Apps Script**.
2. Hapus kode bawaan lalu tempel isi file [`../apps-script/Code.gs`](../apps-script/Code.gs).
3. Klik **Save**.

Jika Apps Script sudah pernah diterbitkan, setelah menyimpan pilih **Deploy → Manage deployments**, edit deployment yang ada, lalu pilih **New version** dan **Deploy**. URL `/exec` tetap sama.

Script menerima nama, status kehadiran, jumlah tamu dewasa, dan jumlah tamu anak-anak. Kolom `website` adalah honeypot sederhana untuk mengabaikan sebagian bot.

## 3. Terbitkan sebagai Web App

1. Pilih **Deploy → New deployment**.
2. Klik ikon roda gigi, lalu pilih **Web app**.
3. Pilih **Execute as: Me**.
4. Pilih akses **Who has access: Anyone**.
5. Klik **Deploy**, lalu izinkan akses saat diminta Google.
6. Salin URL Web App yang berakhiran `/exec`.

## 4. Hubungkan ke website

Di `app.js`, masukkan URL tadi:

```js
const RSVP_ENDPOINT = "https://script.google.com/macros/s/CONTOH/exec";
```

Simpan perubahan lalu push ulang website ke GitHub.

## Pengujian

1. Buka halaman undangan yang sudah dipublikasikan.
2. Isi form RSVP dan kirim.
3. Periksa baris baru pada tab `RSVP` di spreadsheet.

## Batasan dan keamanan

- Endpoint dibuat publik agar browser tamu dapat mengirim RSVP tanpa login Google.
- Jangan menaruh access token, password, atau data pribadi sensitif di `app.js` maupun Apps Script.
- Honeypot dan validasi form membantu mengurangi spam ringan, tetapi bukan proteksi anti-spam penuh.
