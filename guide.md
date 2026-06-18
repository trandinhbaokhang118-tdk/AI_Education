# KẾ HOẠCH DỰ ÁN WEB APP GAME GIÁO DỤC AN TOÀN GIAO THÔNG CHO TRẺ EM

## 0. Vai trò triển khai và nguyên tắc nâng cấp

Tài liệu này là bản spec tổng hợp từ `guide.md` và các yêu cầu bổ sung trong `guide1.md`. Mục tiêu là giữ lại toàn bộ định hướng đã có, đồng thời nâng cấp thêm quy trình triển khai, kiểm thử, tài liệu hóa và nguyên tắc làm việc khi sửa code.

Ghi chú yêu cầu gốc đã chuẩn hóa: hoàn chỉnh kế hoạch/spec giáo dục theo đúng prompt; nếu có phần chưa rõ thì hỏi lại trước khi làm.

Vai trò thực thi: Senior Fullstack Developer, Game Web Developer và UI/UX Designer.

Nguyên tắc khi triển khai:

- Không tự ý xóa phần đã làm nếu không có lý do kỹ thuật rõ ràng.
- Nâng cấp theo từng lát nhỏ, kiểm soát ảnh hưởng giữa frontend, backend, database và game logic.
- Ưu tiên sản phẩm chạy ổn định, dễ demo, dễ bảo trì hơn là thêm quá nhiều tính năng cùng lúc.
- Nếu yêu cầu chưa rõ hoặc có rủi ro ảnh hưởng kiến trúc, cần hỏi lại hoặc đề xuất hướng xử lý trước khi sửa sâu.
- Trước khi sửa code, phải đọc cấu trúc repo, xác định phần đã có, phần còn thiếu và file dự kiến thay đổi.

1. Tên đề tài đề xuất

Traffic Kids – Web App trò chơi giáo dục an toàn giao thông cho trẻ em

Hoặc tên tiếng Việt:

Bé Vui Giao Thông – Nền tảng mini game giáo dục an toàn giao thông đường bộ

2. Mô tả tổng quan dự án

Dự án xây dựng một web app giáo dục dạng “cửa hàng mini game”, trong đó trẻ em có thể chọn và chơi nhiều trò chơi nhỏ liên quan đến an toàn giao thông đường bộ.

Mục tiêu chính của dự án là giúp trẻ em nhận biết các tình huống giao thông thường gặp thông qua hình ảnh, âm thanh, nhân vật hoạt hình và phản hồi trực quan. Thay vì chỉ học lý thuyết, trẻ sẽ được tương tác trực tiếp với các tình huống như: chờ đèn đỏ, qua đường đúng vạch, đội mũ bảo hiểm, nhận biết biển báo, quan sát xe khi sang đường.

Web app sẽ có giao diện đơn giản, màu sắc tươi sáng, bố cục dễ nhìn, thao tác ít nút, phù hợp với trẻ em tiểu học. Mỗi mini game sẽ có luật chơi ngắn gọn, câu chữ nhẹ nhàng, không sử dụng ngôn từ nhạy cảm, không có nội dung bạo lực hoặc vi phạm chuẩn cộng đồng.

Yêu cầu an toàn nội dung bắt buộc:

- Thân thiện, dễ hiểu, phù hợp trẻ em 6-11 tuổi.
- Không mô tả tai nạn nghiêm trọng, máu me hoặc tình huống gây sợ hãi.
- Không dùng ngôn từ nhạy cảm, đổ lỗi, miệt thị hoặc tạo áp lực thắng thua.
- Không có nội dung vi phạm chuẩn cộng đồng.
- Khi trẻ làm sai, chỉ nhắc nhẹ nhàng, giải thích ngắn và hướng dẫn làm lại.
- Nội dung luật giao thông cần tập trung vào tình huống cơ bản, dễ kiểm chứng, không đưa các tình huống pháp lý phức tạp.

3. Đối tượng sử dụng

Đối tượng chính

Trẻ em từ khoảng 6 đến 11 tuổi, đặc biệt là học sinh tiểu học.

Đối tượng phụ

Giáo viên, phụ huynh hoặc người hướng dẫn có thể sử dụng web app để hỗ trợ dạy trẻ về an toàn giao thông.

Đối tượng quản trị nội dung

Người quản trị có thể cập nhật danh sách mini game, bài học, câu hỏi, biển báo, dữ liệu demo và nội dung hướng dẫn phù hợp với trẻ em.

4. Mục tiêu giáo dục

Sau khi trải nghiệm web app, trẻ có thể:

Biết đèn đỏ phải dừng lại, đèn xanh mới được đi.

Biết qua đường tại vạch kẻ đường hoặc nơi có tín hiệu cho người đi bộ.

Biết quan sát trái – phải – trái trước khi sang đường.

Biết đội mũ bảo hiểm khi ngồi trên xe máy, xe đạp điện.

Nhận biết một số biển báo giao thông cơ bản.

Hiểu rằng không nên chạy nhảy, đùa nghịch, băng qua đường bất ngờ.

Hình thành thói quen tham gia giao thông an toàn.

5. Ý tưởng sản phẩm

Web app được thiết kế như một game hub hoặc mini game store. Khi vào trang chủ, trẻ sẽ thấy bản đồ hoặc khu phố hoạt hình. Trên màn hình có các khu vực tương ứng với từng mini game:

Ngã tư đèn giao thông.

Vạch qua đường.

Cửa hàng mũ bảo hiểm.

Khu phố có biển báo.

Đường đi học bằng xe đạp.

