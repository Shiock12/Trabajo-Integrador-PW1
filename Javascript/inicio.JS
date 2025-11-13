// main.js
import { initEmpresaForm } from "./inscripcion-empresa.js";
import {
  registrarUsuario,
  loginUsuario,
  getUsuarioActivo,
  setUsuarioActivo,
  logoutUsuario,
  deleteCurrentUser
} from "./auth.js";

/* ---------------- SLIDER ---------------- */
function initSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const imgEl = slider.querySelector("img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  const images = [
    "../Images/banner.jpg",
    "../Images/imagen3.jpg",
    "../Images/imagen4.jpg",
  ];

  const dotsWrap = document.createElement("div");
  dotsWrap.className = "slider-dots";
  slider.appendChild(dotsWrap);

  const dots = images.map((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.addEventListener("click", () => show(idx));
    dotsWrap.appendChild(dot);
    return dot;
  });

  let index = 0;
  function show(i) {
    index = (i + images.length) % images.length;
    imgEl.src = images[index];
    dots.forEach((d, di) => d.classList.toggle("active", di === index));
  }

  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));
  setInterval(() => show(index + 1), 4000);
  show(0);
}


function initEmpresas() {


  const formEmpresas = document.getElementById("contenedorInputs");
  if (!formEmpresas) return;


  initEmpresaForm();
}

/* ---------------- REGISTRO ---------------- */
function initRegistro() {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  const usuario = document.getElementById("registroUsuario") || document.getElementById("nombre");
  const email = document.getElementById("registroEmail") || document.getElementById("email");
  const password = document.getElementById("registroPassword") || document.getElementById("password");
  const repetir = document.getElementById("registroPassword2");
  const metodo = document.getElementById("metodo");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (repetir && password.value !== repetir.value) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    try {
     const nuevo = registrarUsuario(
  usuario.value.trim(),
  email.value.trim(),
  password.value,
  metodo ? metodo.value : ""
);
      setUsuarioActivo(nuevo);
      alert("Usuario registrado correctamente ✅");
      window.location.href = "Inicio.html";
    } catch (err) {
      alert(err.message || "Error al registrar usuario.");
    }
  });
}

/* ---------------- LOGIN ---------------- */
function initLogin() {
  const form = document.getElementById("formLogin");
  if (!form) return;

  const user = document.getElementById("loginUsuario");
  const pass = document.getElementById("loginPassword");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
const usr = loginUsuario(
  user.value.trim(),
  pass.value
);
      setUsuarioActivo(usr);
      alert("Inicio de sesión exitoso ✅");
      window.location.href = "Inicio.html";
    } catch (err) {
      alert(err.message || "Usuario o contraseña inválidos.");
    }
  });
}

/* ---------------- PERFIL ---------------- */
function initPerfil() {
  const usuarioEl = document.getElementById("perfilUsuario");
  if (!usuarioEl) return;

  const emailEl = document.getElementById("perfilEmail");
  const metodoTxt = document.getElementById("perfilMetodoTexto");
  const metodoImg = document.getElementById("perfilMetodoImg");
  const btnLogout = document.getElementById("btnLogout");

  const activo = getUsuarioActivo();
  if (!activo) {
    window.location.href = "VistaLogin.html";
    return;
  }

  usuarioEl.textContent = activo.usuario || "(sin usuario)";
  emailEl.textContent = activo.email || "(sin email)";
  metodoTxt.textContent = activo.metodo || "Sin método";

  const iconos = {
    "Mercado Pago": "../Images/mercadopago.png",
    "PayPal": "../Images/pp.png",
    "Tarjeta de crédito": "../Images/visa.png",
    "MasterCard": "../Images/MasterCard-logoS.png",
  };
  if (iconos[activo.metodo]) {
    metodoImg.src = iconos[activo.metodo];
    metodoImg.alt = activo.metodo;
  }

  // Logout
  btnLogout?.addEventListener("click", () => {
    logoutUsuario();
    window.location.href = "VistaLogin.html";
  });


  const btnDelete =
    document.getElementById("btnDeleteAccount") ||
    document.querySelector('[data-action="delete-account"]');

  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      const seguro = confirm(
        "⚠️ Esta acción eliminará tu cuenta y tus datos locales. ¿Querés continuar?"
      );
      if (!seguro) return;

      const res = deleteCurrentUser();
      alert(res.mensaje || "Cuenta eliminada.");

      // Redirigimos al inicio (o al login)
      window.location.href = "../index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();    
  initEmpresas();   
  initRegistro();   
  initLogin();      
  initPerfil();    
});
