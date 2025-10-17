const API_URL = "https://vebdizajn-4.onrender.com/api/vebdizajn/egzoticne-destinacije";
const toursContainer = document.getElementById("toursContainer");
const attractionsContainer = document.getElementById("attractionsContainer");

let allTours = [];

const imagesMap = {
  "bali, indonezija": "../Bali2.jpeg",
  "maldivi": "../maldives2.jpg",
  "maui, havaji": "../Hawaii.jpg"
};

const defaultImage = "../images/default.jpg";

async function loadTours() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allTours = data.map(t => {
      const locKey = t.lokacija.trim().toLowerCase(); 
      return {
        ...t,
        slika: imagesMap[locKey] || defaultImage
      };
    });

    const attractions = [...new Set(allTours.flatMap(t => t.atrakcije))];
    renderAttractions(attractions);

    renderTours(allTours);
  } catch (err) {
    console.error("Neuspešno učitavanje tura:", err);
    toursContainer.innerHTML = "<p>Neuspešno učitavanje tura.</p>";
  }
}

function renderAttractions(attractions) {
  attractionsContainer.innerHTML = attractions.map(a => `
    <div class="attraction-card" onclick="filterByAttraction('${a}')">${a}</div>
  `).join("");
}

function filterByAttraction(attraction) {
  const filtered = allTours.filter(t => t.atrakcije.includes(attraction));
  renderTours(filtered);
}

function renderTours(tours) {
  if (tours.length === 0) {
    toursContainer.innerHTML = "<p>Nema dostupnih tura za ovu atrakciju.</p>";
    return;
  }

  toursContainer.innerHTML = tours.map(t => `
    <div class="trip-card">
      <img src="${t.slika}" alt="${t.lokacija}"
           onerror="this.src='${defaultImage}'"/>
      <h3>${t.lokacija}</h3>

      <div class="trip-info">
        <div class="trip-details">
          <p><strong>Najbolje vreme:</strong> ${t.najboljeVreme}</p>
          <p><strong>Početak:</strong> ${t.pocetak}</p>
          <p><strong>Kraj:</strong> ${t.kraj}</p>
          <p><strong>Hotel:</strong> ${t.hotel}</p>
          <p><strong>Prevoz:</strong> ${t.prevoz}</p>
        </div>
        <p class="trip-price"><strong>Cena:</strong> ${t.cena}</p>
      </div>
    </div>
  `).join("");
}

loadTours();
