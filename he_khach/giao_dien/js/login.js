document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/dang-nhap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.role === "nhan_vien") {
            window.location.href = "nhan_vien.html";
          } else {
            window.location.href = "quan_ly.html";
          }
        } else {
          alert("Đăng nhập thất bại");
        }
      });
  });
