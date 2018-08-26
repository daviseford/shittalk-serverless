'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'shittalk',
    IndexName: "submissionGSI",
    KeyConditionExpression: "submission = :v_submission",
    ExpressionAttributeValues: {
      ":v_submission": data.submission
    },
    ScanIndexForward: true
  };

  return dynamoDb.query(params, (error, data) => {
    console.log(error, data)
    if (error) {
      return callback(error, { error, duplicate: false, data });
    }
    if (data.Count === 0) {
      return callback(error, { error, duplicate: false, data });
    } else {
      return callback(error, { error, duplicate: true, data });
    }
  });
};
