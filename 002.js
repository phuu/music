var baudio = require('baudio');
var _ = require('lodash');
var pi = Math.PI;
var tau = pi * 2;

var intvl = {
    x: 1,
    semitone: 16/15,
    tone: 9/8,
    second: 9/8,
    third: 5/4,
    fourth: 4/3,
    fifth: 3/2,
    sixth: 5/3,
    seventh: 15/8,
    oct: 2/1,
    octave: 2/1,
    min: {
        second: 16/15,
        third: 6/5,
        sixth: 8/5,
        seventh: 16/9,
    },
    aug: {
        fourth: 25/18
    },
    tmp: {
        fifth: pow(7/12)
    }
};

var wbltn = [
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth,
    intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth,
    intvl.min.seventh, intvl.min.seventh, intvl.min.seventh, intvl.min.seventh,
    intvl.min.seventh, intvl.min.seventh, intvl.min.seventh, intvl.min.seventh,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.fourth, 1/intvl.fourth, 1/intvl.fourth, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    intvl.min.seventh, intvl.tmp.fifth, intvl.min.third, intvl.tone,

    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.x, intvl.x, intvl.x, intvl.x,
    intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth,
    intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth, intvl.tmp.fifth,
    intvl.min.seventh, intvl.min.seventh, intvl.min.seventh, intvl.min.seventh,
    intvl.min.seventh, intvl.min.seventh, intvl.min.seventh, intvl.min.seventh,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    intvl.oct, 0, intvl.oct, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth, 1/intvl.tmp.fifth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth, 1/intvl.aug.fourth,
    1/intvl.fourth, 1/intvl.fourth, 1/intvl.fourth, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    intvl.min.seventh, intvl.tmp.fifth, intvl.min.third, intvl.tone,
];

var wobbler = anna({
    vol: 0.5,
    osc: [
        { fn: sin, vol: 0.8, oct: 1/2 },
        { fn: sin, vol: 0.3, oct: 1 },
        { fn: sqr, vol: 0.02 },
        { fn: sqr, vol: 0.01, detune: 4 },
        { fn: sqr, vol: 0.01, detune: -5 },
        { fn: saw, vol: 0.02 },
        { fn: saw, vol: 0.01, detune: -4 },
        { fn: saw, vol: 0.01, detune: 5 },
    ]
});

var lead = anna({
    vol: 0.2,
    osc: [
        { fn: saw, vol: 0.3 },
        { fn: saw, vol: 0.2, detune: -6 },
        { fn: saw, vol: 0.1, detune: 8 },
    ]
});

var b = baudio(function (t) {

    var la = lead(t, 220 * wbltn[flr(t * 16 % wbltn.length)]);
    var wa = wobbler(t, 220 * wbltn[flr(t * 16 % wbltn.length)]);
    return (
        + wa
        // + la
        // + (isaw(t, 2) * sin(t % 1, 4 * (1 - (t % 1)) * 55) * sqr(t, 2)) * 0.4
        +   (
                + kick(t, 4, 8, 55) * 0.2
                + kick(t, 4, 8, 100) * 0.3
                + kick(t, 4, 8, 110) * 0.3
                + kick(t, 4, 8, 300) * 0.01
                + kick(t, 4, 8, 301) * 0.01
                + kick(t, 4, 8, 305) * 0.01
                // + kick(t, 4, 8, Math.random()) * 0.01
                // * (t * 8 % 4 < 1 ? 1 : 0)
            ) * 0.5
        + kick(t, 4, 1, Math.random()) * 0.01
    ) / 2;
});
b.play();

function anna(opts) {
    opts = _.defaults(opts, { osc: [ {} ], vol: 0.5 });
    var i = 0;
    while (i < opts.osc.length) {
        opts.osc[i] = _.defaults(opts.osc[i], { fn: sin, vol: 1 / opts.osc.length, oct: 1, interval: 1, detune: 0 });
        i++;
    }

    return function(t, pitch) {
        var amp = 0;
        var i = 0;
        while (i < opts.osc.length) {
            var osc = opts.osc[i];
            amp += osc.fn(
                t,
                (pitch * osc.oct) * osc.interval + osc.detune
            ) * osc.vol;
            i++;
        }
        return amp * opts.vol;
    }
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