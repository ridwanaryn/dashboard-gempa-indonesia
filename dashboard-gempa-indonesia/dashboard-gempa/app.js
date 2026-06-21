/**
 * app.js — Logic untuk Dashboard Monitor Gempa Indonesia
 * Menggunakan Chart.js (CDN) untuk semua visualisasi.
 * Tooltip & animasi entrance memakai default behavior Chart.js.
 */

// -------------------------------------------------------
// 0. Palet warna konsisten (selaras dengan style.css)
// -------------------------------------------------------
const COLORS = {
  accent: "#0071E3",
  accentSoft: "rgba(0, 113, 227, 0.15)",
  ink: "#1D1D1F",
  inkSoft: "#86868B",
  alert: "#FF3B30",
  alertSoft: "rgba(255, 59, 48, 0.15)",
  safe: "#1FAA59",
  line: "#E5E5E5"
};

Chart.defaults.font.family = "'Inter', -apple-system, sans-serif";
Chart.defaults.color = COLORS.inkSoft;
Chart.defaults.font.size = 12;

// -------------------------------------------------------
// 1. KPI HERO — hitung dari data & jalankan count-up
// -------------------------------------------------------
function computeKpis(data) {
  const magnitudes = data.map(d => d.magnitude);
  const depths = data.map(d => d.kedalaman);
  const maxMag = Math.max(...magnitudes);
  const maxMagEvent = data.find(d => d.magnitude === maxMag);
  const avgMag = magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length;
  const avgDepth = depths.reduce((a, b) => a + b, 0) / depths.length;
  const tsunamiCount = data.filter(d => !d.potensi.toLowerCase().includes("tidak")).length;

  return { maxMag, maxMagEvent, avgMag, avgDepth, tsunamiCount, total: data.length };
}

function countUp(el, target, { decimals = 1, duration = 1100 } = {}) {
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = startVal + (target - startVal) * eased;
    el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderHeroKpis() {
  const kpi = computeKpis(earthquakeData);

  const elMaxMag = document.getElementById("statMaxMag");
  const elMaxMagLoc = document.getElementById("statMaxMagLoc");
  const elAvgMag = document.getElementById("statAvgMag");
  const elAvgDepth = document.getElementById("statAvgDepth");
  const elTsunami = document.getElementById("statTsunami");

  countUp(elMaxMag, kpi.maxMag, { decimals: 1 });
  countUp(elAvgMag, kpi.avgMag, { decimals: 1 });
  countUp(elAvgDepth, kpi.avgDepth, { decimals: 0 });
  countUp(elTsunami, kpi.tsunamiCount, { decimals: 0 });

  elMaxMagLoc.textContent = `${kpi.maxMagEvent.wilayah} · ${kpi.maxMagEvent.tanggal}`;
  elTsunami.parentElement.querySelector(".hero__stat-value").classList.add("hero__stat-value--safe");
}

// -------------------------------------------------------
// 2. SCATTER CHART — sebaran lokasi (lon = X, lat = Y)
// -------------------------------------------------------
function renderScatterChart() {
  const ctx = document.getElementById("scatterChart");

  const points = earthquakeData.map(d => ({
    x: d.lon,
    y: d.lat,
    r: 6 + (d.magnitude - 5.0) * 9, // radius proporsional ke magnitudo
    raw: d
  }));

  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [{
        label: "Titik Gempa",
        data: points,
        backgroundColor: points.map(p => p.raw.magnitude >= 6 ? COLORS.alertSoft : COLORS.accentSoft),
        borderColor: points.map(p => p.raw.magnitude >= 6 ? COLORS.alert : COLORS.accent),
        borderWidth: 1.5,
        hoverBorderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      scales: {
        x: {
          title: { display: true, text: "Bujur (BT)", color: COLORS.inkSoft, font: { size: 12, weight: 600 } },
          grid: { color: COLORS.line },
          min: 94, max: 142
        },
        y: {
          title: { display: true, text: "Lintang", color: COLORS.inkSoft, font: { size: 12, weight: 600 } },
          grid: { color: COLORS.line },
          min: -12, max: 8
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: COLORS.ink,
          padding: 12,
          cornerRadius: 10,
          titleFont: { size: 13, weight: 700 },
          bodyFont: { size: 12.5 },
          callbacks: {
            title: (items) => items[0].raw.raw.wilayah,
            label: (item) => {
              const d = item.raw.raw;
              return [
                `Magnitudo: M${d.magnitude.toFixed(1)}`,
                `Kedalaman: ${d.kedalaman} km`,
                `Waktu: ${d.tanggal}, ${d.jam}`
              ];
            }
          }
        }
      }
    }
  });
}

