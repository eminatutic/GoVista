window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});
if (localStorage.getItem("logged_in") !== "true") {
  window.location.href = "../pages/login.html";
}