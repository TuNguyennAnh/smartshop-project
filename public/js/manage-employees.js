const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/users/employees", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("employeeList");
    data.employees.forEach(emp => {
      const li = document.createElement("li");
      li.textContent = emp.username;
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error(err);
    alert("Lỗi khi tải danh sách nhân viên");
  });

  const form = document.getElementById("createEmployeeForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch("/api/users/create-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();
    document.getElementById("status").textContent = result.message || "Xong!";
    if (res.ok) location.reload();
  });
});
