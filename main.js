const tasas = //Actualizadas lo mas posible :)
{
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
  
    const conversion = monedas.map((moneda) => { 
      return {
        moneda: moneda, 
        cantidad: cambio (monedaBase, cantidad, moneda), 
      };
    });
  
    return conversion;
  }
  
  const pesos = "ARS";
  const userInput = prompt("Ingresa la cantidad de pesos argentinos que deseas convertir:");
  
  const cantidad = parseFloat(userInput);
  
  if (isNaN(cantidad)) {
    console.log("Entrada no válida. Por favor, ingresa un número válido.");
  } else {
    const conversion = cambioATodos(pesos, cantidad);
  
    console.log(`Convertir ${cantidad.toFixed(2)} ${pesos} a:`);
    conversion.forEach((conversion) => {
      console.log(`${conversion.cantidad.toFixed(2)} ${conversion.moneda}`);
    });
  }
  