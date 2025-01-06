# WriteNShare

WriteNShare adalah sebuah website blog artikel yang memungkinkan pengguna untuk membuat dan memposting artikel. Website ini dibangun menggunakan React untuk sisi front-end, Node.js untuk back-end, dan MongoDB sebagai database non-relasional. Selain itu, Clerk digunakan untuk mengelola akun pengguna.

## Fitur Utama

- **Membuat dan memposting artikel**: Pengguna dapat membuat konten dengan mudah.
- **Manajemen akun**: Clerk digunakan untuk registrasi dan login pengguna.
- **Integrasi gambar**: Mendukung unggahan gambar melalui ImageKit.

## Teknologi yang Digunakan

- **Front-end**: React
- **Back-end**: Node.js
- **Database**: MongoDB (NoSQL)
- **Autentikasi**: Clerk
- **Pengelolaan Gambar**: ImageKit

---

## Tahap Instalasi

### 1. Front-End

#### Langkah 1: Clone repository

```bash
https://github.com/Hidayattt24/Blog.git
```

#### Langkah 2: Masuk ke direktori front-end

```bash
cd Blog/client
```

#### Langkah 3: Instal dependensi

```bash
npm install
```

#### Langkah 4: Buat file `.env`

Isi file `.env` dengan konfigurasi berikut:

```env
# For image load
VITE_IK_URL_ENDPOINT=
VITE_IK_PUBLIC_KEY=

# Key for API
VITE_CLERK_PUBLISHABLE_KEY=

# API database
VITE_API_URL=
```

#### Langkah 5: Jalankan aplikasi

```bash
npm run dev
```

### 2. Back-End

#### Langkah 1: Masuk ke direktori back-end

```bash
cd Blog/backend
```

#### Langkah 2: Buat file `.env`

Isi file `.env` dengan konfigurasi berikut:

```env
# MongoDB connection string
MONGO=

# Clerk API keys
CLERK_WEBHOOK_SECRET=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Client URL
CLIENT_URL=http://localhost:5173

# ImageKit keys
IK_URL_ENDPOINT=
IK_PUBLIC_KEY=
IK_PRIVATE_KEY=
```

#### Langkah 3: Jalankan server

```bash
node --env-file .env --watch index.js
```

---

## Selamat!

Website WriteNShare berhasil dijalankan. Anda dapat mengaksesnya melalui `http://localhost:5173` untuk memulai pengalaman blogging Anda.

![Screenshot](/screenshoot.png "WriteNShare")
