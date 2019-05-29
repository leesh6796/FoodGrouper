$(document).ready(function(){
    // http get room - returns restaurant name, min price, curr-price, orders(name, dish name, price), dorm
    let room_info = {
        orders: [],
    };
    let chat_ls = [];
    $('#restaurant').html('<h1>${room_info.restaurant}</h1>');
    $('#price').html('<h4>${room_info.curr_price} / <span class="min-price">${room_info.min_price}</span></h4>');
    room_info.orders.forEach((v)=>{
        $('order').append('<div class="row"><div class="col-3">${v.name}</div><div class="col-6">${v.dish}</div><div class="col-3">${v.price}</div></div>')
    })
    
    // http get chat(room, curr-time - 1 day) - load chatlist(name, text, timestamp) after time
    // load to doc
})
