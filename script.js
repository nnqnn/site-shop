function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  
  const products = {
    "product1": {
        "title": "CASHER x AMKAL",
        "price": "$55.00",
        "description": "CASHER x AMKAL Collaboration. Composition: 90% polyester, 10% spandex Fabric: Jersey Density: 210 gr/m² Cut: OVERSIZE Print: Sublimation Production: Russia",
        "images": ["pins/product1.jpg", "pins/product1_2.jpg", "pins/product1_3.jpg"]
    },
    "product2": {
        "title": "CASHER x XXXMANERA",
        "price": "$55.00",
        "description": "CASHER x XXXMANERA Collaboration. Composition: 90% polyester, 10% spandex Fabric: Jersey Density: 210 gr/m² Cut: OVERSIZE Print: Sublimation Production: Russia",
        "images": ["pins/product2.jpg", "pins/product2_2.jpg", "pins/product2_3.jpg"]
    },
    "product3": {
        "title": "'Casher' Scarf Black",
        "price": "$35.00",
        "description": "The perfect choice to complete your look with style, this scarf is made of soft and warm material and is available in black, pink, green and red colors. This scarf will not only protect you from the cold, but will also become an expressive accent of the outfit. It will provide comfort and coziness in any weather, and the variety of colors will allow you to find the perfect shade to match your style and mood. A perfect choice for a gift for yourself or your loved ones to plunge into the world of coziness and luxury.",
        "images": ["pins/product3.jpg", "pins/product3_2.jpg", "pins/product3_3.jpg"]
    },
    "product4": {
        "title": "T-shirt 'Dollar 2.0' White",
        "price": "$50.00",
        "description": "Dollar 2.0 in white under a white look is perfect as a base or as a standalone top piece",
        "images": ["pins/product4.jpg", "pins/product4_2.jpg", "pins/product4_3.jpg"]
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
  
    productItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const originalSrc = img.src;
        const hoverSrc = originalSrc.replace('.jpg', '_2.jpg');
  
        item.addEventListener('mouseover', () => {
            img.src = hoverSrc;
        });
  
        item.addEventListener('mouseout', () => {
            img.src = originalSrc;
        });
  
        item.addEventListener('click', () => {
            const productId = 'product' + (index + 1);
            window.location.href = 'product.html?id=' + productId;
        });
    });
  
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (productId && products[productId]) {
        const product = products[productId];
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-description').innerText = product.description;
        const mainImage = document.getElementById('main-image');
        mainImage.src = product.images[0];
        const thumbnailContainer = document.getElementById('thumbnail-images');
        product.images.forEach(image => {
            const thumbImg = document.createElement('img');
            thumbImg.src = image;
            thumbImg.alt = product.title;
            thumbImg.onclick = () => {
                mainImage.src = image;
            };
            thumbnailContainer.appendChild(thumbImg);
        });

        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            alert("Товар добавлен в корзину!");
            addToCart(productId);
        });
  
        // Добавить обработчик событий для зума
        mainImage.addEventListener('click', () => {
            if (mainImage.classList.contains('zoomed')) {
                mainImage.classList.remove('zoomed');
            } else {
                mainImage.classList.add('zoomed');
            }
        });
    }
  
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    document.querySelector('header').appendChild(themeToggle);
  
    const applyTheme = (theme) => {
        document.body.classList.toggle('dark', theme === 'dark');
        themeToggle.innerText = theme === 'dark' ? 'Light' : 'Dark';
        localStorage.setItem('theme', theme);
    };
  
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
  
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCart = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const product = products[item.id];
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${product.images[0]}" alt="${product.title}">
                    <div class="cart-item-details">
                        <h3>${product.title}</h3>
                    </div>
                    <div class="cart-item-price">
                        <p>${product.price}</p>
                    </div>
                    <div>
                        <div class="quantity-controls">
                            <button class="decrease-btn" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1" max="5">
                            <button class="increase-btn" data-id="${item.id}">+</button>
                        </div>
                        <p> </p>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(product.price.replace('$', '')) * item.quantity;
        });

        cartTotalElement.innerText = `$${total.toFixed(2)}`;
    };

    const addToCart = (productId) => {
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex > -1) {
            if (cart[existingProductIndex].quantity < 5) {
                cart[existingProductIndex].quantity += 1;
            }
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    const removeFromCart = (productId) => {
        const index = cart.findIndex(item => item.id === productId);
        if (index > -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    };

    const changeQuantity = (productId, change) => {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            const newQuantity = cartItem.quantity + change;
            if (newQuantity >= 1 && newQuantity <= 5) {
                cartItem.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        }
    };

    if (window.location.pathname.endsWith('cart.html')) {
        updateCart();

        document.getElementById('cart-items').addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            if (event.target.classList.contains('remove-btn')) {
                removeFromCart(productId);
            } else if (event.target.classList.contains('decrease-btn')) {
                changeQuantity(productId, -1);
            } else if (event.target.classList.contains('increase-btn')) {
                changeQuantity(productId, 1);
            }
        });

        document.getElementById('cart-items').addEventListener('input', (event) => {
            if (event.target.classList.contains('quantity-input')) {
                const productId = event.target.getAttribute('data-id');
                const newQuantity = parseInt(event.target.value);
                const cartItem = cart.find(item => item.id === productId);

                if (newQuantity >= 1 && newQuantity <= 5) {
                    cartItem.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                } else {
                    event.target.value = cartItem.quantity;
                }
            }
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Корзина пуста! Добавьте товары в корзину перед оформлением.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
  });