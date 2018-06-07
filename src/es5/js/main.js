(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _home = require('./home.js');

var _router = require('./router.js');

var _router2 = _interopRequireDefault(_router);

var _route = require('./route.js');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//handles clicked rows in table
var rowClicked = function rowClicked() {
    //create route for info page (about)
    new _router2.default([new _route2.default('about', 'about.html', true)]);
    window.location.hash = '#about'; // change location in url


    var attribute = this.childNodes[3].innerHTML;
    //console.log(attribute);

    var _loop = function _loop(i) {

        var taggs = "";
        if (_home.jsonrec[i].OpIcao == undefined) {
            var j = 0;
            while (isNaN(String(_home.jsonrec[i].Icao).charAt(j))) {
                taggs += String(_home.jsonrec[i].Icao).charAt(j);
                j++;
            }
        } else {
            taggs = _home.jsonrec[i].OpIcao;
        }
        var flightnumber = taggs + " " + _home.jsonrec[i].Sqk;
        if (flightnumber == attribute) {
            // i`m pretty sure there is better way of doing this.

            var renderAbout = function renderAbout() {
                document.getElementById("info-flight").innerHTML = '<h3>Flight Information</h3>\n            <div class="row">\n                <div class="col-md-10">\n                    <p>This is the info about your flight:</p>\n                        <ul>\n                            <li>\n                                <strong>Manufacturer: </strong>\n                                <span class="my-badge">' + (_home.jsonrec[i].Man ? _home.jsonrec[i].Man : 'No Info') + '</span>\n                            </li>\n                            <li>\n                                <strong>Model: </strong>\n                                <span class="my-badge">' + (_home.jsonrec[i].Mdl ? _home.jsonrec[i].Mdl : 'No Info') + '</span>\n                            </li>\n                            <li>\n                                <strong>Fly from: </strong>\n                                <span class="my-badge">' + (_home.jsonrec[i].From ? _home.jsonrec[i].From : 'No Info') + '</span>\n                            </li>\n                            <li>\n                                <strong>Fly to: </strong>\n                                <span class="my-badge">' + (_home.jsonrec[i].To ? _home.jsonrec[i].To : 'No Info') + '</span>\n                            </li>\n                        </ul>\n                </div>\n                <div class="col-md-2">\n                    <img src="https://logo.clearbit.com/' + urlLogo + '" class="logo-brand" alt="' + urlLogo + '">\n                </div>\n                <a href="#home" class="btn btn-light" id="goHome">Go Back!</a>\n            </div>';
            };

            var urlLogo = String(_home.jsonrec[i].Op).replace(" ", "").toLowerCase() + ".com";
            if (_home.jsonrec[i].Op == "Swiss International Air Lines") // exeption because of swiss air website
                urlLogo = "swiss.com";
            if (_home.jsonrec[i].Op == "Bulgaria Air") // exeption because of bulgaria air website
                urlLogo = "air.bg";
            if (_home.jsonrec[i].Op == "Saudi Arabian Airlines") // exeption because of swiss air website
                urlLogo = "saudia.com";

            setTimeout(renderAbout, 100);
        }
    };

    for (var i = 0; i < _home.jsonrec.length; i++) {
        _loop(i);
    }
};

exports.default = rowClicked;

},{"./home.js":5,"./route.js":10,"./router.js":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loadJSONP = require('./loadJSONP.js');

var _loadJSONP2 = _interopRequireDefault(_loadJSONP);

var _home = require('./home.js');

var _home2 = _interopRequireDefault(_home);

var _loader = require('./loader.js');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create URL from position
function createURL(latitude, longitude) {
    var position = {
        lat: latitude,
        long: longitude
    };

    // console.log(position);

    var url = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=' + position.lat + '&lng=' + position.long + '&fDstL=0&fDstU=100';

    console.log(url);

    function startNow() {
        (0, _loadJSONP2.default)(url, _home2.default); // call loadJSONP func
    }
    startNow();

    // let`s change data on every 6s to notice better changes
    setInterval(function () {
        startNow();
    }, 6000);

    (0, _loader2.default)();
}

exports.default = createURL;

},{"./home.js":5,"./loadJSONP.js":7,"./loader.js":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function displayError(message) {
    var errAlert = document.getElementById('error-alert');
    errAlert.innerHTML += message;
}

exports.default = displayError;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _showError = require('./showError.js');

var _showError2 = _interopRequireDefault(_showError);

var _displayError = require('./displayError.js');

var _displayError2 = _interopRequireDefault(_displayError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// seeks geolocation permission from user
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            callback.call(null, lat, lon);
        }, _showError2.default);
    } else {
        (0, _displayError2.default)("Your browser doenst support geolocation!");
    }
}

exports.default = getLocation;

},{"./displayError.js":3,"./showError.js":12}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonrec = undefined;

var _about = require("./about.js");

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stores json
var jsonrec = exports.jsonrec = null;

