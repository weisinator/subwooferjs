const assert = require('assert');
const enclosure = require('../src/enclosure');
describe("Enclosure", function(){
    let enc;
    context("Ported 56L tuned to 40hz", function(){
        before(function(){
            enc = new enclosure(56, 40);
        });    
        it("vb should return 56", function(){
            assert.strictEqual(enc.vb, 56);
        });
        it("fb should return 40", function(){
            assert.strictEqual(enc.fb, 40);
        });
    });
    context("Sealed 56L", function(){
        before(function(){
            enc = new enclosure(56);
        });
        it("vb should return 56", function(){
            assert.strictEqual(enc.vb, 56);
        });
        it("fb should return -1", function(){
            assert.strictEqual(enc.fb, -1);
        });
    });
});