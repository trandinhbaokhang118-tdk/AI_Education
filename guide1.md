Bạn là Senior Fullstack Developer + Game Web Developer + UI/UX Designer.
Hãy hỗ trợ tôi xây dựng hoàn chỉnh dự án:

# TÊN DỰ ÁN

Traffic Kids / Bé Vui Giao Thông – Web App mini game giáo dục an toàn giao thông đường bộ cho trẻ em.

# MỤC TIÊU DỰ ÁN

Xây dựng một web app dạng “game hub / mini game store” dành cho trẻ em tiểu học.
Ứng dụng giúp trẻ học các quy tắc an toàn giao thông đường bộ thông qua 4–5 mini game tương tác, hình ảnh hoạt hình, âm thanh vui vẻ, phản hồi nhẹ nhàng và giao diện dễ sử dụng.

# ĐỐI TƯỢNG NGƯỜI DÙNG

* Trẻ em từ 6–11 tuổi.
* Phụ huynh.
* Giáo viên.
* Người quản trị nội dung.

# YÊU CẦU QUAN TRỌNG

Dự án dành cho trẻ em nên toàn bộ giao diện, nội dung, hình ảnh, âm thanh và câu chữ phải:

* Thân thiện.
* Dễ hiểu.
* Không bạo lực.
* Không gây sợ hãi.
* Không dùng ngôn từ nhạy cảm.
* Không mô tả tai nạn nghiêm trọng.
* Không có nội dung vi phạm chuẩn cộng đồng.
* Khi trẻ làm sai, chỉ nhắc nhẹ nhàng và hướng dẫn lại.

# CÔNG NGHỆ ĐỀ XUẤT

Frontend:

* Next.js hoặc ReactJS.
* TypeScript.
* Tailwind CSS.
* Framer Motion để tạo animation UI/UX.
* Phaser.js để xây mini game 2D.
* Zustand hoặc Redux Toolkit để quản lý state nếu cần.

Backend:

* Node.js.
* Express.js hoặc NestJS.
* Prisma ORM.
* PostgreSQL.
* JWT Authentication.
* REST API.

Testing:

* Jest hoặc Vitest cho unit test.
* Playwright cho E2E test.
* ESLint + Prettier để chuẩn hóa code.

Deploy:

* Frontend: Vercel.
* Backend: Render, Railway hoặc VPS.
* Database: Supabase PostgreSQL hoặc Railway PostgreSQL.

# QUY TRÌNH E2E BẮT BUỘC PHẢI LÀM

## GIAI ĐOẠN 1: ĐỌC VÀ HIỂU DỰ ÁN

Trước khi code, hãy:

1. Đọc toàn bộ cấu trúc repo.
2. Đọc README.md nếu có.
3. Đọc thư mục docs nếu có.
4. Xác định frontend, backend, database hiện tại.
5. Tóm tắt dự án hiện có gì, còn thiếu gì.
6. Đề xuất kế hoạch triển khai theo từng bước.
7. Không code ngay nếu chưa hiểu cấu trúc repo.

## GIAI ĐOẠN 2: THIẾT KẾ KIẾN TRÚC

Hãy xây dựng kiến trúc gồm:

1. Frontend web app.
2. Backend API.
3. Database.
4. Game engine layer.
5. Animation layer.
6. Auth layer.
7. Score/progress system.
8. Badge/reward system.
9. Admin/content management cơ bản nếu phù hợp.

Yêu cầu kiến trúc:

* Rõ ràng.
* Dễ mở rộng.
* Không quá nặng.
* Dễ bảo trì.
* Tách component, service, hook, game logic hợp lý.
* Không viết code rối trong một file lớn.

## GIAI ĐOẠN 3: XÂY DỰNG FRONTEND

Hãy xây dựng frontend có các màn hình:

1. Landing Page / Trang chào mừng

* Logo dự án.
* Mascot hoặc nhân vật hoạt hình.
* Nút “Bắt đầu”.
* Nút “Hướng dẫn”.
* Giới thiệu ngắn về mục tiêu giáo dục.

2. Game Hub / Trang chọn mini game

* Hiển thị danh sách 4–5 mini game.
* Mỗi game có card riêng.
* Card có icon, thumbnail, tên game, mô tả ngắn, trạng thái hoàn thành.
* Có animation hover/click bằng Framer Motion.
* Bố cục dễ nhìn, phù hợp trẻ em.

3. Game Screen / Màn hình chơi

* Khu vực chơi chính.
* Nút điều khiển lớn.
* Thanh điểm số.
* Số sao.
* Nút tạm dừng.
* Popup hướng dẫn.
* Popup kết quả sau khi chơi.

4. Result Screen / Màn hình kết quả

* Điểm số.
* Số sao.
* Huy hiệu đạt được.
* Bài học rút ra.
* Nút “Chơi lại”.
* Nút “Chọn game khác”.

