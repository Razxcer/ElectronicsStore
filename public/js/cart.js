let cart = [];

// загруз корзины
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
    updateCartDisplay();
    updateCartCount();
}

// сохранение корзины 
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// длбавление
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.ProductID);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.ProductID,
            name: product.Name,
            price: product.Price,
            image: product.ImagePath,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('Товар добавлен в корзину!');
}

// обновление
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart();
    }
}

// удаление
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('Товар удален из корзины');
}

// счетчик
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// отображение
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        if (totalPriceSpan) totalPriceSpan.textContent = '0';
        return;
    }
    
    let total = 0;
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
            <div class="cart-item-total">${itemTotal} ₽</div>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    if (totalPriceSpan) {
        totalPriceSpan.textContent = total;
    }
}

// уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// заказ
function checkoutOrder(customerData) {
    const order = {
        customer: customerData,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // очищ
    cart = [];
    saveCart();
    
    return order;
}

const modal = document.getElementById('order-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeBtn = document.querySelector('.close');
const orderForm = document.getElementById('order-form');

if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        if (cart.length === 0) {
            showNotification('Корзина пуста!');
            return;
        }
        modal.style.display = 'block';
    };
}

if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

if (orderForm) {
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        const order = checkoutOrder({ fullname, phone, address });
        
        modal.style.display = 'none';
        orderForm.reset();
        
        showNotification(`Заказ оформлен! Сумма: ${order.total} ₽`);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    };
}
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});