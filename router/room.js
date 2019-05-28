var pool = require('./pool');
var insertGenerator = require('./query').insertGenerator;

module.exports = {
	dorm : {
		'Sarang Hall' : 1,
		'Somang Hall' : 2,
		'Jilli Hall' : 3,
		'Silloe Hall' : 4,
		'Jihey Hall' : 5,
		'Areum Hall' : 6,
		'Sejong Hall' : 7,
		'Galilei Hall' : 8,
		'Nanum Hall' : 9,
		'Heemang / Dasom Hall' : 10,
		'Mir / Narae Hall' : 11,
		'Nadl / Yeoul Hall' : 12
	},

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
		let userID = req.headers.userID ? global.dev : req.session.id;
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
};