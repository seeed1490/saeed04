import { fetchJSON, statusClass, byId } from './utils.js';

async function init() {
  const units = await fetchJSON('data/units.json');
  const session = JSON.parse(localStorage.getItem('session')) || { branch: "BR001" };
  const branchUnits = units.filter(u => u.branch === session.branch);

  const grid = byId('map-grid');
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

window.addEventListener('DOMContentLoaded', init);
