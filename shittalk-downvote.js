'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = event.pathParameters.id;
  data.updatedAt = new Date().getTime();

  // Increment an atomic counter
  const params = {
    TableName: 'shittalk',
    Item: data,
    Key: {
      id: data.id
    },
    UpdateExpression: "set down_votes = down_votes + :val, net_votes = up_votes - down_votes",
    ExpressionAttributeValues: {
      ":val": 1
    },
    ReturnValues: "UPDATED_NEW"
  };

  return dynamoDb.update(params, (error, data) => {
    if (error) {
      return callback(error, { error, success: false });
    }
    if (!data || !data.Attributes) {
      callback(error, { error, success: false });
    }

    if (data.Attributes.net_votes < -3) {
      const delete_params = { TableName: 'shittalk', Key: { id: data.id } };
      dynamoDb.delete(delete_params, (error, data) => {
        console.log('Deleted row for too many downvotes.')
      });
    }
    return callback(error, { error, success: true, data: data.Attributes });
  });
};
