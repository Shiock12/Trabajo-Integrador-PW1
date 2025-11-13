// auth.js
const usuario = "usuarios";
const usuarioActivo = "usuario_activo";

/* ------------------- UTILITARIAS ------------------- */
function loadUsers() {
  const data = localStorage.getItem(usuario);

  // Si no existe nada, devolvemos lista vacía
  if (!data) {
    return [];
  }

  // Intentamos parsear "a mano" con verificación mínima
  const users = JSON.parse(data);

  if (Array.isArray(users)) {
    return users;
  }

  return [];
}

function saveUsers(users) {
  localStorage.setItem(usuario, JSON.stringify(users));
}

/* ------------------- SESIÓN ACTIVA ------------------- */
export function getUsuarioActivo() {
  const data = localStorage.getItem(usuarioActivo);

  if (!data) {
    return null;
  }

  const user = JSON.parse(data);
  return user || null;
}

export function setUsuarioActivo(userObj) {
  localStorage.setItem(usuarioActivo, JSON.stringify(userObj));
}

export function logoutUsuario() {
  localStorage.removeItem(usuarioActivo);
}

/* ------------------- REGISTRO ------------------- */
// Parámetros clásicos, nivel principiante
export function registrarUsuario(usuario, email, password, metodo) {
  if (!usuario || !email || !password) {
    throw new Error("Completá usuario, email y contraseña.");
  }

  const users = loadUsers();

  // Validación manual
  for (let i = 0; i < users.length; i++) {
    const u = users[i];

    if (u.usuario === usuario) {
      throw new Error("El usuario ya existe.");
    }

    if (u.email === email) {
      throw new Error("Ese email ya está registrado.");
    }
  }

  const nuevo = {
    usuario: usuario,
    email: email,
    password: password,
    metodo: metodo || ""
  };

  users.push(nuevo);
  saveUsers(users);

  return nuevo;
}

/* ------------------- LOGIN ------------------- */
export function loginUsuario(usuario, password) {
  if (!usuario || !password) {
    throw new Error("Ingresá usuario y contraseña.");
  }

  const users = loadUsers();
  let encontrado = null;

  for (let i = 0; i < users.length; i++) {
    const u = users[i];

    if (u.usuario === usuario && u.password === password) {
      encontrado = u;
      break;
    }
  }

  if (!encontrado) {
    throw new Error("Usuario o contraseña inválidos.");
  }

  return encontrado;
}

/* ------------------- ELIMINAR CUENTA ------------------- */
export function deleteCurrentUser() {
  const actual = getUsuarioActivo();

  if (!actual) {
    return { ok: false, mensaje: "No hay sesión activa" };
  }

  const users = loadUsers();
  const nuevaLista = [];

  // Copiar todos los usuarios excepto el actual
  for (let i = 0; i < users.length; i++) {
    if (users[i].usuario !== actual.usuario) {
      nuevaLista.push(users[i]);
    }
  }

  saveUsers(nuevaLista);
  logoutUsuario();

  return { ok: true, mensaje: "Cuenta eliminada correctamente" };
}
