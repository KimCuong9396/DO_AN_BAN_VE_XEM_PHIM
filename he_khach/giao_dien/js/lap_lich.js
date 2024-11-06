document.addEventListener("DOMContentLoaded", function () {
  // Lấy danh sách phim từ file JSON
  fetch("/api/phim")
    .then((response) => response.json())
    .then((data) => {
      const selectPhim = document.getElementById("ten_phim");
      data.forEach((phim) => {
        const option = document.createElement("option");
        option.value = phim.ten_phim;
        option.textContent = phim.ten_phim;
        selectPhim.appendChild(option);
      });
    })
    .catch((error) => console.error("Lỗi khi lấy danh sách phim:", error));

  // Hiển thị lịch chiếu
  hienThiLichChieu();
});

function lapLichChieu() {
  const tenPhim = document.getElementById("ten_phim").value;
  const phongChieu = document.getElementById("phong_chieu").value;
  const loaiPhong = document.getElementById("loai_phong").value;
  const soGhe = document.querySelector(
    `#loai_phong option[value="${loaiPhong}"]`
  ).dataset.soGhe;
  const caChieu = document.getElementById("ca_chieu").value;
  const ngayChieu = document.getElementById("ngay_chieu").value;

  const lichChieu = {
    ten_phim: tenPhim,
    phong_chieu: phongChieu,
    loai_phong: loaiPhong,
    so_ghe: parseInt(soGhe),
    ca_chieu: caChieu,
    ngay_chieu: ngayChieu,
  };

  fetch("/api/lap_lich", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lichChieu),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Lập lịch thành công!");
      hienThiLichChieu(); // Cập nhật bảng sau khi lập lịch
    })
    .catch((error) => console.error("Lỗi khi lập lịch chiếu:", error));
}

function hienThiLichChieu() {
  fetch("/api/lich_chieu")
    .then((response) => response.json())
    .then((data) => {
      const ketQuaDiv = document.getElementById("ket_qua");
      ketQuaDiv.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Tên Phim</th>
                <th>Ca Chiếu</th>
                <th>Phòng Chiếu</th>
                <th>Loại Phòng</th>
                <th>Số Ghế</th>
                <th>Ngày Chiếu</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item) => `
                <tr>
                  <td>${item.ten_phim}</td>
                  <td>${item.ca_chieu}</td>
                  <td>${item.phong_chieu}</td>
                  <td>Loại ${item.loai_phong}</td>
                  <td>${item.so_ghe}</td>
                  <td>${item.ngay_chieu}</td>
                  <td>
                    <button onclick="xoaLichChieu('${item.id}')">Xóa</button>
                    <button onclick="suaLichChieu('${item.id}')">Sửa</button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `;
    })
    .catch((error) => console.error("Lỗi khi lấy lịch chiếu:", error));
}

function xoaLichChieu(id) {
  fetch(`/api/lich_chieu/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      alert("Xóa lịch chiếu thành công!");
      hienThiLichChieu();
    })
    .catch((error) => console.error("Lỗi khi xóa lịch chiếu:", error));
}

function suaLichChieu(id) {
  // Xử lý logic sửa lịch chiếu
}
