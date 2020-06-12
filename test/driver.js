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
    });
    it('should build a maximally flat sealed subwoofer of approximately 23.68 liters', function(){
        expect(drv.maximallyFlatSealedSubwoofer().enclosure.vb).to.be.closeTo(23.68,0.1);
    });
    it('should build a maximally flat ported enclosure with a volume of 49.9L tuned to 24.6hz', function(){
        expect(drv.maximallyFlatPortedSubwoofer().enclosure.vb).to.be.closeTo(49.9,0.1);
        expect(drv.maximallyFlatPortedSubwoofer().enclosure.fb).to.be.closeTo(24.6,0.1);
    });
    it('should build an extended bass shel subwoofer of approximately 47.3l tuned to 22.3hz', function(){
        expect(drv.extendedBassShelfPortedSubwoofer().enclosure.vb).to.be.closeTo(47.3, 0.1);
        expect(drv.extendedBassShelfPortedSubwoofer().enclosure.fb).to.be.closeTo(22.3,0.1);
    })
});