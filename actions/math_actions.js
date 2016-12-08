var util = require('../util.js');
var math = require('mathjs');

function process_chat(msg) {
    if(msg.text.startsWith("math") || msg.text.startsWith("maff")){
        var expression = msg.text.replace("math","").replace("maff","").trim();
        var response = undefined;
	try {
          response = expression + " = " + math.eval(expression);
        } catch(err) {
          response = "I'm sorry, I don't know how to process " + expression;  
        }
        util.respond(response, msg);
    }
    else if(msg.text == "random"){
        var response = msg.user + ", your random number is " + Math.floor(Math.random() * 100);
        util.respond(response, msg);
    }
}
exports.process_chat = process_chat;
