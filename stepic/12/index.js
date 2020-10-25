const should = require("should")
const chai = require("chai")
const index = require("../src/index")

describe("Test index", function () {
    it("object", function () {
        index.table.should.have.property("leg", 4);
    })
    it("function", function () {
        index.fib(8).should.equal(21);
    })
    it("class", function () {
        (new index.CL(5)).add(3).should.equal(8)
    })
})
