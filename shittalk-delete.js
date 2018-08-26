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
      callback(error);
    }
    callback(error, params.Key);
  });
};
