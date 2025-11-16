const formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", (event) => {
  event.preventDefault(); 
  console.log("✅ Submit de registro capturado por JS");

  const usuario = document.getElementById("registroUsuario").value.trim();
  const email  = document.getElementById("registroEmail").value.trim();
  const pass   = document.getElementById("registroPassword").value.trim();
  const metodo   = document.getElementById("metodo").value;

  const raw = localStorage.getItem("usuarios");
  const usuarios = raw ? JSON.parse(raw) : [];

  const nuevoUsuario = { usuario, email, pass, metodo };
  
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  console.log("✅ Usuario guardado:", nuevoUsuario);

  window.location.href = "Inicio.html";
});