function renderDataToTable(data) {
    // console.log(data);
    exports.jsonrec = jsonrec = data;
    var table = document.getElementById("table-data");

    if (table) {
        // binding event to dom for spa
        // if jsonrec.acList isnt empty sort list in table from high to lower.
        if (jsonrec.acList.length != 0) {
            var sorted = jsonrec.acList.sort(function (a, b) {
                return b.Alt - a.Alt;
            });
            exports.jsonrec = jsonrec = sorted;
            // console.log(sorted);
            var num = 1;
            table.innerHTML = "";
            if (sorted.length > 9) {
                document.getElementById("content").style.overflowY = "scroll";
            } else {
                document.getElementById("content").style.overflowY = "hidden";
            }
            for (var i = 0; i < sorted.length; i++) {
                var flyDirection = null;
                var numm = String(sorted[i].Alt).charAt(0) + String(sorted[i].Alt).charAt(1);

                // console.log('this is numm ' + numm);

                //like this beacuse I read somewhere that planes that go west are on even 1000's feet altitudes and east on odd
                if (Number(numm) % 2 == 0) {
                    flyDirection = "<img src='si-glyph-airplane.svg' class='plane-icon left-direction'>";
                } else {
                    flyDirection = "<img src='si-glyph-airplane.svg' class='plane-icon right-direction'>";
                }
                var flNumber = "";

                //I am still unsure to use either Call or OpIcao to get code if necessary
                if (sorted[i].OpIcao == undefined) {
                    var j = 0;
                    while (isNaN(String(sorted[i].Call).charAt(j))) {
                        flNumber += String(sorted[i].Call).charAt(j);
                        // console.log(flNumber);
                        j++;
                    }
                } else {
                    flNumber = sorted[i].OpIcao;
                    // console.log(flNumber);
                }

                table.innerHTML += "<tr class='insert-data' id='" + flNumber + "'>" + "<td>" + num + "</td>" + "<td>" + flyDirection + "</i></td>" + "<td>" + sorted[i].Alt + " ft</td>" + "<td>" + flNumber + " " + sorted[i].Sqk + "</td>" + "</tr>";
                num++;
            }

            var rowSelect = document.getElementsByClassName("insert-data");
            // console.log(rowSelect);

            for (var _i = 0; _i < rowSelect.length; _i++) {
                rowSelect[_i].addEventListener('click', _about2.default, false);
            }
        }
    }
}

exports.default = renderDataToTable;

},{"./about.js":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getLocation = require('./getLocation.js');

var _getLocation2 = _interopRequireDefault(_getLocation);

var _createURL = require('./createURL.js');

var _createURL2 = _interopRequireDefault(_createURL);

var _router = require('./router.js');

var _router2 = _interopRequireDefault(_router);

var _route = require('./route.js');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
    var router = new _router2.default([new _route2.default('home', 'home.html', true)]);

    // set interval to refresh data on every minute
    (0, _getLocation2.default)(_createURL2.default);
}

exports.default = init;

},{"./createURL.js":2,"./getLocation.js":4,"./route.js":10,"./router.js":11}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// json requests
var loadJSONP = function () {
    var unique = 0;
    return function (url, callback, context) {
        // INIT
        var name = "_jsonp_" + unique++;
        if (url.match(/\?/)) url += "&callback=" + name;else url += "?callback=" + name;

        // Create script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Setup handler
        window[name] = function (data) {
            callback.call(context || window, data);
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window[name];
        };

        // Load JSON
        document.getElementsByTagName('head')[0].appendChild(script);
    };
}();

exports.default = loadJSONP;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var loader = function loader() {
    var table = document.getElementById('table-data');
    table.innerHTML = '<tr>\n                        <td colspan="4">\n                            <div class="loader"></div>\n                        </td>\n                    </tr>';
};

exports.default = loader;

},{}],9:[function(require,module,exports){
'use strict';

var _init = require('./init.js');

var _init2 = _interopRequireDefault(_init);

var _loader = require('./loader.js');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", _init2.default);

document.addEventListener('click', function (e) {
    if (e.target.id === 'goHome') {

        setTimeout(function () {
            (0, _loader2.default)();
        }, 100);
    }
});

},{"./init.js":6,"./loader.js":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function Route(name, htmlName, defaultRoute) {
    try {
        if (!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function constructor(name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
};

exports.default = Route;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function init() {
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function hasChanged(scope, r) {
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function goToRoute(htmlName) {
        (function (scope) {
            var url = 'views/' + htmlName;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};

exports.default = Router;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _displayError = require("./displayError.js");

var _displayError2 = _interopRequireDefault(_displayError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//handles geolocation errors
function showError(error) {
    var message = void 0;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Please enable geolocation in order to make app work!";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "There was an issue getting your location from your device.Please refresh page.";
            break;
        case error.TIMEOUT:
            message = "It took too long getting your position.";
            break;
        default:
            message = "An unknown error has occured.Please refresh the page.";
            break;
    }
    (0, _displayError2.default)(message);
}

exports.default = showError;

},{"./displayError.js":3}]},{},[9]);
