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
    console.error('Error al cargar el archivo:', error);
  }
}

// Función para agregar una nueva fila a la tabla
async function agregarFila() {
  const table = document.getElementById('miTabla');
  const tbody = table.getElementsByTagName('tbody')[0];

  const res = await readFile('../results.json');
  const keys = Object.keys(res);
  keys.forEach((key) => {
    const newRow = tbody.insertRow();
    const bookName = newRow.insertCell(0);
    const currentPrice = newRow.insertCell(1);
    const lowestPrice = newRow.insertCell(2);
    const moreButton = newRow.insertCell(3);
    const pricesList = res[key].prices;
    bookName.innerHTML = key;
    currentPrice.innerHTML = pricesList.pop().currentPrice.toLocaleString();
    lowestPrice.innerHTML = res[key].lowestPrice.toLocaleString();
    moreButton.innerHTML = `<button type="button" class="btn btn-info more-button" data-book="${key}" >More</button>`;
    // moreButton.classList.add('more-button');
    // moreButton.setAttribute('data-book', `${key}`);
  });
}

async function mostrarDetalles(e) {
  // Aquí puedes agregar lógica para obtener los detalles según el ID
  // Por ahora, agregaremos detalles ficticios para ilustrar el ejemplo
  const bookName = e.target.getAttribute('data-book');
  // Obtén la segunda tabla y su cuerpo
  const tablaDetalles = document.getElementById('tablaDetalles');
  const cuerpoTablaDetalles = document.getElementById('cuerpoTablaDetalles');
  const tableTitle = document.getElementById('title');
  const lowestPrice = document.getElementById('lowestPrice');
  const backButton = document.getElementById('backButton');

  // Limpia el cuerpo de la segunda tabla
  cuerpoTablaDetalles.innerHTML = '';
  const results = await readFile('../results.json');

  // Agrega filas a la segunda tabla con los detalles correspondientes
  const book = results[bookName];
  book.prices.forEach((price) => {
    const fila = cuerpoTablaDetalles.insertRow();
    const date = fila.insertCell(0);
    const currentPrice = fila.insertCell(1);
    const regularPrice = fila.insertCell(2);
    const percentage = fila.insertCell(3);

    date.innerHTML = price.date;
    currentPrice.innerHTML = price.currentPrice.toLocaleString();
    regularPrice.innerHTML = price.regularPrice.toLocaleString();
    percentage.innerHTML = price.percentage;
  });
  // Cambiar titulo
  tableTitle.innerHTML = bookName;
  lowestPrice.innerHTML = `Lowest: $${book.lowestPrice.toLocaleString()}`;
  // Muestra la segunda tabla y oculta la primera
  tablaDetalles.classList.remove('hidden');
  tablaDetalles.classList.add('table-striped');
  tablaDetalles.classList.add('table');
  tablaDetalles.classList.add('table-bordered');
  lowestPrice.classList.remove('hidden');
  backButton.classList.remove('hidden');
  backButton.classList.add('btn');
  backButton.classList.add('btn-link');
  document.getElementById('miTabla').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  agregarFila().then(() => {
    const moreButtons = document.getElementsByClassName('more-button');
    for (let index = 0; index < moreButtons.length; index++) {
      moreButtons[index].addEventListener('click', function (e) {
        mostrarDetalles(e).then(() => {
          const backButton = document.getElementById('backButton');
          backButton.addEventListener('click', function () {
            const tablaDetalles = document.getElementById('tablaDetalles');
            const cuerpoTablaDetalles = document.getElementById(
              'cuerpoTablaDetalles'
            );
            const tableTitle = document.getElementById('title');
            const lowestPrice = document.getElementById('lowestPrice');
            const backButton = document.getElementById('backButton');
            // Cambiar titulo
            cuerpoTablaDetalles.innerHTML = '';
            tableTitle.innerHTML = 'Books table';
            lowestPrice.innerHTML = '';
            // Muestra la segunda tabla y oculta la primera
            tablaDetalles.classList.add('hidden');
            lowestPrice.classList.add('hidden');
            backButton.classList.add('hidden');
            backButton.classList.remove('btn');
            backButton.classList.remove('btn-link');
            document.getElementById('miTabla').classList.remove('hidden');
          });
        });
      });
    }
  });
});
