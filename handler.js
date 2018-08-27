'use strict';

const shittalkCreate = require('./shittalk-create.js');
const shittalkReadAll = require('./shittalk-read-all.js');
const shittalkReadRecent = require('./shittalk-read-recent.js');
const shittalkReadOld = require('./shittalk-read-old.js');
const shittalkReadTop = require('./shittalk-read-top.js');
const shittalkUpVote = require('./shittalk-upvote.js');
const shittalkDownVote = require('./shittalk-downvote.js');
const shittalkCheckDuplicate = require('./shittalk-check-duplicate.js');

module.exports.create = (event, context, callback) => {
  shittalkCreate(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readAll = (event, context, callback) => {
  shittalkReadAll(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readRecent = (event, context, callback) => {
  shittalkReadRecent(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readOld = (event, context, callback) => {
  shittalkReadOld(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readTop = (event, context, callback) => {
  shittalkReadTop(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.upvote = (event, context, callback) => {
  shittalkUpVote(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.downvote = (event, context, callback) => {
  shittalkDownVote(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.checkDuplicate = (event, context, callback) => {
  shittalkCheckDuplicate(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};