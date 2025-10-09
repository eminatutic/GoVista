const API_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destination";

document.addEventListener("DOMContentLoaded", () => {
  fetchTours();

  // hvata tvoje postojeće "Explore" dugme u hero sekciji
  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "/destinations/destinations.html";
    });
  }
});

async function fetchTours() {
  const container = document.getElementById("toursContainer");
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const tours = await res.json();

    container.innerHTML = tours
      .slice(0, 4)
      .map(
        (tour) => `
        <div class="tour-card">
          <img src="${tour.image}" alt="${tour.name}" />
          <div class="tour-info">
            <h3>${tour.name}</h3>
            <p><strong>Destination:</strong> ${tour.destination}</p>
            <p><strong>Duration:</strong> ${tour.duration}</p>
            <p class="tour-price"><strong>Price:</strong> ${tour.price}</p>
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Error loading tours:", err);
    container.innerHTML = `<p style="color:red;">Failed to load tours. Please check your API URL.</p>`;
  }
}
