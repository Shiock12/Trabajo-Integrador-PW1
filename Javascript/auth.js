// auth.js
const USERS_KEY = "usuarios";
const ACTIVE_KEY = "usuario_activo";

/* ------------------- UTILITARIAS ------------------- */
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ------------------- SESIÓN ACTIVA ------------------- */
export function getUsuarioActivo() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVE_KEY));
  } catch {
    return null;
  }
}

export function setUsuarioActivo(userObj) {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(userObj));
}

export function logoutUsuario() {
  localStorage.removeItem(ACTIVE_KEY);
}

/* ------------------- REGISTRO ------------------- */
export function registrarUsuario({ usuario, email, password, metodo }) {
  if (!usuario || !email || !password) {
    throw new Error("Completá usuario, email y contraseña.");
  }

  const users = loadUsers();

  // Validación (usuario o email existentes)
  if (users.some(u => u.usuario === usuario)) {
    throw new Error("El usuario ya existe.");
  }
  if (users.some(u => u.email === email)) {
    throw new Error("Ese email ya está registrado.");
  }

  const nuevo = { usuario, email, password, metodo: metodo || "" };
  users.push(nuevo);
  saveUsers(users);
  return nuevo;
}

/* ------------------- LOGIN ------------------- */
export function loginUsuario({ usuario, password }) {
  if (!usuario || !password) {
    throw new Error("Ingresá usuario y contraseña.");
  }

  const users = loadUsers();
  const found = users.find(u => u.usuario === usuario && u.password === password);

  if (!found) {
    throw new Error("Usuario o contraseña inválidos.");
  }

  return found;
}

/* ------------------- ELIMINAR CUENTA ------------------- */
export function deleteCurrentUser() {
  const actual = getUsuarioActivo();
  if (!actual) return { ok: false, mensaje: "No hay sesión activa" };

  const lista = loadUsers();
  const nueva = lista.filter(u => u.usuario !== actual.usuario);

  saveUsers(nueva);
  logoutUsuario();

  return { ok: true, mensaje: "Cuenta eliminada correctamente" };
}
