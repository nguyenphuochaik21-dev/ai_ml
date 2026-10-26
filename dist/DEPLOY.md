# Học AI-NLP trong 3 ngày

## Đưa website lên để chạy Python trên điện thoại

1. Chỉ tải nội dung trong thư mục `dist/` lên dịch vụ host static của bạn. Thư mục này có trang học, 23 slide tư duy code, trình chạy và hướng dẫn; không chứa notebook hoặc PDF gốc.
2. Dùng địa chỉ HTTPS của host để mở `index.html` trên điện thoại. Không mở đường dẫn `file://` nếu muốn bấm Chạy.
3. Bài đọc mở ngay; lần đầu bấm **Chạy code**, trình duyệt tải Pyodide và thư viện cần thiết từ CDN chính thức. Các lần chạy sau dùng runtime đã nạp trong phiên trang.
4. Nếu mất mạng khi tải runtime, thông báo hiện ở ngay thẻ bài; kết nối lại rồi bấm Chạy lần nữa.

## Chạy thử trên máy tính trước khi tải lên

Mở PowerShell tại thư mục `dist` rồi dùng một web server tĩnh, ví dụ:

```powershell
npx --yes http-server . -p 8080
```

Mở `http://localhost:8080` trên máy tính. `localhost` được trình duyệt xem là nguồn an toàn để chạy Web Worker. Để dùng trên điện thoại ở ngoài nhà, cần đưa `dist/` lên host HTTPS; website không tự xuất bản và không cần backend.

## Cách code được xử lý

- Python chạy trong Pyodide/WebAssembly ở trình duyệt, trong worker riêng.
- Code và bài làm không được gửi lên server của khóa học. Trình duyệt chỉ tải runtime/gói từ CDN khi cần.
- Tiến độ và bản nháp lưu trong bộ nhớ cục bộ của trình duyệt trên thiết bị hiện tại.
- Bài spaCy giữ code gốc để học và dùng tokenizer nhỏ minh họa trong ô chạy, vì spaCy/model tiếng Anh không nằm trong bộ gói Pyodide dựng sẵn.
