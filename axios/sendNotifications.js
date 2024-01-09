const axios = require('axios');

const options = (body) => {
  return {
    method: 'POST',
    url: 'https://rapidmail.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.EMAIL_KEY,
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
