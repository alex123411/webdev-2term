export var randomUsers =  
get_random_users(function(output){
    console.log(output.results)
    return output;
});


function get_random_users(handledata){
    $.ajax({
        url: 'https://randomuser.me/api/?results=50',
        dataType: 'json',
        success: function(data) {
            handledata(data);
        }
    });
}
