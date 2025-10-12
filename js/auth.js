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
      window.location.reload();
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
      alert("You need to log in first!");
      window.location.href = "login.html";
    }
  });
}


  handleLoginLink();
  handleDestinationsAccess();

