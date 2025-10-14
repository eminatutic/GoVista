function handleLoginLink() {
  const loginLink = document.getElementById("log-in");
  if (!loginLink) return;
  const loggedIn = localStorage.getItem("logged_in") === "true";
  if (loggedIn) {
    loginLink.textContent = "Log Out";
    loginLink.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("logged_in");
      handleLoginLink();
      window.location.href = "index.html";
    };
  } else {
    loginLink.textContent = "Log In";
    loginLink.href = "../pages/login.html";
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
        title: 'Oops!',
        text: 'You need to log in first!',
        confirmButtonText: 'Go to login'
      }).then(() => {
        window.location.href = "login.html";
      });
    }
  });
}



  handleLoginLink();
  handleDestinationsAccess();

