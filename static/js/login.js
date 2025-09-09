function checkPassword() {
    const input = document.getElementById("password").value;
    const error = document.getElementById("error");
  
    // Contraseña estática
    const PASSWORD = "1234567";  
  
    if (input === PASSWORD) {
      window.location.href = "/home";
    } else {
      error.textContent = "Contraseña incorrecta";
    }
  }
  