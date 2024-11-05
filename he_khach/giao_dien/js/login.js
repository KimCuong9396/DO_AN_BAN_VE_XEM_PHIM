function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.role === "nhanvien") {
        window.location.href = "nhan_vien.html";
      } else if (data.role === "quanly") {
        window.location.href = "quan_ly.html";
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    });
}
