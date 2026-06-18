# Tài Liệu Yêu Cầu - Traffic Kids (Bé Vui Giao Thông)

## Giới Thiệu

Traffic Kids là web app giáo dục dạng "game hub" với 5 mini game tương tác giúp trẻ em từ 6-11 tuổi học các quy tắc an toàn giao thông đường bộ thông qua trò chơi. Ứng dụng có giao diện hoạt hình màu sắc tươi sáng, thao tác đơn giản, phù hợp với học sinh tiểu học. Mục tiêu là giúp trẻ hình thành thói quen tham gia giao thông an toàn qua việc học đèn tín hiệu, biển báo, kỹ năng quan sát và đội mũ bảo hiểm đúng cách.

## Bảng Thuật Ngữ

- **Traffic_Kids_System**: Hệ thống web app giáo dục giao thông cho trẻ em
- **Player**: Trẻ em từ 6-11 tuổi sử dụng ứng dụng
- **Mini_Game**: Một trò chơi giáo dục nhỏ trong game hub (Đèn Xanh, Nhìn Trái Phải, Đội Mũ, Biển Báo, Đường Đến Trường)
- **Game_Session**: Một lần chơi hoàn chỉnh của một Mini_Game từ bắt đầu đến kết thúc
- **Score**: Điểm số tích lũy trong một Game_Session
- **Star**: Ngôi sao đánh giá (1-3 sao) dựa trên Score trong Game_Session
- **Badge**: Huy hiệu đặc biệt nhận được khi đạt thành tích
- **Progress**: Tiến độ hoàn thành các Mini_Game của Player
- **Lesson**: Bài học giáo dục giao thông hiển thị sau mỗi Game_Session
- **Traffic_Sign**: Biển báo giao thông (người đi bộ, trường học, cấm đi ngược chiều, v.v.)
- **Guardian**: Giáo viên hoặc phụ huynh giám sát và xem tiến độ của Player
- **Admin**: Quản trị viên quản lý nội dung và dữ liệu hệ thống
- **Game_Hub**: Màn hình chọn Mini_Game hiển thị dạng bản đồ thành phố hoạt hình
- **Result_Screen**: Màn hình kết quả hiển thị Score, Star, Badge và Lesson sau khi hoàn thành Game_Session
- **Character**: Nhân vật hoạt hình được Player điều khiển trong Mini_Game
- **Safe_Action**: Hành động an toàn trong giao thông (dừng ở đèn đỏ, quan sát trước khi sang đường, đội mũ bảo hiểm, v.v.)
- **Unsafe_Action**: Hành động không an toàn trong giao thông (qua đường khi đèn đỏ, không quan sát, không đội mũ, v.v.)
- **Animation**: Hiệu ứng chuyển động nhẹ nhàng trong giao diện
- **Child_Friendly_Message**: Thông điệp dùng ngôn ngữ phù hợp trẻ em (vui vẻ, khích lệ, không đe dọa)

## Yêu Cầu

### Yêu Cầu 1: Hệ Thống Game Hub

**User Story:** Là Player, tôi muốn xem và chọn các Mini_Game từ màn hình chính, để tôi có thể chọn trò chơi muốn chơi.

#### Tiêu Chí Chấp Nhận

1. THE Traffic_Kids_System SHALL display a Game_Hub with 5 clickable Mini_Game zones representing Đèn Xanh Qua Đường, Nhìn Trái Nhìn Phải, Đội Mũ Xinh Đi An Toàn, Biển Báo Vui Nhộn, and Đường Đến Trường An Toàn
2. WHEN a Player clicks on a Mini_Game zone, THE Traffic_Kids_System SHALL navigate to the corresponding Mini_Game screen within 500 milliseconds
3. THE Traffic_Kids_System SHALL display the Game_Hub using a colorful animated city map layout with bright colors (light blue background, green for correct actions, red for stop, yellow/orange for attention)
4. THE Traffic_Kids_System SHALL display large touch-friendly buttons with minimum 60 pixel height and width on the Game_Hub
5. WHEN the Player first opens the application, THE Traffic_Kids_System SHALL display a welcome screen with a mascot named Bé An and a start button before showing the Game_Hub

### Yêu Cầu 2: Mini Game Đèn Xanh Qua Đường

**User Story:** Là Player, tôi muốn chơi mini game về đèn giao thông, để tôi có thể học cách qua đường đúng lúc khi đèn xanh.

