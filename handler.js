'use strict';

const shittalkCreate = require('./shittalk-create.js');
const shittalkReadAll = require('./shittalk-read-all.js');
const shittalkReadRecent = require('./shittalk-read-recent.js');
const shittalkReadOld = require('./shittalk-read-old.js');
const shittalkReadTop = require('./shittalk-read-top.js');
const shittalkReadRandom = require('./shittalk-read-random.js');
const shittalkUpVote = require('./shittalk-upvote.js');
const shittalkDownVote = require('./shittalk-downvote.js');
const shittalkCheckDuplicate = require('./shittalk-check-duplicate.js');
const shittalkGenerateCfg = require('./shittalk-generate-cfg.js');


const res = (result) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(result),
  };
}

const wrapper = (fn) => {
  return (event, context, callback) => {
    fn(event, (error, result) => {
      const response = res(result)
      context.succeed(response);
    });
  };
}
module.exports = {
  create: wrapper(shittalkCreate),
  readAll: wrapper(shittalkReadAll),
  readRecent: wrapper(shittalkReadRecent),
  readOld: wrapper(shittalkReadOld),
  readTop: wrapper(shittalkReadTop),
  readRandom: wrapper(shittalkReadRandom),
  upvote: wrapper(shittalkUpVote),
  downvote: wrapper(shittalkDownVote),
  checkDuplicate: wrapper(shittalkCheckDuplicate),
  generateCfg: wrapper(shittalkGenerateCfg),
}
