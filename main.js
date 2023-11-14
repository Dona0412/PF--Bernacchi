const tasas = {
  "USD Oficial": 368.60,
  "USD Blue": 970,
  "USD Turista": 735.76,
};

function cambio(monedaBase, cantidad, moneda) {
  if (tasas[moneda]) {
    return cantidad / tasas[moneda];
  } else {
    return "Moneda no soportada";
  }
}

function cambioATodos(monedaBase, cantidad) {
  const monedas = ["USD Oficial", "USD Blue", "USD Turista"];

  return monedas.map((moneda) => {
    return {
      moneda: moneda,
      cantidad: cambio(monedaBase, cantidad, moneda),
    };
  });
}

function convertir() {
  const cantidadInput = document.getElementById('cantidad');
  const resultDiv = document.getElementById('result');

  const cantidad = parseFloat(cantidadInput.value);

  if (isNaN(cantidad)) {
    resultDiv.innerHTML = "Entrada no válida. Por favor, ingresa un número válido.";
  } else {
    const conversion = cambioATodos("ARS", cantidad);

    resultDiv.innerHTML = `<p>Convertir ${cantidad.toFixed(2)} ARS a:</p>`;
    conversion.forEach((conversion) => {
      resultDiv.innerHTML += `<p>${conversion.cantidad.toFixed(2)} ${conversion.moneda}</p>`;
    });
  }
}