const axios = require('axios');

const options = (body) => {
  return {
    method: 'POST',
    url: 'https://rapidmail.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '493d258bd6msh849240b53e760a1p16d1f9jsn3df95b7943a3',
      'X-RapidAPI-Host': 'rapidmail.p.rapidapi.com',
    },

    data: {
      ishtml: 'false',
      sendto: 'nomegusta782@gmail.com',
      title: 'Books failed',
      body,
    },
  };
};

async function sendNotification(body) {
  try {
    const response = await axios.request(options(body));
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendNotification;