Người chơi chọn từng khu vực để bắt đầu mini game. Sau mỗi trò chơi, hệ thống sẽ hiển thị:

Điểm số.

Số sao đạt được.

Huy hiệu nhỏ.

Bài học ngắn gọn.

Gợi ý “lần sau bé hãy nhớ...”.

Ví dụ:

“Giỏi lắm! Bé đã chờ đèn xanh rồi mới qua đường. Đây là cách qua đường an toàn.”

6. Danh sách 5 mini game đề xuất

Mini game 1: Đèn Xanh Qua Đường

Chủ đề

Nhận biết đèn giao thông và qua đường đúng lúc.

Bài học chính

Đèn đỏ: dừng lại.

Đèn xanh: được đi.

Qua đường trên vạch kẻ đường.

Không chạy bất ngờ ra đường.

Cách chơi

Người chơi điều khiển một nhân vật nhỏ đứng ở lề đường. Phía trước là vạch qua đường và đèn tín hiệu.

Khi đèn đỏ, nếu người chơi bấm nút “Qua đường”, nhân vật sẽ không đi và hệ thống hiện thông báo:

“Chưa được qua đường đâu bé ơi! Đèn đỏ phải dừng lại.”

Khi đèn xanh, người chơi bấm nút “Qua đường”, nhân vật sẽ đi qua vạch kẻ đường an toàn.

Cơ chế điểm

Qua đường đúng lúc: +10 điểm.

Bấm qua đường khi đèn đỏ: không trừ điểm nặng, chỉ nhắc nhở.

Hoàn thành 5 lượt đúng liên tiếp: nhận 3 sao.

Giao diện

Đường phố hoạt hình.

Đèn giao thông to, dễ nhìn.

Nhân vật dễ thương.

Nút “Qua đường” lớn, màu nổi bật.

Có âm thanh vui khi làm đúng.

Giá trị khi trình bày hội đồng

Mini game này thể hiện rõ việc chuyển đổi kiến thức luật giao thông thành tình huống tương tác trực quan.

Mini game 2: Nhìn Trái – Nhìn Phải

Chủ đề

Kỹ năng quan sát trước khi sang đường.

Bài học chính

Trẻ cần quan sát hai bên trước khi qua đường, không được chạy băng qua đường khi chưa chắc chắn an toàn.

Cách chơi

Nhân vật đứng trước một con đường không có đèn giao thông. Trên đường có xe chạy từ hai hướng.

Người chơi phải thực hiện đúng thứ tự:

Bấm “Nhìn trái”.

Bấm “Nhìn phải”.

Bấm “Nhìn trái lần nữa”.

Khi đường an toàn, bấm “Qua đường”.

Nếu xe đang đến gần mà người chơi bấm qua đường, hệ thống dừng nhân vật lại và hiện lời nhắc:

“Khoan đã! Có xe đang tới. Bé hãy chờ đường an toàn nhé.”

Cơ chế điểm

Quan sát đúng thứ tự: +5 điểm mỗi bước.

Qua đường khi an toàn: +15 điểm.

Qua đường vội: hiện nhắc nhở, cho chơi lại.

Giao diện

Đường nhỏ gần trường học.

Xe hoạt hình chạy chậm.

Biểu tượng mắt để quan sát.

Màu xanh báo “an toàn”, màu cam báo “hãy chờ”.

Giá trị giáo dục

Trò chơi giúp trẻ hình thành phản xạ quan sát trước khi qua đường, không chỉ phụ thuộc vào đèn giao thông.

Mini game 3: Đội Mũ Xinh – Đi An Toàn

Chủ đề

Đội mũ bảo hiểm khi tham gia giao thông.

Bài học chính

Khi ngồi trên xe máy hoặc xe đạp điện cần đội mũ bảo hiểm.

Mũ phải được cài quai đúng cách.

Không đội mũ lỏng lẻo hoặc đội lệch.

Cách chơi

Trên màn hình có một nhân vật chuẩn bị đi cùng ba mẹ. Người chơi cần chọn đúng mũ bảo hiểm và kéo thả lên đầu nhân vật.

Sau đó, người chơi cần bấm “Cài quai mũ”.

Nếu chọn đúng và cài quai, hệ thống hiện:

“Tuyệt vời! Đội mũ và cài quai giúp bé an toàn hơn.”

Nếu quên cài quai, hệ thống nhắc:

“Mũ cần được cài quai chắc chắn bé nhé.”

Cơ chế điểm

Chọn đúng mũ: +10 điểm.

Cài quai đúng: +10 điểm.

Hoàn thành nhanh và đúng: nhận huy hiệu “Bé đội mũ giỏi”.

Giao diện

Phòng khách hoặc sân nhà.

Nhiều loại mũ: mũ bảo hiểm, mũ lưỡi trai, mũ len.

Trẻ phải chọn đúng mũ bảo hiểm.

Nhân vật hoạt hình vui vẻ.

Giá trị giáo dục

Trẻ không chỉ biết “phải đội mũ”, mà còn biết đội đúng cách.

Mini game 4: Biển Báo Vui Nhộn

Chủ đề

Nhận biết biển báo giao thông cơ bản.

Bài học chính

Trẻ nhận biết một số biển báo đơn giản như:

Biển dành cho người đi bộ.

Biển cấm đi ngược chiều.

Biển trường học/trẻ em.

Biển đường dành cho xe đạp.

Biển nguy hiểm cần chú ý.

Cách chơi

Hệ thống hiển thị một tình huống. Ví dụ:

“Bé muốn tìm nơi qua đường an toàn. Hãy chọn biển báo phù hợp.”

