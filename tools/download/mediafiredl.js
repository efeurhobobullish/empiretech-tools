const axios = require('axios');
const cheerio = require('cheerio');

async function mediafiredl(url) {
  if (!url || !url.includes('mediafire.com')) throw new Error('Invalid MediaFire URL');

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const link = $('a#downloadButton').attr('href');
    const info = $('.filename').text().trim();
    const size = $('.fileInfo span').eq(1).text().trim();

    if (!link) throw new Error('Download link not found');

    return {
      creator: 'Empire Tech',
      filename: info,
      filetype: info.split('.').pop(),
      filesize: size,
      download: link
    };
  } catch (err) {
    throw new Error('Failed to scrape MediaFire: ' + err.message);
  }
}

module.exports = { mediafiredl };
