var config = require('config');
var util = require('../util.js');

var SerialPort = require("serialport");
var serialPort = new SerialPort(config.get("serialport"));
var serialOn = false;

var modelName = config.get("modelName");
var operators = config.get("operators");
var commandUserWhiteList = [modelName].concat(operators);

var servoState = 0;
var maxServo = 8;

function process_tip(msg){
    if (serialOn && msg.tokens == 30) {
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
}
exports.process_tip = process_tip;

function process_chat(msg) {
    if(commandUserWhiteList.indexOf(msg.user) != -1 && msg.src == "priv") {
        if (msg.text == "serialon") {
          serialOn = true;
          util.respond("Serial enabled.", msg);   
        } else if (msg.text == "serialoff") {
          serialOn = false;
          util.respond("Serial disabled.", msg);   
        }
    }
}
exports.process_chat = process_chat;
