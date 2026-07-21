# GHS Reporting Portal – GitHub Pages

Ứng dụng web tĩnh chuyển đổi từ biểu mẫu Excel nguồn, gồm các menu:

- **Hướng dẫn**
- **Báo cáo → Sự kiện**
- **Báo cáo → Tài liệu**
- **Báo cáo → Can thiệp**
- **Báo cáo → Outbreak**

## Chức năng chính

- Chữ hướng dẫn màu mờ (`placeholder`) nằm trong ô nhập và tự biến mất khi người dùng nhập dữ liệu.
- Danh mục lựa chọn bám theo file Excel nguồn.
- Hiển thị trường theo điều kiện:
  - Sự kiện: số lượng ước tính hoặc bảng chi tiết người tham dự.
  - Can thiệp: spillover, đào tạo/tập huấn, mua sắm thiết bị.
  - Outbreak: thông tin đợt dịch, đáp ứng ban đầu và 7-1-7 khi cần ứng phó.
- Lưu nhiều bản ghi trên trình duyệt bằng Local Storage.
- Xuất file `.xlsx` **không macro**, gồm đúng 3 sheet:
  1. `SỰ KIỆN`
  2. `TÀI LIỆU`
  3. `CAN THIỆP-OUTBREAK` — gồm hai bảng riêng trong cùng sheet.

## Triển khai GitHub Pages

1. Tạo một repository mới trên GitHub.
2. Tải toàn bộ file và thư mục trong gói này lên nhánh `main`.
3. Vào **Settings → Pages**.
4. Tại **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn nhánh `main`, thư mục `/(root)`, sau đó bấm **Save**.
6. Mở đường dẫn GitHub Pages được GitHub cung cấp.

## Lưu ý kỹ thuật

- Ứng dụng không cần máy chủ và không gửi dữ liệu lên Internet.
- Dữ liệu nhập chỉ nằm trong Local Storage của trình duyệt trên thiết bị đang sử dụng.
- File Excel được tạo trực tiếp trên trình duyệt bằng bộ sinh XLSX thuần JavaScript đi kèm mã nguồn; không cần CDN và không cần cài thư viện.
