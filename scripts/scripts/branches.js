import { fetchJSON } from './utils.js';

export async function filterByBranch(branchId, items) {
  return items.filter(i => i.branch === branchId);
}

export async function currentBranch(username) {
  const users = await fetchJSON('data/users.json');
  const u = users.find(x => x.username === username);
  return u?.branch || null;
}
