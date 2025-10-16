export function fetchJSON(path) {
  return fetch(path).then(r => r.json());
}

export function byId(id) { return document.getElementById(id); }

export function statusClass(status) {
  switch (status) {
    case "متاحة": return "available";
    case "مؤجرة": return "rented";
    case "جاري التنفيذ":
    case "صيانة": return "pending";
    default: return "";
  }
}
