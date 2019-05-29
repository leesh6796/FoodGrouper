var pool = require('./pool');
var insertGenerator = require('./query').insertGenerator;
var room = require('./room');

module.exports = {
	postAddRestaurant : function(req, res) {
		let name = req.body.name;
		let phoneNumber = req.body.phoneNumber;
		let receiveLocation = req.body.receiveLocation;
		let minPrice = req.body.minPrice;
		let openTime = req.body.openTime;
		let closeTime = req.body.closeTime;
		let openDays = req.body.openDays;

		pool.getConnection(function(err, conn) {
			data = {'name':{'type':'str', 'val':name},
					'phoneNumber':{'type':'str', 'val':phoneNumber},
					'receiveLocation':{'type':'str', 'val':receiveLocation},
					'minPrice':{'type':'int', 'val':minPrice},
					'openTime':{'type':'str', 'val':openTime},
					'closeTime':{'type':'str', 'val':closeTime},
					'openDays':{'type':'str', 'val':openDays}};

			query = insertGenerator('Restaurant', data);
			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error) res.send("fail");
				else res.send("success");
			});
		});
	},

	getRestaurantList : function(req, res) {
		pool.getConnection(function(err, conn) {
			query = "select * from Restaurant;";

			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error) res.send("fail");
				else res.send(results);
			});
		});
	},

	postAddDish : function(req, res) {
		let restaurant = req.body.restaurant;
		let name = req.body.name;
		let price = req.body.price;

		pool.getConnection(function(err, conn) {
			data = {'restaurant':{'type':'int', 'val':restaurant},
					'name':{'type':'str', 'val':name},
					'price':{'type':'int', 'val':price}};

			query = insertGenerator('Dish', data);
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

	getDishList : function(req, res) {
		let restaurant = req.params.restaurant;

		pool.getConnection(function(err, conn) {
			let query = "";
			if(restaurant == -1)
				query = "select * from Dish;";
			else
				query = "select * from Dish where restaurant=" + restaurant + ";";

			conn.query(query, function(error, results, fields) {
				conn.release();
				if(error) res.send("fail");
				else res.send(results);
			});
		});
	},
};