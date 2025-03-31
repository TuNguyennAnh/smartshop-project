const token = localStorage.getItem('token');
const inventoryUrl = 'https://smartshop-server.onrender.com/api/inventory';

const form = document.getElementById('inventoryForm');
const tableBody = document.querySelector('#inventoryTable tbody');

// Thêm lịch sử kho
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const item = {
    sku: form.sku.value,
    quantity: Number(form.quantity.value),
    type: form.type.value
  };

  const res = await fetch(inventoryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(item)
  });

  if (res.ok) {
    form.reset();
    loadInventory();
  } else {
    alert('❌ Thao tác thất bại');
  }
});

// Load lịch sử kho
async function loadInventory() {
  const res = await fetch(inventoryUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  tableBody.innerHTML = '';
  data.forEach((log) => {
    const row = `<tr>
      <td>${log.sku}</td>
      <td>${log.quantity}</td>
      <td>${log.type === 'import' ? 'Nhập kho' : 'Xuất kho'}</td>
      <td>${new Date(log.createdAt).toLocaleString()}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

loadInventory();
