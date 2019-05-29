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
        12 : 'Nadl / Yeoul Hall'};

var socket = io();
var username = "";
var name = "";
var roomID;
var room;

function updateOrders(orderList)
{
    let orderBox = $('#order');
    orderBox.empty();

    let totalPrice = 0;

    for(let order of orderList)
    {
        let removeBtn = "";
        if(order.userName === name)
        {
            removeBtn = `<button type="button" class="close" aria-label="Close" onclick="removeOrder(` + order.orderID + `);"><span aria-hidden="true">&times;</span></button>`;
        }

        totalPrice += order.price;

        $('#order').append(` <div class="row">
                                <div class="col-3">${order.userName}</div>
                                <div class="col-4">${order.name}</div>
                                <div class="col-3">${order.price}</div>
                                <div class="col-1">${removeBtn}</div>
                            </div>`);
    }

    $('#price').html(`<h4>Now ${totalPrice} / <span class="min-price">Minimum ${room.minPrice}</span></h4>`);

    if(totalPrice >= room.minPrice)
    {
        $('#maycall').html(`Call ${room.phoneNumber}`);
    }
    else
    {
        $('#maycall').html(`Cannot Order Yet`);
    }
}

function updateParticipants(userList)
{
    let userListBox = $('#user-list');
    userListBox.empty();
    userListBox.append('<div align="center"><span>Participants</span></div>');

    for(let user of userList)
    {
        userListBox.append('<div class="chat-icon dot">' + user.userName + '</div>');
    }
}

function removeOrder(orderID)
{
    $.get('/order/delete/' + orderID, function(res) {
        socket.emit('change_order', {roomID:roomID});
    });
}

function exitRoom()
{
    if(room.hostName === name)
    {
        socket.emit('delete_room', {roomID:roomID});
        $.get("/room/delete/" + roomID, function(res) {
            window.location.replace("/");
        });
    }
    else
    {
        $.get("/room/exit/" + roomID, function(res) {
            window.location.replace("/");
        });
    }
}

function addOrder()
{
    let dishID = $('#select-menu').val();
    let amount = 1;

    $.post('/order/add', {'roomID':roomID, 'dishID':dishID, 'amount':amount}, function(res) {
        socket.emit('change_order', {roomID:roomID});
    });
}

function sendMessage()
{
    let msg = $('.chat-input').val();

    socket.emit('new_message', {roomID:roomID, name:name, message:msg});

    $('.chat-input').val('');
}

$(document).ready(function(){
    // room get from server
    let my_name = "Kingzone";
    let sample_room = {
        room_id: "0x0fff11",
        room_name: "BangJay",
        restaurant: "MARU",
        owner_name: "SJ Hyun",
        min_price: 12000,
        curr_price: 8000,
        orders: [{
            name: "SJ Hyun",
            dish: "Tuna",
            price: 4000
        },{
            name: "Kingzone",
            dish: "DragonX",
            price: 4000
        }],
        dorm: "Himang Dorm"
    };
    /*let chat_ls = [];
    let room_info = sample_room;
    $('#restaurant').html(`<h1>${room_info.restaurant}</h1>`);
    $('#price').html(`<h4>${room_info.curr_price} / <span class="min-price">${room_info.min_price}</span></h4>`);
    $('#dorm').html(`<h4>${room_info.dorm}</h4>`)*/
		
    /*room_info.orders.forEach((v)=>{
				var trash = "";
				if(my_name == v.name) trash = `<button type="button" class="close" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>`
        $('#order').append(` <div class="row">
                                <div class="col-3">${v.name}</div>
                                <div class="col-5">${v.dish}</div>
                                <div class="col-3">${v.price}</div>
                                <div class="col-1">${trash}</div>
                            </div>`)
    });*/
    
    // http get chat(room, curr-time - 1 day) - load chatlist(name, text, timestamp) after time
    // load to doc
    name = $("#name").val();
    roomID = $("#roomID").val();
    $.get('/room/join/' + roomID, function(res) { });
    $.get('/room/info/' + roomID, function(res) {
        room = res[0];
        $('#restaurant').html(`<h1>${room.restaurantName}</h1>`);
        $('#dorm').html(`<h4>${dorm[room.dorm]}</h4>`);

        $.get('/order/get/' + roomID, function(results) {
            updateOrders(results);
        });

        $.get('/room/get/participants/' + roomID, function(results) {
            updateParticipants(results);
        });

        $.get('/restaurant/get/dish/' + room.orderRestaurant, function(res) {
            let dishes = $('#select-menu');
            for(let dish of res)
            {
                dishes.append('<option value="' + dish.id + '">' + dish.name + ' (' + dish.price + ' won)</option>');
            }
        });
    });

    socket.emit('join', {roomID: roomID, name: name});

    socket.on('change_order', function(params) {
        $.get('/order/get/' + roomID, function(results) {
            updateOrders(results);
        });
    });

    socket.on('chat_member_change', function(params) {
        $.get('/room/get/participants/' + roomID, function(results) {
            updateParticipants(results);
        });
    });

    socket.on('delete_room', function(params) {
        window.location.replace('/');
    });

    socket.on('new_message', function(params) {
        let sender = params.name;
        let message = params.message;
        let block;

        if(sender === name)
        {
            block = `<li class="list-item">
                <div class="my-chat">
                   <h4 class="chat-text">` + message + `</h4>
                    <div class="chat-icon dot">` + sender + `</div>
                </div>
            </li>`;
        }
        else
        {
            block = `<li class="list-item">
                <div class="your-chat">
                    <div class="chat-icon dot">` + sender + `</div>
                    <h4 class="chat-text">` + message + `</h4>
                </div>
            </li>`;
        }
        $('.chat-log').append(block);
    });
})