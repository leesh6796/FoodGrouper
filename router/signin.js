var pool = require('./pool');

module.exports = {
	postSignIn : async function(req, res)
	{
		let username = req.body.username;
		let password = req.body.password;

		pool.getConnection(function(err, conn) {
			if(err) throw err;

			query = "select * from User where username='" + username + "' and password='" + password + "';";
			conn.query(query, function(error, results, fields) {
				if(results.length > 0)
				{
					let me = results[0];
					req.session.signin = true;
					req.session.username = username;
					req.session.name = me.name;
					req.session.phoneNumber = me.phoneNumber;
					req.session.id = me.id;
					conn.release();
					res.redirect('/');
				}
				else
				{
					conn.release();
					res.redirect('/signin/fail');
				}
			});
		});
	},
	getLogout : function(req, res)
	{
		if(req.session.signin)
		{
			req.session.signin = false;
			res.redirect('/signin');
		}
		else
		{
			res.redirect('/');
		}
	}
};