// -------------------------------------------------------
// 3. TREND CHART — line chart kronologis
// -------------------------------------------------------
function renderTrendChart() {
  const ctx = document.getElementById("trendChart");
  const labels = earthquakeDataChrono.map(d => d.tanggal);
  const values = earthquakeDataChrono.map(d => d.magnitude);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Magnitudo",
        data: values,
        borderColor: COLORS.accent,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return COLORS.accentSoft;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(0, 113, 227, 0.25)");
          gradient.addColorStop(1, "rgba(0, 113, 227, 0.0)");
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: values.map(v => v >= 6 ? COLORS.alert : COLORS.accent),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: "easeOutQuart" },
      scales: {
        y: {
          min: 4.5, max: 7,
          grid: { color: COLORS.line },
          title: { display: true, text: "Magnitudo (SR)", color: COLORS.inkSoft, font: { size: 12, weight: 600 } }
        },
        x: {
          grid: { display: false },
          ticks: { maxRotation: 45, minRotation: 45, font: { size: 11 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: COLORS.ink,
          padding: 12,
          cornerRadius: 10,
          titleFont: { size: 13, weight: 700 },
          bodyFont: { size: 12.5 },
          callbacks: {
            label: (item) => {
              const d = earthquakeDataChrono[item.dataIndex];
              return [`M${d.magnitude.toFixed(1)} · ${d.wilayah}`, `Kedalaman ${d.kedalaman} km`];
            }
          }
        }
      }
    }
  });
}

// -------------------------------------------------------
// 4. REGION CHART — horizontal bar jumlah kejadian per wilayah
// -------------------------------------------------------
function renderRegionChart() {
  const ctx = document.getElementById("regionChart");

  const counts = {};
  earthquakeData.forEach(d => { counts[d.wilayah] = (counts[d.wilayah] || 0) + 1; });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const labels = sorted.map(s => s[0]);
  const values = sorted.map(s => s[1]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Jumlah Kejadian",
        data: values,
        backgroundColor: COLORS.accent,
        borderRadius: 8,
        maxBarThickness: 28
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      scales: {
        x: {
          grid: { color: COLORS.line },
          ticks: { stepSize: 1, precision: 0 },
          title: { display: true, text: "Jumlah kejadian", color: COLORS.inkSoft, font: { size: 12, weight: 600 } }
        },
        y: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: COLORS.ink,
          padding: 12,
          cornerRadius: 10,
          callbacks: { label: (item) => `${item.raw} kejadian` }
        }
      }
    }
  });
}

// -------------------------------------------------------
// 5. DEPTH CHART — doughnut dangkal vs menengah vs dalam
// -------------------------------------------------------
function renderDepthChart() {
  const ctx = document.getElementById("depthChart");

  const shallow = earthquakeData.filter(d => d.kedalaman < 30).length;
  const mid = earthquakeData.filter(d => d.kedalaman >= 30 && d.kedalaman < 70).length;
  const deep = earthquakeData.filter(d => d.kedalaman >= 70).length;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Dangkal (<30 km)", "Menengah (30–70 km)", "Dalam (>70 km)"],
      datasets: [{
        data: [shallow, mid, deep],
        backgroundColor: [COLORS.accent, "#7FB8F2", COLORS.ink],
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      animation: { duration: 900, easing: "easeOutQuart" },
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 10, boxHeight: 10, padding: 16, font: { size: 12.5 } }
        },
        tooltip: {
          backgroundColor: COLORS.ink,
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (item) => `${item.label}: ${item.raw} kejadian`
          }
        }
      }
    }
  });
}

// -------------------------------------------------------
// 6. TABEL — render + sorting interaktif (klik header)
// -------------------------------------------------------
let currentSort = { key: "tanggal", dir: "desc" };

function renderTableRows(data) {
  const tbody = document.getElementById("dataTableBody");
  tbody.innerHTML = data.map(d => {
    const isHigh = d.magnitude >= 6;
    const isTsunami = !d.potensi.toLowerCase().includes("tidak");
    return `
      <tr>
        <td>${d.tanggal}</td>
        <td style="font-family: var(--font-mono); font-size: 13px;">${d.jam}</td>
        <td><span class="mag-pill ${isHigh ? "mag-pill--high" : ""}">M${d.magnitude.toFixed(1)}</span></td>
        <td class="cell-mag">${d.kedalaman} km</td>
        <td>${d.wilayahFull}</td>
        <td>
          <span class="badge ${isTsunami ? "badge--alert" : "badge--safe"}">
            ${isTsunami ? "⚠ Berpotensi" : "✓ Aman"}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

function sortData(key) {
  const dir = currentSort.key === key && currentSort.dir === "asc" ? "desc" : "asc";
  currentSort = { key, dir };

  const sorted = [...earthquakeData].sort((a, b) => {
    let valA = a[key], valB = b[key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    if (valA < valB) return dir === "asc" ? -1 : 1;
    if (valA > valB) return dir === "asc" ? 1 : -1;
    return 0;
  });

  renderTableRows(sorted);
  updateSortIndicators();
}

function updateSortIndicators() {
  document.querySelectorAll("#dataTable thead th").forEach(th => {
    if (th.dataset.key === currentSort.key) {
      th.setAttribute("aria-sort", currentSort.dir === "asc" ? "ascending" : "descending");
    } else {
      th.removeAttribute("aria-sort");
    }
  });
}

function initTable() {
  renderTableRows(earthquakeData);
  document.querySelectorAll("#dataTable thead th").forEach(th => {
    th.addEventListener("click", () => sortData(th.dataset.key));
  });
}

// -------------------------------------------------------
// 7. INIT
// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderHeroKpis();
  renderScatterChart();
  renderTrendChart();
  renderRegionChart();
  renderDepthChart();
  initTable();
});
