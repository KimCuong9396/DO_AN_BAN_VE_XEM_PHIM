// /he_khach/giao_dien/js/ban_ve.js
function showBanVe() {
  document.getElementById("content").innerHTML = `
      <h2>Bán Vé</h2>
      <label for="xuatChieuId">Mã Xuất Chiếu:</label>
      <input type="text" id="xuatChieuId" required><br>
      <label for="soLuongVe">Số Lượng Vé:</label>
      <input type="number" id="soLuongVe" required><br>
      <button onclick="banVe()">Bán Vé</button>
      <p id="result"></p>
  `;
}

function banVe() {
  const xuatChieuId = document.getElementById("xuatChieuId").value;
  const soLuongVe = document.getElementById("soLuongVe").value;

  fetch("/api/ban_ve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ xuatChieuId, soLuongVe: parseInt(soLuongVe) }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerText = data.message;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
