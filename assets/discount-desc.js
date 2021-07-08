$(function () {
    $(".field__input-btn").click(function (event) {
        setTimeout(function () {
            if ($("#checkout_reduction_code:contains('BARRYS')")) {
                $('.reduction-code').append("<p>Complimentary 3-months of FORME membership<p>");
            }
        }, 2000);
    });
});
