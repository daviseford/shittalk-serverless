'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = event.pathParameters.id;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'shittalk',
    Item: data
  };
  // TODO: Delete rows that will go over the deletion limit
  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};
