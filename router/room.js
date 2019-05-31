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
		let hostID = req.session._id;
		let roomName = req.body.roomName;
		let restaurant = Number(req.body.restaurant);
		let dorm = Number(req.body.dorm);

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
						let room = results[results.length-1];
						let roomID = room.roomID;

						data = {'userID':{'type':'int', 'val':hostID},
								'roomID':{'type':'int', 'val':roomID}};

						query = insertGenerator('Participants', data);
						conn.query(query, function(error, results, fields) {
							//global.lastUpdated[roomID] = {"chat":0, "room":0};
							//global.lastUpdated[roomID]["room"] = Date.now();
							conn.release();
							res.send('/room/view/' + roomID);
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
				if(error) console.log(error);
				query = "delete from Orders where roomID=" + roomID + ";";
				conn.query(query, function(error, results, fields) {
					if(error) console.log(error);
					query = "delete from Room where roomID=" + roomID + ";";
					conn.query(query, function(error, results, fields) {
						if(error) console.log(error);
						conn.release();
						res.redirect('/');
					});
				});
			});
		});
	},

	getJoinRoom : async function(req, res) {
		let userID = req.session._id;
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = "select * from Participants where userID=" + userID + " and roomID=" + roomID + ";";

			conn.query(query, function(error, results, fields) {
				if(results !== undefined && results.length > 0)
				{
					conn.release();
				}
				else
				{
					data = {'userID':{'type':'int', 'val':userID},
							'roomID':{'type':'int', 'val':roomID}};

					query = insertGenerator('Participants', data);
					conn.query(query, function(error, results, fields) {
						//global.lastUpdated[roomID]["room"] = Date.now();
						conn.release();
					});
				}
			});
		});
	},

	getExitRoom : async function(req, res) {
		let userID = req.session._id;
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = "delete from Orders where userID=" + userID + " and roomID=" + roomID + ";";
			conn.query(query, function(error, results, fields) {
				query = "delete from Participants where userID=" + userID + " and roomID=" + roomID + ";";
				conn.query(query, function(error, results, fields) {
					//global.lastUpdated[roomID]["room"] = Date.now();
					conn.release();
					res.redirect('/');
				});
			});
		});
	},

	getInfo : function(req, res) {
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = 'SELECT r.*, u.name as hostName, rest.name as restaurantName, rest.minPrice, rest.phoneNumber ' +
					'FROM Room as r ' +
					'JOIN User AS u ' +
					'ON r.roomID=' + roomID + ' and r.host = u.id ' +
					'JOIN Restaurant AS rest ' +
					'ON r.orderRestaurant=rest.id;';
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

	getRoomParticipants : function(req, res) {
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = 'SELECT p.*, u.name as userName ' +
					'FROM Participants as p ' +
					'JOIN User AS u ' +
					'ON p.roomID=' + roomID + ' and p.userID = u.id;'

			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error) res.send("fail");
				else res.send(results);
			});
		});
	},

	getRoomList : function(req, res) {
		pool.getConnection(function(err, conn) {
			query = 'SELECT r.*, u.name as hostName, rest.name as restaurantName, rest.minPrice ' +
					'FROM Room as r ' +
					'JOIN User AS u ' +
					'ON r.host = u.id ' +
					'JOIN Restaurant AS rest ' +
					'ON r.orderRestaurant=rest.id;';
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

	getMyRoomList : function(req, res) {
		let userID = req.session._id;
		pool.getConnection(function(err, conn) {
			query = 'SELECT p.*, r.* ' +
					'FROM Participants as p ' +
					'JOIN Room AS r ' +
					'ON p.userID=' + userID + ' and r.roomID = p.roomID;';
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

	getLastUpdate : function(req, res) {
		res.send(global.lastUpdated[req.params.roomID]["room"].toString());
	},

	getCompleteOrder : function(req, res) {
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = "update Room set orderComplete=1 where roomID=" + roomID + ";";
			conn.query(query, function(error, results, fields) {
				query = 'SELECT o.dishID, o.amount, d.price ' +
						'FROM Orders as o ' +
						'JOIN Dish AS d ' +
						'ON o.roomID=' + roomID + ' and o.dishID = d.id;';
				conn.query(query, function(error, results, fields) {
					totalPrice = 0;
					for(let i=0; i<results.length; i++)
					{
						totalPrice += results[i].amount * results[i].price;
					}
					query = "update Room set totalPrice=" + totalPrice + " where roomID=" + roomID + ";";
					conn.query(query, function(error, results, fields) {
						//global.lastUpdated[roomID] = Date.now();
						conn.release();
						res.redirect('/room/' + roomID);
					});
				});
			});
		});
	},
};