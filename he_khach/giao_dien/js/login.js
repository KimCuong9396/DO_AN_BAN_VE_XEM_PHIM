// /he_khach/giao_dien/js/login.js
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        document.getElementById("errorMsg").innerText = data.message;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
