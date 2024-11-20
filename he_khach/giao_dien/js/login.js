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
      if (data.role) {
        // Lưu thông tin tài khoản đăng nhập vào localStorage
        localStorage.setItem("account", data.role);

        if (data.role === "nhanvien1") {
          window.location.href = "nhan_vien1.html";
        } else if (data.role === "nhanvien2") {
          window.location.href = "nhan_vien2.html";
        } else if (data.role === "nhanvien3") {
          window.location.href = "nhan_vien3.html";
        } else if (data.role === "nhanvien4") {
          window.location.href = "nhan_vien4.html";
        } else if (data.role === "quanly1") {
          window.location.href = "quan_ly1.html";
        } else if (data.role === "quanly2") {
          window.location.href = "quan_ly2.html";
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu");
        }
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    });
}
