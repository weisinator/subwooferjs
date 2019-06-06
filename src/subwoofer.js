const circle = require('./circle');
const convert = require('convert-units');
const round = require('round');

function subwoofer(d, e, dc = 1) {
    this.driver = d;
    this.enclosure = e;
    this.portArea = -1;
    this.driverCount = dc;
    this.minimumPortArea = function(){
        return round(circle.diameterToArea(
            convert(
                Math.sqrt(
                    this.enclosure.fb * this.driver.peakDisplacementVolume()*this.driverCount)
                    ).from('m').to('cm')),0.1);
    }
    this.portLength = function(){
        if(this.portArea == -1){
            this.portArea = this.minimumPortArea();
        }
        return round(23562.5*Math.pow(circle.areaToDiameter(this.portArea),2)/(this.enclosure.vb*Math.pow(this.enclosure.fb,2)),0.1);
    }
    this.frequencyResponse = function(f){
        if(this.enclosure.fb == -1){
            return round(this.sealedFrequencyResponse(f),0.01);
        }
        return round(this.portedFrequencyResponse(f),0.01);
    }
    this.setPortArea = function(pa){
        this.portArea = round(pa,0.01);
    }
    
    this.portedFrequencyResponse = function(f){
        let Ql = 7;
        let Fn2 = Math.pow(f/this.driver.fs,2); 
        let Fn4 = Math.pow(Fn2,2); 
        let A = Math.pow(this.enclosure.fb/this.driver.fs,2); 
        let B = A/this.driver.qts+this.enclosure.fb/(this.driver.fs*Ql); 
        let C = 1+A+(this.driver.vas * this.driverCount/this.enclosure.vb)+this.enclosure.fb/(this.driver.fs*this.driver.qts*Ql); 
        let D = 1/this.driver.qts+this.enclosure.fb/(this.driver.fs*Ql); 
        return 10 * Math.log10(Math.pow(Fn4,2)/(Math.pow((Fn4-C*Fn2+A),2)+Fn2*(Math.pow((D*Fn2-B),2))));
    }
    this.sealedFrequencyResponse = function(f){
        let fr = Math.pow(f/this.fcb(),2);
        return 10 * Math.log10(Math.pow(fr,2)/(Math.pow((fr-1),2)+fr/Math.pow(this.qtc(),2)));
    }
    this.qtc = function(){
        return this.volumeRatio() * this.driver.qts;
    }
    this.fcb = function(){
        return this.volumeRatio() * this.driver.fs;
    }
    this.volumeRatio = function(){
        return Math.sqrt((this.driver.vas * this.driverCount / this.enclosure.vb) + 1)
    }
}
module.exports = subwoofer;