Người chơi chọn trong 3 biển báo. Nếu chọn đúng, nhân vật đi đến đúng khu vực. Nếu chọn sai, hệ thống giải thích nhẹ nhàng:

“Biển này chưa đúng rồi. Biển người đi bộ mới giúp bé tìm nơi qua đường an toàn.”

Cơ chế điểm

Chọn đúng lần đầu: +10 điểm.

Chọn sai: hiện gợi ý, cho chọn lại.

Hoàn thành 5 câu: nhận sao.

Giao diện

Thẻ biển báo lớn, rõ ràng.

Hình ảnh ít chữ.

Có giọng đọc hoặc hiệu ứng âm thanh.

Màu sắc tương phản để trẻ dễ nhận biết.

Giá trị giáo dục

Trò chơi giúp trẻ làm quen với ký hiệu giao thông thông qua hình ảnh, phù hợp với lứa tuổi nhỏ.

Mini game 5: Đường Đến Trường An Toàn

Chủ đề

Lựa chọn đường đi an toàn khi đi học.

Bài học chính

Đi trên vỉa hè.

Không đi dưới lòng đường.

Qua đường đúng nơi quy định.

Tránh khu vực công trình, xe lớn, điểm khuất tầm nhìn.

Không vừa đi vừa chơi đùa gần đường xe chạy.

Cách chơi

Người chơi điều khiển nhân vật đi từ nhà đến trường trên một bản đồ nhỏ. Trên đường có nhiều lựa chọn:

Đi trên vỉa hè.

Băng qua đường không có vạch.

Đi gần xe tải đang đỗ.

Qua đường ở vạch kẻ đường.

Dừng lại khi đèn đỏ.

Người chơi cần chọn đường an toàn để đến trường.

Cơ chế điểm

Chọn đường an toàn: +10 điểm.

Chọn đường nguy hiểm: hiện cảnh báo và quay lại điểm trước đó.

Đến trường an toàn: hoàn thành màn chơi.

Giao diện

Bản đồ khu phố hoạt hình.

Trường học, nhà, vỉa hè, cây xanh.

Mũi tên chỉ đường.

Các điểm tương tác rõ ràng.

Giá trị giáo dục

Mini game này tổng hợp nhiều kiến thức đã học ở các trò trước, phù hợp làm màn chơi cuối trong demo.

7. Cấu trúc web app

7.1. Các màn hình chính

1. Màn hình chào mừng

Nội dung:

Logo game.

Nhân vật mascot.

Nút “Bắt đầu”.

Nút “Hướng dẫn”.

Nút “Phụ huynh/Giáo viên”.

2. Màn hình chọn mini game

Thiết kế giống một bản đồ thành phố nhỏ. Mỗi khu vực là một mini game.

Ví dụ:

Ngã tư: Đèn Xanh Qua Đường.

Con đường nhỏ: Nhìn Trái – Nhìn Phải.

Cửa hàng mũ: Đội Mũ Xinh.

Công viên biển báo: Biển Báo Vui Nhộn.

Tuyến đường đến trường: Đường Đến Trường An Toàn.

3. Màn hình chơi game

Gồm:

Khu vực chơi chính.

Nút điều khiển lớn.

Điểm số.

Số sao.

Nút tạm dừng.

Hướng dẫn ngắn.

4. Màn hình kết quả

Hiển thị:

Điểm.

Số sao.

Huy hiệu.

Bài học rút ra.

Nút “Chơi lại”.

Nút “Chọn game khác”.

5. Màn hình tiến độ học tập

Hiển thị:

Những game đã hoàn thành.

Số sao từng game.

Tổng huy hiệu.

Bài học đã mở khóa.

6. Màn hình phụ huynh/giáo viên

Hiển thị:

Hồ sơ trẻ và tiến độ học tập tổng quan.

Danh sách bài học giao thông đã hoàn thành.

Điểm cao nhất, số sao, huy hiệu và lịch sử chơi theo từng mini game.

Gợi ý luyện tập thêm cho các kỹ năng trẻ chưa đạt.

Nội dung bài học ngắn để phụ huynh/giáo viên có thể nhắc lại ngoài đời thực.

8. Thiết kế UI/UX

8.1. Phong cách giao diện

Phong cách hoạt hình 2D.

Nhân vật tròn trịa, thân thiện.

Không dùng hình ảnh tai nạn, máu me, bạo lực.

Màu sắc sáng, mát, dễ chịu.

Các nút bấm lớn, dễ thao tác.

Ít chữ, ưu tiên icon và hình minh họa.

8.2. Màu sắc đề xuất

Có thể dùng bộ màu:

Xanh dương nhạt: nền chính, tạo cảm giác an toàn.

Xanh lá: hành động đúng, được phép đi.

Đỏ: dừng lại, cảnh báo.

Vàng/cam: chú ý, cẩn thận.

Trắng: nền nội dung.

Tím nhạt hoặc hồng nhạt: điểm nhấn vui vẻ.

8.3. Nguyên tắc UX

Mỗi màn hình chỉ tập trung vào một nhiệm vụ.

Nút quan trọng phải to và nổi bật.

Khi trẻ làm đúng, phải có phản hồi ngay.

Khi trẻ làm sai, không la mắng, chỉ nhắc nhẹ.

Không bắt trẻ đọc quá nhiều chữ.

Có biểu tượng minh họa cho mỗi hành động.

Thao tác đơn giản: bấm, kéo thả, chọn đáp án.

Có âm thanh ngắn để tăng hứng thú.

8.4. Animation và responsive

Dùng Framer Motion cho các hiệu ứng UI nhẹ:

