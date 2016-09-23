// TODO: exception handling
var mfc = require("MFCAuto");
var config = require('config');
var customFunctions = require('./custom_functions.js');
var types = require('./types.js');
var actions = require('./actions.js');
var util = require('./util.js');

var botUsername = config.get("botUsername");
var botHashedPassword = config.get("botHashedPassword");
var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);
var periodicEventInterval = config.get("periodicEventInterval");
var periodicResponses = config.get("periodicResponses");
var live = config.get("live");
var modelEmotes = config.get("modelEmotes");

var eventEmitter = util.eventEmitter;
var client = new mfc.Client();
var modelId = 0;
var nextPeriodic = 0;


// EVENT PARSING FUNCTIONS
//Listen for chat messages and print them
client.on("CMESG", function(packet){
    if(packet.chatString !== undefined){
        var msgUser = packet.sMessage.nm;
        var msgUID = packet.sMessage.uid;
        var msgText = packet.pMessage;
	    var msg = new types.ChatEvent(msgUser, msgUID, msgText, "chat");
        eventEmitter.emit("msg", msg);
    }
});

//Listen for private messages and print them
client.on("PMESG", function(packet){
    if(packet.chatString !== undefined){
        var msgUser = packet.sMessage.nm;
        var msgUID = packet.sMessage.uid;
        var msgText = packet.pMessage;
	    var msg = new types.ChatEvent(msgUser, msgUID, msgText, "priv");
        eventEmitter.emit("msg", msg);
    }
});

//Listen for tip messages and print them
client.on("TOKENINC", function(packet){
    if(packet.chatString !== undefined){
        var tok = packet.sMessage;
        var msgUser = tok.u[2];
        var msgUID = tok.m[0];
        var msgText = packet.pMessage;
        var tokens = tok.tokens;
        var msg = new types.TipEvent(msgUser, msgUID, msgText, tokens);
        eventEmitter.emit("tip", msg);
    }
});

// EVENT HANDLERS
// Message event handler
eventEmitter.on("msg", function(msg) {
    console.log("Message Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Source: " + msg.src);
    console.log("--Message: " + msg.text);
    //loop through chat functions, find and execute matches
    var responses = actions.process_chat(msg);
    eventEmitter.emit("sendResponses",responses);
});

// Tip event handler
eventEmitter.on("tip", function(msg) {
    console.log("Tip Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Message: " + msg.text);
    console.log("--Amount: " + msg.tokens);
    //loop through tip functions, find and execute matches
    var responses = actions.process_tip(msg);
    eventEmitter.emit("sendResponses",responses);
});

// Response Helper
eventEmitter.on("sendResponses", function(responses) {
  console.log("Send Responses Event!");
  if (responses.chatResponse !== undefined) {
    console.log("Sending to Chatroom: " + responses.chatResponse);
    if (live) {
      client.sendChat(modelId, responses.chatResponse);
    }
  }
  for (x in responses.privateResponses) {
    var privMsg = responses.privateResponses[x];
    console.log("Sending to " + privMsg.user + ": " + privMsg.text);
    client.sendPM(privMsg.uid, privMsg.text);
  }
});

// Periodic event handler
eventEmitter.on("periodic", function() {
    console.log("Periodic Event!");
    //execute periodic functions
    var response = undefined;
    if (periodicResponses !== undefined && periodicResponses.length > 0) {
      response = periodicResponses[nextPeriodic];
      nextPeriodic = (nextPeriodic + 1) % periodicResponses.length;
    }
    if (response !== undefined) {
        console.log("Sending: " + response);
        if (live) {
          client.sendChat(modelId, response);
        }
    }
});

// STARTUP FUNCTIONS
// After login, look up the UID for model and operator
client.on("LOGIN", function() {
  setTimeout(function() {
    console.log("Looking up UIDs...");
    client.queryUser(modelName);
    for (x in operators) {
      var operator = operators[x];
      console.log("Looking up " + operator);
      client.queryUser(operator);
    }
  }, 500);
});

// Join room and notify operator once we have the UIDs
client.on("USERNAMELOOKUP", function(packet){
    if (packet.sMessage.nm == modelName) {
      modelId = packet.sMessage.uid;
      console.log("Joining " + modelName + "'s room. (uid:" + modelId + ")");
      client.joinRoom(modelId);
      if (live) {
        //client.sendPM(modelId, ":robot Hello " + modelName + "! I am your bot!");
      }
      setInterval(function() {
        eventEmitter.emit("periodic");
      }, periodicEventInterval * 1000);
      console.log("Joined.");
    } else if (operators.indexOf(packet.sMessage.nm) != -1) {
      client.sendPM(packet.sMessage.uid, ":robot Hello " + packet.sMessage.nm + "! You are an operator of " + botUsername + " in " + modelName + "'s Room!");  	
    }
});

client.username = botUsername;
client.password = botHashedPassword;
client.connect();
