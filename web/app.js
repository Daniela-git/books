import { pool } from '../mysql/connection.js';

// Función para agregar una nueva fila a la tabla
async function agregarFila() {
  const table = document.getElementById('miTabla');
  const tbody = table.getElementsByTagName('tbody')[0];
  const getAllBooks = `SELECT title, lowest FROM books`;
  const books = await pool.query(getAllBooks);
  for await (const book of books) {
    const newRow = tbody.insertRow();
    const bookName = newRow.insertCell(0);
    const currentPrice = newRow.insertCell(1);
    const lowestPrice = newRow.insertCell(2);
    const moreButton = newRow.insertCell(3);
    const getLastPrice = `SELECT current_price,date FROM prices
  WHERE book_title = "{title}" ORDER BY date ASC;
  `;
    const pricesList = await pool.query(
      getLastPrice.replace('{title}', book.title)
    );
    console.log(pricesList);
    bookName.innerHTML = book;
    currentPrice.innerHTML = pricesList.pop().current_price.toLocaleString();
    lowestPrice.innerHTML = book.lowest.toLocaleString();
    moreButton.innerHTML = `<button type="button" class="btn btn-info more-button" data-book="${book.title}" data-lowest="${book.lowest}" >More</button>`;
    // moreButton.classList.add('more-button');
    // moreButton.setAttribute('data-book', `${key}`);
  }
}

async function mostrarDetalles(e) {
  // Aquí puedes agregar lógica para obtener los detalles según el ID
  // Por ahora, agregaremos detalles ficticios para ilustrar el ejemplo
  const bookName = e.target.getAttribute('data-book');
  const lowest = e.target.getAttribute('data-lowest');
  // Obtén la segunda tabla y su cuerpo
  const tablaDetalles = document.getElementById('tablaDetalles');
  const cuerpoTablaDetalles = document.getElementById('cuerpoTablaDetalles');
  const tableTitle = document.getElementById('title');
  const lowestPrice = document.getElementById('lowestPrice');
  const backButton = document.getElementById('backButton');

  // Limpia el cuerpo de la segunda tabla
  cuerpoTablaDetalles.innerHTML = '';

  // Agrega filas a la segunda tabla con los detalles correspondientes
  const getPrices = `SELECT current_price,date, regular_price, percentage FROM prices
  WHERE book_title = "{title}" ORDER BY date DESC;
  `;
  const [prices] = pool.query(getPrices.replace('{title}', bookName));
  prices.forEach((price) => {
    const fila = cuerpoTablaDetalles.insertRow();
    const date = fila.insertCell(0);
    const currentPrice = fila.insertCell(1);
    const regularPrice = fila.insertCell(2);
    const percentage = fila.insertCell(3);

    date.innerHTML = price.date;
    currentPrice.innerHTML = price.current_price.toLocaleString();
    regularPrice.innerHTML = price.regular_price.toLocaleString();
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