#### Tiêu Chí Chấp Nhận

1. WHEN the Player starts Đèn Xanh Qua Đường, THE Traffic_Kids_System SHALL display a Character standing at a crosswalk with a traffic light showing red or green state
2. WHEN the traffic light shows green state AND the Player moves the Character across the crosswalk, THE Traffic_Kids_System SHALL add 10 points to the Score
3. WHEN the traffic light shows red state AND the Player moves the Character across the crosswalk, THE Traffic_Kids_System SHALL subtract 5 points from the Score and display a Child_Friendly_Message encouraging to wait
4. WHEN the Player completes 5 correct crossings consecutively without errors, THE Traffic_Kids_System SHALL award 3 Stars for the Game_Session
5. THE Traffic_Kids_System SHALL cycle the traffic light state between red and green at intervals between 3 and 7 seconds
6. WHEN the Game_Session ends, THE Traffic_Kids_System SHALL navigate to the Result_Screen showing the Score, Stars, and a Lesson about traffic light rules

### Yêu Cầu 3: Mini Game Nhìn Trái Nhìn Phải

**User Story:** Là Player, tôi muốn chơi mini game về kỹ năng quan sát, để tôi có thể học cách nhìn trái-phải-trái trước khi sang đường.

#### Tiêu Chí Chấp Nhận

1. WHEN the Player starts Nhìn Trái Nhìn Phải, THE Traffic_Kids_System SHALL display a Character at a road edge with directional prompts (look left, look right, look left again)
2. WHEN the Player performs the observation sequence in correct order (left → right → left), THE Traffic_Kids_System SHALL add 5 points for each observation step and 15 bonus points when crossing safely
3. WHEN the Player performs observations out of order, THE Traffic_Kids_System SHALL display a Child_Friendly_Message reminding the correct sequence
4. THE Traffic_Kids_System SHALL display animated vehicles approaching from left or right directions during the observation phase
5. WHEN vehicles are approaching AND the Player attempts to cross, THE Traffic_Kids_System SHALL prevent crossing and display a Child_Friendly_Message to wait until safe
6. WHEN the Game_Session ends, THE Traffic_Kids_System SHALL navigate to the Result_Screen showing the Score, Stars, and a Lesson about proper observation technique

### Yêu Cầu 4: Mini Game Đội Mũ Xinh Đi An Toàn

**User Story:** Là Player, tôi muốn chơi mini game về đội mũ bảo hiểm, để tôi có thể học cách đội mũ và cài quai đúng cách.

#### Tiêu Chí Chấp Nhận

1. WHEN the Player starts Đội Mũ Xinh Đi An Toàn, THE Traffic_Kids_System SHALL display a Character without a helmet and multiple helmet options (correct helmet, incorrect items like hat, cap)
2. WHEN the Player drags and drops the correct helmet onto the Character, THE Traffic_Kids_System SHALL add 10 points to the Score
3. WHEN the Player drags and drops an incorrect item onto the Character, THE Traffic_Kids_System SHALL display a Child_Friendly_Message explaining why it is not safe
4. WHEN the Player places the correct helmet AND clicks the chin strap, THE Traffic_Kids_System SHALL add 10 bonus points and display positive feedback
5. THE Traffic_Kids_System SHALL support drag-and-drop interaction with minimum 80 pixel touch targets for all helmet options
6. WHEN the Game_Session ends, THE Traffic_Kids_System SHALL navigate to the Result_Screen showing the Score, Stars, and a Lesson about helmet safety

### Yêu Cầu 5: Mini Game Biển Báo Vui Nhộn

**User Story:** Là Player, tôi muốn chơi mini game về biển báo giao thông, để tôi có thể nhận biết các biển báo cơ bản.

#### Tiêu Chí Chấp Nhận

1. WHEN the Player starts Biển Báo Vui Nhộn, THE Traffic_Kids_System SHALL display a traffic situation scenario and 3 to 4 Traffic_Sign options
2. WHEN the Player selects the correct Traffic_Sign for the scenario, THE Traffic_Kids_System SHALL add 10 points to the Score and display a Child_Friendly_Message explaining the sign
3. WHEN the Player selects an incorrect Traffic_Sign, THE Traffic_Kids_System SHALL display a Child_Friendly_Message explaining the correct sign
4. THE Traffic_Kids_System SHALL include at minimum 8 different Traffic_Sign types (pedestrian crossing, school zone, no entry, speed limit, stop, one way, bicycle lane, construction)
5. WHEN the Player completes 5 questions correctly, THE Traffic_Kids_System SHALL award Stars based on accuracy and navigate to the Result_Screen
6. THE Traffic_Kids_System SHALL randomize Traffic_Sign questions for each new Game_Session

