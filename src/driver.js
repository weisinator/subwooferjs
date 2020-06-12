const convert = require('convert-units');
const subwoofer = require('./subwoofer');
const enclosure = require('./enclosure');
function driver(qts, vas, fs, xmax, sd, nominalDiameterAndShape, znom=-1, numvc = -1, qms=-1, qes=-1,)  {
    this.qts = qts;
    this.qms = qms;
    this.qes = qes;
    this.vas = vas;
    this.fs = fs;
    this.nominalDiameterAndShape = nominalDiameterAndShape;
    this.sd = sd;
    this.xmax = xmax;
    this.znom = znom;
    this.numVc = numvc;
    
    this.efficiencyBandwidthProduct = function() {
        return this.fs/this.qes;
        
    }
    
    this.canBeDownfired = function() {
        let pctSag = 24849/(this.xmax * Math.pow(this.fs,2));
        return pctSag<5;
    }
    this.peakDisplacementVolume = function() {
        return convert(this.sd).from('cm2').to('m2') 
            * convert(this.xmax).from('mm').to('m'); 
    }
    this.maximallyFlatPortedSubwoofer = function(){
        let vb = 20 * Math.pow(this.qts, 3.3) * this.vas; 
        let fb = Math.pow((this.vas/vb), 0.31) * this.fs;
        var encl = new enclosure(vb, fb);
        return new subwoofer(this, encl);
    }
    this.extendedBassShelfPortedSubwoofer = function(){
        let vb = 7.95 * this.vas * Math.pow(this.qts, 2.21);
        let fb = 0.471 * this.fs * Math.pow(this.qts, -0.677);
        let encl = new enclosure(vb, fb);
        return new subwoofer(this, encl);
    }
    this.maximallyFlatSealedSubwoofer = function(){
        let qr = (Math.sqrt(2) / 2) / this.qts;
        let vr = Math.pow(qr, 2) - 1;
        let vb = this.vas/vr;
        let encl = new enclosure(vb);
        return new subwoofer(this, encl);
    }
}
module.exports = driver;