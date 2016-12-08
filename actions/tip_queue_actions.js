var config = require('config');
var util = require('../util.js');

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);

var actionQueue = [];

function process_tip(msg) {
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
}
exports.process_tip = process_tip;

function process_chat(msg) {
    if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
      if (msg.text == "list") {
        if (actionQueue.length == 0) {
          util.respond("Queue is empty", msg);
        } else {
          for (i = 0; i < Math.min(actionQueue.length,5); i++) {
            util.respond(i + "- " + actionQueue[i].action + ", " + actionQueue[i].user + ", " + actionQueue[i].minutes_ago() + " minute(s) ago", msg);
          }
        }
      }
      else if (msg.text == "pop") {
        if (actionQueue.length == 0) {
          util.respond("Queue is empty", msg);
        } else {
          var doneAction = actionQueue.shift();
          util.respond("Done with " + doneAction.action + ", " + doneAction.user, msg);
        }
      }
    }
}
exports.process_chat = process_chat;