### Yêu Cầu 6: Mini Game Đường Đến Trường An Toàn

**User Story:** Là Player, tôi muốn chơi mini game về chọn đường đi an toàn, để tôi có thể học cách đi từ nhà đến trường một cách an toàn.

#### Tiêu Chí Chấp Nhận

1. WHEN the Player starts Đường Đến Trường An Toàn, THE Traffic_Kids_System SHALL display a map with a starting point (home) and destination (school) with multiple path options
2. WHEN the Player selects a safe path option (sidewalk, pedestrian crossing), THE Traffic_Kids_System SHALL add 10 points to the Score
3. WHEN the Player selects an unsafe path option (crossing without crosswalk, walking on road), THE Traffic_Kids_System SHALL display a Child_Friendly_Message explaining the danger and suggest the safe alternative
4. THE Traffic_Kids_System SHALL display at minimum 3 decision points during the journey from home to school
5. WHEN the Character reaches the school destination safely, THE Traffic_Kids_System SHALL award bonus points and Stars based on safe choices made
6. WHEN the Game_Session ends, THE Traffic_Kids_System SHALL navigate to the Result_Screen showing the Score, Stars, and a Lesson about safe route planning

### Yêu Cầu 7: Hệ Thống Điểm Và Đánh Giá

**User Story:** Là Player, tôi muốn nhận điểm và ngôi sao sau mỗi lần chơi, để tôi có thể theo dõi tiến bộ của mình.

#### Tiêu Chí Chấp Nhận

1. WHEN a Player completes a Game_Session, THE Traffic_Kids_System SHALL calculate a Score based on Safe_Actions performed during the session
2. WHEN the Score is calculated, THE Traffic_Kids_System SHALL assign 1 Star for scores between 0 and 40 points, 2 Stars for scores between 41 and 70 points, and 3 Stars for scores 71 points or higher
3. THE Traffic_Kids_System SHALL persist the Score and Star rating to the database within 2 seconds of Game_Session completion
4. WHEN a Player achieves specific milestones (complete all 5 Mini_Games with 3 Stars, play 10 sessions, achieve 500 total points), THE Traffic_Kids_System SHALL award a Badge
5. THE Traffic_Kids_System SHALL display the Score and Stars on the Result_Screen with Animation for visual feedback
6. WHEN a Player replays a Mini_Game, THE Traffic_Kids_System SHALL save the new Score only if it is higher than the previous best Score for that Mini_Game

### Yêu Cầu 8: Hệ Thống Bài Học Giáo Dục

**User Story:** Là Player, tôi muốn xem bài học sau khi chơi game, để tôi có thể hiểu rõ hơn về quy tắc giao thông.

#### Tiêu Chí Chấp Nhận

1. WHEN a Game_Session ends, THE Traffic_Kids_System SHALL display a Result_Screen containing a relevant Lesson related to the Mini_Game topic
2. THE Traffic_Kids_System SHALL format each Lesson using Child_Friendly_Message language with vocabulary suitable for ages 6 to 11
3. THE Traffic_Kids_System SHALL display each Lesson with accompanying illustrations showing correct Safe_Actions
4. THE Traffic_Kids_System SHALL limit Lesson text to maximum 100 words for readability by children
5. WHEN a Player views a Lesson on the Result_Screen, THE Traffic_Kids_System SHALL provide a replay button to restart the Mini_Game and a home button to return to the Game_Hub
6. THE Traffic_Kids_System SHALL store at minimum 1 unique Lesson per Mini_Game in the database

### Yêu Cầu 9: Giao Diện Thân Thiện Trẻ Em

**User Story:** Là Player, tôi muốn sử dụng giao diện dễ hiểu và vui mắt, để tôi có thể tự thao tác mà không cần người lớn giúp.

#### Tiêu Chí Chấp Nhận

