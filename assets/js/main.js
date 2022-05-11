Number.prototype.formatPrice = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

function getUrlImage(url) {
    return './assets/images/item-image/' + url;
}

// function addToCartEffect(target) {
//     t = $(this)
//     alert('Left: ' + t.position().left + ' Top: ' + t.position().top);

// }

$(document).ready(function() {

    cart.loadCartFromLocalStorage();
    cart.renderCart();

    var headphoneLimit = 0;
    var musicPlayerLimit = 0;
    var speakerLimit = 0;
    var accessoryLimit = 0;
    
    products.forEach(product => {
        item = `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="item">
                    <a href="./chitiet.html" class="item-img-box">
                        <img src="${getUrlImage(product.img)}" alt="" class="item-img">
                    </a>
                    <div class="item-text">
                        <div class="item-name">
                            ${product.name}
                        </div>
                        <div class="item-price">
                            ${product.price.formatPrice()} &#8363;
                        </div>
                        <div class="item-control"> 
                            <button class="btn" onclick="cart.addProduct(${product.id}, 1, ${product.price}, '${product.img}', '${product.name}');">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (product.type === 'headphone') {
            if (headphoneLimit <= 8) {
                $('#headphone .section-content .row').append($(item));
                headphoneLimit++;
            } else 
                return;
        } else if (product.type === 'music-player') {
            if (musicPlayerLimit <= 8) {
                $('#music-player .section-content .row').append($(item));
                musicPlayerLimit++;
            } else
                return;
        } else if (product.type === 'speaker') {
            if (speakerLimit <= 8) {
                $('#speaker .section-content .row').append($(item));
                speakerLimit++;
            } else
                return;
        } else if (product.type === 'accessory') {
            if (accessoryLimit <= 8) {
                $('#accessory .section-content .row').append($(item));
                accessoryLimit++;
            } else 
                return;
        }
    });

    $('.item-control .btn').on('click', function(e) {
        $('.add-cart-effect').css({
            "display": 'block',
            left: e.pageX,
            top: e.pageY,
            opacity: 1,
        });
        $('.add-cart-effect').animate({
            left: e.pageX,
            top: 0,
            opacity: 0,
        }, 600, function() {
            $('.add-cart-effect').css('display', 'none');
        });
        $('#total-quantity').css('animation', 'shakeEffect 0.5s');
        setTimeout(function() {
            $('#total-quantity').css('animation', '');
        }, 500);
            

    });

})