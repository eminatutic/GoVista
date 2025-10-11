const DESTINATIONS_API = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations";
const TOURS_API = "https://68e6913421dd31f22cc6310e.mockapi.io/tours";

document.addEventListener("DOMContentLoaded", loadDestinations);

async function loadDestinations() {
  const container = document.getElementById("destinationsContainer");

  try {
    const [destRes, tourRes] = await Promise.all([
      fetch(DESTINATIONS_API),
      fetch(TOURS_API),
    ]);

    const destinations = await destRes.json();
    const tours = await tourRes.json();

    container.innerHTML = tours
      .map((tour) => {
        const dest = destinations.find((d) => d.id == tour.destinationId);

        return `
          <div class="destination-card">
            <div class="image-slider" data-images='${JSON.stringify(dest?.images || [])}'>
              ${
                dest?.images
                  ?.map(
                    (img, i) =>
                      `<img src="${img}" class="${i === 0 ? "active" : ""}" alt="${dest?.name || tour.name}">`
                  )
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
              <span><strong>Price:</strong> ${tour.price}</span>
            </div>
          </div>
        `;
      })
      .join("");

    initSliders();
  } catch (error) {
    console.error("Error loading destinations:", error);
    container.innerHTML = `<p style="color:red;">Failed to load destinations. Please try again later.</p>`;
  }
}

function initSliders() {
  document.querySelectorAll(".image-slider").forEach((slider) => {
    const images = slider.querySelectorAll("img");
    let current = 0;

    const showImage = (index) => {
      images.forEach((img, i) => img.classList.toggle("active", i === index));
    };

    slider.querySelector(".left").addEventListener("click", () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    slider.querySelector(".right").addEventListener("click", () => {
      current = (current + 1) % images.length;
      showImage(current);
    });
  });
}
