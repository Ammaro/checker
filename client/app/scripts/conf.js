client_ver_major = 0
client_ver_minor = "04"
client_ver_compilation = 0
client_server_prefix = "ajax/"


$(document).ready(function(){
   $('.menuitem').click(function(){
       $(this).addClass('.menuitem-active');
   });
    $('.toggle-footer').click(function(){
        if($('.footer').is(':visible')) {
            $('.footer').hide();
        }else {
            $('.footer').show();
        }
    })
});