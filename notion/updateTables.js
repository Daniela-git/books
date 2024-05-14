import { readFileSync, writeFileSync } from 'fs';
import { addPage, getLastPrice, getLowest, lowestToFalse } from './queries.js';

const writeData = async () => {
  const todaysData = JSON.parse(readFileSync('./todaysData.json'));
  const keys = Object.keys(todaysData);
  const newLowest = [];
  console.log(keys);

  // add to the database if it changes
  for await (const title of keys) {
    const data = todaysData[title];
    
    const lastPriceObj = await getLastPrice(title);
    const date = new Date().toISOString();
    
    if (!lastPriceObj) {
      // new book
      console.log({new_book:title})
      await addPage(
        title,
        data.currentPrice,
        data.regularPrice,
        data.percentage,
        date,
        true
      );
    } else {
      // old book
      const lastPrice = lastPriceObj.properties['Current price'].number;
      // we are only gonna store the price if it changes
      if (lastPrice !== data.currentPrice) {
        console.log(
          `price change: old ${lastPrice} - new ${data.currentPrice}`
        );
        const lowestObj = await getLowest(title);
        const lowest = lowestObj.properties['Current price'].number;
        //new lowest price
        if (data.currentPrice < lowest) {
          console.log(
            `lowest change: old ${lowest} - new ${data.currentPrice}`
          );
          newLowest.push({ title, price: data.currentPrice });
          await addPage(
            title,
            data.currentPrice,
            data.regularPrice,
            data.percentage,
            date,
            true
          );
          await lowestToFalse(lowestObj.id);
        } else {
          await addPage(
            title,
            data.currentPrice,
            data.regularPrice,
            data.percentage,
            date,
            false
          );
        }
      }
    }
  }
  console.log({newLowest})
  if (newLowest.length > 0) {
    writeFileSync('./newLowest.json', JSON.stringify(newLowest));
  }
};

writeData();
