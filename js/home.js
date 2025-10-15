window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});
if (localStorage.getItem("logged_in") !== "true") {
  window.location.href = "../login.html";
}


const DESTINATIONS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations";
function renderDestination(destination) {
  if (!destination) return '';
  return `
    <div class="tour-card">
      <img src="${destination.images[0]}" alt="${destination.name}">
      <div class="tour-info">
        <h3>${destination.name}</h3>
        <p><strong>Country:</strong> ${destination.country}</p>
        <p><strong>Duration:</strong> ${destination.duration} (${destination.start_date} - ${destination.end_date})</p>
        <p class="tour-price"><strong>Price:</strong> ${destination.price}</p>
        <p><strong>Hotel:</strong> ${destination.hotel}</p>
      </div>
    </div>
  `;
}

async function loadDestinations() {
  const container = document.getElementById("toursContainer");

  try {
    const destinations = await fetch(DESTINATIONS_URL).then(res => res.json());
    const mainDestinations = destinations.slice(0, 4); 
    container.innerHTML = mainDestinations.map(dest => renderDestination(dest)).join("");
  } catch (err) {
    console.log(err);
    container.innerHTML = "<p>Data could not be loaded</p>";
  }
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

loadDestinations();
exploreButton();