# Monitor Gempa Indonesia

> Dashboard visualisasi 15 kejadian gempa bumi M5.0+ paling terkini di Indonesia, datanya langsung dari feed resmi BMKG.

🌐 Demo: https://nama-kelompok.vercel.app 

## Isi Dashboard

- Chart 1: Scatter/Bubble Map — sebaran lokasi 15 titik gempa (lintang × bujur), ukuran bubble proporsional ke magnitudo
- Chart 2: Line Chart — tren magnitudo secara kronologis dari 9–20 Juni 2026, dengan highlight merah pada anomali M6.7
- Chart 3: Horizontal Bar Chart — jumlah kejadian per wilayah pemantauan BMKG
- Chart 4: Doughnut Chart — proporsi kategori kedalaman gempa (dangkal / menengah / dalam)
- Fitur interaktif: Tooltip Chart.js (hover di semua chart) + tabel data yang bisa diurutkan dengan klik header kolom
- Animasi: Entrance animation Chart.js (default) + count-up number pada 4 KPI di hero section + fade-in CSS pada teks hero

## Sumber Data

- Nama dataset: Data Gempabumi Terbuka BMKG — Gempabumi M 5.0+
- URL sumber: https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml
- Penyedia: Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) Republik Indonesia
- Jumlah baris: 15 kejadian gempa
- Diakses pada: 21 Juni 2026

## Cara Jalankan di Lokal

```
# Jalur A (static):
Buka index.html langsung di browser (atau pakai Live Server di VS Code)
```

Tidak perlu npm install — semua dependency (Chart.js) sudah di-bundle lokal di file `chart.umd.min.js`, tidak ada koneksi ke CDN eksternal yang dibutuhkan.

## Teknologi

- Chart.js v4.4.4 (visualisasi, dibundle lokal)
- HTML + CSS + JavaScript (vanilla, tanpa framework)
- Vercel (deployment)

## Anggota

- 103012300455 – Ziyad Fathir Al Biaroza
- 103012300399 – Muhammad Ridwan Arrayyan
- 103012300107 – Zweta Lathifah Kus Aliyyah
- 103012300140 – Farazahwa J Michelle

