var config = require('config');
var types = require('../types.js');

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);

module.exports = {};

var actionQueue = [];

function buildPM(response, triggerMsg) {
  return new types.PrivateMsg(triggerMsg.user, triggerMsg.uid, response);
}

function process_tip(msg) {
    var responses = new types.Responses();
    if (msg.tokens % 33 == 0) {
        var numBlocks = msg.tokens / 33;
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, numBlocks + " Jenga Blocks"));
    } else if (msg.tokens % 66 == 0) {
        var numRolls = msg.tokens / 66;
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, numRolls + " Dice Spanks"));
    } else if (msg.tokens % 55 == 0) {
        var tickets = msg.tokens/55;
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, tickets + "x Raffle Tickets"));
    } else if (msg.tokens % 222 == 0) {
        var numMonths = msg.tokens / 222;
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, numMonths + " months of snapchat"));
    } else if (msg.tokens == 75) {
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, "Boobs Flash"));
    } else if (msg.tokens == 100) {
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, "BJ tease"));
    } else if (msg.tokens >= 10) {
        actionQueue.push(new types.Action(msg.user, msg.uid, msg.text, msg.tokens + " token tip"));
    }
    return responses;
}
module.exports.process_tip = process_tip;

function process_chat(msg) {
    var responses = new types.Responses();
    if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
      if (msg.text == "list") {
        if (actionQueue.length == 0) {
          responses.privateResponses.push(buildPM("Queue is empty", msg));
        } else {
          for (i = 0; i < Math.min(actionQueue.length,5); i++) {
            responses.privateResponses.push(buildPM(i + "- " + actionQueue[i].action + ", " + actionQueue[i].user + ", " + actionQueue[i].minutes_ago() + " minute(s) ago", msg));
          }
        }
      }
      else if (msg.text == "pop") {
        if (actionQueue.length == 0) {
          responses.privateResponses.push(buildPM("Queue is empty", msg));
        } else {
          var doneAction = actionQueue.shift();
          responses.privateResponses.push(buildPM("Done with " + doneAction.action + ", " + doneAction.user, msg));
        }
      }
    }
    return responses;
}
module.exports.process_chat = process_chat;
