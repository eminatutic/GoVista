const DESTINATIONS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations";
const TOURS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/tours";

async function loadTours() {
  const container = document.getElementById("destinationsContainer");

  try {

    const [destinations, tours] = await Promise.all([
      fetch(DESTINATIONS_URL).then(res => res.json()),
      fetch(TOURS_URL).then(res => res.json())
    ]);
    container.innerHTML = tours.map(tour => renderTourCard(tour, destinations)).join("");
    initSliders();
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Data could not be loaded</p>";
  }
}

function renderTourCard(tour, destinations) {
  const dest = destinations.find(d => d.id == tour.destinationId);

  return `
    <div class="destination-card">
      <div class="image-slider">
        ${
          dest?.images
            ?.map((img, i) => `<img src="${img}" class="${i === 0 ? "active" : ""}" alt="${dest?.name || tour.name}">`)
            .join("") || "<p>No images available</p>"
        }
        <button class="slider-btn left">‹</button>
        <button class="slider-btn right">›</button>
      </div>

      <div class="destination-info">
        <h3>${tour.name}</h3>
        ${
          dest
            ? `<p class="desc">${dest.description}</p>
               <div class="destination-details">
                 <span><strong>Country:</strong> ${dest.country}</span>
                 <span><strong>Duration:</strong> ${tour.duration}</span>
                 <span><strong>Hotel:</strong> ${tour.hotel}</span>
               </div>`
            : "<p>Destination information unavailable.</p>"
        }
        <p class="tour-price"><strong>Price:</strong> ${tour.price}</p>
      </div>
    </div>
  `;
}


function initSliders() {
  document.querySelectorAll(".image-slider").forEach(slider => {
    const images = slider.querySelectorAll("img");
    let current = 0;

    const updateImages = () => {
      images.forEach((img, i) => img.classList.toggle("active", i === current));
    };

    const leftBtn = slider.querySelector(".left");
    const rightBtn = slider.querySelector(".right");

    leftBtn.addEventListener("click", () => {
      current = (current - 1 + images.length) % images.length;
      updateImages();
    });

    rightBtn.addEventListener("click", () => {
      current = (current + 1) % images.length;
      updateImages();
    });
  });
}


loadTours();
