const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

function twitterdl(link) {
        return new Promise((resolve, reject) => {
                let config = {
                        'URL': link
                };
                axios.post('https://twdown.net/download.php', qs.stringify(config), {
                        headers: {
                                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                                "cookie": "__gads=ID=f2a6146831ff3c85:T=1743871420:RT=1743871420:S=ALNI_MbDsn4h6HI34j5-RceTT6_p8fN-Tg;__gpi=UID=0000107a198aad66:T=1743871420:RT=1743871420:S=ALNI_Ma0-b47-Ss9_b-YMK9hzL8snv4Ntg;__eoi=ID=88991de00c85270e:T=1743871420:RT=1743871420:S=AA-AfjYAtGjAMNgtCUr5XOWbQD-s;_ga=GA1.2.1120156488.1743871437;_gid=GA1.2.566464781.1743871437;_gat=1"
                        }
                })
                .then(({ data }) => {
                        const $ = cheerio.load(data);
                        resolve({
                                desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
                                thumb: $('div:nth-child(1) > img').attr('src'),
                                HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
                                SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
                                audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
                        });
                })
                .catch(reject);
        });
}

module.exports = { twitterdl };