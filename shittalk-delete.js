'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName : 'shittalk',
    Key: {
      id: event.pathParameters.id
    }
  };
// TODO: Not sure if we'll allow this operation from the front-end
  return dynamoDb.delete(params, (error, data) => {
    if (error) {
      return callback(error, { error, data: {} });
    }
    if (!data || !data.Item) {
      callback(error, { error, data: {} });
    }
    return callback(error, { error, data: params.Key });
  });
};
