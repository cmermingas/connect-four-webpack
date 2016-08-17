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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ConnectFourAiPlayer; });var ConnectFourAiPlayer = (function () {
    function ConnectFourAiPlayer() {
    }
    // This is the function to be called to get the move for the current player
    ConnectFourAiPlayer.prototype.play = function (gameState) {
        var MAX_DEPTH = 5;
        var bestMove = this._minimaxMove(gameState, MAX_DEPTH, gameState.currentPlayer);
        return bestMove.move;
    };
    // Simple implementation of the minimax algorithm to find the best move
    ConnectFourAiPlayer.prototype._minimaxMove = function (game, depthLevel, player) {
        // console.log('*** minimax depth *** ', depthLevel);
        var availableMoves = game.getAvailableMoves();
        // console.log('available Moves: ', availableMoves);
        if (game.gameOver || depthLevel === 0 || availableMoves.length === 0) {
            var score = 0;
            if (game.winner === player) {
                score = 1;
            }
            else if (game.winner) {
                score = -1;
            }
            // We give a heavier score to "sooner" results
            // (e.g. winning in this move is better than moving in the next one)
            score = score * (-depthLevel + 1);
            return { move: null, score: score };
        }
        var bestScore;
        var bestMove;
        var fn = game.currentPlayer === player ? Math.max : Math.min;
        for (var _i = 0, availableMoves_1 = availableMoves; _i < availableMoves_1.length; _i++) {
            var move = availableMoves_1[_i];
            var gameCopy = game.copy();
            gameCopy.playAtColumn(move);
            var score = this._minimaxMove(gameCopy, depthLevel - 1, player).score;
            if (bestScore === undefined || bestScore !== fn(bestScore, score) || (bestScore === score && Math.random() >= .8)) {
                bestScore = score;
                bestMove = move;
            }
        }
        // console.log('Non-terminal state with score: ', bestScore);
        return { move: bestMove, score: bestScore };
    };
    return ConnectFourAiPlayer;
}());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export CellContent */
/* harmony export */ __webpack_require__.d(exports, "a", function() { return ConnectFourGameModel; });var WINNING_LENGTH = 4;
var CellContent;
(function (CellContent) {
    CellContent[CellContent["Empty"] = 0] = "Empty";
    CellContent[CellContent["Winning"] = -1] = "Winning";
})(CellContent || (CellContent = {}));
var ConnectFourGameModel = (function () {
    function ConnectFourGameModel(columnCount, cellsPerColumn) {
        this.columnCount = columnCount;
        this.cellsPerColumn = cellsPerColumn;
        this.reset();
    }
    ConnectFourGameModel.fromJSON = function (jsonString) {
        var jsonData = JSON.parse(jsonString);
        console.log('*** from JSON (compare the "columns" array between jsonString and jsonData below) ***');
        console.log('jsonString: ', jsonString);
        console.log('jsonData: ', jsonData);
        var result = new ConnectFourGameModel(jsonData.columnCount, jsonData.cellsPerColumn);
        result.currentPlayer = jsonData.currentPlayer;
        result.gameOver = jsonData.gameOver;
        result.winner = jsonData.winner;
        result.moveCount = jsonData.moveCount;
        result.lastMove = { column: jsonData.lastMove.column, cell: jsonData.lastMove.cell };
        result.columns = jsonData.columns.slice();
        result.columnIndex = jsonData.columnIndex.slice();
        return result;
    };
    ConnectFourGameModel.prototype.reset = function () {
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = 0;
        this.moveCount = 0;
        this.lastMove = { column: -1, cell: -1 };
        var cellPrototype = [];
        for (var i = 0; i < this.cellsPerColumn; i++) {
            cellPrototype.push(CellContent.Empty);
        }
        var newColumns = [];
        this.columnIndex = [];
        for (var col = 0; col < this.columnCount; col++) {
            newColumns.push(cellPrototype.slice());
            this.columnIndex.push(this.cellsPerColumn - 1);
        }
        this.columns = newColumns;
    };
    ConnectFourGameModel.prototype.copy = function () {
        var result = new ConnectFourGameModel(this.columnCount, this.cellsPerColumn);
        result.currentPlayer = this.currentPlayer;
        result.gameOver = this.gameOver;
        result.winner = this.winner;
        result.moveCount = this.moveCount;
        // Make copies of objects and arrays:
        result.lastMove = { column: this.lastMove.column, cell: this.lastMove.cell };
        result.columns = this.columns.slice();
        result.columnIndex = this.columnIndex.slice();
        return result;
    };
    ConnectFourGameModel.prototype.playAtColumn = function (col) {
        var result = false;
        var cell = this.columnIndex[col];
        if (cell >= 0 && !this.gameOver) {
            this.columns[col][cell] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer % 2 + 1;
            this.moveCount++;
            this.lastMove = { column: col, cell: cell };
            this.columnIndex[col]--;
            this._checkWinners();
            result = true;
        }
        return result;
    };
    ConnectFourGameModel.prototype.getAvailableMoves = function () {
        var result = [];
        if (!this.gameOver) {
            this.columnIndex.forEach(function (item, i) {
                if (item >= 0) {
                    result.push(i);
                }
            });
        }
        return result;
    };
    ConnectFourGameModel.prototype.getCell = function (gameCell) {
        return this.columns[gameCell.column] && this.columns[gameCell.column][gameCell.cell];
    };
    ConnectFourGameModel.prototype._checkWinnersAt = function (gameCell, player, slope) {
        // Slope === null is used as a special value for checking columns
        var VALID_SLOPES = [1, -1, 0, null];
        if (VALID_SLOPES.indexOf(slope) === -1) {
            return false;
        }
        var winningIdx = [];
        for (var i = -WINNING_LENGTH + 1; i <= WINNING_LENGTH - 1; i++) {
            var checkingCellCoordinates = {
                column: gameCell.column + (slope === null ? 0 : i),
                cell: gameCell.cell + (slope === null ? 1 : slope) * i
            };
            var checkingCell = this.getCell(checkingCellCoordinates);
            if (checkingCell === player || checkingCell === CellContent.Winning) {
                winningIdx.push(checkingCellCoordinates);
            }
            else {
                if (winningIdx.length < WINNING_LENGTH) {
                    winningIdx = [];
                }
                if (i === 1) {
                    break;
                }
            }
        }
        if (winningIdx.length >= WINNING_LENGTH) {
            for (var _i = 0, winningIdx_1 = winningIdx; _i < winningIdx_1.length; _i++) {
                var item = winningIdx_1[_i];
                this.columns[item.column][item.cell] = CellContent.Winning;
            }
        }
        return winningIdx.length >= WINNING_LENGTH;
    };
    ConnectFourGameModel.prototype._checkSeToNwDiagonal = function (gameCell, player) {
        return this._checkWinnersAt(gameCell, player, 1);
    };
    ConnectFourGameModel.prototype._checkSwToNeDiagonal = function (gameCell, player) {
        return this._checkWinnersAt(gameCell, player, -1);
    };
    ConnectFourGameModel.prototype._checkColumnAt = function (gameCell, player) {
        return this._checkWinnersAt(gameCell, player, null);
    };
    ConnectFourGameModel.prototype._checkRowAt = function (gameCell, player) {
        return this._checkWinnersAt(gameCell, player, 0);
    };
    ConnectFourGameModel.prototype._checkWinners = function () {
        var player = this.getCell(this.lastMove);
        var hasWinner = false;
        if (this.moveCount >= WINNING_LENGTH * 2 - 1 && player) {
            hasWinner = this._checkSeToNwDiagonal(this.lastMove, player);
            hasWinner = this._checkSwToNeDiagonal(this.lastMove, player) || hasWinner;
            hasWinner = this._checkRowAt(this.lastMove, player) || hasWinner;
            hasWinner = this._checkColumnAt(this.lastMove, player) || hasWinner;
            if (hasWinner) {
                this.winner = player;
                this.gameOver = true;
                this.currentPlayer = 0;
            }
        }
    };
    // Debugging sanity
    ConnectFourGameModel.prototype.toString = function () {
        var result = '';
        for (var cell = 0; cell < this.cellsPerColumn; cell++) {
            result += (cell > 0 ? '\n' : '');
            for (var col = 0; col < this.columnCount; col++) {
                result += (col > 0 ? ' ' : '') + this.columns[col][cell];
            }
        }
        return result;
    };
    return ConnectFourGameModel;
}());


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connect_four_ai_player__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_connect_four_game_model__ = __webpack_require__(1);

