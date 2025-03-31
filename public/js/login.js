const res = await fetch("https://smartshop-server.onrender.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password })
});