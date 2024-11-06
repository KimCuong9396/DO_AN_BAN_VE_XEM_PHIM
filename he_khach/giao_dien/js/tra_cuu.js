function traCuu() {
  const tenPhim = document.getElementById("ten_phim").value;
  const caChieu = document.getElementById("ca_chieu").value;
  const ngayChieu = document.getElementById("ngay_chieu").value;

  const query = `ten_phim=${tenPhim}&ca_chieu=${caChieu}&ngay_chieu=${ngayChieu}`;
  const url = `http://localhost:5000/api/tra_cuu?${query}`;

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
