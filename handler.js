'use strict';

const shittalkCreate = require('./shittalk-create.js');
const shittalkReadAll = require('./shittalk-read-all.js');
const shittalkReadOne = require('./shittalk-read-one.js');
const shittalkUpdate = require('./shittalk-update.js');
const shittalkDelete = require('./shittalk-delete.js');

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

module.exports.readOne = (event, context, callback) => {
  shittalkReadOne(event, (error, result) => {
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

module.exports.update = (event, context, callback) => {
  shittalkUpdate(event, (error, result) => {
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

module.exports.delete = (event, context, callback) => {
  shittalkDelete(event, (error, result) => {
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
