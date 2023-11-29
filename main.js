const tasas = {
  "USD Oficial": 368.60,
  "USD Blue": 970,
  "USD Turista": 735.76,
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

    // Verificar si ya existe una entrada en el historial con la misma fecha y cantidad
    const existeEntrada = historial.some(entry => 
      entry.fecha === conversion.fecha && entry.cantidad === conversion.cantidad);

    // Si no existe una entrada con la misma fecha y cantidad, guardar la conversión
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

    // Verificar si el elemento con id 'history' existe antes de modificar su innerHTML
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

// Eliminar el historial al cargar la página
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
