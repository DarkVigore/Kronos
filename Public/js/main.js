
const productsSection = document.getElementById('products');
const cartSection = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const viewProductsButton = document.getElementById('view-products');
const viewCartButton = document.getElementById('view-cart');
const checkoutButton = document.getElementById('checkout');
const registerSection = document.getElementById('register');
const loginSection = document.getElementById('login');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const viewRegisterButton = document.getElementById('view-register');
const viewLoginButton = document.getElementById('view-login');

document.getElementById("view-products").addEventListener("click", function() {
    // Lógica para mostrar la sección de productos
});

document.getElementById("view-cart").addEventListener("click", function() {
    // Lógica para mostrar el carrito
});

document.getElementById("view-register").addEventListener("click", function() {
    // Lógica para mostrar el formulario de registro
});

document.getElementById("view-login").addEventListener("click", function() {
    // Lógica para mostrar el formulario de inicio de sesión
});

    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.dataset.name;
                const productPrice = parseFloat(button.dataset.price);
                addToCart(productName, productPrice);
            });
        });
    
        function addToCart(name, price) {
            const item = {
                name: name,
                price: price,
                quantity: 1
            };
            // Aquí puedes agregar la lógica para agregar el producto al carrito
            // Por ejemplo, podrías almacenar los productos en un array y luego actualizar la vista del carrito
            console.log('Producto agregado al carrito:', item);
        }
    ;
    

    let cart = [];
    const stripe = Stripe('tu_clave_publica_de_stripe');
    let authToken = '';

    const response = await fetch('/api/products');
    const products = await response.json();

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('products');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Precio: $${product.price}</p>
            <button data-id="${product.id}">Añadir al carrito</button>
        `;
        productsSection.appendChild(productDiv);
    });

    productsSection.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = e.target.dataset.id;
            const product = products.find(p => p.id == productId);
            addToCart(product);
        }
    });

    viewProductsButton.addEventListener('click', () => {
        showSection(productsSection);
    });

    viewCartButton.addEventListener('click', () => {
        showSection(cartSection);
    });

    viewRegisterButton.addEventListener('click', () => {
        showSection(registerSection);
    });

    viewLoginButton.addEventListener('click', () => {
        showSection(loginSection);
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('#register-username').value;
        const password = registerForm.querySelector('#register-password').value;
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            alert(`Usuario ${data.username} registrado exitosamente`);
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error al registrar. Por favor, inténtalo de nuevo.');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('#login-username').value;
        const password = loginForm.querySelector('#login-password').value;
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            authToken = data.token;
            alert('Inicio de sesión exitoso');
            loginForm.reset();
            showSection(productsSection);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
        }
    });

    function addToCart(product) {
        const item = cart.find(i => i.id === product.id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = cart.length;
    }

    function showSection(section) {
        const sections = [productsSection, cartSection, registerSection, loginSection];
        sections.forEach(s => {
            if (s === section) {
                s.style.display = 'block';
            } else {
                s.style.display = 'none';
            }
        });
    }
;
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    // Crea un elemento div para el producto Samsung A24
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    // Agrega el contenido HTML del producto al div
    productDiv.innerHTML = `
        <img src="images/A24.webp" alt="Samsung A24" width="150" height="150">
        <h2>Samsung A24</h2>
        <p>Precio: $623.600</p>
        <button onclick="addToCart()">Agregar al carrito</button>
    `;

    // Agrega el div del producto al contenedor de productos
    productsContainer.appendChild(productDiv);
});

function addToCart() {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito: Samsung A24');
}
