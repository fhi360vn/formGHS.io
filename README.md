# Biểu mẫu báo cáo GHS trên GitHub Pages

Ứng dụng web tĩnh để nhập 4 nhóm báo cáo:

- Sự kiện RCCE
- Tài liệu RCCE
- Can thiệp chủ động
- Outbreak

Sau khi nhập, người dùng tải file Excel `.xlsx` gồm đúng **3 sheet**:

1. `RCCE`: gộp phần Sự kiện và Tài liệu.
2. `CAN THIỆP`: trình bày theo cấu trúc 23 cột và bảng nhân sự đào tạo.
3. `OUTBREAK`: trình bày dạng biểu mẫu dọc, gồm dấu hiệu cảnh báo, đáp ứng ban đầu và 7-1-7.

## Tính năng

- Chữ mờ hướng dẫn trong ô nhập liệu; tự biến mất khi người dùng nhập.
- Danh mục chọn theo file biểu mẫu Excel gốc.
- Trường nhập thay đổi theo điều kiện lựa chọn.
- Thêm, sửa, xóa nhiều bản ghi.
- Tự lưu nháp bằng `localStorage` của trình duyệt.
- Không cần máy chủ và không gửi dữ liệu ra ngoài.
- Giao diện phù hợp máy tính, máy tính bảng và điện thoại.
- Xuất Excel trực tiếp trên trình duyệt bằng ExcelJS.

## Đưa lên GitHub Pages

1. Tạo một repository mới trên GitHub, ví dụ `ghs-report`.
2. Tải toàn bộ các file trong thư mục này lên nhánh `main`.
3. Vào **Settings → Pages**.
4. Tại **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn nhánh `main`, thư mục `/ (root)`, rồi bấm **Save**.
6. Sau khi GitHub hoàn tất, truy cập địa chỉ dạng:
   `https://TEN-TAI-KHOAN.github.io/ghs-report/`

## Cấu trúc file

- `index.html`: giao diện chính.
- `styles.css`: định dạng và giao diện responsive.
- `app.js`: biểu mẫu, lưu dữ liệu, điều kiện nhập và xuất Excel.
- `.nojekyll`: yêu cầu GitHub Pages phục vụ trực tiếp các file tĩnh.
- `preview.png`: ảnh xem trước giao diện.

## Lưu ý vận hành

Ứng dụng sử dụng thư viện ExcelJS từ CDN. Khi người dùng bấm tải Excel, trình duyệt cần có kết nối Internet để tải thư viện trong lần đầu. Dữ liệu báo cáo vẫn chỉ được xử lý trong trình duyệt của người dùng.
