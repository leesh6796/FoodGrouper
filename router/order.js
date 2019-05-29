var pool = require('./pool');
var insertGenerator = require('./query').insertGenerator;
var room = require('./room');

module.exports = {
	postAddOrder : function(req, res) {
		let userID = req.session._id;
		let roomID = req.body.roomID;
		let dishID = req.body.dishID;
		let amount = req.body.amount;

		pool.getConnection(function(err, conn) {
			data = {'userID':{'type':'int', 'val':userID},
					'roomID':{'type':'int', 'val':roomID},
					'dishID':{'type':'int', 'val':dishID},
					'amount':{'type':'int', 'val':amount}};

			query = insertGenerator('Orders', data);
			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error)
				{
					console.log(error);
					res.send("fail");
				}
				else res.send("success");
			});
		});
	},

	getOrderList : function(req, res) {
		let roomID = req.params.roomID;

		pool.getConnection(function(err, conn) {
			query = 'SELECT o.*, u.name as userName ' +
					'FROM Orders as o ' +
					'JOIN User AS u ' +
					'ON o.roomID=' + roomID + ' and o.userID = u.id;'

			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error) res.send("fail");
				else res.send(results);
			});
		});
	},

	getDeleteOrder : function(req, res) {
		let orderID = req.params.orderID;

		pool.getConnection(function(err, conn) {
			query = "delete from Orders where id=" + orderID + ";";
			conn.query(query, function(error, results, fields) {
				conn.release();
				res.redirect('/');
			});
		});
	},
};