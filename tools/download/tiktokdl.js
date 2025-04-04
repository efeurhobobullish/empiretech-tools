const axios = require('axios');
const cheerio = require('cheerio');

async function shortener(url) {
  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    return res.data;
  } catch (err) {
    return url; // fallback to original URL on failure
  }
}

function clean(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "").trim(); // remove HTML tags
}

async function tiktokdl(url) {
  const response = await axios({
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