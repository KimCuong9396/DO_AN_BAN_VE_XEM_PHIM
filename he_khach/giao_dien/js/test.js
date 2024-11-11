document.addEventListener("DOMContentLoaded", () => {
  // Gọi API để lấy danh sách phim và hiển thị trong dropdown
  fetch("/api/lapLich/getFilms")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ API");
      }
      return response.json();
    })
    .then((films) => {
      const filmSelect = document.getElementById("film");
      filmSelect.innerHTML = ""; // Xóa các lựa chọn cũ (nếu có)

      // Kiểm tra dữ liệu và thêm vào dropdown
      films.forEach((film) => {
        const option = document.createElement("option");
        option.value = film.ten_phim;
        option.textContent = film.ten_phim;
        filmSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Lỗi khi lấy danh sách phim:", error));
});
