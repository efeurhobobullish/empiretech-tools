///====================[ Ai ]============\\
const { igdl } = require('./tools/download/igdl.js')
const { igstorydl } = require('./tools/download/igstorydl.js')
const { mediafiredl } = require('./tools/download/mediafiredl.js')
const { pinterestdl } = require('./tools/download/pinterestdl.js')
const { titokdl } = require('./tools/download/tiktokdl.js')
const { twitterdl } = require('./tools/download/twitterdl.js')
const { gitstalk } = require('./tools/stalker/gitstalk.js')
const { tgstalk } = require('./tools/stalker/tgstalk.js')

module.exports.igdl= igdl;
module.exports.igstorydl= igstorydl;
module.exports.mediafiredl= mediafiredl;
module.exports.pinterestdl = pinterestdl;
module.exports.titokdl = titokdl;
module.exports.twitterdl= twitterdl;
module.exports.tgstalk = tgstalk;
module.exports.gitstalk = gitstalk;
