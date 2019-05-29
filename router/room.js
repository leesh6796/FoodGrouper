var pool = require('./pool');
var insertGenerator = require('./query').insertGenerator;
var dorm = {
		1 : 'Sarang Hall',
		2 : 'Somang Hall',
		3 : 'Jilli Hall',
		4 : 'Silloe Hall',
		5 : 'Jihey Hall',
		6 : 'Areum Hall',
		7 : 'Sejong Hall',
		8 : 'Galilei Hall',
		9 : 'Nanum Hall',
		10 : 'Heemang / Dasom Hall',
		11 : 'Mir / Narae Hall',
		12 : 'Nadl / Yeoul Hall'}

module.exports = {
	dorm : dorm,

	postCreateRoom : async function(req, res)
	{
		let hostID = req.body.hostID ? global.dev : req.session.id;
		let roomName = req.body.roomName;
		let restaurant = req.body.restaurant;
		let dorm = req.body.dorm;

		pool.getConnection(function(err, conn) {
			if(err) throw err;

			data = {'host':{'type':'int', 'val':hostID},
					'name':{'type':'str', 'val':roomName},
					'orderRestaurant':{'type':'int', 'val':restaurant},
					'dorm':{'type':'int', 'val':dorm}};
		
			console.log(data);
			query = insertGenerator('Room', data);
			console.log(query);

			conn.query(query, function(error, results, fields) {
				query = "select * from Room where host=" + hostID + ";";

				conn.query(query, function(error, results, fields) {
					if(results.length > 0)
					{
						let room = results[0];
						let roomID = room.roomID;

						data = {'userID':{'type':'int', 'val':hostID},
								'roomID':{'type':'int', 'val':roomID}};

						query = insertGenerator('Participants', data);
						conn.query(query, function(error, results, fields) {
							conn.release();
							res.redirect('/room/' + roomID);
						});
					}
					else
					{
						conn.release();
					}
				});
			});
		});
	},

	getDeleteRoom : async function(req, res) {
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			if(err) throw err;

			query = "delete from Participants where roomID=" + roomID + ";";
			conn.query(query, function(error, results, fields) {
				query = "delete from Order where roomID=" + roomID + ";";
				conn.query(query, function(error, results, fields) {
					query = "delete from Room where roomID=" + roomID + ";";
					conn.query(query, function(error, results, fields) {
						conn.release();
						res.redirect('/');
					});
				});
			});
		});
	},

	getJoinRoom : async function(req, res) {
		let userID = req.headers.userid ? global.dev : req.session.id;
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			data = {'userID':{'type':'int', 'val':userID},
					'roomID':{'type':'int', 'val':roomID}};

			query = insertGenerator('Participants', data);
			conn.query(query, function(error, results, fields) {
				conn.release();
				res.redirect('/room/' + roomID);
			});
		});
	},

	getRoomList : function(req, res) {
		pool.getConnection(function(err, conn) {
			query = 'SELECT r.*, u.name as hostName ' +
					'FROM Room as r ' +
					'JOIN User AS u ' +
					'ON r.orderComplete=0 and r.host = u.id;'
			conn.query(query, function(error, results, fields) {
				console.log(results);
				if(results !== undefined && results.length > 0)
				{
					conn.release();
					res.send(results);
				}
				else
				{
					conn.release();
					res.send("-1");
				}
			});
		});
	},

	getMyRoomList : function(req, res) {
		let userID = req.headers.userid ? global.dev : req.session.id;
		pool.getConnection(function(err, conn) {
			query = 'SELECT p.*, r.* ' +
					'FROM Participants as p ' +
					'JOIN Room AS r ' +
					'ON p.userID=' + userID + ' and r.roomID = p.roomID;'
			console.log(query);
			conn.query(query, function(error, results, fields) {
				console.log(results);
				if(results !== undefined && results.length > 0)
				{
					conn.release();
					res.send(results);
				}
				else
				{
					conn.release();
					res.send("-1");
				}
			});
		});
	},

	getDormString : function(req, res) {
		res.send(dorm);
	},
};