var baudio = require('baudio');

var m = [
    0, 0, 1/4, 0, 0, 1/2, 1/2, 2/5,
       0, 1/4, 0, 1/5, 1/2, 1/2,
          1/4, 0, 0, 1/7,
               0, 0
].map(function (x) { return Math.pow(2, x); });
var pi = Math.PI;
var tau = pi * 2;

var b = baudio(function (t) {
    var alt = Math.ceil(t % 2);

    return (
        // Bass
        +   (
                (
                    + sin(440 / alt)
                    + saw(110 / alt) * 0.4
                    + saw(113 / alt) * 0.1
                )
                * (sin(pi) * sin(16))
                * 0.4
            )
        +   (
                (
                    + saw(110 * m[Math.floor(t * 8) % m.length])
                    + saw(445 * m[Math.floor(t * 8) % m.length]) * 0.1
                    + saw(445 * m[Math.floor(t * 8) % m.length]) * 0.1
                )
                * sin(16 / 6)
                * 0.4
                * (t % 8 > 6 ? 1 : 0)
            )
        // Tune
        +   (
                (
                    + sqr(880 * m[Math.floor(t * 4) % m.length])
                )
                * 0.1
                * (t / 4 % 8 > 6 ? 1 : 0)
            )
        // Kick
        + isaw(4) * sin(220) * sqr(tau) * 2
    ) / 4;

    function sin(x) {
        return Math.sin(x * t);
    }
    function sqr(x) {
        return Math.sin(x * t) > 0 ? 1 : 0;
    }
    function saw(x) {
        var n = t * x;
        return (n - Math.floor(n));
    }
    function isaw(x) {
        var n = t * x;
        return (n - Math.ceil(n));
    }
});
b.play();