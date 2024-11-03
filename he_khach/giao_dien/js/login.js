document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("error");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "nhan_vien") {
          window.location.href = "nhan_vien.html";
        } else if (data.role === "quan_ly") {
          window.location.href = "quan_ly.html";
        }
      } else {
        errorDiv.textContent = data.message;
      }
    } catch (error) {
      errorDiv.textContent = "Đã xảy ra lỗi. Vui lòng thử lại.";
    }
  });
