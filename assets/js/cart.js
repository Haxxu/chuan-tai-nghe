Number.prototype.formatPrice = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

function getUrlImage(url) {
    return './assets/images/item-image/' + url;
}

var cart = {
    productsInCart: [
        // {
        //     id: 0,
        //     quantity: 0,
        //     price: 0,
        //     total: 0,
        //     img: '',
        //     name: '',
        // }
    ],
    totalPrice: 0,
    totalQuantity: 0,

    addProduct: function(id, quantity, price, img, name) {
        let exist = false;
        this.productsInCart.forEach(product => {
            if (product.id == id) {
                exist = true;
                product.quantity += quantity;
                product.total = product.quantity * price;
                product.price = price;
                product.img = img;
                product.name = name;
            }
        });
        if (!exist) {
            this.productsInCart.push({
                id: id,
                quantity: quantity,
                total: quantity * price,
                price: price,
                img: img,
                name: name,
            });
        } 
        this.totalPrice += price * quantity;
        this.totalQuantity += quantity;
        this.renderCart();
        this.saveToLocalStorage();
    },
    removeProduct: function(id) {
        this.productsInCart.forEach((product, index) => {
            if (product.id == id) {
                this.totalPrice -= product.total;
                this.totalQuantity -= product.quantity;
                this.productsInCart.splice(index, 1);
                
            }
        });
        this.renderCart();
        this.saveToLocalStorage();
    },
    editProduct: function(id, quantity) {
        this.productsInCart.forEach((product, index) => {
            if (product.id == id) {
                oldQuantity = product.quantity; 
                q =  quantity - oldQuantity;

                product.quantity = quantity
                product.total = quantity * product.price;

                this.totalQuantity += q;
                this.totalPrice += q * product.price;
            }
        });
        this.renderCart();
        this.saveToLocalStorage();
    },
    saveToLocalStorage: function() {
        localStorage.setItem('cart', JSON.stringify(this));
    },
    loadCartFromLocalStorage: function() {
        // this = JSON.parse(localStorage.getItem('cart'));
        this.productsInCart = JSON.parse(localStorage.getItem('cart')).productsInCart;
        this.totalPrice = JSON.parse(localStorage.getItem('cart')).totalPrice;
        this.totalQuantity = JSON.parse(localStorage.getItem('cart')).totalQuantity;
        
        this.renderCart();
    },
    renderCart: function() {
        $("#cart").empty();

        if (this.productsInCart.length <= 0) {
            $("#cart").append(`
                <tr>
                    <td colspan="6">
                        Bạn chưa chọn sản phẩm nào
                    </td>
                </tr>
            `);
        }

        this.productsInCart.forEach(product => {
            itemImg = getUrlImage(product.img);
            itemName = product.name;
            itemPrice = product.price;
            itemQuantity = product.quantity;
            itemTotal = product.total;
            itemId = product.id;

            let productItem = `
                <tr class="cart-item align-baseline">
                    <td>
                        <div class="cart-item-img">
                            <img width="100px" height="100px" src="${itemImg}" alt="">
                        </div>
                    </td>
                    <td>
                        <div class="cart-item-name">
                            ${itemName}
                        </div>
                    </td>
                    <td>
                        <div class="cart-item-price">
                            ${itemPrice.formatPrice()} VNĐ
                        </div>
                    </td>
                    <td>
                        <div class="cart-item-quantity">
                            <input class="cart-item-quantity-input d-inline" type="number" value="${itemQuantity}"
                                onchange="cart.editProduct(${itemId}, this.value)" min="1"
                            >
                        </div>
                    </td>
                    <td>
                        <div class="cart-item-total">
                            ${itemTotal.formatPrice()} VNĐ
                        </div>
                    </td>
                    <td>
                        <div class="cart-item-action">
                            <button onclick="cart.removeProduct(${itemId})" class="btn btn-danger">Xóa</button>
                        </div>
                    </td>
                </tr> 
            `;

            $("#cart").append($(productItem));

        });

        $('#total-price').text(this.totalPrice.formatPrice());
        $('#total-quantity').text(this.totalQuantity);
    }
}

