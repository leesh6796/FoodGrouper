$('#signup-modal').on('shown.bs.modal', function () {
    $('#modal-id').trigger('focus');
})

function pw_check(pw){
    let char_set = [/[0-9]/g, /[a-z]/g, /[A-Z]/g, /[!#$%^&*()_+-=/.,]/g];
    let char_sum = [0,0,0,0]
    pw.array.forEach(element => {
        char_set.forEach((v,i)=>{
            if(v.indexOf(element)>0) char_sum[i]++;
        })
    });
    return 
}