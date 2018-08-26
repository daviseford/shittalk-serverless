'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'shittalk',
    Key: {
      id: event.pathParameters.id
    }
  };

  return dynamoDb.get(params, (error, data) => {
    if (error) {
      return callback(error, { error, data: {} });
    }
    if (!data || !data.Item) {
      callback(error, { error, data: {} });
    }
    return callback(error, { error, data: data.Item });
  });
};
