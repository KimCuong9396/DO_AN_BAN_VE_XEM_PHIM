function ComeBack() {
  const userAccount = localStorage.getItem("account");

  if (userAccount === "nhanvien1") {
    window.location.href = "nhan_vien1.html";
  } else if (userAccount === "nhanvien2") {
    window.location.href = "nhan_vien2.html";
  } else if (userAccount === "nhanvien3") {
    window.location.href = "nhan_vien3.html";
  } else window.location.href = "nhan_vien4.html";
}

// Lấy dữ liệu phim, rạp chiếu từ các endpoint
const getPhim = async () => {
  const response = await fetch("/ban-ve/phim");
  const phimData = await response.json();
  const phimSelect = document.getElementById("phim");
  phimData.forEach((phim) => {
    const option = document.createElement("option");
    option.value = phim.ten_phim;
    option.textContent = phim.ten_phim;
    phimSelect.appendChild(option);
  });
};

const getRapChieu = async () => {
  const response = await fetch("/ban-ve/rap-chieu");
  const rapChieuData = await response.json();
  const rapSelect = document.getElementById("rap");
  rapChieuData.forEach((rap) => {
    const option = document.createElement("option");
    option.value = rap.ten_rap;
    option.textContent = rap.ten_rap;
    rapSelect.appendChild(option);
  });
};

// Hiển thị lịch chiếu dựa trên các lựa chọn
const showLichChieu = async () => {
  const phim = document.getElementById("phim").value;
  const rap = document.getElementById("rap").value;
  const caChieu = document.getElementById("ca_chieu").value;

  if (phim && rap && caChieu) {
    const response = await fetch("/ban-ve/lich-chieu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ten_phim: phim,
        rap_chieu: rap,
        ca_chieu: caChieu,
      }),
    });
    const data = await response.json();
    if (data.lich_chieu) {
      renderLichChieu(data.lich_chieu);
    } else {
      alert("Không có lịch chiếu trùng khớp!");
    }
  } else {
    alert("Vui lòng chọn đầy đủ thông tin!");
  }
};

// Hiển thị danh sách lịch chiếu
const renderLichChieu = (lichChieu) => {
  const lichChieuList = document.getElementById("lich_chieu_list");
  lichChieuList.innerHTML = ""; // Clear list
  lichChieu.forEach((lich) => {
    const div = document.createElement("div");
    div.classList.add("lich-chieu");
    div.innerHTML = `
          <p>Phim: ${lich.ten_phim}, Rạp: ${lich.rap_chieu}, Ca chiếu: ${lich.ca_chieu}</p>
          <button onclick="showSeatChart('${lich.phong_chieu}', ${lich.so_ghe})">Chọn ghế</button>
      `;
    lichChieuList.appendChild(div);
  });
};

// Hiển thị sơ đồ ghế
const showSeatChart = (phongChieu, soGhe) => {
  const seatChart = document.getElementById("seat_chart");
  seatChart.style.display = "block";
  seatChart.innerHTML = ""; // Clear previous seats

  // Tạo sơ đồ ghế
  for (let i = 1; i <= soGhe; i++) {
    const seat = document.createElement("button");
    seat.classList.add("seat");
    seat.textContent = `Ghế ${i}`;
    seat.onclick = () => selectSeat(seat, i);
    seatChart.appendChild(seat);
  }
};

// Xử lý sự kiện chọn ghế
let selectedSeats = [];
const selectSeat = (seat, index) => {
  if (seat.style.backgroundColor === "red") {
    seat.style.backgroundColor = ""; // Deselect seat
    selectedSeats = selectedSeats.filter((seat) => seat !== index);
  } else {
    seat.style.backgroundColor = "red"; // Select seat
    selectedSeats.push(index);
  }
};

// Xác nhận bán vé
const confirmBooking = () => {
  const tenPhim = document.getElementById("phim").value;
  const rap = document.getElementById("rap").value;
  const caChieu = document.getElementById("ca_chieu").value;
  const nhanVien = "Nhân viên 1"; // Example, can be dynamic

  fetch("/ban-ve/ban-ve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ten_phim: tenPhim,
      rap_chieu: rap,
      ca_chieu: caChieu,
      soGheChon: selectedSeats,
      nhanVien: nhanVien,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      }
    });
};

document
  .getElementById("showSeatsBtn")
  .addEventListener("click", showLichChieu);
document
  .getElementById("confirmBookingBtn")
  .addEventListener("click", confirmBooking);

// Khởi tạo dữ liệu
getPhim();
getRapChieu();
