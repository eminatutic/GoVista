window.addEventListener("pageshow", (event) => {
  if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
    window.location.reload();
  }
});
if (localStorage.getItem("logged_in") !== "true") {
  window.location.href = "../login.html";
}

const DESTINATIONS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations";

async function loadCountriesAndTrips() {
  try {
    const destinations = await fetch(DESTINATIONS_URL).then(res => res.json());


    const oneDayTrips = destinations.filter(dest => dest.duration === "1 day");
    renderOneDayTrips(oneDayTrips);

  
    const countries = [...new Set(destinations.map(dest => dest.country))];
    renderCountries(countries);

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function renderOneDayTrips(trips) {
  const container = document.getElementById("oneDayTripsContainer");

  if (!container) return;

  if (trips.length === 0) {
    container.innerHTML = "<p>No one-day trips available at the moment.</p>";
    return;
  }

  container.innerHTML = trips.map(trip => {
    const imageUrl = trip.images && trip.images.length > 0
      ? trip.images[0] 
      : "Undefined";

    return `
      <div class="trip-card" onclick="openTrip('${trip.id}')">
        <img src="${imageUrl}" alt="${trip.name}" />
        <h3>${trip.name}</h3>
        <p>${trip.country}</p>
        <p><strong>Date:</strong> ${trip.end_date}</p>
        <p><strong>Price:</strong> ${trip.price}</p>
      </div>
    `;
  }).join("");
}


function renderCountries(countries) {
  const container = document.getElementById("countriesContainer");
  container.innerHTML = countries.map(country => `
    <div class="country-card" onclick="openCountry('${country}')">
      <h3>${country}</h3>
    </div>
  `).join("");
}



function openCountry(country) {
  localStorage.setItem("selectedCountry", country);
  window.location.href = "tours.html";
}

loadCountriesAndTrips();
