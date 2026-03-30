
// товары
async function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    try {
        const response = await fetch(`/api.php/products`);
        const products = await response.json();
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<div class="loading">Товары не найдены</div>';
            return;
        }
        
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="../images/${product.ImagePath}" 
                     alt="${product.Name1}" 
                     class="product-image"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="product-info">
                    <h3 class="product-title">${product.Name1}</h3>
                    <p class="product-description">${product.Description}</p>
                    <div class="product-price">${product.Price} ₽</div>
                    <button class="add-to-cart" data-product-id="${product.ProductID}">
                        Добавить в корзину
                    </button>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async (e) => {
                const productId = button.dataset.productId;
                const product = products.find(p => p.ProductID == productId);
                
                if (product) {
                    addToCart(product);
                }
            });
        });
        
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        productsContainer.innerHTML = '<div class="loading">Ошибка загрузки товаров</div>';
    }
}

function checkAuthForCart() {
    const user = localStorage.getItem('user');
    if (!user) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Пожалуйста, войдите в систему, чтобы добавить товар в корзину');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            });
        });
    }
}

// стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    checkAuthForCart();
    loadCart();
});