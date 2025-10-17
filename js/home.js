window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});
if (localStorage.getItem("logged_in") !== "true") {
  window.location.href = "../login.html";
}


function exploreButton() {
  const exploreBtn = document.getElementById("exploreBtn");
  if (!exploreBtn) return;

  exploreBtn.addEventListener("click", () => {
    const loggedIn = localStorage.getItem("logged_in") === "true";

    if (!loggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'You need to log in first!',
        confirmButtonText: 'Go to login'
      }).then(() => {
        window.location.href = "../pages/login.html";
      });
    } else {
      window.location.href = "../pages/destinations.html";
    }
  });
}

exploreButton();