'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const { id, submission } = event.body
  const params = {
    TableName: 'shittalk',
    Key: { id, submission },
    UpdateExpression: "SET up_votes = up_votes + :val, net_votes = up_votes - down_votes, updatedAt = :vtime",
    ExpressionAttributeValues: {
      ":val": 1,
      ":vtime": new Date().getTime(),
    },
    ReturnValues: "UPDATED_NEW"
  };

  return dynamoDb.update(params, (error, uData) => {
    if (error) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(error, null, 2))
      return callback(error, { error, success: false });
    }
    if (!uData || !uData.Attributes) {
      return callback(error, { error, success: false });
    }
    return callback(error, { error, success: true, data: uData.Attributes });
  });
};
