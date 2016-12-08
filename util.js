var events = require("events");
var config = require('config');
var types = require('./types.js');

var eventEmitter = new events.EventEmitter();
exports.eventEmitter = eventEmitter;

exports.config = config;

var sendChat = function(chatMsg) {
  eventEmitter.emit("sendChat", chatMsg);
}
exports.sendChat = sendChat;

var sendPM = function(privMsg) {
  eventEmitter.emit("sendPM", privMsg);
}
exports.sendPM = sendPM;

var respond = function(response, triggerMsg) {
  if (triggerMsg.src == "chat") {
    sendChat(response); 
  } else {
    sendPM(new types.PrivateMsg(triggerMsg.user, triggerMsg.uid, response));
  }
}
exports.respond = respond;
