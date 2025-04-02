document.addEventListener("DOMContentLoaded", () => {
  const ingresarButton = document.getElementById("loginButton"); // ID corregido
  const registrarseButton = document.getElementById("registrateButton"); // ID corregido
  const formIngresar = document.querySelector(".loginForm"); // Selección corregida
  const formRegistrarse = document.querySelector(".registrateForm"); // Selección corregida

  // Lógica para cuando se hace clic en 'INGRESAR'
  ingresarButton.addEventListener("click", () => {
    ingresarButton.classList.add("active");
    registrarseButton.classList.remove("active");

    formIngresar.classList.add("showForm");
    formRegistrarse.classList.remove("showForm");
  });

  // Lógica para cuando se hace clic en 'REGISTRARSE'
  registrarseButton.addEventListener("click", () => {
    registrarseButton.classList.add("active");
    ingresarButton.classList.remove("active");

    formRegistrarse.classList.add("showForm");
    formIngresar.classList.remove("showForm");
  });
});
