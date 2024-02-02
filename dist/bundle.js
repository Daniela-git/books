/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "mysql2/promise":
/*!*********************************!*\
  !*** external "mysql2/promise" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ "./mysql/connection.js":
/*!*****************************!*\
  !*** ./mysql/connection.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pool: () => (/* binding */ pool)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"mysql2/promise\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n\n\n\nconsole.log(process.env.DB_USER);\nconst pool = (0,mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool)({\n  user: process.env.DB_USER,\n  host: process.env.HOST,\n  password: process.env.PASS,\n  database: process.env.DATABASE,\n  port: process.env.PORT,\n});\n\n// pool.query(`CREATE TABLE books (\n//   title VARCHAR(255) PRIMARY KEY,\n//   lowest INT\n// );`);\n\n// pool.query(`CREATE TABLE prices (\n//   id INT AUTO_INCREMENT PRIMARY KEY,\n//   book_title VARCHAR(255),\n//   regular_price INT,\n//   current_price INT,\n//   percentage INT,\n//   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n//   FOREIGN KEY (book_title) REFERENCES books(title)\n// );`);\n\n// pool.query(`DROP TABLE prices;`).then(() => pool.query(`DROP TABLE books;`));\n\n// pool.query(`SELECT title FROM books`).then((value) => console.log(value[0]));\n\n// pool.query(`DROP TABLE books;`);\n// pool\n//   .query(\n//     `SELECT book_title, MIN(current_price) as lowest FROM prices WHERE book_title=\"From Hell\"`\n//   )\n//   .then((res) => console.log(res));\n// pool\n//   .query(\n//     `DELETE FROM books;\n// `\n//   )\n//   .then(() => pool.end());\n// pool\n//   .query(\n//     `SELECT current_price FROM prices\n// WHERE DATE(date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND book_title = \"Abara Master Edition\";\n// `\n//   )\n//   .then((res) => {\n//     console.log(res[0][0]);\n//     pool.end();\n//   });\n\n// pool\n//   .query(\n//     `SELECT current_price,date FROM prices\n// WHERE book_title = \"From Hell\" ORDER BY date ASC;`\n//   )\n//   .then((res) => {\n//     console.log(res[0].pop());\n//     pool.end();\n//   });\n\n\n//# sourceURL=webpack://buscalibre/./mysql/connection.js?");

/***/ }),

