<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>الخريطة التفاعلية</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>🗺️ الخريطة التفاعلية للمخطط</h1>

  <!-- مكون اختيار الفرع + بيانات المستخدم -->
  <div id="component"></div>

  <div class="map-container">
    <!-- شبكة الوحدات -->
    <div id="map-grid" class="map-grid"></div>

    <!-- تفاصيل الوحدة -->
    <div id="details" class="panel">
      <h2>📋 تفاصيل الوحدة</h2>
      <p>اختر وحدة من الخريطة لعرض التفاصيل</p>
    </div>
  </div>

  <script type="module">
    import { initComponent } from './scripts/component.js';
    import { fetchJSON, statusClass, byId } from './scripts/utils.js';
    import { getSession } from './scripts/auth.js';

    // تفعيل المكون الموحد (اختيار الفرع + الصلاحيات)
    initComponent("component", []);

    async function initMap() {
      const units = await fetchJSON('data/units.json');
      const session = getSession();
      const branchUnits = units.filter(u => u.branch === session.branch);

      const grid = byId('map-grid');
      grid.innerHTML = "";

      // توزيع 10×8 (80 خانة)، سيتم ملء أول 71 بوحدات F1–F71
      for (let i = 0; i < 80; i++) {
        const unit = branchUnits[i];
        const cell = document.createElement('div');
        cell.className = 'unit ' + (unit ? statusClass(unit.status) : '');
        cell.textContent = unit ? unit.id : '';
        if (unit) cell.onclick = () => showDetails(unit);
        grid.appendChild(cell);
      }
    }

    function showDetails(unit) {
      byId('details').innerHTML = `
        <h2>📋 تفاصيل الوحدة</h2>
        <p><strong>رقم الوحدة:</strong> ${unit.id}</p>
        <p><strong>الاسم:</strong> ${unit.name}</p>
        <p><strong>الموقع:</strong> ${unit.location}</p>
        <p><strong>الحالة:</strong> ${unit.status}</p>
        <p><strong>المستأجر:</strong> ${unit.tenant || "لا يوجد"}</p>
        <p><strong>الفرع:</strong> ${unit.branch || "-"}</p>
      `;
    }

    window.addEventListener('DOMContentLoaded', initMap);
  </script>
</body>
</html>
