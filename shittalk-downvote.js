'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const { id, submission } = JSON.parse(event.body)
  console.log(event.body)
  const params = {
    TableName: 'shittalk',
    Key: { id, submission },
    UpdateExpression: "SET down_votes = down_votes + :val, net_votes = up_votes - down_votes, updatedAt = :vtime",
    ExpressionAttributeValues: {
      ":val": 1,
      ":vtime": new Date().getTime(),
    },
    ReturnValues: "UPDATED_NEW"
  };

  console.log(params)

  return dynamoDb.update(params, (uError, uData) => {
    if (uError) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(uError, null, 2))
      return callback(uError, { error: uError, success: false });
    }
    if (!uData || !uData.Attributes) {
      return callback(uError, { error: uError, success: false });
    }

    if (uData.Attributes.net_votes < -3) {
      const delete_params = { TableName: 'shittalk', Key: { id, submission } };
      dynamoDb.delete(delete_params, (dError, dData) => {
        console.info('Deleted row due to too many downvotes.')
        return callback(dError, { error: dError, success: true, deleted: true, data: uData.Attributes });
      });
    } else {
      return callback(uError, { error: uError, success: true, data: uData.Attributes });
    }
  });
};
