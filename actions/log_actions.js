var types = require('../types.js');

module.exports = {};

function process_tip(msg){
    var responses = new types.Responses();
    console.log("Tip Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Message: " + msg.text);
    console.log("--Amount: " + msg.tokens);
    return responses;
}
module.exports.process_tip = process_tip;

function process_chat(msg) {
    var responses = new types.Responses();
    console.log("Message Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Source: " + msg.src);
    console.log("--Message: " + msg.text);
    return responses;
}
module.exports.process_chat = process_chat;
