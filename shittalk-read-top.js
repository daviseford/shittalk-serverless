'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'shittalk',
    IndexName: 'netvoteLSI',
    ConsistentRead: false,
    ScanIndexForward: true,
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
      data: data.Items.sort((a, b) => b.net_votes - a.net_votes).slice(0, 15)
    });
  });
};
