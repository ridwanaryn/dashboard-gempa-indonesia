/**
 * CATT:
 * Data Gempa Bumi Indonesia — M 5.0+
 * Sumber resmi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
 * Endpoint: https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml
 */


const earthquakeData = [
  { tanggal: "20 Jun 2026", jam: "08:40:08 WIB", lat: -4.95, lon: 102.95, magnitude: 5.0, kedalaman: 23, wilayah: "Kaur, Bengkulu", wilayahFull: "47 km BaratDaya KAUR-BENGKULU", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "18 Jun 2026", jam: "13:57:32 WIB", lat: 5.62, lon: 125.22, magnitude: 5.5, kedalaman: 10, wilayah: "Kep. Sangihe, Sulut", wilayahFull: "225 km BaratLaut TAHUNA-KEP.SANGIHE-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "17 Jun 2026", jam: "10:44:16 WIB", lat: -9.57, lon: 119.44, magnitude: 5.0, kedalaman: 10, wilayah: "Waikabubak, NTT", wilayahFull: "10 km TimurLaut WAIKABUBAK-NTT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "17 Jun 2026", jam: "01:29:38 WIB", lat: -1.14, lon: 120.33, magnitude: 5.1, kedalaman: 5, wilayah: "Poso, Sulteng", wilayahFull: "54 km BaratLaut POSO-SULTENG", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "16 Jun 2026", jam: "11:14:00 WIB", lat: -1.05, lon: 120.10, magnitude: 5.2, kedalaman: 10, wilayah: "Palu, Sulteng", wilayahFull: "29 km Tenggara PALU-SULTENG", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "16 Jun 2026", jam: "10:27:44 WIB", lat: -1.04, lon: 120.23, magnitude: 6.7, kedalaman: 10, wilayah: "Palu, Sulteng", wilayahFull: "42 km Tenggara PALU-SULTENG", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "15 Jun 2026", jam: "22:30:22 WIB", lat: 5.60, lon: 125.39, magnitude: 5.7, kedalaman: 10, wilayah: "Pulau Karatung, Sulut", wilayahFull: "209 km BaratLaut PULAUKARATUNG-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "13 Jun 2026", jam: "19:05:35 WIB", lat: 1.10, lon: 126.20, magnitude: 5.1, kedalaman: 10, wilayah: "Bitung, Sulut", wilayahFull: "125 km Tenggara BITUNG-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "13 Jun 2026", jam: "09:05:50 WIB", lat: 5.72, lon: 125.50, magnitude: 5.2, kedalaman: 10, wilayah: "Pulau Karatung, Sulut", wilayahFull: "205 km BaratLaut PULAUKARATUNG-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "13 Jun 2026", jam: "02:33:51 WIB", lat: 3.01, lon: 127.98, magnitude: 5.2, kedalaman: 112, wilayah: "Pulau Doi, Malut", wilayahFull: "83 km TimurLaut PULAUDOI-MALUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "11 Jun 2026", jam: "14:33:16 WIB", lat: 4.87, lon: 125.35, magnitude: 5.6, kedalaman: 10, wilayah: "Kep. Sangihe, Sulut", wilayahFull: "140 km BaratLaut TAHUNA-KEP.SANGIHE-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "11 Jun 2026", jam: "08:56:12 WIB", lat: 4.89, lon: 125.50, magnitude: 5.4, kedalaman: 10, wilayah: "Kep. Sangihe, Sulut", wilayahFull: "142 km TimurLaut TAHUNA-KEP.SANGIHE-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "10 Jun 2026", jam: "16:13:37 WIB", lat: 5.71, lon: 125.15, magnitude: 5.2, kedalaman: 10, wilayah: "Kep. Sangihe, Sulut", wilayahFull: "236 km BaratLaut TAHUNA-KEP.SANGIHE-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "10 Jun 2026", jam: "08:54:21 WIB", lat: 5.57, lon: 125.38, magnitude: 5.3, kedalaman: 10, wilayah: "Pulau Karatung, Sulut", wilayahFull: "209 km BaratLaut PULAUKARATUNG-SULUT", potensi: "Tidak berpotensi tsunami" },
  { tanggal: "09 Jun 2026", jam: "23:49:18 WIB", lat: 5.75, lon: 125.26, magnitude: 5.3, kedalaman: 10, wilayah: "Pulau Karatung, Sulut", wilayahFull: "230 km BaratLaut PULAUKARATUNG-SULUT", potensi: "Tidak berpotensi tsunami" },
];
// Urutan kronologis (lama → baru) — dipakai untuk line chart tren magnitudo
const earthquakeDataChrono = [...earthquakeData].reverse();
