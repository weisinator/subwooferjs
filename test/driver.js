const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const driver = require('../src/driver');

describe('Driver: Dayton RSS265HO-44', function(){
    let drv;
    before(function(){
        drv = new driver(0.45,34.8,27.6,13.25,352.3, "10 inch round", 4, 2, 4.42,0.5);
    });
    it('should return nominalDiameterAndShape of 10 inch round', function(){
        assert.strictEqual(drv.nominalDiameterAndShape, '10 inch round');
    });
    it('should be allowed to downfire', function(){
        assert(drv.canBeDownfired());
    });
    it('should have an efficiency bandwidth product of 55.2', function(){
        assert.strictEqual(drv.efficiencyBandwidthProduct(), 55.2);
    });
    it('should have a peak displacement volume of 466.7975 cc', function(){
        expect(drv.peakDisplacementVolume()).to.be.closeTo(0.0004667975, 0.00000000001);
    })
});