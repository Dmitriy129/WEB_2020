// const start = require('../src')

// start({
//     startData: {
//         "pictures": [{
//             "name": "name1",
//             "author": "author1",
//             "description": "description1",
//             "cost": 99999,
//             "img": "img2.jpg"
//         }]
//     }
// })
//     .then(() => require('./allTests')())
//     .then(() => run())

function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }
  
  const assert = require("assert")

// let fib = require("../src/fib")

describe("fib", function(){

it.only("fib проверка #1", function () {

assert.equal(55, fib(10))

})

it("fib проверка #2", function () {

assert.notEqual(0, fib(0))

assert.equal(1, fib(1))

})

it.only("fib проверка #3", function () {

assert.equal(21, fib(8))

assert.equal(5, fib(5))

})

})