/***/ "./web/app.js":
/*!********************!*\
  !*** ./web/app.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mysql_connection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mysql/connection.js */ \"./mysql/connection.js\");\n\n\n// Función para agregar una nueva fila a la tabla\nasync function agregarFila() {\n  const table = document.getElementById('miTabla');\n  const tbody = table.getElementsByTagName('tbody')[0];\n  const getAllBooks = `SELECT title, lowest FROM books`;\n  const books = await _mysql_connection_js__WEBPACK_IMPORTED_MODULE_0__.pool.query(getAllBooks);\n  for await (const book of books) {\n    const newRow = tbody.insertRow();\n    const bookName = newRow.insertCell(0);\n    const currentPrice = newRow.insertCell(1);\n    const lowestPrice = newRow.insertCell(2);\n    const moreButton = newRow.insertCell(3);\n    const getLastPrice = `SELECT current_price,date FROM prices\n  WHERE book_title = \"{title}\" ORDER BY date ASC;\n  `;\n    const pricesList = await _mysql_connection_js__WEBPACK_IMPORTED_MODULE_0__.pool.query(\n      getLastPrice.replace('{title}', book.title)\n    );\n    console.log(pricesList);\n    bookName.innerHTML = book;\n    currentPrice.innerHTML = pricesList.pop().current_price.toLocaleString();\n    lowestPrice.innerHTML = book.lowest.toLocaleString();\n    moreButton.innerHTML = `<button type=\"button\" class=\"btn btn-info more-button\" data-book=\"${book.title}\" data-lowest=\"${book.lowest}\" >More</button>`;\n    // moreButton.classList.add('more-button');\n    // moreButton.setAttribute('data-book', `${key}`);\n  }\n}\n\nasync function mostrarDetalles(e) {\n  // Aquí puedes agregar lógica para obtener los detalles según el ID\n  // Por ahora, agregaremos detalles ficticios para ilustrar el ejemplo\n  const bookName = e.target.getAttribute('data-book');\n  const lowest = e.target.getAttribute('data-lowest');\n  // Obtén la segunda tabla y su cuerpo\n  const tablaDetalles = document.getElementById('tablaDetalles');\n  const cuerpoTablaDetalles = document.getElementById('cuerpoTablaDetalles');\n  const tableTitle = document.getElementById('title');\n  const lowestPrice = document.getElementById('lowestPrice');\n  const backButton = document.getElementById('backButton');\n\n  // Limpia el cuerpo de la segunda tabla\n  cuerpoTablaDetalles.innerHTML = '';\n\n  // Agrega filas a la segunda tabla con los detalles correspondientes\n  const getPrices = `SELECT current_price,date, regular_price, percentage FROM prices\n  WHERE book_title = \"{title}\" ORDER BY date DESC;\n  `;\n  const [prices] = _mysql_connection_js__WEBPACK_IMPORTED_MODULE_0__.pool.query(getPrices.replace('{title}', bookName));\n  prices.forEach((price) => {\n    const fila = cuerpoTablaDetalles.insertRow();\n    const date = fila.insertCell(0);\n    const currentPrice = fila.insertCell(1);\n    const regularPrice = fila.insertCell(2);\n    const percentage = fila.insertCell(3);\n\n    date.innerHTML = price.date;\n    currentPrice.innerHTML = price.current_price.toLocaleString();\n    regularPrice.innerHTML = price.regular_price.toLocaleString();\n    percentage.innerHTML = price.percentage;\n  });\n  // Cambiar titulo\n  tableTitle.innerHTML = bookName;\n  lowestPrice.innerHTML = `Lowest: $${book.lowestPrice.toLocaleString()}`;\n  // Muestra la segunda tabla y oculta la primera\n  tablaDetalles.classList.remove('hidden');\n  tablaDetalles.classList.add('table-striped');\n  tablaDetalles.classList.add('table');\n  tablaDetalles.classList.add('table-bordered');\n  lowestPrice.classList.remove('hidden');\n  backButton.classList.remove('hidden');\n  backButton.classList.add('btn');\n  backButton.classList.add('btn-link');\n  document.getElementById('miTabla').classList.add('hidden');\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  agregarFila().then(() => {\n    const moreButtons = document.getElementsByClassName('more-button');\n    for (let index = 0; index < moreButtons.length; index++) {\n      moreButtons[index].addEventListener('click', function (e) {\n        mostrarDetalles(e).then(() => {\n          const backButton = document.getElementById('backButton');\n          backButton.addEventListener('click', function () {\n            const tablaDetalles = document.getElementById('tablaDetalles');\n            const cuerpoTablaDetalles = document.getElementById(\n              'cuerpoTablaDetalles'\n            );\n            const tableTitle = document.getElementById('title');\n            const lowestPrice = document.getElementById('lowestPrice');\n            const backButton = document.getElementById('backButton');\n            // Cambiar titulo\n            cuerpoTablaDetalles.innerHTML = '';\n            tableTitle.innerHTML = 'Books table';\n            lowestPrice.innerHTML = '';\n            // Muestra la segunda tabla y oculta la primera\n            tablaDetalles.classList.add('hidden');\n            lowestPrice.classList.add('hidden');\n            backButton.classList.add('hidden');\n            backButton.classList.remove('btn');\n            backButton.classList.remove('btn-link');\n            document.getElementById('miTabla').classList.remove('hidden');\n          });\n        });\n      });\n    }\n  });\n});\n\n\n//# sourceURL=webpack://buscalibre/./web/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./web/app.js");
/******/ 	
/******/ })()
;