async function readFile(rutaArchivo) {
  try {
    const response = await fetch(rutaArchivo);

    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo: ${response.status}`);
    }

    const contenido = await response.text();
    return JSON.parse(contenido);
    // Aquí puedes trabajar con el contenido del archivo
  } catch (error) {
    console.error("Error al cargar el archivo:", error);
  }
}

// Función para agregar una nueva fila a la tabla
async function agregarFila() {
  console.log("hi");
  const table = document.getElementById("miTabla");
  const tbody = table.getElementsByTagName("tbody")[0];

  const res = await readFile("../results.json");
  const keys = Object.keys(res);
  keys.forEach((key) => {
    const newRow = tbody.insertRow();
    const bookName = newRow.insertCell(0);
    const currentPrice = newRow.insertCell(1);
    const lowestPrice = newRow.insertCell(2);
    const yesterdaysPrice = newRow.insertCell(3);
    const pricesList = res[key].prices;
    bookName.innerHTML = key;
    currentPrice.innerHTML = pricesList.pop().currentPrice.toLocaleString();
    lowestPrice.innerHTML = res[key].lowestPrice.toLocaleString();
    yesterdaysPrice.innerHTML = pricesList.pop().currentPrice.toLocaleString();
  });
}

document.addEventListener("DOMContentLoaded", (e) => agregarFila());
