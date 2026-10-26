document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');

    const API_URL = 'https://dummyjson.com/products';

    async function fetchProducts() {
        try {
            loadingEl.classList.remove('hidden');
            errorEl.classList.add('hidden');

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP Error status: ${response.status}`);
            }

            const data = await response.json();
            
            // 2. Tampilkan data ke DOM
            displayProducts(data.products);
        } catch (error) {
            console.error('Error fetching data:', error);
            errorEl.classList.remove('hidden');
        } finally {
            loadingEl.classList.add('hidden');
        }
    }


    function displayProducts(products) {
        productList.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'mc-item-card';

            card.innerHTML = `
                <div class="mc-item-img-wrapper">
                    <img src="${product.thumbnail}" alt="${product.title}" class="mc-item-img">
                </div>
                <h3 class="mc-item-title">${product.title}</h3>
                <p class="mc-item-category">TYPE: ${product.category.toUpperCase()}</p>
                <p class="mc-item-caption">${product.description}</p>
                <p class="mc-item-price">💎 $${product.price}</p>
            `;

            productList.appendChild(card);
        });
    }

    fetchProducts();
});