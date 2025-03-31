const token = localStorage.getItem('token');
if (!token) {
  alert('Bạn chưa đăng nhập!');
  window.location.href = 'login.html';
}

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

const API_URL = 'https://<YOUR_BACKEND_RENDER_URL>/api/products';

function fetchProducts() {
  fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      productList.innerHTML = '';
      data.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${p.name}</strong> - ${p.price}đ - SL: ${p.quantity}
          <button onclick="deleteProduct('${p._id}')">🗑️ Xóa</button>
        `;
        productList.appendChild(li);
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const product = {
    name: form.name.value,
    price: form.price.value,
    quantity: form.quantity.value,
    category: form.category.value,
    image: form.image.value,
    description: form.description.value,
  };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      fetchProducts();
    });
});

function deleteProduct(id) {
  if (!confirm('Xác nhận xoá sản phẩm?')) return;
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(() => fetchProducts());
}

fetchProducts();
