const tasas = {
  "USD Oficial": 348.96,
  "USD Blue": 925,
  "USD Turista": 487.50,
};

function obtenerCantidadAlmacenada() {
  return localStorage.getItem('cantidad') || '';
}

function guardarCantidad(cantidad) {
  try {
    localStorage.setItem('cantidad', cantidad);
  } catch (error) {
    console.error('Error al guardar la cantidad en el almacenamiento local:', error.message);
  }
}

function obtenerHistorial() {
  try {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    return historial;
  } catch (error) {
    console.error('Error al obtener el historial desde el almacenamiento local:', error.message);
    return [];
  }
}

function guardarHistorial(conversion) {
  try {
    const historial = obtenerHistorial();

    
    const existeEntrada = historial.some(entry => 
      entry.fecha === conversion.fecha && entry.cantidad === conversion.cantidad);


    if (!existeEntrada) {
      historial.push(conversion);
      localStorage.setItem('historial', JSON.stringify(historial));
    }

  } catch (error) {
    console.error('Error al guardar el historial en el almacenamiento local:', error.message);
  }
}

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

function mostrarHistorial() {
  try {
    const historial = obtenerHistorial();
    const historyDiv = document.getElementById('history');

    if (historyDiv) {
      historyDiv.innerHTML = "<p>Historial de Conversiones:</p>";

      historial.forEach((conversion) => {
        historyDiv.innerHTML += `<p>${conversion.fecha}: ${conversion.cantidad.toFixed(2)} ARS</p>`;
      });
    } else {
      console.error('El elemento con id "history" no se encontró en el HTML.');
    }
  } catch (error) {
    console.error('Error al mostrar el historial:', error.message);
  }
}


window.onload = function() {
  localStorage.removeItem('historial');
  mostrarHistorial();
}

function convertir() {
  try {
    const cantidadInput = document.getElementById('cantidad');
    const resultDiv = document.getElementById('result');

    const cantidad = parseFloat(cantidadInput.value);

    if (isNaN(cantidad)) {
      resultDiv.innerHTML = "Entrada no válida. Por favor, ingresa un número válido.";
    } else {
      guardarCantidad(cantidad);

      const conversion = cambioATodos("ARS", cantidad);

      resultDiv.innerHTML = `<p>Convertir ${cantidad.toFixed(2)} ARS a:</p>`;
      conversion.forEach((conversion) => {
        resultDiv.innerHTML += `<p>${conversion.cantidad.toFixed(2)} ${conversion.moneda}</p>`;
        guardarHistorial({
          fecha: new Date().toLocaleString(),
          cantidad: cantidad,
          moneda: conversion.moneda,
        });
      });

      mostrarHistorial();
    }
  } catch (error) {
    console.error('Error en la conversión:', error.message);
  }
}
