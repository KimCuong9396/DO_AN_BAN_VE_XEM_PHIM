document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.role === "nhanvien") {
          window.location.href = "nhan_vien.html";
        } else if (result.role === "quanly") {
          window.location.href = "quan_ly.html";
        }
      } else {
        alert(result.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      alert("Không thể kết nối đến server.");
    }
  });
