        
$(document).ready(function () {
 $(".content-box:contains('Your order is confirmed')").remove();
        $(".content-box:contains('Order updates')").remove();
        if( document.getElementsByClassName('map')[0] ) {
            document.getElementsByClassName('map')[0].parentNode.remove();
        };
           });
