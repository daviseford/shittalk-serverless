'use strict';

const _ = require('lodash');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Consolidates the front end requests
 * {
 *  random: [],
 *  recent: [],
 *  top: [],
 * }
 */
module.exports = (event, callback) => {
  const params = {
    TableName: 'shittalk',
    ConsistentRead: false,
  };

  return dynamoDb.scan(params, (error, pData) => {
    if (error) {
      return callback(error, { error, data: [] });
    }
    if (!pData || !pData.Items) {
      callback(error, { error, data: [] });
    }

    const NUM_ITEMS = 20;
    const data = {
      random: _.sampleSize(pData.Items, NUM_ITEMS),
      recent: pData.Items.sort((a, b) => b.createdAt - a.createdAt).slice(0, NUM_ITEMS),
      top: pData.Items.sort((a, b) => b.net_votes - a.net_votes).slice(0, NUM_ITEMS),
    }
    return callback(error, { error, data });
  });
};
