///====================[ Ai ]============\\
const { igstorydl } = require('./tools/download/igstorydl.js')
const { twitterdl } = require('./tools/download/twitterdl.js')
const { tiktokdl } = require('./tools/download/tiktokdl.js')
const { telesticker } = require('./tools/search/telesticker.js')
const { ssweb } = require('./tools/search/ssweb.js')
const { playstore } = require('./tools/search/playstore.js')
const { wagroupstalk } = require('./tools/stalker/wagroupstalk.js')
const { gitstalk } = require('./tools/stalker/gitstalk.js')
const { fbdl } = require('./tools/download/fbdl.js')
const { igdl } = require('./tools/download/igdl.js')
const { web2mp4file } = require('./tools/converter/web2mp4file.js')

module.exports.igdl= igdl;
module.exports.fbdl= fbdl;
module.exports.web2mp4file= web2mp4file;
module.exports.telesticker = telesticker;
module.exports.ssweb = ssweb;
module.exports.playstore= playstore;
module.exports.wagroupstalk = wagroupstalk;
module.exports.gitstalk = gitstalk;
module.exports.igstorydl = igstorydl;
module.exports.tiktokdl = tiktokdl;
module.exports.twitterdl =twitterdl;
