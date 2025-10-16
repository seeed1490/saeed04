// ===============================
// branches.js
// إدارة الفروع (محاكاة)
// ===============================

import { fetchJSON } from './utils.js';

const STORAGE_KEY = "property_mgmt_branches";

// تحميل الفروع من LocalStorage أو من ملف JSON
export async function getBranches() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    return JSON.parse(local);
  }
  // تحميل من ملف JSON (نسخة أولية)
  const data = await fetchJSON("data/branches.json");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

// حفظ الفروع في LocalStorage
function saveBranches(branches) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(branches));
}

// إضافة فرع جديد
export async function addBranch(branch) {
  const branches = await getBranches();
  // توليد كود فرع جديد BR00X
  const newId = "BR" + String(branches.length + 1).padStart(3, "0");
  const newBranch = { id: newId, ...branch };
  branches.push(newBranch);
  saveBranches(branches);
  return newBranch;
}

// تعديل فرع
export async function updateBranch(id, updates) {
  const branches = await getBranches();
  const index = branches.findIndex(b => b.id === id);
  if (index === -1) return null;
  branches[index] = { ...branches[index], ...updates };
  saveBranches(branches);
  return branches[index];
}

// حذف فرع
export async function deleteBranch(id) {
  let branches = await getBranches();
  branches = branches.filter(b => b.id !== id);
  saveBranches(branches);
  return true;
}

// البحث عن فرع
export async function getBranchById(id) {
  const branches = await getBranches();
  return branches.find(b => b.id === id) || null;
}
