const circle = {
    areaToDiameter: (area) => {
        return  2 * Math.sqrt(area / Math.PI);
    },
    diameterToArea: (diameter) => {
        return Math.PI * Math.pow(diameter / 2, 2);
    },
}
module.exports = circle;