const axios = require('axios');
const cheerio = require('cheerio');

async function tgstalk(username) {
  if (!username) throw new Error('No Telegram username provided');
  if (username.startsWith('@')) username = username.slice(1);

  const url = `https://t.me/${username}`;

  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const name = $('meta[property="og:title"]').attr('content') || '-';
    const bio = $('meta[property="og:description"]').attr('content') || '-';
    const avatar = $('meta[property="og:image"]').attr('content') || null;

    return {
      creator: 'Empire Tech',
      name,
      username,
      bio,
      avatar,
      link: url,
    };
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error('Telegram user not found');
    }
    throw new Error('Telegram stalk error: ' + err.message);
  }
}

module.exports = { tgstalk };