1. THE Traffic_Kids_System SHALL use cartoon 2D art style with rounded, friendly Character designs throughout the interface
2. THE Traffic_Kids_System SHALL apply a color palette with light blue background, green for correct actions, red for stop/danger, and yellow/orange for caution
3. THE Traffic_Kids_System SHALL display all interactive buttons with minimum 60 pixel height and 60 pixel width for easy touch interaction
4. THE Traffic_Kids_System SHALL minimize text usage and prioritize icons and illustrations over written instructions
5. THE Traffic_Kids_System SHALL use clear, readable typography with minimum 18 pixel font size for all text content
6. THE Traffic_Kids_System SHALL apply gentle Animations with maximum 500 millisecond duration for transitions and feedback
7. THE Traffic_Kids_System SHALL render the interface responsively on mobile devices (minimum 375 pixel width), tablets (minimum 768 pixel width), and desktop screens (minimum 1024 pixel width)
8. THE Traffic_Kids_System SHALL use Child_Friendly_Messages exclusively, including phrases like "Bé làm tốt lắm!", "Mình chờ đèn xanh nhé!", "Đội mũ và cài quai thật chắc nhé!" and excluding phrases like "Sai rồi!", "Nguy hiểm chết người!", "Vi phạm luật!"

### Yêu Cầu 10: Tiến Độ Và Theo Dõi

**User Story:** Là Player, tôi muốn xem tiến độ học tập của mình, để tôi có thể biết mình đã hoàn thành những game nào.

#### Tiêu Chú Chấp Nhận

1. WHEN a Player accesses the progress screen, THE Traffic_Kids_System SHALL display completion status for all 5 Mini_Games with total Stars earned for each
2. THE Traffic_Kids_System SHALL display all Badges earned by the Player with earned_at timestamps
3. THE Traffic_Kids_System SHALL calculate and display total cumulative Score across all Game_Sessions
4. WHEN a Guardian accesses the progress screen for a Player, THE Traffic_Kids_System SHALL display the same Progress information along with timestamps for each Game_Session played
5. THE Traffic_Kids_System SHALL update Progress data in real-time within 2 seconds after each Game_Session completion
6. THE Traffic_Kids_System SHALL persist all Progress data to the database to prevent data loss on application reload

### Yêu Cầu 11: Quản Lý Người Dùng

**User Story:** Là Guardian, tôi muốn tạo tài khoản cho con tôi, để con có thể lưu lại tiến độ học tập.

#### Tiêu Chí Chấp Nhận

1. WHEN a Guardian submits a registration form with name, email, and password, THE Traffic_Kids_System SHALL create a new user account with role set to player
2. THE Traffic_Kids_System SHALL hash the password using a secure hashing algorithm before storing in the database
3. WHEN a user submits a login form with valid email and password, THE Traffic_Kids_System SHALL authenticate the user and issue a JWT token valid for 7 days
4. WHEN a user submits a login form with invalid credentials, THE Traffic_Kids_System SHALL display an error message and reject the login attempt
5. THE Traffic_Kids_System SHALL validate email format according to RFC 5322 standard before account creation
6. THE Traffic_Kids_System SHALL require passwords to contain minimum 8 characters for account creation

### Yêu Cầu 12: Quản Trị Nội Dung

**User Story:** Là Admin, tôi muốn quản lý nội dung mini game và bài học, để tôi có thể cập nhật hoặc thêm nội dung mới.

#### Tiêu Chí Chấp Nhận

1. WHEN an Admin is authenticated with admin role, THE Traffic_Kids_System SHALL display an admin dashboard with options to manage Mini_Games, Lessons, Traffic_Signs, and Badges
2. WHEN an Admin creates or updates a Mini_Game, THE Traffic_Kids_System SHALL validate that title, description, topic, difficulty, and thumbnail_url fields are provided and save to the database
3. WHEN an Admin creates or updates a Lesson, THE Traffic_Kids_System SHALL validate that mini_game_id, title, content, and child_friendly_message fields are provided and save to the database
4. WHEN an Admin creates or updates a Traffic_Sign, THE Traffic_Kids_System SHALL validate that name, meaning, image_url, category, and explanation_for_kids fields are provided and save to the database
5. WHEN an Admin toggles the is_active field for a Mini_Game to false, THE Traffic_Kids_System SHALL hide that Mini_Game from the Game_Hub for all Players
6. WHEN an Admin accesses usage statistics, THE Traffic_Kids_System SHALL display total Players registered, total Game_Sessions played, and average Stars per Mini_Game

