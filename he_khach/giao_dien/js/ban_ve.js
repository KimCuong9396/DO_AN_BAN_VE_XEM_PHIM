document.getElementById("timKiemForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngừng hành động mặc định của form

  const tenPhim = document.getElementById("tenPhim").value;

  if (!tenPhim.trim()) {
    alert("Tên phim không được để trống");
    return;
  }

  // Gửi yêu cầu tìm kiếm lịch chiếu
  fetch(`/api/tim-kiem?tenPhim=${encodeURIComponent(tenPhim)}`)
    .then((response) => response.json())
    .then((data) => {
      const ketQuaDiv = document.getElementById("ketQuaTimKiem");
      ketQuaDiv.innerHTML = ""; // Xóa kết quả trước đó

      if (data.status === "found") {
        ketQuaDiv.innerHTML = `<h3>Kết quả tìm kiếm:</h3>`;
        data.lichChieu.forEach((lich, index) => {
          ketQuaDiv.innerHTML += `
                      <p><strong>Phim:</strong> ${lich.ten_phim}</p>
                      <p><strong>Phòng chiếu:</strong> ${lich.phong_chieu}</p>
                      <p><strong>Loại phòng:</strong> ${lich.loai_phong}</p>
                      <p><strong>Số ghế còn lại:</strong> ${lich.so_ghe}</p>
                      <p><strong>Ca chiếu:</strong> ${lich.ca_chieu}</p>
                      <p><strong>Ngày chiếu:</strong> ${lich.ngay_chieu}</p>
                      <button class="banVeBtn" data-phim="${lich.ten_phim}" data-phong="${lich.phong_chieu}" data-ngay="${lich.ngay_chieu}" data-soGhe="${lich.so_ghe}">Bán vé</button>
                      <hr>
                  `;
        });

        // Gắn sự kiện cho các nút bán vé
        const banVeBtns = document.querySelectorAll(".banVeBtn");
        banVeBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const tenPhim = btn.getAttribute("data-phim");
            const phongChieu = btn.getAttribute("data-phong");
            const ngayChieu = btn.getAttribute("data-ngay");
            const soGheConLai = parseInt(btn.getAttribute("data-soGhe"));

            // Hiển thị form bán vé
            const formDiv = document.getElementById("formBanVe");
            formDiv.innerHTML = `
                          <h3>Bán vé cho phim: ${tenPhim}</h3>
                          <label for="soLuongVe">Số lượng vé:</label>
                          <input type="number" id="soLuongVe" min="1" max="${soGheConLai}" required>
                          <button id="xacNhanBanVe">Xác nhận bán vé</button>
                      `;

            document
              .getElementById("xacNhanBanVe")
              .addEventListener("click", function () {
                const soLuongVe = parseInt(
                  document.getElementById("soLuongVe").value
                );

                if (soLuongVe > soGheConLai) {
                  alert("Số lượng vé yêu cầu vượt quá số ghế còn lại");
                } else {
                  // Gửi yêu cầu bán vé
                  fetch("/api/ban-ve", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tenPhim,
                      phongChieu,
                      soGhe: soGheConLai,
                      soLuongVe,
                      ngayChieu,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status === "success") {
                        alert("Vé bán thành công");
                        formDiv.innerHTML = `<p>Vé bán thành công! Số ghế còn lại: ${data.soGheConLai}</p>`;
                      } else {
                        alert("Lỗi khi bán vé");
                      }
                    })
                    .catch((err) => console.error("Lỗi:", err));
                }
              });
          });
        });
      } else {
        ketQuaDiv.innerHTML = `<p class="alert">${data.message}</p>`;
      }
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      alert("Đã xảy ra lỗi khi tìm kiếm.");
    });
});