/* harmony export */ __webpack_require__.d(exports, "ConnectFourAiPlayerWebWorker", function() { return ConnectFourAiPlayerWebWorker; });

// This class is to be used by the client side (to interface with the web worker)
var ConnectFourAiPlayerWebWorker = (function () {
    function ConnectFourAiPlayerWebWorker(game, worker, performMove) {
        var _this = this;
        this.game = game;
        this.worker = worker;
        this.performMove = performMove;
        this.terminated = false;
        worker.onmessage = function (event) { return _this.turnTaken(event); };
    }
    ConnectFourAiPlayerWebWorker.prototype.takeTurn = function () {
        this.worker.postMessage(JSON.stringify(this.game));
    };
    ConnectFourAiPlayerWebWorker.prototype.turnTaken = function (event) {
        if (!this.terminated) {
            this.performMove(event.data, this);
        }
    };
    ConnectFourAiPlayerWebWorker.prototype.terminate = function () {
        this.worker.terminate();
        this.terminated = true;
    };
    return ConnectFourAiPlayerWebWorker;
}());
// This code runs on the web worker side:
var _player = new __WEBPACK_IMPORTED_MODULE_0__connect_four_ai_player__["a" /* ConnectFourAiPlayer */]();
onmessage = function (event) {
    var game = __WEBPACK_IMPORTED_MODULE_1__model_connect_four_game_model__["a" /* ConnectFourGameModel */].fromJSON(event.data);
    var result = _player.play(game);
    postMessage(result, undefined);
};


/***/ }
/******/ ]);
//# sourceMappingURL=main.map