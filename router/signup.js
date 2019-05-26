var sha512 = require('js-sha512').sha512;
var vsprintf = require('sprintf').vsprintf;
var pool = require('./pool');
var insertGenerator = require('./query').insertGenerator;

//var User = require('./model').user;

module.exports = {
	postSignUp : async function(req, res)
	{
		let username = req.body.username;
		let password = req.body.password;
		let name = req.body.name;
		let phoneNumber = req.body.phoneNumber;

		pool.getConnection(function(err, conn) {
			if(err) throw err;

			data = {'username':{'type':'str', 'val':username},
					'password':{'type':'str', 'val':password},
					'name':{'type':'str', 'val':name},
					'phoneNumber':{'type':'str', 'val':phoneNumber}};
			
			query = insertGenerator('User', data);

			conn.query(query, function(error, results, fields) {
				conn.release();
				res.redirect('/signin');
			});
		});
	},
};