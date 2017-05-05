var socket = io();

var initGame = function() {
	var cfg = {
		draggable: true,
		position: 'start',
		onDrop: handleMove,
		onDragStart: otherSide
	};

	
	board = new ChessBoard('gameBoard', cfg);
	game = new Chess();
};


//makes sure that you cant mess with the other side
var otherSide = function(source, piece, position, orientation){ 
	if(game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/)!== -1){
	return false;
	}
};
/*
turn allows you to see whose turn it is after you make a move
b  default.js:28:2
Valid move!  default.js:34:3
w  default.js:28:2
Valid move!
*/
var simpleComp = function() {
	var possibleMoves = game.moves();
	if(possibleMoves.length === 0){
		console.log('Game is over');
		return;
	}
	else{
		var randIndex = Math.floor(Math.random() * possibleMoves.length);
		game.move(possibleMoves[randIndex]);
		board.position(game.fen());
		window.setTimeout(simpleComp, 1000);
	}
	
};



var handleMove = function(source, target) {
	console.log(game.turn());
	var move = game.move({from: source, to: target});
	/*
	if(move === null){
		console.log('Invalid move! Snapping back.');
		return 'snapback';
	}
	else{
		console.log('Valid move!');
		socket.emit('move', move); //hey someone made a move 'move' and move is just what actual move it made
	}
	*/
	window.setTimeout(simpleComp, 1000);
}
//player 2 receives the message so the game moves according to that msg
socket.on('move', function(msg) {
	game.move(msg);
	board.position(game.fen());
});

initGame();

//they emit a message to the server
//broadcast sends out that message back to both players
//we use web sockets because its really fast and we can emmmit quickly