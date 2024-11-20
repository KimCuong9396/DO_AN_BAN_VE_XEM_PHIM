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
              <th>Ngày Chiếu</th>
              <th>Phòng Chiếu</th>
              <th>Số Ghế</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");
        const userAccount = localStorage.getItem("account");

        data.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.ten_phim}</td>
            <td>${item.ca_chieu}</td>
            <td>${item.ngay_chieu}</td>
            <td>${item.phong_chieu}</td>
            <td>${item.so_ghe}</td>
            <td></td>
          `;

          // Thêm nút "Bán vé" nếu người dùng là nhân viên
          if (
            userAccount === "nhanvien1" ||
            userAccount === "nhanvien2" ||
            userAccount === "nhanvien3" ||
            userAccount === "nhanvien4"
          ) {
            const buttonCell = row.querySelector("td:last-child");
            const banVeButton = document.createElement("button");
            banVeButton.textContent = "Bán vé";
            banVeButton.onclick = () => {
              window.location.href = "ban_ve.html";
            };
            buttonCell.appendChild(banVeButton);
          }

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

function ComeBack() {
  const userAccount = localStorage.getItem("account");

  if (userAccount === "quanly1") {
    window.location.href = "quan_ly1.html";
  } else if (userAccount === "quanly2") {
    window.location.href = "quan_ly2.html";
  } else if (userAccount === "nhanvien1") {
    window.location.href = "nhan_vien1.html";
  } else if (userAccount === "nhanvien2") {
    window.location.href = "nhan_vien2.html";
  } else if (userAccount === "nhanvien3") {
    window.location.href = "nhan_vien3.html";
  } else window.location.href = "nhan_vien4.html";
}
