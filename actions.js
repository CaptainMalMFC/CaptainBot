var math = require('mathjs');
var config = require('config');
var types = require('./types.js');
var util = require('./util.js');

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);
var eventEmitter = util.eventEmitter;

module.exports = {};

var jokes = ["If i had a dollar for every girl that found me unattractive, they would eventually find me attractive.",
             "Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.",
             "Relationships are a lot like algebra. Have you ever looked at your X and wondered Y?",
             "When wearing a bikini, women reveal 90 % of their body... men are so polite they only look at the covered parts.",
             "Before I criticize a man, I like to walk a mile in his shoes. That way, when I do criticize him, I'm a mile away and I have his shoes.",
             "Life is like toilet paper, you're either on a roll or taking shit from some asshole.",
             "I think my neighbor is stalking me as she's been googling my name on her computer. I saw it through my telescope last night.",
             "Artificial intelligence is no match for natural stupidity.",
             "Money talks ...but all mine ever says is good-bye.",
             "I changed my password to \"incorrect\". So whenever I forget what it is the computer will say \"Your password is incorrect\".",
             "Never laugh at your girlfriend's choices... you're one of them.",
             "I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness.",
             "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
             "I used to think I was indecisive, but now I'm not too sure.",
             "I saw a sign that said \"Watch for children\" and I thought, \"That sounds like a fair trade\".",
             "My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.",
             "Yo girl, are you a zero APR loan? Because I don't really understand your terms and you keep saying you have no interest.",
             "Why do scuba divers fall backwards off of the boat? Because if they fell forward, they'd still be in the boat.",
             "When does a joke become a dad joke? When the punchline becomes apparent.",
             "I have an EpiPen. My friend gave it to me as he was dying. It seemed very important to him that I have it.",
             "Thanks for explaining the word \"many\" to me. It means a lot."];

var dirtyjokes = ["What's the difference between a bowling ball and a blonde? You can only fit three fingers inside a bowling ball!",
                  "What's the difference between a tire and 365 used rubbers? One is a Goodyear and the other is a great year.",
                  "Do you sell hot dogs? Because you know how to make a wiener stand.",
                  "Did you hear about the guy who died of a Viagra overdose? They couldn't close his casket.",
                  "Did you get those yoga pants on sale? Because at my house they're 100% off",
                  "What gets longer when pulled, fits between breasts, inserts neatly in a hole, and works best when jerked? A seat belt.",
                  "Someone asked me how I view lesbian relationships.... \"In HD\" was not the correct answer."];

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
    if(operators.indexOf(msg.user) != -1 && msg.text == "test"){
        responses.chatResponse = "Hello, I am a Bot! Nice to meet you!";
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.text == "test"){
        responses.chatResponse = "Hi " + msg.user + "! How are you today?";
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.text == "random"){
        var response = msg.user + ", your random number is " + Math.floor(Math.random() * 100);
        if (msg.src == "chat") {
          responses.chatResponse = response; 
        } else {
          responses.privateResponses.push(buildPM(response, msg));
        }
    } 
    else if(msg.text == "joke") {
       responses.chatResponse = jokes[Math.floor(Math.random() * jokes.length)]  
    }
    else if(msg.text == "dirtyjoke") {
       responses.chatResponse = dirtyjokes[Math.floor(Math.random() * dirtyjokes.length)]  
    }
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.text.startsWith("math")){
        var expression = msg.text.replace("math","").trim();
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
    else if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
      
      if (msg.text == "list") {
        if (actionQueue.length == 0) {
          responses.privateResponses.push(buildPM("Queue is empty", msg));
        } else {
          for (i = 0; i < math.min(actionQueue.length,5); i++) {
            responses.privateResponses.push(buildPM(i + ": " + actionQueue[i].action + ", " + actionQueue[i].user + ", " + actionQueue[i].minutes_ago() + " minute(s) ago", msg));
          }
        }
      }
      else if (msg.text == "pop") {
        if (actionQueue.length == 0) {
          responses.privateResponses.push(buildPM("Queue is empty", msg));
        } else {
          var doneAction = actionQueue.shift();
          responses.privateResponses.push(buildPM("Done with: " + doneAction.action + ", " + doneAction.user, msg));
        }
      }
      else if (msg.text.startsWith("testtip")) {
        var parts = msg.text.split(" ");
        var msg = new types.TipEvent(parts[1], -1, undefined, parts[2]);
        eventEmitter.emit("tip", msg);
      }
    }
    return responses;
}
module.exports.process_chat = process_chat;
