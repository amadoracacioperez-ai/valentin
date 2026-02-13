// 1) Define aquí tus fotos (pon los nombres reales que metas en /photos)
const photos = [
  { id: 1, src: "photos/01.jpg", correct: true },
  { id: 2, src: "photos/02.jpg", correct: true },
  { id: 3, src: "photos/03.jpg", correct: true },
  { id: 4, src: "photos/04.jpg", correct: true },
  { id: 5, src: "photos/IMG_3004.jpg", correct: true },
  { id: 6, src: "photos/06.jpg", correct: true },
  { id: 7, src: "photos/07.jpg", correct: true },
  { id: 8, src: "photos/08.jpg", correct: true },
  { id: 9, src: "photos/09.jpg", correct: true },
];

// Genera la cuadrícula
const grid = document.getElementById("grid");
const msg = document.getElementById("msg");
const btn = document.getElementById("btn");

const selected = new Set();

photos.forEach((p, index) => {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = "tile";
  tile.setAttribute("aria-pressed", "false");
  tile.setAttribute("aria-label", `Foto ${index + 1}`);

  const img = document.createElement("img");
  img.src = p.src;
  img.alt = `Foto ${index + 1}`;

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = "Seleccionar";

  tile.appendChild(img);
  tile.appendChild(badge);

  tile.addEventListener("click", () => {
    if (selected.has(p.id)) {
      selected.delete(p.id);
      tile.classList.remove("selected");
      tile.setAttribute("aria-pressed", "false");
      badge.textContent = "Seleccionar";
    } else {
      selected.add(p.id);
      tile.classList.add("selected");
      tile.setAttribute("aria-pressed", "true");
      badge.textContent = "OK";
    }
    msg.textContent = "";
  });

  grid.appendChild(tile);
});

// Validación
btn.addEventListener("click", () => {
  const correctIds = photos.filter(p => p.correct).map(p => p.id).sort((a,b)=>a-b);
  const selectedIds = Array.from(selected).sort((a,b)=>a-b);

  const isSame =
    correctIds.length === selectedIds.length &&
    correctIds.every((v, i) => v === selectedIds[i]);

  if (isSame) {
    msg.style.color = "rgba(255,255,255,.85)";
    msg.textContent = "Verificación correcta ✅";
    setTimeout(() => {
      window.location.href = "love.html";
    }, 600);
  } else {
    msg.style.color = "rgba(255,255,255,.75)";
    msg.textContent = "Hmm… creo que falta alguna (o sobra alguna). Prueba otra vez 🙂";
  }
});