Page transition giữa trang chủ, game hub, màn chơi và kết quả.

Card hover/click ở danh sách mini game.

Button click với phản hồi nhanh, không làm lệch layout.

Popup hướng dẫn, popup tạm dừng và popup kết quả.

Mascot chuyển động nhẹ để tạo cảm giác sống động.

Reward animation khi nhận sao, huy hiệu hoặc hoàn thành bài học.

Progress bar animation khi cập nhật tiến độ học tập.

Yêu cầu kiểm soát animation:

Không lạm dụng chuyển động.

Không dùng hiệu ứng chớp nháy mạnh.

Không để animation làm chậm thao tác chính.

Tôn trọng tùy chọn giảm chuyển động của hệ điều hành nếu có thể.

Responsive bắt buộc trên desktop, tablet và mobile. Các nút, thẻ game, popup và vùng chơi phải có kích thước ổn định, không để chữ tràn khỏi container.

9. Nhân vật và nội dung phù hợp trẻ em

9.1. Nhân vật chính

Có thể tạo mascot tên:

Bé An.

Bạn Đường Đường.

Bé Mũ Xanh.

Gấu Giao Thông.

Thỏ An Toàn.

Ví dụ chọn:

Bé An là nhân vật chính, cùng người chơi học cách tham gia giao thông an toàn.

9.2. Giọng văn trong game

Câu chữ nên dùng:

“Bé làm tốt lắm!”

“Mình chờ đèn xanh nhé!”

“Có xe đang tới, bé hãy dừng lại.”

“Qua đường ở vạch kẻ đường sẽ an toàn hơn.”

“Đội mũ và cài quai thật chắc nhé!”

Không nên dùng:

“Sai rồi!”

“Nguy hiểm chết người!”

“Bạn thua rồi!”

“Vi phạm luật!”

Các câu tạo cảm giác sợ hãi hoặc nặng nề.

10. Chức năng hệ thống

10.1. Chức năng dành cho trẻ em

Chọn mini game.

Chơi game.

Xem điểm.

Nhận sao.

Nhận huy hiệu.

Xem bài học sau mỗi màn.

Chơi lại để cải thiện điểm.

10.2. Chức năng dành cho giáo viên/phụ huynh

Xem danh sách bài học.

Xem tiến độ hoàn thành.

Xem số sao từng mini game.

Xem nội dung giáo dục của từng trò chơi.

10.3. Chức năng quản trị cơ bản

Quản lý danh sách mini game.

Quản lý nội dung bài học.

Quản lý câu hỏi/biển báo.

Xem thống kê số lượt chơi.

Xem điểm trung bình từng mini game.

11. Kiến trúc hệ thống

11.1. Kiến trúc tổng quan

Hệ thống gồm 3 phần chính:

Frontend Web App

Hiển thị giao diện.

Xử lý thao tác người chơi.

Chạy mini game.

Gửi kết quả về backend.

Backend API

Quản lý tài khoản.

Lưu điểm.

Lưu tiến độ.

Cung cấp dữ liệu bài học, câu hỏi, biển báo.

Xử lý bảng xếp hạng nếu cần.

Database

Lưu thông tin người dùng.

Lưu mini game.

Lưu điểm số.

Lưu huy hiệu.

Lưu nội dung bài học.

11.2. Các lớp kiến trúc cần tách rõ

Frontend web app layer

Quản lý routing, layout, trạng thái màn hình, responsive UI và các component dùng chung.

Game engine layer

Đóng gói Phaser scene, asset loader, input handler, game state, scoring và logic thắng/thua của từng mini game.

Animation layer

Quản lý hiệu ứng UI bằng Framer Motion, animation reward, transition và motion token dùng chung.

Auth layer

Xử lý đăng ký, đăng nhập, phiên người dùng, phân quyền child/parent/teacher/admin và bảo vệ API cần đăng nhập.

Score/progress layer

Lưu điểm, số sao, trạng thái hoàn thành, lịch sử chơi và tiến độ học tập theo từng trẻ.

Badge/reward layer

Quản lý điều kiện nhận huy hiệu, trạng thái đã nhận, thông báo động viên và animation nhận thưởng.

Admin/content layer

Quản lý mini game, bài học, câu hỏi, biển báo, dữ liệu seed và nội dung hướng dẫn phù hợp trẻ em.

Nguyên tắc tách code:

- Không gom game logic, UI và API call vào một file lớn.
- Tách component, service, hook, schema, route, controller và repository theo đúng trách nhiệm.
- Dữ liệu dùng chung giữa frontend và backend nên có type/schema rõ ràng.
- Mỗi mini game nên có module riêng để dễ lazy load, test và mở rộng.

12. Công nghệ đề xuất

12.1. Frontend

Đề xuất dùng:

ReactJS hoặc Next.js

TypeScript

Tailwind CSS

Phaser.js cho phần game 2D

Framer Motion cho hiệu ứng chuyển động nhẹ

Lý do:

React/Next.js dễ xây giao diện web app.

TypeScript giúp giảm lỗi code.

Tailwind CSS làm giao diện nhanh, gọn.

Phaser.js phù hợp làm mini game 2D trên nền web.

Framer Motion giúp UI mượt hơn nhưng không quá nặng.

12.2. Backend

Đề xuất dùng:

Node.js

Express.js hoặc NestJS

Prisma ORM

JWT Authentication

Nếu muốn đơn giản để làm đồ án, dùng Express.js.

Nếu muốn chuyên nghiệp hơn, dùng NestJS.

12.3. Database

Đề xuất dùng:

PostgreSQL

Lý do:

Dữ liệu rõ ràng, có quan hệ.

