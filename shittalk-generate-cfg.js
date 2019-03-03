'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const { DateTime } = require('luxon');

const build_say = (items) => {
  return items.map((str, i) => {
    return `alias "trashcan${i}" "say ${str}"`
  }).join('\n')
}

const build_diceroll = (items) => {
  return items.map((str, i) => {
    const next = i === items.length - 1 ? 0 : i + 1
    return `alias "trashcan_diceroll_${i}" "alias trashcan_result trashcan${i};alias trashcan_cycle trashcan_diceroll_${next}"`
  }).join('\n')
}

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
    const items = data.Items.sort((a, b) => b.net_votes - a.net_votes).slice(0, 200).map(x => x.submission)
    const [say, diceroll] = [build_say(items), build_diceroll(items)]
    const cfg = build_cfg(say, diceroll)

    // Now create the cfg file in S3
    s3.putObject({
      Bucket: 'shittalk-cfgs',
      Key: 'shittalk.cfg',
      Body: new Buffer(cfg, 'binary'),
      ACL: 'public-read',
    }, function (err, data) {
      if (err) {
        console.error('Error putting object')
        console.log(err, err.stack);
        return callback(error, { error: err, data: null })
      }
      console.log('Successfully uploaded file.');
      return callback(error, {
        error,
        data: { 's3_url': `https://s3.amazonaws.com/shittalk-cfgs/shittalk.cfg` }
      });
    });
  });
};


const build_cfg = (say, diceroll) => {
  const dt = DateTime.local()
  return `
//========================================================================================
// Copyright Davis Ford 2016-${dt.year} -------------------------------------------------------------
// https://daviseford.com/shittalk/  ------------------------------------------------------
//========================================================================================

// This version of shittalk.cfg was generated on ${dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}

//========================================================================================
// SCRIPT SETUP AND INSTALLATION----------------------------------------------------------
//========================================================================================
//  1.) Add "exec shittalk.cfg" (no quotes) to your autoexec.cfg
//  2.) Check that shittalk.cfg loads properly by launching your game,
//      opening console, and typing "exec shittalk.cfg" (no quotes)
//========================================================================================
// BINDS ---------------------------------------------------------------------------------
// I recommend binding "cycle_both" to your Push-To-Talk key -----------------------------
// And perhaps mwheeldown/mwheelup -------------------------------------------------------
//========================================================================================

bind "X"			"trashcan_dice" // Issue an insult to all chat
bind "TAB" 		"cycle_both"    // Cycle binds

//bind "MWHEELUP"      "cycle_both" // remove the "//" comment from these binds
//bind "MWHEELDOWN"    "cycle_both" // to use your mouse wheel as a randomizer (recommended)

//========================================================================================
// USAGE----------------------------------------------------------------------------------
//========================================================================================
// Once shittalk.cfg has been executed, join a game.
// By default, hitting TAB will cycle through the various binds.
// This provides the psuedo-random generation of insults
// Hitting X will all-chat an insult
//
// The more keys you can bind "cycle_both" to, the better. 
// The "cycle_both" command is what provides the psuedo-randomness of the script.
//
// Enjoy :>

//========================================================================================
// HELP: MY BINDS AREN'T WORKING!---------------------------------------------------------
//========================================================================================
// The most common error with this script is that it is prone to being unloaded
// by modern-day TF2 configs. Since most weapon-switcher scripts force 'unbindall',
// you'll find that shittalk settings are quickly overridden. You'll need to add the binds
// for shittalk ("trashcan_dice" and "cycle_both") to your custom scripts

//========================================================================================
// FEEL FREE TO MODIFY THE BINDS (MODIFY ANYTHING AFTER "say"-----------------------------
//========================================================================================

${say}

//========================================================================================
// DON'T MODIFY ANYTHING AFTER THIS POINT-------------------------------------------------
//========================================================================================

${diceroll}

//========================================================================================
//HELPER FUNCTIONS (DO NOT EDIT)----------------------------------------------------------
//========================================================================================

alias "trashcan_dice" "trashcan_result; trashcan_cycle"
alias "trashcan_cycle" "trashcan_diceroll_0"
alias "w_t_cyc" "trashcan_cycle"
alias "cycle_both" "cycle_b_1"

alias "cycle_b_1" "w_t_cyc; alias cycle_both cycle_b_2"
alias "cycle_b_2" "w_t_cyc; w_t_cyc; alias cycle_both cycle_b_3"
alias "cycle_b_3" "w_t_cyc; w_t_cyc; w_t_cyc; alias cycle_both cycle_b_4"
alias "cycle_b_4" "w_t_cyc; w_t_cyc; w_t_cyc; w_t_cyc; alias cycle_both cycle_b_5"
alias "cycle_b_5" "w_t_cyc; w_t_cyc; w_t_cyc; w_t_cyc; w_t_cyc; alias cycle_both cycle_b_1"

clear
echo "LOADING SHITTALK.CFG. WHAT IS THE ODDS :D"
echo "By Davis E. Ford. https://daviseford.com/shittalk"
echo "Use with caution."

`
}