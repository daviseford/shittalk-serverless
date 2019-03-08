'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const _ = require('lodash')

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
      data: _.sampleSize(data.Items, 20)
    });
  });
};
