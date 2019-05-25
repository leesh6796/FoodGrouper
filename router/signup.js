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
			console.log(query);

			conn.query(query, function(error, results, fields) {
				res.redirect('/signin');
			});
		});
	},

	getCheckOverlap_Email : async function(req, res) // username, email 중복 확인
	{
		let username = req.params.username.toString();
		let email = req.params.email.toString();

		let isOverlapped = await User.checkOverlapEmail(username, email);

		if(isOverlapped) // 중복이면
		{
			res.send({result:"overlap"});
		}
		else
		{
			res.send({result:"success"});
		}
	},

	getCheckOverlap_Nickname : async function(req, res) // nickname 중복 확인
	{
		let nickname = req.params.nickname.toString();

		let isOverlapped = await User.checkOverlapNickname(nickname);

		if(isOverlapped) // 중복이면
		{
			res.send({result:"overlap"});
		}
		else
		{
			res.send({result:"success"});
		}
	},

	getVerify : async function(req, res) // 메일로 보내진 링크에 접속했을 때 인증을 처리하는 method
	{
		try
		{
			let token = req.params.token.toString();
			let user = await User.find({verifyToken: token});

			if(user.length > 0)
			{
				await user[0].verify();
				res.render('email_verification_success.html');
				//res.send("KAIST Verification Complete");
			}
			else
				res.render('email_verification_failure.html');
		}
		catch(err)
		{
			res.render('email_verification_failure.html');
		}
	},
};