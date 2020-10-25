var assert = require('assert');
const StoreSingle = require("../../src/store")
const Store = (new StoreSingle).getInstance();
console.log("store imported");
module.exports = [
    () =>
        it('State is defined', () => {
            assert.ok(Store);
        }),
    () =>
        it('Picture from file (initState)', () => {
            let p1 = Store.findPicture(0)
            assert.strictEqual(p1.name, "name1");
            assert.strictEqual(p1.author, "author1");
            assert.strictEqual(p1.description, "description1");
            assert.strictEqual(p1.cost, 99999);
            assert.strictEqual(p1.img, "img2.jpg");
        }),
    () =>
        it('User Created', () => {
            assert.ok(Store.createUser({
                id: "test id",
                login: "test login",
                name: "test name",
                img: "test img",
                accessToken: "test accessToken"
            }));
        }),
    () =>
        it('Picture Created', () => {
            assert.ok(Store.createPicture({
                name: "test name",
                author: "test author",
                description: "test description",
                cost: 1
            }))
        }),
    () =>
        it('Auction Created', () => {
            assert.ok(Store.createAuction({
                picture: Store.findPicture(0),
                timeStart: new Date(),
                costStart: 100,
                rateMultiplier: 1.5,
                timeInterval: 300,
                owner: Store.findUser("test id")
            }))
        }),


]

