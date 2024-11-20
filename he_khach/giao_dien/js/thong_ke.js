// thong_ke.js

// Xử lý sự kiện khi nhấn nút "Thống Kê"
document.getElementById("thongKeBtn").addEventListener("click", function () {
  const month = document.getElementById("monthSelect").value; // Lấy tháng chọn từ dropdown
  fetch(`/thongke/${month}`)
    .then((response) => response.json())
    .then((data) => hienThiThongKe(data))
    .catch((error) => console.error("Lỗi:", error));
});

// Hàm hiển thị thống kê
function hienThiThongKe(thongKe) {
  const thang = thongKe.thang;
  const tongSoVe = thongKe.tongSoVe;

  let html = `<h2>Tháng: ${thang}-2024</h2>`;
  html += `<div class="footer">Tổng số vé bán: ${tongSoVe}</div>`;

  html += `
    <table>
      <thead>
        <tr>
          <th>Ca chiếu</th>
          <th>Số vé bán</th>
          <th>Tỷ lệ (%)</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Hiển thị chi tiết từng ca chiếu
  thongKe.chiTiet.forEach((caChieu) => {
    const soVeBan = caChieu.soVeBan;
    const tyLe = ((soVeBan / tongSoVe) * 100).toFixed(2);

    html += `
      <tr>
        <td>${caChieu.caChieu}</td>
        <td>${soVeBan}</td>
        <td>${tyLe}%</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  // Đưa HTML vào trang
  document.getElementById("thongKeVebanh").innerHTML = html;
}
