const DESTINATIONS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations";
const TOURS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/tours";

function renderTours(tour, destinations) {
if (!tour) return '';
const destination = destinations.find(dest => dest.id === tour.destinationId);
return `
  <div class="tour-card">
    <img src="${destination? destination.images[0] : ""}" alt="${destination.name? destination.name : "Unknown"}">
    <div class="tour-info">
      <h3>${tour.name}</h3>
      <p><strong>Destination:</strong> ${destination? destination.name: "Unknown"}</p>
      <p><strong>Duration</strong> ${tour.duration}</p>
      <p class="tour-price"><strong>Price:</strong> ${tour.price}</p>
        <p><strong>Hotel:</strong> ${tour.hotel}</p>
      </div>
    </div>
`;
  
}
async function loadTours() {
  const container = document.getElementById("toursContainer");

    try{
      const [destinations, tours] = await Promise.all([
        fetch(DESTINATIONS_URL).then(res => res.json()),
        fetch(TOURS_URL).then(res=> res.json())
      ]);
      const mainTours= tours.slice(0,4);
      container.innerHTML= mainTours.map(tour=>renderTours(tour, destinations)).join("");
    }
    catch(err){
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
      alert("You need to log in first!");
      window.location.href = "../pages/login.html"; 
    } else {
      window.location.href = "../pages/destinations.html"; 
    }
  });
}
loadTours();
exploreButton();