const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const subwoofer = require('../src/subwoofer');
const driver = require('../src/driver');
const enclosure = require('../src/enclosure');

describe("Subwoofer: Dayton RSS265HO-44", function(){
    let drv;
    let encl;
    let sub;
    context("One driver", function(){
        context("Sealed at 21.25L",function(){
            before(function(){
                drv = new driver(0.45,34.8,27.6,13.25,352.3, "10 inch round", 4, 2, 4.42,0.5);
                encl = new enclosure(21.25);
                sub = new subwoofer(drv, encl);
            });
            it("has a frequency response of -5.416 at 35hz", function(){
                expect(sub.frequencyResponse(35)).to.be.closeTo(-5.416, 0.01);
            });
            it("has a qtc near 0.73", function(){
                expect(sub.qtc()).to.be.closeTo(0.73, 0.005);
            });
            it("has an fcb near 44.8hz", function(){
                expect(sub.fcb()).to.be.closeTo(44.8,0.05);
            });
        });
        context("Ported 56.6L tuned to 40hz", function(){
            before(function(){
                drv = new driver(0.45,34.8,27.6,13.25,352.3, "10 inch round", 4, 2, 4.42,0.5);
                encl = new enclosure(56.6, 40);
                sub = new subwoofer(drv, encl);
            });
            it("has a frequency response near +0.755db at 35hz", function(){
                expect(sub.frequencyResponse(35)).to.be.closeTo(0.755, 0.05);
            });
            it("has a minimum port area of near 146.6cm2", function(){
                expect(sub.minimumPortArea()).to.be.closeTo(146.6,0.1);
            });
            it('has a port length of approximately 48.5cm with minimum port area', function(){
                expect(sub.portLength()).to.be.closeTo(48.5, 0.2);
            });
            it("can set a port area", function(){
                sub.setPortArea(55);
                assert.strictEqual(sub.portArea, 55);
            }); 
        });    
    });
    context("Two Drivers", function(){
        context("Sealed at 42.5L",function(){
            before(function(){
                drv = new driver(0.45,34.8,27.6,13.25,352.3, "10 inch round", 4, 2, 4.42,0.5);
                encl = new enclosure(42.5);
                sub = new subwoofer(drv, encl, 2);
            });
            it("has a frequency response of -5.416 at 35hz", function(){
                expect(sub.frequencyResponse(35)).to.be.closeTo(-5.416, 0.01);
            });
            it("has a qtc near 0.73", function(){
                expect(sub.qtc()).to.be.closeTo(0.73, 0.005);
            });
            it("has an fcb near 44.8hz", function(){
                expect(sub.fcb()).to.be.closeTo(44.8,0.05);
            });
        });
        context("Ported 113.2L tuned to 40hz", function(){
            before(function(){
                drv = new driver(0.45,34.8,27.6,13.25,352.3, "10 inch round", 4, 2, 4.42,0.5);
                encl = new enclosure(113.2, 40);
                sub = new subwoofer(drv, encl, 2);
            });
            it("has a frequency response near +0.755db at 35hz", function(){
                expect(sub.frequencyResponse(35)).to.be.closeTo(0.755, 0.05);
            });
            it("has a minimum port area 293.3cm2", function(){
                expect(sub.minimumPortArea()).to.be.closeTo(293.3,0.1);
            });
            it('has a port length of approximately 48.5cm with minimum port area', function(){
                expect(sub.portLength()).to.be.closeTo(48.5, 0.2);
            });
            it("can set a port area", function(){
                sub.setPortArea(55);
                assert.strictEqual(sub.portArea, 55);
            });
            
        });
    });
    
});
