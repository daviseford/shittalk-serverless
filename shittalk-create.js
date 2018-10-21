'use strict';
const { strip, replace } = require('clean-text-utils');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const striptags = require('striptags');
const uuid = require('uuid');

const cleanText = (str) => {
  let s = striptags(str) // Remove HTML tags
  s = strip.emoji(s)
  s = strip.nonASCII(s)
  s = strip.newlines(s)
  s = strip.extraSpace(s)
  s = strip.bom(s)
  s = replace.smartChars(s)
  s = replace.diacritics(s)
  s = replace.exoticChars(s)
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
  if (!data.submission || strip.whitespace(data.submission) === '') {
    const error = 'Blank submissions are not allowed.'
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
