const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const tiktokdl = {
  getData: async (url) => {
    const apiUrl = 'https://tiksave.io/api/ajaxSearch';
    const data = qs.stringify({
      q: url,
      lang: 'id'
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://tiksave.io/en',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    try {
      const response = await axios.post(apiUrl, data, config);
      const html = response.data.data;
      const $ = cheerio.load(html);
      const thumbnail = $('.thumbnail img').attr('src');
      const title = $('.tik-left h3').text().trim();
      const downloadLinks = [];

      $('.dl-action a').each((index, element) => {
        const link = $(element).attr('href');
        const label = $(element).text().trim();
        downloadLinks.push({ label, link });
      });

      return {
        creator: 'Empire Tech',
        thumbnail,
        title,
        downloadLinks
      };
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  },
  download: async (url) => {
    try {
      const videoData = await tiktokdl.getData(url);
      if (videoData && videoData.downloadLinks.length) {
        const audioUrl = videoData.downloadLinks.find(link => link.label === 'Download MP3')?.link;

        return JSON.stringify(videoData, null, 2);
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  }
};

module.exports = { tiktokdl };
