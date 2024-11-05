// JavaScript
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
        data.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.innerHTML = `
            <p>Tên Phim: ${item.ten_phim}</p>
            <p>Ca Chiếu: ${item.ca_chieu}</p>
            <p>Ngày Chiếu: ${item.ngay_chieu}</p>
            <p>Phòng Chiếu: ${item.phong_chieu}</p>
            <p>Số Ghế: ${item.so_ghe}</p>
            <hr>
          `;
          ketQuaDiv.appendChild(itemDiv);
        });
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
