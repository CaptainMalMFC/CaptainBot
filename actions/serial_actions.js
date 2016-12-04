var config = require('config');
var types = require('./types.js');

var SerialPort = require("serialport");
var serialPort = new SerialPort(config.get("serialport");
var serialOn = false;

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);

var servoState = 0;
var maxServo = 8;

module.exports = {};

function buildPM(response, triggerMsg) {
  return new types.PrivateMsg(triggerMsg.user, triggerMsg.uid, response);
}

function process_tip(msg){
    var responses = new types.Responses();
    if (msg.tokens == 30) {
        if (servoState < maxServo) {
            servoState++;
            serialPort.write([servoState]);
        }
    } else if (serialOn && msg.tokens == 20) {
        if (servoState > 0) {
            servoState--;
            serialPort.write([servoState]);
        }
    } else if (serialOn && msg.tokens == 125) {
        if (servoState < maxServo) {
            servoState = maxServo;
            serialPort.write([servoState]);
        }
    } else if (serialOn && msg.tokens == 100) {
	    if (servoState > 0) {
            servoState = 0;
            serialPort.write([servoState]);
        }
    }
    return responses;
}
module.exports.process_tip = process_tip;

function process_chat(msg) {
    var responses = new types.Responses();
    if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
        if (msg.text == "serialon") {
          serialOn = true;
          responses.privateResponses.push(buildPM("Serial enabled.", msg));   
        } else if (msg.text == "serialoff") {
          serialOn = false;
          responses.privateResponses.push(buildPM("Serial disabled.", msg));   
        }
    }
    return responses;
}
module.exports.process_chat = process_chat;
