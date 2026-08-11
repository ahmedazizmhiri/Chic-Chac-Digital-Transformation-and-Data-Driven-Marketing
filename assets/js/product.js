// Function to fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch('https://chic-chac-fdgybug7fqdcazem.francecentral-01.azurewebsites.net/api/products'); 
        const products = await response.json();
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productHtml = `
                <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="product-card wow fadeInUp" data-wow-delay="0.2s">
                        <div class="product-img" style="background-image: url('${product.imageUrl}')">
                            <span class="product-badge">${product.category || 'Product'}</span>
                        </div>
                        <div class="product-content">
                            <h3>${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price">${product.price}€</div>
                            <!--<button class="add-to-cart" data-product-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Ajouter
                            </button>-->
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHtml;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function addToCart(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`); // Endpoint to get single product
        const product = await response.json();
        
        cart.push({
            id: product.id,
            ...product
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showCartNotification();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Notification for adding to cart
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = 'Produit ajouté au panier !';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart') || 
       e.target.closest('.add-to-cart')) {
        const productId = e.target.closest('.add-to-cart').dataset.productId;
        addToCart(productId);
    }
});