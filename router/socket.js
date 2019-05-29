var socketio = require('socket.io');
var pool = require('./pool');

/*

disconnect : 채팅방에서 퇴장한다 => socket의 접속자 리스트에서 삭제
exit : 채팅방에서 퇴장한다 => socket의 접속자 리스트, DB의 참가자 목록에서 삭제
join {roomID: Number, nickname: String} : 채팅방에 입장한다. DB에 추가하지 않는다. socket의 접속자 리스트에만 추가한다.
new_message {chatroom: Integer, nickname: String, msg: String} : 클라이언트가 새로운 메세지를 보낸다.
*/


var clients = {}; // chatroom id를 key로 가지고, value는 {sockID: SocketID, nickname: String} list

function init(server)
{
	var io = socketio(server);

	io.on('connection', function(socket)
	{
		console.log("[chat] Socket Connected id = " + socket.id);

		socket.on('join', async function(params)
		{
			let i;
			let roomID = params.roomID;
			let name = params.name;

			if(!(roomID in clients)) // 없으면 새로운 array 생성
			{
				clients[roomID] = [];
			}

			// 클라이언트는 join type 받으면, 자기가 가지고 있는 접속자 목록과 비교해 없으면 리스트에 새로 추가한다.
			/*_.each(clients[roomID], (member) => {
				io.to(member.sockID).emit('chat_member_change', {type: 'join', chatroom: roomID, nickname: nickname})
			});*/
			
			// clients[roomID]에 접속한 client 추가
			clients[roomID].push({sockID: socket.id, name: name});

			console.log(clients);
		});

		socket.on('exit', async function(params) // 채팅방 퇴장
		{
			let roomID = params.roomID;
			let name = params.name;

			clients[roomID] = _.without(clients[roomID], _.findWhere(clients[roomID], {sockID: socket.id}));
			console.log(clients[roomID]);

			// 클라이언트는 exit type 받으면, 자기가 가지고 있는 접속자 목록과 비교해 있으면 리스트에서 지운다.
			_.each(clients[roomID], (member) => {
				io.to(member.sockID).emit('someone_exit', {roomID: roomID, name: name});
			});
		});

		socket.on('disconnect', function() // 퇴장하면서 연결된 채팅방 모두 접속 끊는다.
		{
			console.log("[chat] Socket Disconnected id = " + socket.id);

			_.each(clients, function(room, roomID) // val, key
			{
				clients[roomID] = _.without(room, _.findWhere(room, {sockID: socket.id}));
			});

			console.log(clients);
		});

		socket.on('new_message', async function(params)
		{
			let name = params.username;
			let roomID = params.roomID;
			let message = params.message;
			let timestamp = new Date(Date.now());

			console.log("[chat] [roomID = %s] %s : %s", roomID, nickname, message);

			_.each(clients[roomID], (member) => {
				// 특정 소켓에게 보낼 때에는 io.to(sockID).emit 사용한다.
				io.to(member.sockID).emit('new_message', {name: name, text: message, timestamp: timestamp});
			});
		});

		socket.on('change_order', function(params)
		{
			let roomID = params.roomID;
			_.each(clients[roomID], (member) => {
				// 특정 소켓에게 보낼 때에는 io.to(sockID).emit 사용한다.
				io.to(member.sockID).emit('change_order', {roomID: roomID});
			});
		});
	});

	return io;
}

module.exports = init;