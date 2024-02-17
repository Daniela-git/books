import "dotenv/config";
export default function getBookObj(
  title,
  currentPrice,
  regularPrice,
  percentage,
  date,
  lowest
) {
  return {
    parent: {
      database_id: process.env.NOTION_DB,
    },
    properties: {
      Book: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      "Current price": {
        type: "number",
        number: currentPrice,
      },
      "Regular price": {
        type: "number",
        number: regularPrice,
      },
      Percentage: {
        type: "number",
        number: percentage,
      },
      Date: {
        type: "date",
        date: {
          start: date,
        },
      },
      Lowest: {
        type: "checkbox",
        checkbox: lowest,
      },
    },
  };
}
