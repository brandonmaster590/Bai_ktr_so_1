class SchoolSystem {
  constructor() {
    this.danhSach = [];
    this.soLuongHocSinh = 0;
  }

  // 1. Khởi tạo dữ liệu ban đầu
  khoiTao(ds = []) {
    this.danhSach = [...ds];
    this.soLuongHocSinh = this.danhSach.length;
    console.log(`Đã khởi tạo hệ thống với ${this.soLuongHocSinh} học sinh.`);
  }

  // 2. Thêm học sinh và tự động sinh mã
  themHocSinh(hocSinhMoi) {
    const namHienTai = new Date().getFullYear();
    this.soLuongHocSinh++;
    
    // Sinh mã: ma + năm + số thứ tự (ví dụ: ma20251)
    const maHS = `ma${namHienTai}${this.soLuongHocSinh}`;
    
    const hoanThienHocSinh = {
      maHS,
      ...hocSinhMoi
    };
    
    this.danhSach.push(hoanThienHocSinh);
    return maHS;
  }

  // 3. Tìm học sinh theo mã
  timHocSinh(maHS) {
    if (!maHS.startsWith("ma")) return null;
    return this.danhSach.find(hs => hs.maHS === maHS) || null;
  }

  // 4. Cập nhật thông tin học sinh
  capNhatThongTin(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;

    // Loại bỏ maHS khỏi duLieuMoi để tránh ghi đè mã
    const { maHS: _, ...duLieuHopLe } = duLieuMoi;
    
    this.danhSach[index] = { ...this.danhSach[index], ...duLieuHopLe };
    return true;
  }

  // 5. Xóa học sinh
  xoaHocSinh(maHS) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;

    this.danhSach.splice(index, 1);
    return true;
  }

  // 6. Lấy danh sách theo lớp
  layDanhSachTheoLop(tenLop) {
    return this.danhSach.filter(hs => hs.lopHoc === tenLop);
  }

  // 7. Thống kê học lực
  thongKeHocLuc() {
    const thongKe = {
      "Xuất Sắc": 0,
      "Giỏi": 0,
      "Khá": 0,
      "Trung Bình": 0,
      "Kém": 0
    };

    this.danhSach.forEach(hs => {
      const d = hs.diemTB;
      if (d >= 9.0) thongKe["Xuất Sắc"]++;
      else if (d >= 8.0) thongKe["Giỏi"]++;
      else if (d >= 6.5) thongKe["Khá"]++;
      else if (d >= 5.0) thongKe["Trung Bình"]++;
      else thongKe["Kém"]++;
    });

    return thongKe;
  }

  // 8. Sắp xếp theo điểm trung bình
  sapXepTheoDiem(kieuSapXep = 'giam') {
    // Tạo bản sao bằng Spread Operator để không làm thay đổi mảng gốc
    const banSao = [...this.danhSach];
    return banSao.sort((a, b) => {
      return kieuSapXep === 'tang' 
        ? a.diemTB - b.diemTB 
        : b.diemTB - a.diemTB;
    });
  }
}