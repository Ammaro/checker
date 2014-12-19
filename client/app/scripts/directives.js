/**
 * Created by Ammar on 2014-12-18.
 */


var app = angular.module('checkerApp');

app.directive('checkerGame', function(){

    return {

       restrict: 'EA',
       scope:{
           width:'=',
           height: '='
       },
       link: function(scope, element, attrs) {
           var width = attrs.width-50,
               height = attrs.height-50,
               paddingL = 25,
               paddingT = 25;
           var whitePlayer = {
                    color: 'white',
                    pieces: [],
                    num: 10
           }, blackPlayer = {
                    color: 'black',
                    num: 10,
                    pieces: []
           };
           var initialized = false;
           var cellWidth = width/10;
           var cellHeight= height/10;
           var context = element.context.getContext('2d');
           var cellColors = {dark: 'black', light: '#DEB887'};
           var piecesColor = {dark : '#CD5C5C', light: '#B8860B'}
           var board = [];
           var color = cellColors.light;
           var tilesX = 10, tilesY = 10;
           var textFont = 'bold 16px Arial', textStyle = 'black';
           var drawText = function(text, posx, posy) {
               context.fillStyle = 'red'
               context.font = "normal 13px Monospace";
               context.fillText(text, posx, posy);
           }
           var init = function() {
               whitePlayer.pieces = [];
               blackPlayer.pieces = [];
               for(var i=0;i<tilesX;i++) {
                   board.push([])
                   drawText(i+'', 5, i*cellHeight+paddingT+cellHeight/2);
                   for(var j=0;j<tilesY;j++) {
                        if(i == 0) {
                            drawText(String.fromCharCode(('a'.charCodeAt(0)+j))+'', j*cellWidth+paddingL+cellWidth/2, paddingT-10);
                        }

                        board[i][j] = {color: context.fillStyle, piece: null};
                        if(i<4 && color == cellColors.dark) {
                            board[i][j].piece = piecesColor.dark;
                            whitePlayer.pieces.push({x:i, y:j});
                        } else if(i>5 && color == cellColors.dark) {
                            board[i][j].piece = piecesColor.light;
                            blackPlayer.pieces.push({x:i, y:j});
                        }
                        context.shadowBlur=1;
                        context.shadowColor='black';
                        context.fillStyle = color;
                        context.fillRect(paddingL+ j*cellWidth,paddingT+ i*cellHeight, cellWidth,cellHeight);

                        if(board[i][j].piece) {
                            context.fillStyle = board[i][j].piece;
                            context.beginPath();
                            context.arc(paddingL+ j * cellWidth + cellWidth / 2,paddingT+ i * cellHeight + cellHeight / 2, cellWidth / 4, 0, 2 * Math.PI);
                            context.fill()
                        }
                        if(color == cellColors.light && j != tilesY-1)
                            color = cellColors.dark;
                        else if(color == cellColors.dark && j != tilesY-1)
                            color = cellColors.light;

                       if(i == 0) {
                            drawText(String.fromCharCode(('a'.charCodeAt(0)+j))+'', j*cellWidth+paddingL+cellWidth/2, attrs.height-5);
                        }

                    }
                   drawText(i+'', attrs.width-13, i*cellHeight+paddingT+cellHeight/2);
                }
               initialized = true;
           };



           if(!initialized)
            init();
           element.on('click', function(x, y){console.log('clicked me ' + x + ' ' + y)});

           console.log(element);
           console.log(attrs);
           console.log(whitePlayer);
           console.log(blackPlayer);


       }
   }
});