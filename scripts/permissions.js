import { fetchJSON } from './utils.js';

let permissionsCache = null;

export async function can(role, section, action) {
  if (!permissionsCache) {
    permissionsCache = await fetchJSON('data/permissions.json');
  }
  const allowed = permissionsCache.roles[role]?.[section] || [];
  return allowed.includes(action);
}

export async function guardButton(buttonEl, role, section, action) {
  if (!(await can(role, section, action))) {
    buttonEl.disabled = true;
    buttonEl.classList.add('disabled');
    buttonEl.title = 'لا تملك صلاحية هذا الإجراء';
  }
}
