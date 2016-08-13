/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ConnectFourAiPlayer; });var ConnectFourAiPlayer = (function () {
    function ConnectFourAiPlayer() {
    }
    ConnectFourAiPlayer.prototype.play = function (gameState) {
        return Math.floor(Math.random() * 15);
    };
    return ConnectFourAiPlayer;
}());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connect_four_ai_player__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "ConnectFourAiPlayerWebWorker", function() { return ConnectFourAiPlayerWebWorker; });
var ConnectFourAiPlayerWebWorker = (function () {
    function ConnectFourAiPlayerWebWorker(myNumber, worker, performMove) {
        var _this = this;
        this.myNumber = myNumber;
        this.worker = worker;
        this.performMove = performMove;
        worker.onmessage = function (event) { return _this.turnTaken(event); };
    }
    ConnectFourAiPlayerWebWorker.prototype.takeTurn = function () {
        this.worker.postMessage('TAKE_TURN');
    };
    ConnectFourAiPlayerWebWorker.prototype.turnTaken = function (event) {
        this.performMove(this, event.data);
    };
    ConnectFourAiPlayerWebWorker.prototype.terminate = function () {
        // Stop the AI if allowed to think while it's the other player's turn
        this.worker.terminate();
    };
    return ConnectFourAiPlayerWebWorker;
}());
var _player = new __WEBPACK_IMPORTED_MODULE_0__connect_four_ai_player__["a" /* ConnectFourAiPlayer */]();
onmessage = function (event) {
    var result = _player.play(null);
    postMessage(result, undefined);
};


/***/ }
/******/ ]);
//# sourceMappingURL=main.map