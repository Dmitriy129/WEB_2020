var fs = require("fs");

module.exports.counter = require("./Counter")

module.exports.getCookie = function (cookie, name) {
    if (cookie) {
        var match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)", "g"));
        if (match)
            for (key in match) {
                let val = match[key].split("=")[1];
                if (val && val !== "undefined") return val;
            }
    }
};

module.exports.dirCreater = function (dirpath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirpath, { recursive: true }, err => (err && err.code !== 'EEXIST') ? reject(err) : resolve())
    })
        .catch(err => console.error(err))
}

module.exports.runAtDate = function (func, date, timer) {
    // var now = (new Date()).getTime();
    // var then = date.getTime();
    // var diff = Math.max((then - now), 0);
    if (date > 0x7FFFFFFF) //setTimeout limit is MAX_INT32=(2^31-1)
        timer = setTimeout(function () { runAtDate(func, date, timer); }, 0x7FFFFFFF);
    else
        timer = setTimeout(func, date);
}
