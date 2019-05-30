const convert = require('convert-units');

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
}
module.exports = driver;