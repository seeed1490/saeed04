// ===============================
// component.js
// المكون الموحد (اختيار الفرع + بيانات المستخدم + تسجيل الخروج)
// ===============================

import { getSession, logout, switchBranch } from './auth.js';
import { guardButton } from './permissions.js';
import { byId } from './utils.js';

// تهيئة المكون
export function initComponent(containerId, guardedButtons = []) {
  const container = byId(containerId);
  if (!container) return;

  const session = getSession();
  if (!session) {
    container.innerHTML = `<p>⚠️ لم يتم تسجيل الدخول</p>`;
    return;
  }

  // بناء واجهة المكون
  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
      <div>
        <strong>👤 المستخدم:</strong> ${session.username} 
        | <strong>الدور:</strong> ${session.role} 
        | <strong>الفرع:</strong> 
        <select id="branchSelect" ${session.role !== "مدير" ? "disabled" : ""}>
          <option value="BR001" ${session.branch === "BR001" ? "selected" : ""}>BR001</option>
          <option value="BR002" ${session.branch === "BR002" ? "selected" : ""}>BR002</option>
        </select>
      </div>
      <button id="logoutBtn" class="btn danger">🚪 تسجيل الخروج</button>
    </div>
  `;

  // زر تسجيل الخروج
  byId("logoutBtn").onclick = () => logout();

  // تغيير الفرع (للمدير فقط)
  const branchSelect = byId("branchSelect");
  if (branchSelect) {
    branchSelect.addEventListener("change", e => {
      const newBranch = e.target.value;
      if (switchBranch(newBranch)) {
        alert("✅ تم تغيير الفرع إلى " + newBranch);
        location.reload();
      } else {
        alert("⚠️ لا تملك صلاحية تغيير الفرع");
      }
    });
  }

  // تطبيق الصلاحيات على الأزرار المحمية
  setTimeout(() => {
    guardedButtons.forEach(g => {
      const elements = document.querySelectorAll(g.selector);
      elements.forEach(el => guardButton(el, session.role, g.section, g.action));
    });
  }, 300);
}
