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


async function translateText(text, targetLang = 'en') {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (err) {
    console.error("Translation error:", err);
    return text; 
  }
}

async function loadTours() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allTours = await Promise.all(data.map(async t => {
      const locKey = t.lokacija.trim().toLowerCase();
     
      const translatedAttractions = await Promise.all(t.atrakcije.map(a => translateText(a)));
      return {
        ...t,
        slika: imagesMap[locKey] || defaultImage,
        najboljeVreme: await translateText(t.najboljeVreme),
        hotel: await translateText(t.hotel),
        prevoz: await translateText(t.prevoz),
        atrakcije: translatedAttractions
      };
    }));

    const attractions = [...new Set(allTours.flatMap(t => t.atrakcije))];
    renderAttractions(attractions);
    renderTours(allTours);

  } catch (err) {
    console.error("Failed to load tours:", err);
    toursContainer.innerHTML = "<p>Failed to load tours.</p>";
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
    toursContainer.innerHTML = "<p>No tours found for this attraction.</p>";
    return;
  }

  toursContainer.innerHTML = tours.map(t => `
    <div class="trip-card">
      <img src="${t.slika}" alt="${t.lokacija}"
           onerror="this.src='${defaultImage}'"/>
      <h3>${t.lokacija}</h3>

      <div class="trip-info">
        <div class="trip-details">
          <p><strong>Best time:</strong> ${t.najboljeVreme}</p>
          <p><strong>Start:</strong> ${t.pocetak}</p>
          <p><strong>End:</strong> ${t.kraj}</p>
          <p><strong>Hotel:</strong> ${t.hotel}</p>
          <p><strong>Transport:</strong> ${t.prevoz}</p>
        </div>
        <p class="trip-price"><strong>Price:</strong> ${t.cena}</p>
      </div>
    </div>
  `).join("");
}

loadTours();
