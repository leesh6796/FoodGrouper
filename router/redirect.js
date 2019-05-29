//var ChatRoom = require('./model').chatRoom;

module.exports = {
    getIndex : function(req, res)
    {
    	if(req.session.signin)
        	res.render('index.html',
                {
                    title : 'FoodGrouper main page',
                    name: req.session.name,
                    id: req.session._id,
                    phoneNumber: req.session.phoneNumber,
                });
        else
        	res.redirect('/signin');
    },
    getSignIn : function(req, res)
    {
    	if(req.session.signin)
    		res.redirect('/');
    	else
    		res.render('signin.html',
                {
                    title : 'FoodGrouper Login',
                    signInFail: false
                });
    },
    getSignInFail : function(req, res)
    {
    	if(req.session.signin)
    		res.redirect('/');
    	else
    		res.render('signin.html',
                {
                    title : 'FoodGrouper Login',
                    signInFail: true
                });
    },
    getSignUp : (req, res) =>
    {
    	if(req.session.signin)
    		res.redirect('/');
    	else
    		res.render('signup.html', {title : 'FoodGrouper Sign Up'});
    },
    getRoomView : (req, res) =>
    {
        if(req.session.signin)
            res.render('room.html',
                {
                    title : 'FoodGrouper main page',
                    username: req.session.username,
                    name: req.session.name,
                    id: req.session._id,
                    roomID: req.params.roomID
                });
        else
            res.redirect('/signin');
    }
    /*getDevChat : function(req, res) 
    {
    	if(req.session.signin)
        	res.render('devchat.html',
                {
                    username: req.session.username,
                    roomID: req.params.roomID,
                });
        else
        	res.redirect('/signin');
    },
    getChat : async function(req, res)
    {
    	if(req.session.signin)
        {
            let roomID = req.params.roomID;
            let room = await ChatRoom.findOne({_id: roomID});
            if(room !== null)
            {
                if(room.type === 0) // normal chat room
                {
                    res.render('chat.html', {
                        title: 'KALIV chat',
                        username: req.session.username,
                        roomID: req.params.roomID,
                    });
                }
                else if(room.type === 1)
                {
                    res.render('calendar.html', {
                        title: 'KALIV chat',
                        username: req.session.username,
                        roomID: req.params.roomID,
                    });
                }
            }
        }
        else res.redirect('/signin');
    },
    getCalendar : function(req, res)
    {
    	if(req.session.signin)
        	res.render('calendar.html',
                {
                    title: 'KALIV Calendar',
                    username: req.session.username,
                    roomID: req.params.roomID,
                });
        else
        	res.redirect('/signin');
    },
    getDev : function(req, res)
    {
        if(req.session.signin)
            res.render('dev.html',
                {
                    username: req.session.username,
                });
        else
            res.redirect('/signin');
    }*/
};