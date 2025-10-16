// ===============================
// permissions.js
// إدارة الصلاحيات حسب الدور
// ===============================

// تعريف الصلاحيات لكل دور
// يمكن تعديل هذه المصفوفة لتناسب احتياجاتك
const PERMISSIONS = {
  "مدير": {
    "وحدات": ["إضافة", "تعديل", "حذف", "عرض"],
    "عقود": ["إضافة", "تعديل", "حذف", "عرض", "تجديد", "أرشفة"],
    "مستأجرين": ["إضافة", "تعديل", "حذف", "عرض"],
    "صيانة": ["إضافة", "تعديل", "حذف", "عرض", "طباعة"],
    "تقارير": ["عرض", "طباعة"],
    "إعدادات": ["مستخدمين", "أدوار", "فروع", "فوترة"]
  },
  "مدير فرع": {
    "وحدات": ["إضافة", "تعديل", "عرض"],
    "عقود": ["إضافة", "تعديل", "عرض", "تجديد"],
    "مستأجرين": ["إضافة", "تعديل", "عرض"],
    "صيانة": ["إضافة", "تعديل", "عرض"],
    "تقارير": ["عرض"],
    "إعدادات": []
  },
  "موظف": {
    "وحدات": ["عرض"],
    "عقود": ["عرض"],
    "مستأجرين": ["عرض"],
    "صيانة": ["إضافة", "عرض"],
    "تقارير": ["عرض"],
    "إعدادات": []
  }
};

// التحقق من الصلاحية
export function hasPermission(role, section, action) {
  if (!PERMISSIONS[role]) return false;
  return PERMISSIONS[role][section]?.includes(action) || false;
}

// تعطيل زر أو عنصر إذا لم تتوفر الصلاحية
export function guardButton(element, role, section, action) {
  if (!element) return;
  if (!hasPermission(role, section, action)) {
    element.disabled = true;
    element.title = "🚫 لا تملك صلاحية " + action;
  }
}

// إخفاء عنصر إذا لم تتوفر الصلاحية
export function guardElement(element, role, section, action) {
  if (!element) return;
  if (!hasPermission(role, section, action)) {
    element.style.display = "none";
  }
}
