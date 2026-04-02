// =====================
// 🎠 CARRUSEL
// =====================
const slider = document.querySelector(".slider");
let items = Array.from(document.querySelectorAll(".slider a"));

function updateClasses() {
  items.forEach(item => {
    item.classList.remove("center", "left1", "left2", "right1", "right2");
  });

  if (items.length < 5) return;

  items[0].classList.add("left2");
  items[1].classList.add("left1");
  items[2].classList.add("center");
  items[3].classList.add("right1");
  items[4].classList.add("right2");
}

function rotateSlider() {
  items.push(items.shift());
  updateClasses();
}

// iniciar
updateClasses();

// auto rotación
let interval = setInterval(rotateSlider, 2500);

// pausa hover
slider.addEventListener("mouseenter", () => clearInterval(interval));
slider.addEventListener("mouseleave", () => {
  interval = setInterval(rotateSlider, 2500);
});


// =====================
// 🔍 BUSCADOR PRO (DINÁMICO)
// =====================
const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase().trim();
  results.innerHTML = "";

  if (value === "") return;

  const cards = document.querySelectorAll(".card");
  let found = false;

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(value) || desc.includes(value)) {
      found = true;

      const item = document.createElement("a");
      item.textContent = card.querySelector("h3").textContent;

      item.addEventListener("click", () => {
        card.scrollIntoView({ behavior: "smooth", block: "center" });

        // efecto resaltado 🔥
        card.style.boxShadow = "0 0 20px #ff4d8d";
        setTimeout(() => {
          card.style.boxShadow = "";
        }, 1500);

        results.innerHTML = "";
        input.value = "";
      });

      results.appendChild(item);
    }
  });

  // si no encuentra nada
  if (!found) {
    const noResult = document.createElement("a");
    noResult.textContent = "No se encontró ningún postre 😢";
    results.appendChild(noResult);
  }
});