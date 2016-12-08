var config = require('config');
var types = require('../types.js');
var util = require('../util.js');

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);
var eventEmitter = util.eventEmitter;

function process_chat(msg) {
    if(operators.indexOf(msg.user) != -1 && msg.text == "test"){
        util.sendChat("Hello, I am a Bot! Nice to meet you!");
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.text == "test"){
        util.sendChat("Hi " + msg.user + "! How are you today?");
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
      if (msg.text.startsWith("testtip")) {
        var parts = msg.text.split(" ");
        var msg = new types.TipEvent(parts[1], -1, undefined, parts[2]);
        eventEmitter.emit("tip", msg);
      }
    }
}
exports.process_chat = process_chat;