5. Progress Page / Trang tiến độ

* Danh sách game đã chơi.
* Điểm cao nhất.
* Số sao.
* Huy hiệu.
* Tổng tiến độ học tập.

6. Parent/Teacher Page / Trang phụ huynh hoặc giáo viên

* Xem tiến độ của trẻ.
* Xem các bài học giao thông đã hoàn thành.
* Xem gợi ý luyện tập thêm.

# GIAO DIỆN UI/UX

Hãy nâng cấp giao diện bằng thư viện animation.

Yêu cầu UI:

* Phong cách hoạt hình 2D.
* Màu sắc tươi sáng, dễ chịu.
* Nút lớn, bo góc mềm.
* Font dễ đọc.
* Icon rõ ràng.
* Không quá nhiều chữ.
* Ưu tiên hình ảnh và hướng dẫn ngắn.
* Responsive trên desktop, tablet, mobile.
* Layout tập trung vào trọng điểm.
* Dùng khoảng trắng hợp lý.
* Không làm giao diện rối.

Yêu cầu animation:

* Dùng Framer Motion cho:

  * Page transition.
  * Card hover.
  * Button click.
  * Popup xuất hiện.
  * Mascot chuyển động nhẹ.
  * Reward animation.
  * Progress bar animation.
* Animation phải nhẹ, không gây lag.
* Không lạm dụng animation.
* Không dùng hiệu ứng chớp nháy mạnh gây khó chịu cho trẻ.

# GIAI ĐOẠN 4: XÂY DỰNG 5 MINI GAME

## Mini game 1: Đèn Xanh Qua Đường

Mục tiêu:
Dạy trẻ đèn đỏ phải dừng, đèn xanh mới được qua đường.

Yêu cầu:

* Có nhân vật đứng ở lề đường.
* Có đèn giao thông đỏ/xanh.
* Có vạch qua đường.
* Khi đèn đỏ, bấm qua đường thì nhân vật không đi và hiện thông báo:
  “Đèn đỏ rồi, mình cùng chờ nhé!”
* Khi đèn xanh, bấm qua đường thì nhân vật đi qua đường an toàn.
* Cộng điểm khi làm đúng.
* Có màn hình kết quả.

## Mini game 2: Nhìn Trái – Nhìn Phải

Mục tiêu:
Dạy trẻ quan sát trước khi sang đường.

Yêu cầu:

* Nhân vật đứng trước đường.
* Có xe chạy từ hai bên.
* Trẻ phải bấm đúng thứ tự:

  1. Nhìn trái.
  2. Nhìn phải.
  3. Nhìn trái lần nữa.
  4. Qua đường khi an toàn.
* Nếu có xe đang tới, không cho nhân vật qua đường.
* Hiện thông báo:
  “Có xe đang tới, bé hãy chờ thêm một chút nhé!”

## Mini game 3: Đội Mũ Xinh – Đi An Toàn

Mục tiêu:
Dạy trẻ đội mũ bảo hiểm đúng cách.

Yêu cầu:

* Có nhân vật chuẩn bị đi xe.
* Có nhiều loại mũ.
* Trẻ kéo thả đúng mũ bảo hiểm lên đầu nhân vật.
* Sau đó bấm “Cài quai mũ”.
* Nếu chưa cài quai thì nhắc:
  “Mũ cần được cài quai chắc chắn bé nhé!”
* Hoàn thành thì nhận điểm và huy hiệu.

## Mini game 4: Biển Báo Vui Nhộn

Mục tiêu:
Dạy trẻ nhận biết biển báo cơ bản.

Yêu cầu:

* Hiển thị câu hỏi tình huống.
* Cho trẻ chọn 1 trong 3 biển báo.
* Các biển báo cơ bản:

  * Biển người đi bộ.
  * Biển trường học/trẻ em.
  * Biển cấm đi ngược chiều.
  * Biển đường dành cho xe đạp.
  * Biển chú ý nguy hiểm.
* Nếu chọn sai, giải thích nhẹ nhàng.
* Nếu chọn đúng, cộng điểm.

## Mini game 5: Đường Đến Trường An Toàn

Mục tiêu:
Tổng hợp nhiều kỹ năng giao thông.

Yêu cầu:

* Có bản đồ nhỏ từ nhà đến trường.
* Trẻ chọn đường đi an toàn.
* Các lựa chọn gồm:

  * Đi trên vỉa hè.
  * Qua đường tại vạch kẻ đường.
  * Dừng lại khi đèn đỏ.
  * Tránh đường nguy hiểm.
  * Không đi gần xe lớn đang đỗ.
* Nếu chọn đường nguy hiểm, hiện hướng dẫn:
  “Đường này chưa an toàn, mình chọn lối khác nhé!”
* Khi đến trường an toàn, hoàn thành màn chơi.

# GIAI ĐOẠN 5: BACKEND VÀ DATABASE

