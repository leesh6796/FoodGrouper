$(document).ready(refresh())
refresh = function(){
    // room get from server
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
    let user_info = {};
    let room_ls = [sample_room];
    var orders = document.querySelector(".order-list");
    for(let room of room_ls){
        orders.append(`<a href="/room/${room.room_id}" class="col-5 box">
							<div class="d-flex w-100 justify-content-between">
								<h4>${room.room_name}</h4>
								<small class="room-owner">${room.owner_name}</small>
							</div>
							<div class="order-info justify-content-between">
								<div class="restaurant">${room.restaurant}</div>
								<div class="dorm">${room.dorm}</div>
								<div>${room.curr_price.toString()} / <span class="min-price">${room.min_price.toString()}</span></div>
							</div>
						</a>`)
    }
    // http get chat(room, curr-time - 1 day) - load chatlist(name, text, timestamp) after time
    // load to doc
}
setInterval(()=>{
    // http get room/list - returns roomlist(restaurant name, owner name, currprice, minprice)
    
}, 5000);