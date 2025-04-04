const axios = require('axios');
const cheerio = require('cheerio');

async function tiktokdl(Url) {
  return new Promise(async (resolve, reject) => {
    if (!Url) return reject(new Error('No TikTok URL provided'));

    try {
      const initialResponse = await axios.request({
        url: "https://ttdownloader.com/",
        method: "GET",
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
          "cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
        }
      });

      const $ = cheerio.load(initialResponse.data);
      const token = $('#token').attr('value');
      if (!token) return reject(new Error('Failed to fetch token'));

      const response = await axios({
        url: "https://ttdownloader.com/req/",
        method: "POST",
        data: new URLSearchParams({ url: Url, format: "", token }),
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
          "cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
        }
      });

      const ch = cheerio.load(response.data);
      const nowatermark = ch('#results-list > div:nth-child(2) .download > a').attr('href');
      const watermark = ch('#results-list > div:nth-child(3) .download > a').attr('href');
      const audio = ch('#results-list > div:nth-child(4) .download > a').attr('href');

      resolve({
        creator: 'Empire Tech',
        status: response.status,
        result: {
          nowatermark,
          watermark,
          audio
        }
      });

    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { tiktokdl };
