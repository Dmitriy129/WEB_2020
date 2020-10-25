
const assert = require('assert');
module.exports = () =>
    describe('#App', function () {
        after(process.exit)

        require('./store').forEach(it => it())

        it('should return -1 when the value is not present', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        })

    })