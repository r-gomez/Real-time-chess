var socket = io();

var initGame = function() {
	var cfg = {
		draggable: true,
		position: 'start',
		onDrop: handleMove,
	};
	
	board = new ChessBoard('gameBoard', cfg);
	game = new Chess();
};

var handleMove = function(source, target) {
	var move = game.move({from: source, to: target});
	
	if(move === null){
		console.log('Invalid move! Snapping back.');
		return 'snapback';
	}
	else{
		console.log('Valid move!');
		socket.emit('move', move); //hey someone made a move 'move' and move is just what actual move it made
	}
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