const logoutBtn = document.getElementById("log-out");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

  
    localStorage.removeItem("logged_in");
    localStorage.removeItem("user");


    window.location.href = "login-sr.html";
  });
}