Phù hợp lưu user, mini game, điểm số, tiến độ.

Dễ mở rộng nếu sau này thêm nhiều bài học.

Nếu demo đơn giản hơn có thể dùng:

SQLite cho bản local.

PostgreSQL cho bản triển khai thật.

12.4. Triển khai

Có thể triển khai theo hướng:

Frontend: Vercel.

Backend: Render, Railway hoặc VPS.

Database: Supabase PostgreSQL hoặc Railway PostgreSQL.

Nếu báo cáo theo hướng chuyên nghiệp:

Docker hóa backend.

Deploy backend lên VPS Ubuntu.

Database PostgreSQL.

Frontend deploy lên Vercel.

12.5. Testing và chuẩn hóa code

Unit test:

Jest hoặc Vitest cho helper, hook, service, scoring logic và các function xử lý trạng thái game.

Component test:

Kiểm tra card mini game, popup hướng dẫn, màn kết quả, progress summary và các component form quan trọng.

API test:

Kiểm tra auth, lấy danh sách mini game, lưu điểm, lưu sao, lưu huy hiệu, lấy tiến độ và quản lý biển báo.

E2E test:

Playwright kiểm tra luồng người dùng từ trang chủ, chọn mini game, chơi, nhận điểm, xem kết quả và quay lại game hub.

Chuẩn hóa code:

ESLint + Prettier để giữ style nhất quán.

TypeScript strict ở mức phù hợp để giảm lỗi runtime.

Validation schema cho dữ liệu form, API body và payload lưu điểm.

Error boundary và fallback UI cho lỗi frontend.

13. Thiết kế database đề xuất

Bảng users

Lưu thông tin người dùng.

Các trường:

id

name

email

password_hash

role: child, parent, teacher, admin

created_at

Bảng mini_games

Lưu danh sách mini game.

Các trường:

id

title

description

topic

difficulty

thumbnail_url

is_active

Bảng lessons

Lưu bài học của từng mini game.

Các trường:

id

mini_game_id

title

content

child_friendly_message

Bảng game_scores

Lưu điểm chơi game.

Các trường:

id

user_id

mini_game_id

score

stars

completed

played_at

Bảng badges

Lưu danh sách huy hiệu.

Các trường:

id

name

description

icon_url

Bảng user_badges

Lưu huy hiệu người dùng đạt được.

Các trường:

id

user_id

badge_id

earned_at

Bảng traffic_signs

Lưu dữ liệu biển báo dùng cho mini game biển báo.

Các trường:

id

name

meaning

image_url

category

explanation_for_kids

Bảng user_progress

Lưu tiến độ học tập tổng hợp của từng trẻ theo từng mini game hoặc bài học.

Các trường:

id

user_id

mini_game_id

lesson_id

best_score

best_stars

completed

attempt_count

last_played_at

updated_at

14. Luồng hoạt động chính

Luồng 1: Trẻ vào chơi game

Trẻ mở web app.

Bấm “Bắt đầu”.

Chọn nhân vật hoặc nhập tên.

Vào bản đồ mini game.

Chọn một trò chơi.

Đọc hướng dẫn ngắn.

Chơi game.

Nhận điểm, sao và bài học.

Kết quả được lưu vào hệ thống.

Luồng 2: Trẻ chơi lại để cải thiện điểm

Vào trang kết quả.

Bấm “Chơi lại”.

Hệ thống reset mini game.

Nếu điểm mới cao hơn, cập nhật điểm tốt nhất.

Luồng 3: Giáo viên/phụ huynh xem tiến độ

Đăng nhập tài khoản phụ huynh/giáo viên.

Chọn hồ sơ trẻ.

Xem số game đã hoàn thành.

Xem điểm và bài học đã học.

Gợi ý trẻ chơi lại game chưa đạt.

15. API backend đề xuất

Auth API

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

Mini game API

GET /api/games

GET /api/games/:id

GET /api/games/:id/lesson

Score API

POST /api/scores

GET /api/scores/me

GET /api/scores/me/:gameId

Badge API

GET /api/badges

GET /api/badges/me

Admin API

POST /api/admin/games

PUT /api/admin/games/:id

DELETE /api/admin/games/:id

POST /api/admin/traffic-signs

PUT /api/admin/traffic-signs/:id

Progress API

GET /api/progress/me

GET /api/progress/me/summary

GET /api/progress/me/:gameId

GET /api/progress/children/:childId

History API

GET /api/history/me

GET /api/history/me/:gameId

Traffic sign API

GET /api/traffic-signs

GET /api/traffic-signs/:id

Yêu cầu backend bắt buộc:

Response JSON thống nhất cho cả thành công và lỗi.

Validation dữ liệu đầu vào trước khi gọi service.

Không lưu mật khẩu dạng plain text.

Middleware auth cho API lưu điểm, xem tiến độ, quản trị và dữ liệu theo người dùng.

Tách routes, controllers, services, repositories và schema validation để code dễ test.

16. Tối ưu hiệu năng

Để web app chạy mượt, cần:

Dùng hình ảnh SVG hoặc PNG đã nén.

Chia nhỏ từng mini game, chỉ tải game khi người dùng chọn.

Lazy load asset hình ảnh, âm thanh.

Hạn chế hiệu ứng quá nặng.

Dùng spritesheet cho nhân vật.

Tối ưu âm thanh ngắn, dung lượng thấp.

Cache dữ liệu bài học và danh sách game.

Không render quá nhiều vật thể cùng lúc.

Kiểm tra responsive trên điện thoại, tablet và laptop.

Dùng TypeScript để giảm lỗi logic.

