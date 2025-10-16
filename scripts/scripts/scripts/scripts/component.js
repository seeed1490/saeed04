import { fetchJSON } from './utils.js';
import { getSession, setSession } from './auth.js';
import { guardButton } from './permissions.js';

export async function initComponent(containerId, guardedButtons = []) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const session = getSession();
  const branches = await fetchJSON('data/branches.json');

  container.innerHTML = `
    <div style="margin:10px 0; padding:10px; background:#fff; border:1px solid #ddd; border-radius:6px;">
      <label>🏢 اختر الفرع:</label>
      <select id="branchSelect"></select>
      <span style="margin-right:15px;">👤 المستخدم: ${
