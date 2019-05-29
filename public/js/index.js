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
let sample_user = {
    nickname: "MasterchefThrall",
    phone_number: "010GARROSH"
}

/*function getRoomList() {
    $.get("/room/list", function(roomList) {
        // ...
    });
}*/

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

var restList;

roomListRefresh = function() {
    $.get("/room/list", function(roomList) {
        var orders = $('.order-list');
        orders.empty();
        //$("#nickname").html(`${user_info.name}`);
        //$("#phoneNumber").html(`${user_info.phoneNumber}`);
        if(roomList === "-1") return;
        for(let room of roomList){
            orders.append(`<a href="/room/view/${room.roomID}" class="col-5 box">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4>${room.name}</h4>
                                    <small class="room-owner">${room.hostName}</small>
                                </div>
                                <div class="order-info justify-content-between">
                                    <div class="restaurant">${room.restaurantName}</div>
                                    <div class="dorm">${dorm[room.dorm]}</div>
                                    <div>Minimum <span class="min-price">${room.minPrice} won</span></div>
                                </div>
                            </a>`);
        }
    });
};

function selectedRestaurantChange(obj)
{
    for(let rest of restList) {
        if(rest.id == obj.value)
        {
            $('#min-price').html(rest.minPrice);
        }
    }
}

function createRoom()
{
    let roomName = $('#room-name').val();
    let restaurant = $('#select-restaurant').val();
    let dorm = $('#select-dorm').val();
    $.post('/room/create', {'roomName':roomName, 'restaurant':restaurant, 'dorm':dorm}, function(res) {
        window.location.replace(res);
    });
}

refresh = function(){
    // room user get from server
    // Dorm List Update
    // Room List Update
    roomListRefresh();

    var dorms = $('#select-dorm');
    for(let i=1; i<=12; i++)
    {
        dorms.append('<option value="' + i + '">' + dorm[i] + '</option>');
    }

    $.get('/restaurant/get', function(results) {
        var rests = $('#select-restaurant');
        restList = results;

        for(let rest of restList) {
            rests.append('<option value="' + rest.id + '" >' + rest.name + '</option>');
        }
    });
}
setInterval(()=>{
    // http get room/list - returns roomlist(restaurant name, owner name, currprice, minprice)
    roomListRefresh();
}, 5000);

$(document).ready(refresh());