'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const CleanTextUtils = require('clean-text-utils');

const cleanText = (str) => {
  let s = CleanTextUtils.strip.emoji(str)
  s = CleanTextUtils.strip.nonASCII(str)
  s = CleanTextUtils.strip.newlines(str)
  s = CleanTextUtils.strip.bom(str)
  s = CleanTextUtils.replace.smartChars(str)
  s = CleanTextUtils.replace.diacritics(str)
  s = CleanTextUtils.replace.exoticChars(str)
  // TODO: remove slurs here? or frontend?
  return s
}

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.createdAt = new Date().getTime();
  data.updatedAt = new Date().getTime();
  data.up_votes = 0
  data.down_votes = 0
  data.net_votes = 0
  data.submission = cleanText(data.submission)

  // Block blank entries
  if (!data.submission || CleanTextUtils.strip.whitespace(data.submission) === '') {
    return callback(error, { error, success: false, data: data.submission });
  }

  const params = {
    TableName: 'shittalk',
    Item: data
  };

  // TODO: Check for duplicates here?
  return dynamoDb.put(params, (error, data) => {
    if (error) {
      return callback(error, { error, success: false, data: params.Item });
    }
    console.log(error, data)
    callback(error, { error, success: true, data: params.Item });
  });
};
