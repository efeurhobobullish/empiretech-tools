// stalker/gitstalk.js
const axios = require('axios');

async function gitstalk(username) {
  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching GitHub user data');
  }
}

module.exports = { gitstalk };
