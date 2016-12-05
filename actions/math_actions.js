var types = require('../types.js');
var math = require('mathjs');

module.exports = {};

function buildPM(response, triggerMsg) {
  return new types.PrivateMsg(triggerMsg.user, triggerMsg.uid, response);
}

function process_tip(msg){
    var responses = new types.Responses();
    return responses;
}
module.exports.process_tip = process_tip;

function process_chat(msg) {
    var responses = new types.Responses();
    if(msg.text.startsWith("math") || msg.text.startsWith("maff")){
        var expression = msg.text.replace("math","").replace("maff","").trim();
        var response = undefined;
	    try {
          response = expression + " = " + math.eval(expression);
        } catch(err) {
          response = "I'm sorry, I don't know how to process " + expression;  
        }
        if (msg.src == "chat") {
          responses.chatResponse = response; 
        } else {
          responses.privateResponses.push(buildPM(response, msg));
        }
    }
    else if(msg.text == "random"){
        var response = msg.user + ", your random number is " + Math.floor(Math.random() * 100);
        if (msg.src == "chat") {
          responses.chatResponse = response; 
        } else {
          responses.privateResponses.push(buildPM(response, msg));
        }
    }
    return responses;
}
module.exports.process_chat = process_chat;
