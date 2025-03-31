const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      data.products.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.name} - ${p.price}đ - Còn: ${p.stock}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Lỗi tải sản phẩm");
    });

  const form = document.getElementById("createProductForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, price, stock })
    });

    const result = await res.json();
    document.getElementById("status").textContent = result.message || "Xong!";
    if (res.ok) location.reload();
  });
});
