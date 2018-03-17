
/* global cordova */

var exec = require('cordova/exec');

// var namedColors = {
//     "black": "#000000",
//     "darkGray": "#A9A9A9",
//     "lightGray": "#D3D3D3",
//     "white": "#FFFFFF",
//     "gray": "#808080",
//     "red": "#FF0000",
//     "green": "#00FF00",
//     "blue": "#0000FF",
//     "cyan": "#00FFFF",
//     "yellow": "#FFFF00",
//     "magenta": "#FF00FF",
//     "orange": "#FFA500",
//     "purple": "#800080",
//     "brown": "#A52A2A"
// };

var AudioPermissions = {

//     isVisible: true,

//     overlaysWebView: function (doOverlay) {
//         exec(null, null, "StatusBar", "overlaysWebView", [doOverlay]);
//     },

//     styleDefault: function () {
//         // dark text ( to be used on a light background )
//         exec(null, null, "StatusBar", "styleDefault", []);
//     },

//     styleLightContent: function () {
//         // light text ( to be used on a dark background )
//         exec(null, null, "StatusBar", "styleLightContent", []);
//     },

//     styleBlackTranslucent: function () {
//         // #88000000 ? Apple says to use lightContent instead
//         exec(null, null, "StatusBar", "styleBlackTranslucent", []);
//     },

//     styleBlackOpaque: function () {
//         // #FF000000 ? Apple says to use lightContent instead
//         exec(null, null, "StatusBar", "styleBlackOpaque", []);
//     },

//     backgroundColorByName: function (colorname) {
//         return StatusBar.backgroundColorByHexString(namedColors[colorname]);
//     },

//     backgroundColorByHexString: function (hexString) {
//         if (hexString.charAt(0) !== "#") {
//             hexString = "#" + hexString;
//         }

//         if (hexString.length === 4) {
//             var split = hexString.split("");
//             hexString = "#" + split[1] + split[1] + split[2] + split[2] + split[3] + split[3];
//         }

//         exec(null, null, "StatusBar", "backgroundColorByHexString", [hexString]);
//     },

//     hide: function () {
//         exec(null, null, "StatusBar", "hide", []);
//         StatusBar.isVisible = false;
//     },

//     show: function () {
//         exec(null, null, "StatusBar", "show", []);
//         StatusBar.isVisible = true;
//     }

    check: function(callback) {
        console.log('in check');
        function success(value) {
            console.log('in check success', value);
            callback(value);
        }
        function fail(err) {
            console.log('in check fail', err);
            callback(false);
        }
        exec(success, fail, 'AudioPermissions', 'check', []);
    },

    request: function(callback) {
        console.log('in request');
        function success(value) {
            console.log('in request success', value);
            callback(value);
        }
        function fail(err) {
            console.log('in request fail', err);
            callback(false);
        }
        exec(success, fail, 'AudioPermissions', 'request', []);
    },

};

// // prime it. setTimeout so that proxy gets time to init
// window.setTimeout(function () {
//     exec(function (res) {
//         if (typeof res == 'object') {
//             if (res.type == 'tap') {
//                 cordova.fireWindowEvent('statusTap');
//             }
//         } else {
//             StatusBar.isVisible = res;
//         }
//     }, null, "StatusBar", "_ready", []);
// }, 0);

module.exports = AudioPermissions;
