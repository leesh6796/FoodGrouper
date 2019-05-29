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
    let chat_ls = [];
    let room_info = sample_room;
    $('#restaurant').html(`<h1>${room_info.restaurant}</h1>`);
    $('#price').html(`<h4>${room_info.curr_price} / <span class="min-price">${room_info.min_price}</span></h4>`);
    $('#dorm').html(`<h4>${room_info.dorm}</h4>`)
		
    room_info.orders.forEach((v)=>{
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
    })
    
    // http get chat(room, curr-time - 1 day) - load chatlist(name, text, timestamp) after time
    // load to doc
})

function onMayCall(){
    // called if order constraints are all satisfied
    // changes order button text into restaurant telephone number
    let call_num = "010GARROSH"
    $('#maycall').html(`Call ${call_num}`)
}
function onMayCall(){
    // called if order constraints are not satisfied
    // changes order button text into restaurant telephone number
    $('#maycall').html(`Cannot Order Yet`)
}