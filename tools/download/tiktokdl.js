const axios = require('axios');
const cheerio = require('cheerio');

async function tiktokdl(url) {
  let response = await axios({
    url: "https://lovetik.com/api/ajax/search",
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: new URLSearchParams({ query: url }),
  });

  const result = {};
  result.creator = "Empire Tech";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener((response.data.links[0].a || "").replace("https", "http"));
  result.watermark = await shortener((response.data.links[1].a || "").replace("https", "http"));
  result.audio = await shortener((response.data.links[2].a || "").replace("https", "http"));
  result.thumbnail = await shortener(response.data.cover);

  return result;
}

module.exports = { tiktokdl };