var express = require('express');

var redirector = require('./redirect');
var signup = require('./signup');
var signin = require('./signin');
var room = require('./room');
var restaurant = require('./restaurant');
var order = require('./order');
/*var chat = require('./chat');
var calendar = require('./calendar');
var dev = require('./dev');*/

var router = express.Router();

router.route('/').get(redirector.getIndex);
router.route('/index').get(redirector.getIndex);
router.route('/main').get(redirector.getIndex);
router.route('/signin').get(redirector.getSignIn);
router.route('/signup').get(redirector.getSignUp);
router.route('/logout').get(signin.getLogout);
/*router.route('/devchat/:roomID').get(redirector.getDevChat);
//router.route('/chat').get(redirector.getChat);
router.route('/calendar').get(redirector.getCalendar);
router.route('/dev').get(redirector.getDev);*/

router.route('/signup/req').post(signup.postSignUp);

router.route('/signin/auth').post(signin.postSignIn);
router.route('/signin/fail').get(redirector.getSignInFail);

router.route('/room/view/:roomID').get(redirector.getRoomView);
router.route('/room/create').post(room.postCreateRoom);
router.route('/room/delete/:roomID').get(room.getDeleteRoom);
router.route('/room/join/:roomID').get(room.getJoinRoom);
router.route('/room/exit/:roomID').get(room.getExitRoom);
router.route('/room/list').get(room.getRoomList);
router.route('/room/mylist').get(room.getMyRoomList);
router.route('/room/dorminfo').get(room.getDormString);
router.route('/room/info/:roomID').get(room.getInfo);
router.route('/room/get/participants/:roomID').get(room.getRoomParticipants);
router.route('/room/lastupdate/:roomID').get(room.getLastUpdate);
router.route('/room/complete/:roomID').get(room.getCompleteOrder);

router.route('/restaurant/get').get(restaurant.getRestaurantList);
router.route('/restaurant/add').post(restaurant.postAddRestaurant);
router.route('/restaurant/add/dish').post(restaurant.postAddDish);
router.route('/restaurant/get/dish/:restaurant').get(restaurant.getDishList);

router.route('/order/add').post(order.postAddOrder);
router.route('/order/get/:roomID').get(order.getOrderList);
router.route('/order/delete/:orderID').get(order.getDeleteOrder);

/*router.route('/chat/enter').post(chat.enterRoom);
router.route('/chat/:roomID').get(redirector.getChat);
router.route('/chat/:roomID/bind/calendar').get(calendar.bindCalendar);
router.route('/chat/get/enter/roomlist').get(chat.getEnterRoomList);
router.route('/chat/get/my/name').get(chat.getNameInfo);

router.route('/dev/process').post(dev.commandProcess);*/

module.exports = router;
