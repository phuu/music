var baudio = require('baudio');
var _ = require('lodash');
var pi = Math.PI;
var tau = pi * 2;


var b = baudio(function (t) {
    return (
        // + sin(t, 440) * 0.2
        // + saw(t, 55) * Math.sin(t * 10)
        // + saw(t, 111) * Math.sin(t * 8)
        // + saw(t, 109) * Math.sin(t * 9)
        // + kick(t, 3, 8, 55)
        + laser(t, 440, 4)
        + laser(t, 440, 4.1)
        + laser(t, 440, 4.3)
        + laser(t, 440, 4.4)
    );
}).play();

function laser(t, freq, speed) {
    return sin(t, freq) * sqr(t, speed);
}

function kick(t, speed, space, freq) {
    return Math.sin(freq * 1/(t * speed % (16 / space) + 0.2));
}

function sin(t, x) {
    return Math.sin(pi * x * t);
}

function sqr(t, x) {
    return Math.ceil(sin(t, x));
}

function saw(t, x) {
    var n = t * x;
    return (n - Math.floor(n));
}

function isaw(t, x) {
    return 1 - saw(t, x);
}

function flr() {
    return Math.floor.apply(Math, arguments);
}
function cil() {
    return Math.ceil.apply(Math, arguments);
}

function gate(exp) {
    return (exp ? 1 : 0);
}

function igate(exp) {
    return (exp ? 0 : 1);
}

function pow(x) {
    return Math.pow(2, x);
}

function pos(x) {
    return Math.sqrt(Math.pow(x, 2));
}

function neg(x) {
    return -pos(x);
}

// make x's sign match y's
function sign(x, y) {
    return (y > 0 ? pos(x) : neg(x));
}