Dùng loading state thân thiện khi tải mini game, asset hoặc dữ liệu tiến độ.

Dùng error boundary để màn game lỗi không làm sập toàn bộ app.

Dùng fallback UI rõ ràng khi API lỗi, mất mạng hoặc dữ liệu rỗng.

Tách bundle theo route và theo từng mini game.

Memo hóa các component hoặc selector có dữ liệu lớn nếu đo được render thừa.

17. Yêu cầu phi chức năng

Hiệu năng

Màn hình tải nhanh.

Mini game không bị giật.

Thao tác phản hồi ngay.

Tính ổn định

Không mất điểm khi reload.

Backend kiểm tra dữ liệu trước khi lưu.

Có xử lý lỗi khi mất mạng.

Tính dễ sử dụng

Giao diện đơn giản.

Trẻ có thể tự thao tác.

Nút lớn, chữ rõ.

Tính an toàn nội dung

Không có hình ảnh bạo lực.

Không có chat tự do giữa trẻ em.

Không có nội dung nhạy cảm.

Không thu thập dữ liệu cá nhân không cần thiết.

Tính mở rộng

Có thể thêm mini game mới.

Có thể thêm biển báo mới.

Có thể thêm bài học mới.

Có thể mở rộng thành hệ thống học tập gamification.

18. Phân công module nếu làm nhóm

Thành viên 1: Frontend UI/UX

Thiết kế layout.

Làm trang chủ.

Làm màn hình chọn game.

Làm trang kết quả.

Làm responsive.

Thành viên 2: Game Developer

Tích hợp Phaser.js.

Làm logic mini game.

Xử lý va chạm, điểm số, trạng thái thắng/thua.

Tối ưu asset game.

Thành viên 3: Backend Developer

Xây API.

Thiết kế database.

Xử lý đăng nhập.

Lưu điểm, sao, huy hiệu.

Thành viên 4: Nội dung giáo dục & kiểm thử

Chuẩn bị nội dung luật giao thông.

Viết câu hướng dẫn phù hợp trẻ em.

Test luồng chơi.

Chuẩn bị báo cáo, slide, demo.

Nếu làm một mình, có thể rút gọn:

Tập trung 3 mini game hoàn chỉnh.

2 mini game còn lại làm prototype.

Backend chỉ cần lưu user, điểm, tiến độ.

Admin có thể làm đơn giản hoặc bỏ nếu không kịp.

18.1. Quy trình E2E bắt buộc khi triển khai

Giai đoạn 1: Đọc và hiểu dự án

- Đọc toàn bộ cấu trúc repo.
- Đọc README.md, docs và các file cấu hình nếu có.
- Xác định frontend, backend, database, shared types và trạng thái hiện tại.
- Tóm tắt phần đã có, phần còn thiếu, rủi ro kỹ thuật và kế hoạch triển khai theo từng task.
- Không code ngay khi chưa hiểu cấu trúc repo hoặc chưa xác định phạm vi sửa.

Giai đoạn 2: Thiết kế kiến trúc

- Xác định ranh giới frontend web app, backend API, database, game engine, animation, auth, score/progress, badge/reward và admin/content.
- Chọn hướng đơn giản đủ dùng cho đồ án, tránh kiến trúc quá nặng.
- Đảm bảo mỗi module có trách nhiệm rõ, dễ test và dễ thay thế.

Giai đoạn 3: Xây frontend

- Hoàn thiện trang chào mừng, game hub, màn hình chơi, màn kết quả, trang tiến độ và trang phụ huynh/giáo viên.
- Tạo component dùng chung cho button, card, popup, score bar, star display, badge display và loading/error state.
- Kiểm tra responsive và khả năng thao tác bằng nút lớn trên mobile/tablet.

Giai đoạn 4: Xây 5 mini game

- Mỗi game cần có mục tiêu giáo dục rõ, hướng dẫn ngắn, feedback đúng/sai, tính điểm, kết quả và bài học rút ra.
- Ưu tiên hoàn chỉnh luồng chơi ổn định trước khi thêm animation hoặc asset phức tạp.
- Tách logic game khỏi UI wrapper để dễ test scoring và trạng thái thắng/thua.

Giai đoạn 5: Backend và database

- Xây API đăng ký/đăng nhập, danh sách mini game, lưu điểm, lưu sao, lưu huy hiệu, lưu tiến độ, lịch sử chơi, bài học và biển báo.
- Thiết kế migration/seed data cho tài khoản demo, mini game, bài học, biển báo và huy hiệu mẫu.
- Có validation, xử lý lỗi, auth middleware và response JSON thống nhất.

Giai đoạn 6: Gamification

- Thêm điểm số, sao, huy hiệu, tiến độ học tập, bài học đã mở khóa, animation nhận thưởng và thông báo động viên.
- Các thông báo phải tích cực, ngắn, không tạo áp lực.

Giai đoạn 7: Tối ưu hệ thống

- Lazy load mini game và asset.
- Nén ảnh/âm thanh, tối ưu animation, giảm render thừa và tách bundle.
- Có loading state, error boundary và fallback UI.

Giai đoạn 8: Testing

- Test component UI chính.
- Test API backend.
- Test luồng lưu điểm, hoàn thành mini game, đăng nhập và xem tiến độ.
- Test E2E bằng Playwright cho luồng vào trang chủ, chọn game, chơi game, nhận điểm, xem kết quả và quay lại game hub.

Giai đoạn 9: Hoàn thiện demo

