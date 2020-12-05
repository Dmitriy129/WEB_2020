module.exports = function hmsToMsec(hms) {
    var a = hms.split(':'); // split it at the colons
    return ((+(a[0] || 0)) * 60 * 60 + (+(a[1] || 0)) * 60 + (+(a[2] || 0))) * 1000
}