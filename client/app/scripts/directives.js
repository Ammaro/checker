/**
 * Created by Ammar on 2014-12-18.
 */


var app = angular.module('checkerApp');

var cellColors = {
    dark: 'rgba(21, 123, 124, 0.8)',
    light: 'rgba(255, 255, 255, 0.5)'
};
var piecesColors = {
    dark: '#CD5C5C',
    light: '#B8860B'
};

/**
 * Constructor for creating objects that represent bounds of a graphical entity.
 * @param x position x on the canvas
 * @param y position y on the canvas
 * @param width the width of the element
 * @param height the height of the lement
 * @constructor
 */
var Bounds = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * Construct for the Cell element. A cell an element of a board.
 * @param color the color of the cell.
 * @param bounds the bounds of the cell.
 * @constructor
 */
var Cell = function (color, bounds) {
    this.color = color;
    this.bounds = bounds;
};

/**
 * create a piece object. A piece is an element drawable on the board.
 * @param position
 * @param color
 * @param bounds
 * @constructor
 */
var Piece = function (position, color, bounds) {
    this.position = position;
    this.color = color;
    this.bounds = bounds;
};


var Player = function (color, pieces, num) {
    this.color = color;
    this.pieces = pieces;
    this.num = num;
    var that = this;

    this.move = function (src, dst) {
        var pic = _.find(that.pieces, function(piece) {
            src = src || {};
            if(src.x === piece.position.x && src.y === piece.position.y)
                return true;
            else
                return false;
        });
        if(pic) {
            dst = dst || pic.position;
            pic.position.x = dst.x;
            pic.position.y = dst.y;
        }
    }
};