- Có dữ liệu mẫu, tài khoản demo và ít nhất 3 mini game hoàn chỉnh.
- Hai mini game còn lại có thể ở mức prototype nếu thời gian ít.
- UI phải mượt, ít lỗi, có trang giới thiệu mục tiêu giáo dục, trang tiến độ và link deploy nếu có thể.

Giai đoạn 10: Tài liệu

- Cập nhật README.md.
- Tạo hoặc cập nhật docs/project-overview.md.
- Tạo hoặc cập nhật docs/requirements.md.
- Tạo hoặc cập nhật docs/architecture.md.
- Tạo hoặc cập nhật docs/database-design.md.
- Tạo hoặc cập nhật docs/api-documentation.md.
- Tạo hoặc cập nhật docs/mini-games.md.
- Tạo hoặc cập nhật docs/demo-script.md.

18.2. Checklist kiểm thử tối thiểu

- Unit test cho scoring logic, progress calculation và helper xử lý trạng thái game.
- Component test cho GameCard, GameScreen shell, ResultScreen, ProgressPage và Parent/Teacher summary.
- API test cho auth, games, scores, progress, badges và traffic signs.
- E2E test cho ít nhất một mini game hoàn chỉnh từ lúc mở app đến khi lưu kết quả.
- Kiểm tra thủ công trên desktop, tablet và mobile trước khi demo.

18.3. Tài liệu cần bàn giao

README.md cần có:

- Mô tả dự án.
- Công nghệ sử dụng.
- Cách cài đặt.
- Cách chạy frontend.
- Cách chạy backend.
- Cách migrate/seed database.
- Cách test.
- Cách deploy.
- Tài khoản demo nếu có.

Các tài liệu trong thư mục docs nên viết ngắn gọn, có cấu trúc rõ, ưu tiên phục vụ triển khai và bảo vệ đồ án.

18.4. Quy tắc làm việc khi sửa code

- Không làm tất cả trong một lần nếu repo lớn.
- Chia thành task nhỏ, mỗi task có đầu ra kiểm chứng được.
- Trước khi sửa code, nói rõ sẽ sửa file nào và vì sao.
- Sau khi sửa code, liệt kê file đã thay đổi.
- Nếu phát hiện lỗi kiến trúc, đề xuất hướng xử lý trước khi sửa sâu.
- Không tự ý xóa code cũ nếu không cần.
- Giữ code sạch, dễ đọc, dễ bảo trì.
- Nếu có lỗi, phân tích nguyên nhân và sửa dứt điểm thay vì vá tạm.

18.5. Nhiệm vụ đầu tiên khi bắt đầu code

Trước khi viết tính năng mới, cần trả lời theo format:

1. Tóm tắt dự án hiện tại.
2. Công nghệ đang dùng.
3. Cấu trúc thư mục hiện tại.
4. Những phần đã có.
5. Những phần còn thiếu.
6. Rủi ro kỹ thuật.
7. Kế hoạch triển khai E2E theo từng task.
8. Task đầu tiên nên làm là gì.
9. Danh sách file dự kiến sẽ sửa ở task đầu tiên.

19. Kế hoạch thực hiện theo tuần

Tuần 1: Phân tích yêu cầu

Công việc:

Xác định đối tượng người dùng.

Chọn 5 chủ đề mini game.

Viết mô tả từng mini game.

Tìm hiểu quy tắc giao thông cơ bản.

Lập danh sách chức năng.

Kết quả:

Tài liệu yêu cầu.

Danh sách mini game.

Sơ đồ chức năng.

Tuần 2: Thiết kế UI/UX

Công việc:

Vẽ wireframe.

Thiết kế trang chủ.

Thiết kế màn hình chọn game.

Thiết kế màn hình chơi game.

Thiết kế màn hình kết quả.

Chọn màu sắc, font chữ, mascot.

Kết quả:

Bộ giao diện mẫu trên Figma.

Prototype click được.

Tuần 3: Thiết kế hệ thống và database

Công việc:

Vẽ kiến trúc hệ thống.

Thiết kế database.

Thiết kế API.

Tạo project frontend/backend.

Cấu hình môi trường.

Kết quả:

Sơ đồ database.

Danh sách API.

Project base chạy được.

Tuần 4: Xây frontend web app

Công việc:

Làm layout chính.

Làm trang chọn mini game.

Làm component nút, thẻ game, popup.

Làm responsive.

Tạo luồng chuyển màn hình.

Kết quả:

Frontend cơ bản hoàn chỉnh.

Có thể chọn game và chuyển trang.

Tuần 5: Xây backend

Công việc:

Làm API đăng ký/đăng nhập.

Làm API danh sách mini game.

Làm API lưu điểm.

Làm API tiến độ học tập.

Kết nối database.

Kết quả:

Backend hoạt động.

Frontend gọi được API.

Tuần 6: Làm mini game 1 và 2

Công việc:

Hoàn thành game Đèn Xanh Qua Đường.

Hoàn thành game Nhìn Trái – Nhìn Phải.

Tích hợp điểm và kết quả.

Test lỗi logic.

Kết quả:

2 mini game chơi được hoàn chỉnh.

Tuần 7: Làm mini game 3 và 4

Công việc:

Hoàn thành game Đội Mũ Xinh.

Hoàn thành game Biển Báo Vui Nhộn.

Thêm âm thanh, hiệu ứng.

Lưu điểm và huy hiệu.

Kết quả:

4 mini game chơi được.

Tuần 8: Làm mini game 5 và trang tiến độ

Công việc:

Hoàn thành game Đường Đến Trường An Toàn.

Làm trang tiến độ học tập.

Hiển thị sao, huy hiệu.

Tối ưu giao diện.

Kết quả:

