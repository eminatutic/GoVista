window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});

if (localStorage.getItem("logged_in") !== "true") {
  window.location.href = "../pages/login-sr.html";
}


function exploreButton() {
  const exploreBtn = document.getElementById("exploreBtn");
  if (!exploreBtn) return;

  exploreBtn.addEventListener("click", () => {
    const loggedIn = localStorage.getItem("logged_in") === "true";

    if (!loggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Ups!',
        text: 'Morate se prvo prijaviti!',
        confirmButtonText: 'Idi na prijavu'
      }).then(() => {
        window.location.href = "../pages/login-sr.html";
      });
    } else {
      window.location.href = "../pages/destinations-sr.html";
    }
  });
}

exploreButton();
