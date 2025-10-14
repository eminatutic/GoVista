const DESTINATIONS_URL = "https://68e6913421dd31f22cc6310e.mockapi.io/destinations-sr";

async function loadDestinations() {
  const container = document.getElementById("destinationsContainer");

  try {
    const destinations = await fetch(DESTINATIONS_URL).then(res => res.json());
    container.innerHTML = destinations.map(dest => renderDestinationCard(dest)).join("");
    initSliders();
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Podaci se nisu mogli učitati</p>";
  }
}

function renderDestinationCard(dest) {
  return `
    <div class="destination-card">
      <div class="image-slider">
        ${
          dest.images?.map((img, i) => 
            `<img src="${img}" class="${i === 0 ? "active" : ""}" alt="${dest.name}">`
          ).join("") || "<p>Nema dostupnih slika</p>"
        }
        <button class="slider-btn left">‹</button>
        <button class="slider-btn right">›</button>
      </div>

      <div class="destination-info">
        <h3>${dest.name}</h3>
        <p class="desc">${dest.description}</p>
        <div class="destination-details">
          <span><strong>Država:</strong> ${dest.country}</span>
          <span><strong>Trajanje:</strong> ${dest.duration} (${dest.start_date} - ${dest.end_date})</span>
          <span><strong>Hotel:</strong> ${dest.hotel}</span>
        </div>
        <p class="tour-price"><strong>Cena:</strong> ${dest.price}</p>
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

    slider.querySelector(".left").addEventListener("click", () => {
      current = (current - 1 + images.length) % images.length;
      updateImages();
    });

    slider.querySelector(".right").addEventListener("click", () => {
      current = (current + 1) % images.length;
      updateImages();
    });
  });
}

loadDestinations();
