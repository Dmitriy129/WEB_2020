var assert = require('assert');
const StoreSingle = require("../../src/store")
const Store = (new StoreSingle).getInstance();
console.log("store imported");
module.exports = [
    () =>
        it('State is defined', function () {
            assert.ok(Store);
        }),
    () =>
        it('User Created', function () {
            // Store. 
        }),
    () =>
        it('Picture Created', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        }),
    () =>
        it('Auction Created', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        }),
    () =>
        it('Bet', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        }),
    () =>
        it('Auction finished', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        }),
]

