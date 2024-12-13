const canvas = document.getElementById("cesarWheel");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Fonction pour dessiner la roue avec un décalage donné
function drawWheel(shift = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cercle extérieur
  ctx.beginPath();
  ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
  ctx.strokeStyle = "#007BFF";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();

  // Cercle intérieur
  ctx.beginPath();
  ctx.arc(radius, radius, radius - 50, 0, 2 * Math.PI);
  ctx.strokeStyle = "#6c757d";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();

  // Dessin des lettres
  for (let i = 0; i < alphabet.length; i++) {
    // Angle pour chaque lettre
    const angle = (i * (2 * Math.PI)) / alphabet.length - Math.PI / 2;
    const xOuter = radius + (radius - 20) * Math.cos(angle);
    const yOuter = radius + (radius - 20) * Math.sin(angle);

    const adjustedIndex = (i + shift) % alphabet.length;
    const xInner = radius + (radius - 60) * Math.cos(angle);
    const yInner = radius + (radius - 60) * Math.sin(angle);

    // Lettres extérieures
    ctx.font = "14px Arial";
    ctx.fillStyle = "#007BFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(alphabet[i], xOuter, yOuter);

    // Lettres intérieures (avec décalage)
    ctx.fillStyle = "#6c757d";
    ctx.fillText(alphabet[adjustedIndex], xInner, yInner);
  }
}

// Fonction de chiffrement/déchiffrement César
function caesarCipher(text, shift) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (!alphabet.includes(char)) return char;
      const index =
        (alphabet.indexOf(char) + shift + alphabet.length) % alphabet.length;
      return alphabet[index];
    })
    .join("");
}

// Initialisation de la roue
drawWheel();

// Gestion des événements
document.getElementById("shift").addEventListener("input", (e) => {
  const shift = parseInt(e.target.value) || 0;
  drawWheel(shift);
});

document.getElementById("encryptBtn").addEventListener("click", () => {
  const text = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value) || 0;

  // Chiffrement du texte
  const result = caesarCipher(text, shift);
  document.getElementById("outputText").textContent = result;

  // Mise à jour de la roue
  drawWheel(shift);
});

document.getElementById("decryptBtn").addEventListener("click", () => {
  const text = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value) || 0;

  // Déchiffrement (juste inverse du chiffrement)
  const result = caesarCipher(text, -shift);
  document.getElementById("outputText").textContent = result;

  // Mise à jour de la roue (décalage inverse)
  drawWheel(-shift);
});

// Fonction de copie
document.getElementById("copyBtn").addEventListener("click", () => {
  const outputText = document.getElementById("outputText").textContent;
  navigator.clipboard.writeText(outputText).then(() => {
    alert("Texte copié dans le presse-papiers !");
  });
});
