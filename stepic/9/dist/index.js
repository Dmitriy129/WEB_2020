var Calculator = /** @class */ (function () {
    function Calculator(xx) {
        this.x = xx;
    }
    Calculator.prototype.add = function (y) {
        console.log(this.x);
        console.log(y);
        return this.x + y;
    };
    return Calculator;
}());
