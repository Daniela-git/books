import { Client } from "@notionhq/client";
import "dotenv/config";
import getBookObj from "./bookObj.js";

const notion = new Client({ auth: process.env.NOTION_KEY });

async function getLowest(title) {
  const databaseId = process.env.NOTION_DB;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Lowest",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Book",
          title: {
            equals: title,
          },
        },
      ],
    },
  });
  //properties and id
  return response.results[0];
}

async function lowestToFalse(pageId) {
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      Lowest: {
        checkbox: false,
      },
    },
  });
  console.log(response);
}

async function getLastPrice(title) {
  const databaseId = process.env.NOTION_DB;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Book",
      title: {
        equals: title,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "ascending",
      },
    ],
  });
  if (response.results.length === 0) {
    return false;
  }
  return response.results.pop();
}

async function filterByBookAndPrice(title, price) {
  const databaseId = process.env.NOTION_DB;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Current price",
          number: {
            equals: price,
          },
        },
        {
          property: "Book",
          title: {
            equals: title,
          },
        },
      ],
    },
  });
  if (response.results.length === 0) {
    return false;
  }
  return response.results.pop();
}

async function addPage(
  title,
  currentPrice,
  regularPrice,
  percentage,
  date,
  lowest
) {
  const response = await notion.pages.create(
    getBookObj(title, currentPrice, regularPrice, percentage, date, lowest)
  );
  return response;
}

export {
  getLastPrice,
  addPage,
  lowestToFalse,
  getLowest,
  filterByBookAndPrice,
};
