// Hàm tra cứu lịch chiếu
function traCuu() {
  const tenPhim = document.getElementById("ten_phim").value;
  const caChieu = document.getElementById("ca_chieu").value;
  const ngayChieu = document.getElementById("ngay_chieu").value;

  const query = `ten_phim=${tenPhim}&ca_chieu=${caChieu}&ngay_chieu=${ngayChieu}`;
  const url = `http://localhost:5000/api/lich-chieu?${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const ketQuaDiv = document.getElementById("ket_qua");
      ketQuaDiv.innerHTML = ""; // Xóa kết quả cũ

      if (data.length > 0) {
        const table = document.createElement("table");
        table.innerHTML = `
                  <thead>
                      <tr>
                          <th>Tên Phim</th>
                          <th>Ca Chiếu</th>
                          <th>Giờ Chiếu</th>
                          <th>Ngày Chiếu</th>
                          <th>Phòng Chiếu</th>
                          <th>Số Ghế</th>
                          <th>Chọn</th>
                      </tr>
                  </thead>
                  <tbody></tbody>
              `;
        const tbody = table.querySelector("tbody");

        data.forEach((item) => {
          const caChieuGio = {
            Sáng: "9h00 - 11h00",
            Chiều: "14h00 - 16h00",
            Tối1: "18h00 - 20h00",
            Tối2: "20h30 - 22h30",
          };

          const row = document.createElement("tr");
          row.innerHTML = `
                      <td>${item.ten_phim}</td>
                      <td>${item.ca_chieu}</td>
                      <td>${caChieuGio[item.ca_chieu]}</td>
                      <td>${item.ngay_chieu}</td>
                      <td>${item.phong_chieu}</td>
                      <td>${item.so_ghe}</td>
                      <td><button onclick="chonVe(${item.id}, ${
            item.so_ghe
          })">Chọn Ghế</button></td>
                  `;
          tbody.appendChild(row);
        });

        ketQuaDiv.appendChild(table);
      } else {
        ketQuaDiv.innerHTML = "<p>Không tìm thấy kết quả.</p>";
      }
    })
    .catch((error) => {
      console.error("Lỗi khi tra cứu:", error);
      document.getElementById("ket_qua").innerHTML =
        "<p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>";
    });
}

// Hàm chọn vé và hiển thị sơ đồ ghế
function chonVe(id, soGhe) {
  const soDoGheDiv = document.getElementById("so_do_ghe");
  soDoGheDiv.innerHTML = ""; // Xóa sơ đồ ghế cũ

  // Tạo sơ đồ ghế
  for (let i = 1; i <= soGhe; i++) {
    const button = document.createElement("button");
    button.innerText = `Ghế ${i}`;
    button.onclick = () => chonGhese(id, i);
    soDoGheDiv.appendChild(button);
  }

  // Hiển thị form đặt vé
  document.getElementById("form_dat_ve").style.display = "block";
}

// Hàm chọn ghế
function chonGhese(id, ghe) {
  // Lưu ghế đã chọn vào một biến toàn cục hoặc trong session để gửi khi bán vé
  console.log(`Chọn ghế ${ghe} cho lịch chiếu ${id}`);
}

// Xác nhận bán vé
function xacNhanBanVe() {
  const seats = [1, 2, 3]; // Danh sách ghế đã chọn, ví dụ ghế 1, 2, 3 (cần lấy từ giao diện người dùng)
  const idLichChieu = 1; // ID của lịch chiếu đang chọn (lấy từ khi chọn ghế)

  fetch(`http://localhost:5000/api/ban-ve/${idLichChieu}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seats: seats }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); // Thông báo bán vé thành công
    })
    .catch((error) => {
      console.error("Lỗi khi bán vé:", error);
    });
}
