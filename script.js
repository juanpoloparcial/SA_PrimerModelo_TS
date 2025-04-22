let modelo;

const cargarModelo = async () => {
  // Cargamos el modelo con una "threshold" de 0.9 (confianza del 90%)
  modelo = await toxicity.load(0.9);
  console.log("Modelo de toxicidad cargado");
};

const analizar = async () => {
  const texto = document.getElementById("texto").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!modelo) {
    resultadoDiv.innerText = "Cargando modelo, espera un momento...";
    return;
  }

  if (!texto.trim()) {
    resultadoDiv.innerText = "Por favor, escribe algo para analizar.";
    return;
  }

  const predicciones = await modelo.classify([texto]);

  let resultadoHTML = `<h3>Resultado para: "${texto}"</h3>`;
  let algunaToxica = false;

  predicciones.forEach((pred) => {
    if (pred.results[0].match) {
      algunaToxica = true;
      resultadoHTML += `<p><strong>${pred.label}</strong>: TOXICIDAD DETECTADA ✅</p>`;
    }
  });

  if (!algunaToxica) {
    resultadoHTML += `<p>No se detectó toxicidad 👍</p>`;
  }

  resultadoDiv.innerHTML = resultadoHTML;
};

// Cargar el modelo al iniciar
cargarModelo();
