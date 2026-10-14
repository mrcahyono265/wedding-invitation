# Publikasi dengan GitHub Pages

Website ini adalah situs statis, jadi tidak membutuhkan GitHub Actions ataupun proses build.

## 1. Buat repository dan push file

Di GitHub, buat repository baru—misalnya `undangan-ridho-zahra`. Lalu jalankan perintah berikut dari folder proyek:

```bash
git init
git add .
git commit -m "Initial wedding invitation"
git branch -M main
git remote add origin https://github.com/USERNAME/undangan-ridho-zahra.git
git push -u origin main
```

Ganti `USERNAME` dengan nama pengguna GitHub Anda. Jika repository sudah dibuat dan terhubung ke remote, cukup lakukan `git add`, `git commit`, dan `git push`.

## 2. Aktifkan GitHub Pages

1. Buka repository di GitHub.
2. Pilih **Settings → Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`.
5. Klik **Save**.

GitHub akan menerbitkan `index.html` dari root repository. Setelah deployment selesai, URL undangan tersedia di halaman Settings → Pages.

## 3. Pembaruan berikutnya

Setiap perubahan yang dipush ke branch `main` akan dipublikasikan ulang.

```bash
git add .
git commit -m "Update invitation details"
git push
```

## Catatan keamanan

- Jangan push password, token, atau kredensial Google ke repository.
- URL Google Apps Script di `app.js` memang dapat dilihat publik dan aman untuk digunakan sebagai endpoint form. URL tersebut bukan API key.
- Jika repository bersifat publik, nama dan detail acara pada website juga bersifat publik.
