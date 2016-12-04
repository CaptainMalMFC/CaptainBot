var events = require("events");
var config = require('config');

module.exports = {};

var eventEmitter = new events.EventEmitter();
module.exports.eventEmitter = eventEmitter;

module.exports.config = config
