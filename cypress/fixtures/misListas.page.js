const { _ } = Cypress;

class MisListasPage {
  misListas;
  title;
  regularPrice;
  currentPrice;
  percentage;
  bookInfo;
  todaysData = [];

  constructor() {
    this.misListas = '.listaDeDeseos';
    this.title = '.title';
    this.regularPrice = '.precioAntes';
    this.currentPrice = '.precioAhora';
    this.percentage = '.descuento-percent';
    this.bookInfo = '.info-div';
  }

  getData() {
    cy.get(this.misListas).should('be.visible').click();
    cy.get(this.bookInfo)
      .should('be.visible')
      .each(($bookElement) => {
        const title = $bookElement.find(this.title).text();
        const regularPrice = $bookElement.find(this.regularPrice).text();
        const currentPrice = $bookElement.find(this.currentPrice).text();
        const percentage = $bookElement.find(this.percentage).text();
        const data = { title, regularPrice, currentPrice, percentage };
        this.todaysData.push(data);
      });
    cy.log(this.todaysData);
  }

  writeData() {
    cy.readFile('results.json').then((results) => {
      const titles = Object.keys(results);
      _.forEach(this.todaysData, (data) => {
        const { title, ...rest } = data;
        const bookObj = {
          ...rest,
          date: new Date().toISOString().split('T')[0],
        };
        if (titles.includes(title)) {
          results[title].push(bookObj);
        } else {
          results[title] = [bookObj];
        }
      });
      cy.writeFile('results.json', JSON.stringify(results));
    });
  }
}

export default new MisListasPage();