Hãy xây backend API để hỗ trợ:

1. Đăng ký/đăng nhập.
2. Lấy danh sách mini game.
3. Lưu điểm sau khi chơi.
4. Lưu số sao.
5. Lưu huy hiệu.
6. Lưu tiến độ học tập.
7. Lấy lịch sử chơi.
8. Quản lý nội dung bài học.
9. Quản lý biển báo giao thông.

Database cần có các bảng:

* users
* mini_games
* lessons
* game_scores
* badges
* user_badges
* traffic_signs
* user_progress

Yêu cầu backend:

* Có validation dữ liệu.
* Có xử lý lỗi.
* Có response JSON thống nhất.
* Không lưu mật khẩu dạng plain text.
* Có middleware auth nếu cần.
* Code chia rõ routes, controllers, services, repositories.

# GIAI ĐOẠN 6: GAMIFICATION

Hãy thêm hệ thống trò chơi hóa:

* Điểm số.
* Sao.
* Huy hiệu.
* Tiến độ học tập.
* Bài học đã mở khóa.
* Animation nhận thưởng.
* Thông báo động viên.

Ví dụ câu động viên:

* “Bé làm tốt lắm!”
* “Mình cùng thử lại nhé!”
* “Tuyệt vời! Bé đã qua đường đúng cách.”
* “Bạn đã nhận huy hiệu Bé Đi Đường An Toàn!”

# GIAI ĐOẠN 7: TỐI ƯU HỆ THỐNG

Hãy tối ưu:

* Lazy load mini game.
* Lazy load ảnh.
* Nén asset.
* Tối ưu animation.
* Không render thừa component.
* Tối ưu bundle size.
* Tách code theo module.
* Dùng loading state thân thiện.
* Dùng error boundary.
* Có fallback UI khi lỗi.

# GIAI ĐOẠN 8: TESTING

Hãy tạo test cho:

1. Component UI chính.
2. API backend.
3. Luồng lưu điểm.
4. Luồng hoàn thành mini game.
5. Luồng đăng nhập.
6. E2E test bằng Playwright:

   * Người dùng vào trang chủ.
   * Chọn mini game.
   * Chơi mini game.
   * Nhận điểm.
   * Xem trang kết quả.
   * Quay lại game hub.

# GIAI ĐOẠN 9: HOÀN THIỆN DEMO

Hãy đảm bảo dự án có thể demo trước hội đồng:

* Có dữ liệu mẫu.
* Có tài khoản demo.
* Có ít nhất 3 mini game hoàn chỉnh.
* 2 mini game còn lại có thể là prototype nếu thời gian ít.
* UI phải đẹp, mượt, ít lỗi.
* Có trang giới thiệu mục tiêu giáo dục.
* Có trang tiến độ.
* Có link deploy nếu có thể.

# GIAI ĐOẠN 10: TÀI LIỆU

Hãy tạo hoặc cập nhật:

* README.md.
* docs/project-overview.md.
* docs/requirements.md.
* docs/architecture.md.
* docs/database-design.md.
* docs/api-documentation.md.
* docs/mini-games.md.
* docs/demo-script.md.

README.md cần có:

* Mô tả dự án.
* Công nghệ sử dụng.
* Cách cài đặt.
* Cách chạy frontend.
* Cách chạy backend.
* Cách migrate database.
* Cách test.
* Cách deploy.
* Tài khoản demo nếu có.

# CÁCH LÀM VIỆC

Khi thực hiện, hãy làm theo quy tắc:

1. Không làm tất cả trong một lần nếu repo lớn.
2. Chia thành task nhỏ.
3. Trước khi sửa code, nói rõ sẽ sửa file nào.
4. Sau khi sửa code, liệt kê file đã thay đổi.
5. Giải thích ngắn gọn đã làm gì.
6. Nếu phát hiện lỗi kiến trúc, đề xuất trước khi sửa.
7. Không tự ý xóa code cũ nếu không cần.
8. Luôn giữ code sạch, dễ đọc, dễ bảo trì.
9. Ưu tiên sản phẩm chạy được ổn định hơn là thêm quá nhiều tính năng.
10. Nếu có lỗi, hãy phân tích nguyên nhân và sửa dứt điểm.

# NHIỆM VỤ ĐẦU TIÊN

Trước tiên, hãy đọc toàn bộ repo và trả lời theo format:

1. Tóm tắt dự án hiện tại.
2. Công nghệ đang dùng.
3. Cấu trúc thư mục hiện tại.
4. Những phần đã có.
5. Những phần còn thiếu.
6. Rủi ro kỹ thuật.
7. Kế hoạch triển khai E2E theo từng task.
8. Task đầu tiên nên làm là gì.
9. Danh sách file dự kiến sẽ sửa ở task đầu tiên.

Sau đó chờ tôi xác nhận rồi mới bắt đầu code.
