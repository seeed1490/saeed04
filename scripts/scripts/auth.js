// ===============================
// auth.js
// إدارة جلسة المستخدم (محاكاة)
// ===============================

// مفتاح التخزين المحلي
const SESSION_KEY = "property_mgmt_session";

// بيانات مستخدمين تجريبية (يمكن لاحقًا ربطها بقاعدة بيانات أو API)
const USERS = [
  { username: "admin", password: "1234", role: "مدير", branch: "BR001" },
  { username: "manager1", password: "1234", role: "مدير فرع", branch: "BR001" },
  { username: "manager2", password: "1234", role: "مدير فرع", branch: "BR002" },
  { username: "user1", password: "1234", role: "موظف", branch: "BR001" },
  { username: "user2", password: "1234", role: "موظف", branch: "BR002" }
];

// تسجيل الدخول
export function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "❌ اسم المستخدم أو كلمة المرور غير صحيحة" };
}

// تسجيل الخروج
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html"; // إعادة التوجيه للصفحة الرئيسية
}

// استرجاع الجلسة الحالية
export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

// التحقق من تسجيل الدخول
export function requireAuth() {
  const session = getSession();
  if (!session) {
    alert("⚠️ يجب تسجيل الدخول أولاً");
    window.location.href = "login.html";
  }
  return session;
}

// تغيير الفرع (للمدير فقط)
export function switchBranch(branchCode) {
  const session = getSession();
  if (session && session.role === "مدير") {
    session.branch = branchCode;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}