app.directive('checkerGame', function ($parse) {

    return {

        restrict: 'EA',
        scope: {
            width: '=',
            height: '=',
            colors: '=',
            showText: '='
        },
        link: function (scope, element, attrs) {

            if(attrs.colors) {
                var colors = attrs.colors.split(',');
                var objects = [cellColors.dark, cellColors.light, piecesColors.dark, piecesColors.light];
                for(var i=0;i<objects.length;i++) {
                    if(colors[i])
                        objects[i] = colors[i];
                }
            }
            var canvasHelper = document.createElement('canvas');
            canvasHelper.width = attrs.width;
            canvasHelper.height= attrs.height;
            var context = canvasHelper.getContext('2d');
            var onContext = element.context.getContext('2d');
            var padding = 0;
            var pieceTouched = null;
            var oldBounds = null;
            var illegalmove = false;
            var eventx = false;
            if(scope.showText) {
                padding=50;
            }
            var board = {
                bounds: {
                    height: attrs.height - padding,
                    width: attrs.width - padding,
                    x: padding/2,
                    y: padding/2
                },
                xTilesNum: 10,
                yTilesNum: 10,
                cells: []
            };
            var GameStatus = {
                RESTARTED: 'restart',
                UNINITIALIZED: 'uninitialized',
                FINISHED: 'finished'
            };
            var game = {
                board: board,
                darkPlayer:{},
                lightPlayer:{},
                gameStatus: GameStatus.UNINITIALIZED,
                resetGame: function() {
                    this.gameStatus = GameStatus.RESTARTED;
                    var that = this;
                    var resetPlayers = function () {
                        that.darkPlayer = new Player(piecesColors.dark, [], 10);
                        that.lightPlayer = new Player(piecesColors.light, [], 10);
                        for (var i = 0; i < board.yTilesNum; i++) {
                            for (var j = 0; j < board.xTilesNum; j++) {
                                var position = {x: i, y: j};
                                var cell = board.cells[i][j];
                                var pieceColor;
                                if (cell.color == cellColors.dark && i < 4) {
                                    pieceColor = that.darkPlayer.color;
                                    that.darkPlayer.pieces.push(new Piece(position, pieceColor, cell.bounds));
                                } else if (cell.color == cellColors.dark && i > 5) {
                                    pieceColor = that.lightPlayer.color;
                                    that.lightPlayer.pieces.push(new Piece(position, pieceColor, cell.bounds));
                                }
                            }
                        }
                    };
                    var resetBoard = function () {
                        var color = cellColors.light;
                        var board = that.board;
                        var cellW = board.bounds.width / board.xTilesNum,
                            cellH = board.bounds.height / board.yTilesNum;
                        board.cells = [];
                        for (var i = 0; i < board.yTilesNum; i++) {
                            board.cells.push([]);
                            for (var j = 0; j < board.xTilesNum; j++) {
                                var cell = new Cell(color, new Bounds(board.bounds.x + j * cellW, board.bounds.y + i * cellH, cellW, cellH));
                                board.cells[i].push(cell);
                                if (j != board.xTilesNum - 1) {
                                    if (color == cellColors.light)
                                        color = cellColors.dark;
                                    else
                                        color = cellColors.light;
                                }
                            }
                        }
                    };
                    eventx = true;
                    resetBoard();
                    resetPlayers();
                }

            };

            var drawer = {
                drawText: function (text, posx, posy, options) {
                    options = options || {};
                    context.shadowBlur = 0;
                    context.shadowColor = "white";
                    context.fillStyle = options.color || 'black';
                    context.font = options.font || "normal 13px Monospace";
                    context.fillText(text, posx, posy);
                },
                drawPiece: function (piece) {
                    context.fillStyle = piece.color;
                    if(piece == pieceTouched) {
                       context.shadowBlur = 10;
                        context.shadowColor = "white";
                    } else {
                        context.shadowBlur = 0;
                        context.shadowColor = "white";
                    }
                    var cellBounds = piece.bounds;
                    context.beginPath();
                    context.arc(cellBounds.x+cellBounds.width*0.5, cellBounds.y+cellBounds.height*0.5,
                                cellBounds.width/4, 0, 2 * Math.PI);
                    context.fill();
                },
                drawCell: function (cell) {
                    context.shadowBlur=0;
                    context.shadowColor="white";
                    context.fillStyle = cell.color;
                    context.fillRect(cell.bounds.x, cell.bounds.y, cell.bounds.width, cell.bounds.height);
                }
            };


            var drawGame = function() {
                if(eventx) {
                    context.drawImage(onContext.canvas, 0, 0);
                    context.clearRect(0, 0, game.board.width, game.board.height);
                    var boardBounds = game.board.bounds;
                    var cellBounds = game.board.cells[0][0].bounds;

                    function drawText(index) {
                        var ks = String.fromCharCode('a'.charCodeAt(0) + index);
                        drawer.drawText(index + '', boardBounds.x - 10, boardBounds.y + (index + 0.5) * cellBounds.height);
                        drawer.drawText(index + '', boardBounds.width + boardBounds.x + 10, boardBounds.y + (index + 0.5) * cellBounds.height);
                        drawer.drawText(ks, boardBounds.x + (index + 0.5) * cellBounds.width, boardBounds.y - 10);
                        drawer.drawText(ks, boardBounds.x + (index + 0.5) * cellBounds.width, boardBounds.height + boardBounds.y + 10);
                    }

                    _.forEach(game.board.cells, function (cells, index) {
                        if (scope.showText)
                            drawText(index);
                        _.forEach(cells, drawer.drawCell);
                    });
                    _.forEach(game.lightPlayer.pieces, drawer.drawPiece);
                    _.forEach(game.darkPlayer.pieces, drawer.drawPiece);
                    onContext.drawImage(context.canvas, 0, 0);
                    event = false;
                }
                window.setTimeout(drawGame, 500);
            };





            var ishit = function(position, x, y) {
                var cell = game.board.cells[position.x][position.y].bounds;
                if(cell.x < x && cell.y < y && cell.x+cell.width>x && cell.y+cell.height>y)
                    return true;
                return false;
            };



            element.bind('click', function(event) {
                 var elemLeft = 369, //element['0'].offsetLeft,
                    elemTop = 114;//element['0'].offsetTop;
                var x = event.pageX - elemLeft,
                        y = event.pageY - elemTop;
                var players = [game.darkPlayer, game.lightPlayer];
                _.forEach(players, function(player) {
                 _.forEach(player.pieces, function(piece){
                        if(ishit(piece.position, x,y)) {
                            pieceTouched = piece;
                            oldBounds = [piece.bounds.x, piece.bounds.y];
                            eventx = true;
                            return;
                        }})});
            });
            //element.bind('mousedown', function(event) {
            //    var elemLeft = 369, //element['0'].offsetLeft,
            //        elemTop = 114;//element['0'].offsetTop;
            //    var x = event.pageX - elemLeft,
            //            y = event.pageY - elemTop;
            //    console.log([x,y]);
            //    var players = [game.darkPlayer, game.lightPlayer];
            //    _.forEach(players, function(player) {
            //     _.forEach(player.pieces, function(piece){
            //            if(ishit(piece.position, x,y)) {
            //                pieceTouched = piece;
            //                oldBounds = [piece.bounds.x, piece.bounds.y];
            //                return;
            //            }})});
            //});
            //
            //element.bind('mousemove', function(event) {
            //    var elemLeft = 369, //element['0'].offsetLeft,
            //        elemTop = 114;//element['0'].offsetTop;
            //    var x = event.pageX - elemLeft,
            //            y = event.pageY - elemTop;
            //   if(pieceTouched) {
            //        pieceTouched.bounds.x = x;
            //        pieceTouched.bounds.y = y;
            //        drawGame();
            //   }
            //});
            //
            //element.bind('mouseup', function(event) {
            //   if(pieceTouched) {
            //       if(illegalmove) {
            //            pieceTouched.bounds.x = oldBounds[0];
            //            pieceTouched.bounds.y = oldBounds[1];
            //       }
            //       drawGame();
            //       pieceTouched = null;
            //   }
            //});


            if(game.gameStatus===GameStatus.UNINITIALIZED)
                game.resetGame();
            game.darkPlayer.move({x:3, y:0}, {x:4, y:1});
            drawGame();

        }
    }
});