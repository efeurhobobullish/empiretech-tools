const cheerio = require("cheerio");

function igstalk(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://dumpor.com/v/${username}`, {
        headers: {
          "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        }
      });

      const $ = cheerio.load(data);

      const result = {
        creator: "Empire Tech",
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style')?.replace(/(background-image: url\'|\';)/gi, '') || null,
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text().trim(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text().trim(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts', '').trim(),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers', '').trim(),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following', '').trim(),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text().trim()
      };

      if (!result.username) return reject("❌ Username not found or profile is private.");
      resolve(result);
    } catch (error) {
      reject("❌ Failed to fetch Instagram data.");
    }
  });
}

module.exports = { igstalk };