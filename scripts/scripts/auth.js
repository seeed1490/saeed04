export function getSession() {
  const raw = localStorage.getItem('session');
  return raw ? JSON.parse(raw) : { username: 'admin', role: 'مدير', branch: 'BR001' };
}

export function setSession(session) {
  localStorage.setItem('session', JSON.stringify(session));
}
