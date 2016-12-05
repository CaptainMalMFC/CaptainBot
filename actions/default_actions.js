var config = require('config');
var types = require('../types.js');
var util = require('../util.js');

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);
var eventEmitter = util.eventEmitter;

module.exports = {};

function process_tip(msg) {
    var responses = new types.Responses();
    return responses;
}
module.exports.process_tip = process_tip;

function process_chat(msg) {
    var responses = new types.Responses();
    if(operators.indexOf(msg.user) != -1 && msg.text == "test"){
        responses.chatResponse = "Hello, I am a Bot! Nice to meet you!";
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.text == "test"){
        responses.chatResponse = "Hi " + msg.user + "! How are you today?";
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
      if (msg.text.startsWith("testtip")) {
        var parts = msg.text.split(" ");
        var msg = new types.TipEvent(parts[1], -1, undefined, parts[2]);
        eventEmitter.emit("tip", msg);
      }
    }
    return responses;
}
module.exports.process_chat = process_chat;
