'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'shittalk',
    IndexName: 'updatedLSI',
    ConsistentRead: false,
    ScanIndexForward: false,
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      return callback(error, { error, data: [] });
    }
    if (!data || !data.Items) {
      callback(error, { error, data: [] });
    }
    return callback(error, {
      error,
      data: data.Items.sort((a, b) => a.updatedAt - b.updatedAt).slice(0, 5)
    });
  });
};
