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
}
module.exports.Responses = Responses;

function PrivateMsg(user, uid, text) {
  this.user = user;
  this.uid = uid;
  this.text = text;
}
module.exports.PrivateMsg = PrivateMsg;
