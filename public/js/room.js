$(document).ready(function(){
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
    let chat_ls = [];
    let room_info = sample_room;
    $('#restaurant').html(`<h1>${room_info.restaurant}</h1>`);
    $('#price').html(`<h4>${room_info.curr_price} / <span class="min-price">${room_info.min_price}</span></h4>`);
    $('#dorm').html(`<h4>${room_info.dorm}</h4>`)
    room_info.orders.forEach((v)=>{
        $('order').append(` <div class="row">
                                <div class="col-3">${v.name}</div>
                                <div class="col-6">${v.dish}</div>
                                <div class="col-3">${v.price}</div>
                            </div>`)
    })
    
    // http get chat(room, curr-time - 1 day) - load chatlist(name, text, timestamp) after time
    // load to doc
})
