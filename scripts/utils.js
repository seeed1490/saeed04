// ===============================
// utils.js
// دوال مساعدة عامة للنظام
// ===============================

// جلب ملف JSON
export async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("فشل تحميل الملف: " + path);
    return await res.json();
  } catch (err) {
    console.error("❌ خطأ في fetchJSON:", err);
    return [];
  }
}

// البحث عن عنصر بالـ ID
export function byId(id) {
  return document.getElementById(id);
}

// إنشاء عنصر جديد
export function createEl(tag, className = "", text = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// تحويل الحالة إلى CSS Class
export function statusClass(status) {
  switch (status) {
    case "متاحة": return "available";
    case "مؤجرة": return "rented";
    case "صيانة": return "maintenance";
    default: return "";
  }
}

// تنسيق رقم كعملة (ريال سعودي)
export function formatCurrency(amount) {
  if (isNaN(amount)) return amount;
  return amount.toLocaleString("ar-SA", { style: "currency", currency: "SAR" });
}

// تنسيق التاريخ (YYYY-MM-DD → DD/MM/YYYY)
export function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("ar-EG");
}

// إنشاء رقم تسلسلي جديد (مثال: F + رقم)
export function generateId(prefix, listLength) {
  return prefix + (listLength + 1);
}

// قراءة باراميتر من الرابط
export function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// حساب إحصائيات الوحدات
export function calculateUnitStats(units) {
  const stats = { available: 0, rented: 0, maintenance: 0, total: units.length };

  units.forEach(u => {
    switch (u.status) {
      case "متاحة": stats.available++; break;
      case "مؤجرة": stats.rented++; break;
      case "صيانة": stats.maintenance++; break;
    }
  });

  return stats;
}
