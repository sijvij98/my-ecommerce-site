document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    const shopNowBtn = document.getElementById('shop-now-btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            const productsSection = document.getElementById('products');
            productsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Shopping Cart State
    let cart = [];

    // DOM Elements
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price');

    // Toggle Cart Functions
    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
    }

    // Event Listeners for Cart Toggle
    cartIcon.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');

            addItemToCart({ id, name, price, image });
            openCart(); // Show cart when an item is added

            // Visual feedback on button
            const originalText = e.target.innerText;
            e.target.innerText = 'Added!';
            e.target.style.backgroundColor = '#1e7e34';
            
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.backgroundColor = '';
            }, 1000);
        });
    });

    // Core Cart Operations
    function addItemToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartUI();
    }

    function updateItemQuantity(id, change) {
        const itemIndex = cart.findIndex(cartItem => cartItem.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); // Remove item completely if quantity drops to 0 or below
            }
            updateCartUI();
        }
    }

    function removeItem(id) {
        cart = cart.filter(cartItem => cartItem.id !== id);
        updateCartUI();
    }

    // UI Update logic
    function updateCartUI() {
        // Clear current items
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:2rem; color:#777;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                count += item.quantity;

                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }

        // Update totals and badge count
        cartCount.innerText = count;
        totalPriceEl.innerText = total.toFixed(2);

        // Re-bind dynamic event listeners for the generated cart buttons
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => updateItemQuantity(e.target.getAttribute('data-id'), -1));
        });
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => updateItemQuantity(e.target.getAttribute('data-id'), 1));
        });
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => removeItem(e.target.getAttribute('data-id')));
        });
    }

    // Checkout functionality
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty! Add some products before checking out.');
        } else {
            const total = document.getElementById('total-price').innerText;
            alert(`Thank you for your purchase! Your total is $${total}.`);
            // Clear cart post-checkout
            cart = [];
            updateCartUI();
            closeCart();
        }
    });

    // Initialize UI on load
    updateCartUI();
});
