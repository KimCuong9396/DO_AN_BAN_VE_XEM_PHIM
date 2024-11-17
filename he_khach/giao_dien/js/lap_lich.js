document.addEventListener("DOMContentLoaded", () => {
  // Gọi API để lấy danh sách phim và hiển thị trong dropdown
  fetch("http://localhost:5000/api/lapLich/getFilms")
    .then((response) => response.json())
    .then((films) => {
      const filmSelect = document.getElementById("film");
      filmSelect.innerHTML = "<option value=''>Chọn phim</option>"; // Xóa các lựa chọn cũ
      films.forEach((film) => {
        const option = document.createElement("option");
        option.value = film.ten_phim;
        option.textContent = film.ten_phim;
        filmSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Lỗi khi lấy danh sách phim:", error));

  // Lập lịch chiếu
  document
    .getElementById("scheduleForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const film = document.getElementById("film").value;
      const phong_chieu = document.getElementById("phong_chieu").value;
      const loai_phong = document.getElementById("loai_phong").value;
      const so_ghe =
        document.getElementById("loai_phong").selectedOptions[0].dataset.ghe;
      const ca_chieu = document.getElementById("ca_chieu").value;
      const ngay_chieu = document.getElementById("ngay_chieu").value;

      const scheduleData = {
        ten_phim: film,
        phong_chieu,
        loai_phong,
        so_ghe,
        ca_chieu,
        ngay_chieu,
      };

      // Gửi dữ liệu tạo lịch chiếu
      fetch("http://localhost:5000/api/lapLich/createSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          loadSchedules(); // Reload lịch chiếu
        })
        .catch((error) => console.error("Error creating schedule:", error));
    });

  // Load lịch chiếu
  function loadSchedules() {
    fetch("http://localhost:5000/api/lapLich/getSchedules")
      .then((response) => response.json())
      .then((schedules) => {
        const scheduleTable = document
          .getElementById("scheduleTable")
          .getElementsByTagName("tbody")[0];
        scheduleTable.innerHTML = ""; // Clear previous table rows
        schedules.forEach((schedule, index) => {
          const row = scheduleTable.insertRow();
          row.innerHTML = `
            <td>${schedule.ten_phim}</td>
            <td>${schedule.phong_chieu}</td>
            <td>${schedule.loai_phong}</td>
            <td>${schedule.ca_chieu}</td>
            <td>${schedule.ngay_chieu}</td>
            <td>${schedule.so_ghe}</td>
            <td>
              <button onclick="deleteSchedule(${index})">Xóa</button>
              <button onclick="editSchedule(${index})">Sửa</button>
            </td>
          `;
        });
      });
  }

  loadSchedules();

  // Xóa lịch chiếu
  window.deleteSchedule = function (index) {
    fetch("http://localhost:5000/api/lapLich/deleteSchedule", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        loadSchedules(); // Reload lịch chiếu sau khi xóa
      });
  };
});

function ComeBack() {
  // Quay về trang đăng nhập
  window.location.href = "quan_ly.html";
}
