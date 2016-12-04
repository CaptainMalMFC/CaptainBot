var moment = require('moment');
module.exports = {};

function ChatEvent (user, uid, text, src) {
  this.user = user;
  this.uid = uid;
  this.text = text;
  this.src = src;
}
module.exports.ChatEvent = ChatEvent;

function TipEvent(user, uid, text, tokens) {
  this.user = user;
  this.uid = uid;
  this.text = text;
  this.tokens = tokens;
}
module.exports.TipEvent = TipEvent;

function Responses() {
  this.chatResponse = undefined;
  this.privateResponses = [];

  this.has_responses = function() {
    return (this.chatResponse != undefined) || (this.privateResponses.length > 0);      
  }
}
module.exports.Responses = Responses;

function PrivateMsg(user, uid, text) {
  this.user = user;
  this.uid = uid;
  this.text = text;
}
module.exports.PrivateMsg = PrivateMsg;

function Action(user, uid, text, action, time) {
  this.user = user;
  this.uid = uid;
  this.action = action;
  this.text = text;
  this.time = moment();
  this.minutes_ago = function() {
    return moment.duration(moment() - this.time).minutes();
  }
}
module.exports.Action = Action;
