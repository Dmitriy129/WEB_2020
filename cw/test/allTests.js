
const assert = require('assert');
module.exports = () =>
    describe('#App', () => {
        after(() => process.exit())
        it('should return -1 when the value is not present', () => {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        })
        describe('#Store', () => {
            require('./store').forEach(it => it())
        })
    })