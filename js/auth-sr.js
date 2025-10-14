function handleLoginLink() {
  const loginLink = document.getElementById("log-in");
  if (!loginLink) return;
  const loggedIn = localStorage.getItem("logged_in") === "true";
  if (loggedIn) {
    loginLink.textContent = "Odjavi se";
    loginLink.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("logged_in");
      handleLoginLink();
      window.location.href = "home-sr.html";
    };
  } else {
    loginLink.textContent = "Uloguj se";
    loginLink.href = "login-sr.html";
    loginLink.onclick = null;
  }
}

function handleDestinationsAccess() {
  const destinationsLink = document.getElementById("destinations-link");
  if (!destinationsLink) return;

  destinationsLink.addEventListener("click", function (e) {
    const loggedIn = localStorage.getItem("logged_in") === "true";
    if (!loggedIn) {
      e.preventDefault();
      Swal.fire({
        icon: 'warning',
        title: 'Ups!',
        text: 'Morate se prvo prijaviti!',
        confirmButtonText: 'Idi na prijavu'
      }).then(() => {
        window.location.href = "login-sr.html";
      });
    }
  });
}

handleLoginLink();
handleDestinationsAccess();
