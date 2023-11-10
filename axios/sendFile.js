const axios = require('axios');
const fs = require('fs');

async function getFileSha(token) {
  const url =
    'https://api.github.com/repos/Daniela-git/books/contents/results.json';
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.sha;
}

async function uploadFileApi(token, content) {
  const sha = await getFileSha(token);
  console.log(sha);
  const url =
    'https://api.github.com/repos/Daniela-git/books/contents/results.json';

  const data = {
    message: 'update results file',
    content,
    sha,
  };

  const response = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(JSON.stringify(response.data));
}

async function sendFile() {
  const token = process.env.TOKEN;
  const content = fs.readFileSync('../results.json').toString('base64');
  await uploadFileApi(token, content);
}

sendFile().then(console.log('upload'));
