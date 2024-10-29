document.addEventListener("DOMContentLoaded", function () {
  // Gọi API để lấy danh sách phim hoặc thông tin cần thiết khác
  fetch("/api/phim")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const phimList = data.data;
        const container = document.getElementById("phim-container");
        phimList.forEach((phim) => {
          const phimItem = document.createElement("div");
          phimItem.innerHTML = `
                        <h3>${phim.ten}</h3>
                        <p>Thể loại: ${phim.the_loai}</p>
                        <button onclick="datVe('${phim.id}')">Đặt Vé</button>
                    `;
          container.appendChild(phimItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching phim:", error));
});

function datVe(phimId) {
  const soLuong = prompt("Nhập số lượng vé:");
  if (soLuong) {
    fetch("/api/ve/dat-ve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tenPhim: phimId, soLuong: Number(soLuong) }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => console.error("Error đặt vé:", error));
  }
}
