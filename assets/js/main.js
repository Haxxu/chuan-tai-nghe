Number.prototype.formatPrice = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

function getUrlImage(url) {
    return './assets/images/item-image/' + url;
}

$(document).ready(function() {

    cart.loadCartFromLocalStorage();
    
    products.forEach(product => {
        item = `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="item">
                    <a href="#" class="item-img-box">
                        <img src="${getUrlImage(product.img)}" alt="" class="item-img">
                    </a>
                    <div class="item-text">
                        <div class="item-name">
                            ${product.name}
                        </div>
                        <div class="item-price">
                            ${product.price.formatPrice()} VNĐ
                        </div>
                        <div class="item-control">
                            <button class="btn" onclick="cart.addProduct(${product.id}, 1, ${product.price}, '${product.img}', '${product.name}')">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (product.type === 'headphone') {
            $('#headphone .section-content .row').append($(item));
        }
    });

})