// ===============================
// map.js
// إدارة الخريطة التفاعلية للوحدات
// ===============================

import { fetchJSON, statusClass, byId } from './utils.js';
import { getSession } from './auth.js';

// تهيئة الخريطة
export async function initMap(gridId, detailsId) {
  const units = await fetchJSON('data/units.json');
  const session = getSession();
  const branchUnits = units.filter(u => u.branch === session.branch);

  const grid = byId(gridId);
  grid.innerHTML = "";

  // توزيع 10×8 (80 خانة)، سيتم ملء أول 71 بوحدات F1–F71
  for (let i = 0; i < 80; i++) {
    const unit = branchUnits[i];
    const cell = document.createElement('div');
    cell.className = 'unit ' + (unit ? statusClass(unit.status) : '');
    cell.textContent = unit ? unit.id : '';
    if (unit) cell.onclick = () => showDetails(unit, detailsId);
    grid.appendChild(cell);
  }
}

// عرض تفاصيل الوحدة
function showDetails(unit, detailsId) {
  byId(detailsId).innerHTML = `
    <h2>📋 تفاصيل الوحدة</h2>
    <p><strong>رقم الوحدة:</strong> ${unit.id}</p>
    <p><strong>الاسم:</strong> ${unit.name}</p>
    <p><strong>الموقع:</strong> ${unit.location}</p>
    <p><strong>الحالة:</strong> ${unit.status}</p>
    <p><strong>المستأجر:</strong> ${unit.tenant || "لا يوجد"}</p>
    <p><strong>الفرع:</strong> ${unit.branch || "-"}</p>
  `;
}

// فلترة الوحدات حسب الحالة
export async function filterUnits(gridId, detailsId, status) {
  const units = await fetchJSON('data/units.json');
  const session = getSession();
  const branchUnits = units.filter(u => u.branch === session.branch);

  const filtered = status === "الكل" ? branchUnits : branchUnits.filter(u => u.status === status);

  const grid = byId(gridId);
  grid.innerHTML = "";

  filtered.forEach(unit => {
    const cell = document.createElement('div');
    cell.className = 'unit ' + statusClass(unit.status);
    cell.textContent = unit.id;
    cell.onclick = () => showDetails(unit, detailsId);
    grid.appendChild(cell);
  });
}