### Yêu Cầu 13: Hiệu Năng Và Độ Tin Cậy

**User Story:** Là Player, tôi muốn ứng dụng tải nhanh và không bị giật lag, để tôi có thể chơi game mượt mà.

#### Tiêu Chí Chấp Nhận

1. WHEN a Player navigates to any screen, THE Traffic_Kids_System SHALL render the screen within 2 seconds on a connection with minimum 3 Mbps bandwidth
2. THE Traffic_Kids_System SHALL maintain minimum 30 frames per second during Animation and gameplay interactions
3. WHEN a Player completes a Game_Session AND the application reloads, THE Traffic_Kids_System SHALL retain the saved Score and Progress from the database
4. THE Traffic_Kids_System SHALL compress all image assets to maximum 500 kilobytes per file while maintaining visual quality suitable for the target display resolution
5. WHEN the database or backend service is unavailable, THE Traffic_Kids_System SHALL display an error message and allow the Player to retry the operation
6. THE Traffic_Kids_System SHALL implement lazy loading for Mini_Game assets to load only when the Player selects that specific Mini_Game

### Yêu Cầu 14: An Toàn Nội Dung

**User Story:** Là Guardian, tôi muốn đảm bảo nội dung an toàn cho trẻ, để con tôi không tiếp xúc nội dung không phù hợp.

#### Tiêu Chí Chấp Nhận

1. THE Traffic_Kids_System SHALL exclude all violent imagery and language from Mini_Games, Lessons, and Child_Friendly_Messages
2. THE Traffic_Kids_System SHALL exclude all sensitive personal data collection beyond name and email for account purposes
3. THE Traffic_Kids_System SHALL display only Child_Friendly_Messages that use positive, encouraging language suitable for ages 6 to 11
4. WHEN displaying Unsafe_Actions consequences in Mini_Games, THE Traffic_Kids_System SHALL use gentle educational feedback rather than graphic depictions of harm
5. THE Traffic_Kids_System SHALL implement content moderation for any Admin-created Lessons and Child_Friendly_Messages to validate age-appropriateness
6. THE Traffic_Kids_System SHALL comply with child data protection regulations by requiring Guardian consent for account creation for users under 13 years old

### Yêu Cầu 15: Khả Năng Mở Rộng

**User Story:** Là Admin, tôi muốn dễ dàng thêm mini game và nội dung mới, để ứng dụng có thể phát triển theo thời gian.

#### Tiêu Chí Chấp Nhận

1. THE Traffic_Kids_System SHALL structure the database schema to allow adding new Mini_Games without modifying existing table structures
2. WHEN a new Mini_Game is added with unique topic and title, THE Traffic_Kids_System SHALL automatically display it in the Game_Hub without requiring code changes
3. THE Traffic_Kids_System SHALL allow adding new Traffic_Sign entries with new category values without database migration
4. THE Traffic_Kids_System SHALL allow adding new Badge definitions with custom criteria through the admin interface
5. THE Traffic_Kids_System SHALL support adding new Lesson entries linked to existing or new Mini_Games through the admin interface
6. THE Traffic_Kids_System SHALL maintain API versioning to allow frontend and backend updates independently without breaking compatibility

---

## Ghi Chú Đặc Biệt

**Lưu ý về Parser và Serializer:**  
Dự án này không yêu cầu parser hoặc serializer tùy chỉnh cho định dạng dữ liệu phức tạp. JSON serialization/deserialization được xử lý bởi các thư viện chuẩn (JSON.stringify/parse, Prisma ORM). Nếu trong tương lai có yêu cầu về cấu trúc dữ liệu tùy chỉnh (ví dụ: định dạng level game đặc biệt), cần bổ sung yêu cầu về parser, pretty printer và round-trip testing.

**Lưu ý về Child_Friendly_Message:**  
Tất cả thông điệp hiển thị cho trẻ phải dùng ngôn ngữ khích lệ, vui vẻ, tránh phủ định và đe dọa. Ví dụ:
- ✅ "Bé làm tốt lắm!"
- ✅ "Mình chờ đèn xanh nhé!"
- ✅ "Đội mũ và cài quai thật chắc nhé!"
- ❌ "Sai rồi!"
- ❌ "Nguy hiểm chết người!"
- ❌ "Vi phạm luật!"
