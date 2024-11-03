// /he_khach/giao_dien/js/tra_cuu.js
function showTraCuu() {
  document.getElementById("content").innerHTML = `
      <h2>Tra cứu Xuất Chiếu</h2>
      <label for="tenPhim">Tên Phim:</label>
      <input type="text" id="tenPhim"><br>
      <label for="caChieu">Ca Chiếu:</label>
      <input type="text" id="caChieu"><br>
      <label for="ngayChieu">Ngày Chiếu:</label>
      <input type="date" id="ngayChieu"><br>
      <button onclick="traCuu()">Tra Cứu</button>
      <div id="traCuuResult"></div>
  `;
}

function traCuu() {
  const tenPhim = document.getElementById("tenPhim").value;
  const caChieu = document.getElementById("caChieu").value;
  const ngayChieu = document.getElementById("ngayChieu").value;

  const query = new URLSearchParams({ tenPhim, caChieu, ngayChieu }).toString();

  fetch(`/api/tra_cuu_xuat_chieu?${query}`)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("traCuuResult");
      resultDiv.innerHTML = "<h3>Kết quả tra cứu:</h3>";

      data.forEach((xc) => {
        resultDiv.innerHTML += `
              <p>Phim: ${xc.tenPhim} - Ca: ${xc.caChieu} - Ngày: ${xc.ngayChieu} - Ghế Trống: ${xc.soGheTrong}</p>
          `;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
