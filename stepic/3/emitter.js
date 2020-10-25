var EventEmitter = require("events").EventEmitter;
var manager = new EventEmitter();
manager.on("request", function(obj) {
  this.response = {
    ...obj,
    data: "data"
  };
});
