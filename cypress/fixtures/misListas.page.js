import { convertToNumber } from '../support/helper.js';

class MisListasPage {
  misListas;
  title;
  regularPrice;
  currentPrice;
  percentage;
  bookInfo;
  todaysData;

  constructor() {
    this.misListas = '.wishlist';
    this.title = '.title';
    this.regularPrice = '.precioAntes';
    this.currentPrice = '.precioAhora';
    this.percentage = '.descuento-percent';
    this.bookInfo = '.info-div';
    this.todaysData = {};
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
        const data = {
          regularPrice: convertToNumber(regularPrice),
          currentPrice: convertToNumber(currentPrice),
          percentage: convertToNumber(percentage),
        };
        this.todaysData[title] = data;
      });
    cy.writeFile('todaysData.json', this.todaysData);
    cy.log(this.todaysData);
  }
}

export default new MisListasPage();
