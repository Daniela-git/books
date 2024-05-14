import axios from 'axios';

const options = (body, title) => {
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
      title,
      body,
    },
  };
};

export default async function sendNotification(body, title = 'Books failed') {
  try {
    const response = await axios.request(options(body, title));
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
