const token = localStorage.getItem('token');
const apiUrl = 'https://smartshop-server.onrender.com/api/products';

// DOM
const form = document.getElementById('productForm');
const tableBody = document.querySelector('#productTable tbody');

// Tạo sản phẩm mới
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const product = {
    name: form.name.value,
    sku: form.sku.value,
    price: form.price.value,
    quantity: form.quantity.value,
    category: form.category.value,
    description: form.description.value
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  if (res.ok) {
    form.reset();
    loadProducts();
  } else {
    alert('❌ Thêm sản phẩm thất bại');
  }
});

// Hiển thị sản phẩm
async function loadProducts() {
  const res = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const products = await res.json();
  tableBody.innerHTML = '';
  products.forEach((p) => {
    const row = `<tr>
      <td>${p.name}</td>
      <td>${p.sku}</td>
      <td>${p.price}</td>
      <td>${p.quantity}</td>
      <td>${p.category || ''}</td>
      <td>
        <button onclick="deleteProduct('${p._id}')">🗑️ Xóa</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Xóa sản phẩm
async function deleteProduct(id) {
  const confirmDelete = confirm('Bạn có chắc muốn xóa sản phẩm này?');
  if (!confirmDelete) return;

  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  loadProducts();
}

loadProducts();