Web app có đủ 5 mini game.

Có hệ thống tiến độ cơ bản.

Tuần 9: Kiểm thử và tối ưu

Công việc:

Test trên điện thoại.

Test trên laptop.

Test lỗi reload, mất mạng, lưu điểm.

Tối ưu hình ảnh.

Sửa lỗi UI/UX.

Kết quả:

Sản phẩm ổn định hơn.

Giảm lỗi vặt.

Tuần 10: Hoàn thiện báo cáo và demo

Công việc:

Viết báo cáo.

Làm slide.

Chuẩn bị kịch bản demo.

Quay video demo nếu cần.

Deploy web app.

Kết quả:

Có link demo.

Có slide báo cáo.

Có báo cáo hoàn chỉnh.

Có sản phẩm trình bày hội đồng.

20. MVP nên làm trước

Nếu thời gian ít, phiên bản MVP nên gồm:

Trang chủ.

Trang chọn mini game.

3 mini game hoàn chỉnh:

Đèn Xanh Qua Đường.

Đội Mũ Xinh.

Biển Báo Vui Nhộn.

Lưu điểm.

Trang kết quả.

Trang tiến độ đơn giản.

Dữ liệu demo tối thiểu:

Tài khoản demo cho trẻ.

Tài khoản demo cho phụ huynh/giáo viên nếu có làm trang theo dõi.

Seed sẵn danh sách 5 mini game, bài học, biển báo và huy hiệu mẫu.

Ít nhất 3 mini game hoàn chỉnh có thể chơi từ đầu đến cuối, lưu điểm và hiện kết quả.

Sau đó mở rộng thêm:

Nhìn Trái – Nhìn Phải.

Đường Đến Trường An Toàn.

Hệ thống huy hiệu.

Quản trị nội dung.

21. Điểm nổi bật để trình bày với hội đồng

Dự án có các điểm mạnh sau:

Có tính thực tế vì giáo dục an toàn giao thông là vấn đề gần gũi.

Đối tượng rõ ràng là trẻ em.

Không chỉ là web thông tin mà có tính tương tác qua game.

Có ứng dụng UI/UX phù hợp trẻ nhỏ.

Có backend lưu tiến độ, điểm số, huy hiệu.

Có khả năng mở rộng thêm nhiều bài học và mini game.

Có thể dùng trong trường học hoặc hoạt động ngoại khóa.

Sản phẩm có tính giáo dục, tính công nghệ và tính trình diễn cao.

22. Kịch bản demo trước hội đồng

Bước 1: Giới thiệu vấn đề

Trẻ em thường khó tiếp thu luật giao thông nếu chỉ học qua lý thuyết. Vì vậy nhóm xây dựng web app giúp trẻ học thông qua trò chơi.

Bước 2: Giới thiệu web app

Mở trang chủ, giới thiệu mascot, mục tiêu và giao diện chọn mini game.

Bước 3: Demo mini game 1

Chơi game Đèn Xanh Qua Đường.

Trình bày:

Khi đèn đỏ, hệ thống không cho qua.

Khi đèn xanh, nhân vật được qua đường.

Sau khi hoàn thành, hệ thống hiện bài học.

Bước 4: Demo mini game 2 hoặc 3

Chơi game Đội Mũ Xinh hoặc Biển Báo Vui Nhộn.

Trình bày:

Trẻ học qua thao tác kéo thả/chọn đáp án.

Làm sai được nhắc nhẹ, không gây áp lực.

Bước 5: Demo trang tiến độ

Cho hội đồng xem điểm, sao, huy hiệu và bài học đã hoàn thành.

Bước 6: Trình bày kỹ thuật

Giải thích:

Frontend dùng React/Next.js.

Game 2D dùng Phaser.js.

Backend dùng Node.js.

Database dùng PostgreSQL.

Hệ thống có thể mở rộng thêm mini game.

23. Rủi ro và cách khắc phục

Rủi ro 1: Game quá nặng, chạy chậm

Cách khắc phục:

Dùng đồ họa 2D nhẹ.

Nén hình ảnh.

Chỉ tải game khi người chơi chọn.

Hạn chế animation phức tạp.

Rủi ro 2: Nội dung luật chưa chính xác

Cách khắc phục:

Chỉ chọn luật cơ bản, dễ hiểu.

Tham khảo nguồn chính thống.

Không đưa tình huống pháp lý phức tạp.

Nhờ giảng viên góp ý nội dung.

Rủi ro 3: Trẻ khó hiểu cách chơi

Cách khắc phục:

Thêm hướng dẫn bằng hình ảnh.

Nút bấm lớn.

Mỗi game chỉ có 1–2 thao tác chính.

Có demo ngắn trước khi chơi.

Rủi ro 4: Không đủ thời gian làm 5 game

Cách khắc phục:

Làm trước 3 game quan trọng.

2 game còn lại làm prototype.

Ưu tiên hoàn thiện chất lượng hơn số lượng.

24. Kết luận

Dự án “Bé Vui Giao Thông” là một web app giáo dục kết hợp trò chơi tương tác, giúp trẻ em học các quy tắc an toàn giao thông cơ bản một cách dễ hiểu và thú vị. Sản phẩm có giao diện thân thiện, nội dung phù hợp trẻ em, hệ thống mini game rõ ràng, backend lưu tiến độ học tập và có khả năng mở rộng trong tương lai.

Dự án phù hợp để làm đồ án vì có đầy đủ các yếu tố: phân tích người dùng, thiết kế UI/UX, lập trình frontend, backend, database, xử lý game logic, kiểm thử, triển khai và trình bày demo thực tế.
