import { loginUsuario } from "./auth.js";

const formLogin    = document.getElementById("formLogin");
const inputUsuario = document.getElementById("loginUsuario");
const inputPassword    = document.getElementById("loginPassword");
const errorBox     = document.getElementById("loginError");

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const usuario  = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    try {
      loginUsuario(usuario, password);

      window.location.href = "../Pages/Inicio.html";
    } catch (err) {
      if (errorBox) {
        errorBox.textContent = err.message || "Error al iniciar sesión.";
        errorBox.style.display = "block";
      } else {
        alert(err.message || "Error al iniciar sesión.");
      }
    }
  });
}