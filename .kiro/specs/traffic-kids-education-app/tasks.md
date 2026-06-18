# Implementation Plan: Traffic Kids (Bé Vui Giao Thông)

## Overview

Traffic Kids là web application giáo dục giao thông cho trẻ em 6-11 tuổi, với kiến trúc Next.js (frontend) + Express.js (backend) + PostgreSQL (database). Dự án bao gồm 5 mini games tương tác được xây dựng với Phaser.js, hệ thống scoring/badges, và admin dashboard.

**Tech Stack:**
- Frontend: Next.js 14+, TypeScript, Tailwind CSS v4, Framer Motion, Phaser.js 3.x
- Backend: Node.js 18+, Express.js, TypeScript, Prisma ORM
- Database: PostgreSQL 15+ (Supabase)
- Authentication: JWT + bcrypt

**Implementation Approach:**
Tasks được chia thành 10 phases, từ setup infrastructure đến deployment. MVP focus vào Game Hub và 3 games đầu tiên (Đèn Xanh, Nhìn Trái Phải, Đội Mũ) với authentication và scoring cơ bản.

---

## Tasks


### Phase 1: Project Setup & Infrastructure

- [ ] 1. Initialize project structure and configure development environment
  - [ ] 1.1 Create Next.js 14 project with TypeScript and App Router
    - Initialize with `create-next-app` using TypeScript template
    - Configure `tsconfig.json` with strict mode
    - Set up App Router directory structure (`app/`, `components/`, `lib/`)
    - _Requirements: 13.1_
  
  - [ ] 1.2 Install and configure Tailwind CSS v4
    - Install Tailwind CSS and dependencies
    - Configure `tailwind.config.js` with custom color palette (light blue, green, red, yellow)
    - Set up base styles and typography settings (minimum 18px font size)
    - _Requirements: 9.2, 9.5_
  
  - [ ] 1.3 Set up Express.js backend with TypeScript
    - Create `backend/` directory structure
    - Initialize Express.js with TypeScript configuration
    - Configure middleware (cors, helmet, express-rate-limit)
    - Set up environment variables with `.env` template
    - _Requirements: 13.1_
  
  - [ ] 1.4 Configure monorepo structure and shared types
    - Set up workspace configuration (npm workspaces or yarn workspaces)
    - Create shared types package for API contracts
    - Configure TypeScript path aliases for imports
    - _Requirements: 15.6_

- [ ] 2. Checkpoint - Verify project builds and runs
  - Ensure all tests pass, ask the user if questions arise.


### Phase 2: Database & Backend Core

- [ ] 3. Set up database schema with Prisma
  - [ ] 3.1 Initialize Prisma and create base schema
    - Install Prisma and Prisma Client
    - Create `schema.prisma` with User, MiniGame, GameScore models
    - Configure PostgreSQL connection string
    - _Requirements: 7.3, 10.6_
  
  - [ ] 3.2 Define all database models and relationships
    - Create Lesson, Badge, UserBadge, TrafficSign models
    - Define foreign key relationships and indexes
    - Add enums (Role, GameType)
    - Configure cascade delete rules
    - _Requirements: 8.1, 7.4, 5.1_
  
  - [ ] 3.3 Run initial migration and seed data
    - Execute `prisma migrate dev` to create tables
    - Create seed script for initial 5 mini games
    - Seed traffic signs (minimum 8 types)
    - Seed lessons for each game
    - Seed initial badge definitions
    - _Requirements: 5.4, 8.6, 15.1_
  
  - [ ]* 3.4 Write property test for database schema
    - **Property 19: Game Score Persistence Round-Trip**
    - **Validates: Requirements 7.3, 10.6, 13.3**

- [ ] 4. Implement core backend API infrastructure
  - [ ] 4.1 Create Express server with middleware pipeline
    - Set up CORS with frontend domain whitelist
    - Configure rate limiting (100 requests/15 minutes)
    - Add request logging middleware
    - Add error handling middleware
    - _Requirements: 13.1_
  
  - [ ] 4.2 Implement JWT authentication utilities
    - Create JWT token generation function (7-day expiration)
    - Create JWT verification middleware
    - Implement password hashing with bcrypt (salt rounds = 10)
    - _Requirements: 11.2, 11.3_
  
  - [ ]* 4.3 Write property test for password hashing
    - **Property 37: Password Hashing Enforcement**
    - **Validates: Requirements 11.2**
  
  - [ ]* 4.4 Write property test for JWT token issuance
    - **Property 38: JWT Token Issuance on Valid Login**
    - **Validates: Requirements 11.3**

- [ ] 5. Checkpoint - Database and auth infrastructure complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 3: Authentication & User Management

- [ ] 6. Implement authentication endpoints
  - [ ] 6.1 Create user registration endpoint
    - Implement POST `/api/auth/register`
    - Validate email format (RFC 5322), password length (min 8 chars)
    - Hash password before storing
    - Return JWT token and user data
    - _Requirements: 11.1, 11.5, 11.6_
  
  - [ ]* 6.2 Write property test for email validation
    - **Property 40: Email Format Validation**
    - **Validates: Requirements 11.5**
  
  - [ ]* 6.3 Write property test for password length
    - **Property 41: Password Minimum Length Validation**
    - **Validates: Requirements 11.6**
  
  - [ ] 6.4 Create user login endpoint
    - Implement POST `/api/auth/login`
    - Verify credentials with bcrypt
    - Issue JWT token on success
    - Return appropriate error on invalid credentials
    - _Requirements: 11.3, 11.4_
  
  - [ ]* 6.5 Write property test for login rejection
    - **Property 39: Login Rejection on Invalid Credentials**
    - **Validates: Requirements 11.4**
  
  - [ ] 6.6 Create logout and current user endpoints
    - Implement POST `/api/auth/logout`
    - Implement GET `/api/auth/me` with JWT verification
    - _Requirements: 11.3_
  
  - [ ] 6.7 Create role-based authorization middleware
    - Implement middleware to check user role
    - Apply role guards to admin endpoints
    - _Requirements: 12.1_
  
  - [ ]* 6.8 Write property test for admin access control
    - **Property 42: Admin Dashboard Access Control**
    - **Validates: Requirements 12.1**

- [ ] 7. Implement frontend authentication UI
  - [ ] 7.1 Create registration form component
    - Build form with name, email, password fields
    - Add client-side validation
    - Style with child-friendly design (large buttons, clear labels)
    - _Requirements: 11.1, 9.3_
  
  - [ ] 7.2 Create login form component
    - Build form with email and password fields
    - Add error display for invalid credentials
    - Implement redirect after successful login
    - _Requirements: 11.3, 11.4_
  
  - [ ] 7.3 Create authentication context and hooks
    - Set up React Context for auth state
    - Create useAuth hook for accessing user data
    - Implement token storage in httpOnly cookies
    - Handle automatic token refresh (optional)
    - _Requirements: 11.3_
  
  - [ ] 7.4 Add route protection and navigation guards
    - Create ProtectedRoute component
    - Redirect unauthenticated users to login
    - Redirect authenticated users away from login/register
    - _Requirements: 11.3_

- [ ] 8. Checkpoint - Authentication flow complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 4: Frontend Foundation & UI Components

- [ ] 9. Build design system and core UI components
  - [ ] 9.1 Create color palette and theme configuration
    - Define CSS variables for primary colors (light blue, green, red, yellow)
    - Set up Tailwind theme extensions
    - Create semantic color tokens (success, warning, danger, info)
    - _Requirements: 9.2_
  
  - [ ] 9.2 Create typography system
    - Configure Baloo 2 or Nunito font family
    - Define font size scale (minimum 18px for body)
    - Set up line-height and letter-spacing
    - _Requirements: 9.5_
  
  - [ ] 9.3 Build button component library
    - Create PrimaryButton component (min 60px height/width)
    - Create SecondaryButton and IconButton variants
    - Add hover/active states with animations
    - _Requirements: 9.3, 9.6_
  
  - [ ]* 9.4 Write property test for button dimensions
    - **Property 2: Touch Target Minimum Dimensions**
    - **Validates: Requirements 1.4, 4.5, 9.3**
  
  - [ ] 9.5 Build card components
    - Create GameCard component with hover effects
    - Create LessonCard component
    - Create ResultCard component
    - _Requirements: 1.1, 8.2_
  
  - [ ] 9.6 Create star rating component
    - Build 3-star display with filled/outlined states
    - Add animation for star reveal
    - Support read-only and interactive modes
    - _Requirements: 7.2, 7.5_
  
  - [ ] 9.7 Create progress bar component
    - Build linear progress bar with gradient fill
    - Add smooth animation transitions
    - _Requirements: 10.1_

- [ ] 10. Build layout and navigation components
  - [ ] 10.1 Create main layout with navigation
    - Build app layout with header and content area
    - Create navigation bar with Logo, NavLinks, UserMenu
    - Make navigation responsive (mobile hamburger, desktop persistent)
    - _Requirements: 1.1, 9.7_
  
  - [ ] 10.2 Create mascot character component
    - Build Bé An mascot sprite component
    - Add idle animation
    - Create speech bubble for messages
    - _Requirements: 1.5, 8.2_
  
  - [ ] 10.3 Implement responsive layout system
    - Configure breakpoints (mobile 375px, tablet 768px, desktop 1024px)
    - Test layouts at all breakpoints
    - _Requirements: 9.7_
  
  - [ ]* 10.4 Write property test for responsive rendering
    - **Property 29: Responsive Viewport Rendering**
    - **Validates: Requirements 9.7**

- [ ] 11. Checkpoint - UI foundation complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 5: Game Hub & Navigation

- [ ] 12. Implement Game Hub backend API
  - [ ] 12.1 Create games listing endpoint
    - Implement GET `/api/games` to return active games
    - Filter by `is_active = true`
    - Include game metadata (title, description, thumbnail_url)
    - _Requirements: 1.1, 15.1_
  
  - [ ]* 12.2 Write property test for game visibility toggle
    - **Property 44: Game Visibility Toggle**
    - **Validates: Requirements 12.5**
  
  - [ ] 12.3 Create user progress endpoint
    - Implement GET `/api/users/progress`
    - Return cumulative score, badges, game-specific progress
    - Calculate best stars per game
    - _Requirements: 10.1, 10.3_
  
  - [ ]* 12.4 Write property test for cumulative score
    - **Property 33: Cumulative Score Accuracy**
    - **Validates: Requirements 10.3**

- [ ] 13. Build Game Hub frontend
  - [ ] 13.1 Create WelcomeScreen component (first visit)
    - Display mascot Bé An with introduction
    - Add "Bắt đầu" button
    - Show only on first visit (use local storage flag)
    - _Requirements: 1.5_
  
  - [ ] 13.2 Create CityMapLayout component
    - Design colorful city map background
    - Position 5 game zones on map
    - Add mascot character animation
    - _Requirements: 1.3_
  
  - [ ] 13.3 Build GameZone component
    - Display game icon, title, and star count
    - Make clickable with hover effect
    - Show best stars earned (or 0 if not played)
    - _Requirements: 1.1, 10.1_
  
  - [ ] 13.4 Implement game navigation
    - Handle game zone click events
    - Navigate to game route (`/games/[gameId]`)
    - Ensure navigation completes within 500ms
    - _Requirements: 1.2_
  
  - [ ]* 13.5 Write property test for navigation performance
    - **Property 1: Navigation Performance Within Latency Bounds**
    - **Validates: Requirements 1.2**
  
  - [ ] 13.6 Add ProgressSummary widget
    - Display total score and badge count
    - Show on Game Hub page
    - Update in real-time after game completion
    - _Requirements: 10.3_

- [ ] 14. Checkpoint - Game Hub functional
  - Ensure all tests pass, ask the user if questions arise.


### Phase 6: Mini Games Implementation

#### Game 1: Đèn Xanh Qua Đường (Traffic Light Crossing)

- [ ] 15. Build Đèn Xanh game backend
  - [ ] 15.1 Create game session endpoints
    - Implement POST `/api/games/:id/sessions` to start session
    - Implement PUT `/api/games/sessions/:id` to update session
    - Implement POST `/api/games/sessions/:id/complete` to finish session
    - _Requirements: 2.6, 7.3_
  
  - [ ] 15.2 Implement scoring logic for Đèn Xanh
    - Award 10 points for green light crossing
    - Deduct 5 points for red light crossing
    - Calculate stars based on score (0-40: 1★, 41-70: 2★, 71+: 3★)
    - _Requirements: 2.2, 2.3, 7.2_
  
  - [ ]* 15.3 Write property test for score-to-stars mapping
    - **Property 18: Score-to-Stars Mapping**
    - **Validates: Requirements 7.2**

- [ ] 16. Build Đèn Xanh game frontend (Phaser.js)
  - [ ] 16.1 Create Phaser game container component
    - Set up PhaserGameContainer React wrapper
    - Configure Phaser game instance
    - Handle game lifecycle (create, update, destroy)
    - _Requirements: 2.1_
  
  - [ ] 16.2 Implement traffic light scene
    - Create Phaser scene with crosswalk background
    - Add character sprite with idle and walking animations
    - Add traffic light sprite with 3 states (red, yellow, green)
    - Implement light state cycling (3-7 seconds random interval)
    - _Requirements: 2.1, 2.5_
  
  - [ ]* 16.3 Write property test for traffic light timing
    - **Property 5: Traffic Light Cycle Timing Bounds**
    - **Validates: Requirements 2.5**
  
  - [ ] 16.4 Implement crossing mechanics
    - Add "Cross" button or tap-to-cross interaction
    - Animate character crossing on green light
    - Block crossing and show message on red light
    - Update score display in real-time
    - _Requirements: 2.2, 2.3_
  
  - [ ]* 16.5 Write property test for green light reward
    - **Property 3: Green Light Crossing Reward**
    - **Validates: Requirements 2.2**
  
  - [ ]* 16.6 Write property test for red light penalty
    - **Property 4: Red Light Crossing Penalty**
    - **Validates: Requirements 2.3**
  
  - [ ] 16.7 Add child-friendly feedback messages
    - Display positive message on correct crossing
    - Display gentle reminder on red light crossing
    - Validate messages against forbidden words list
    - _Requirements: 2.3, 9.8_
  
  - [ ]* 16.8 Write property test for message validation
    - **Property 30: Child-Friendly Message Content Validation**
    - **Validates: Requirements 9.8, 14.3**

- [ ] 17. Checkpoint - Đèn Xanh game complete
  - Ensure all tests pass, ask the user if questions arise.

#### Game 2: Nhìn Trái Nhìn Phải (Look Left-Right-Left)

- [ ] 18. Build Nhìn Trái Phải game backend
  - [ ] 18.1 Implement observation sequence scoring
    - Award 5 points per correct observation step
    - Award 15 bonus points for safe crossing
    - Calculate total score from observation sequence
    - _Requirements: 3.2_
  
  - [ ]* 18.2 Write property test for observation scoring
    - **Property 7: Observation Sequence Scoring**
    - **Validates: Requirements 3.2**

- [ ] 19. Build Nhìn Trái Phải game frontend (Phaser.js)
  - [ ] 19.1 Create observation scene
    - Set up scene with character at curb edge
    - Add road background with vehicle lanes
    - Create directional arrow indicators (left/right)
    - _Requirements: 3.1_
  
  - [ ] 19.2 Implement observation sequence logic
    - Track observation order (left → right → left)
    - Award points for correct sequence
    - Show feedback message on out-of-order observation
    - _Requirements: 3.2, 3.3_
  
  - [ ]* 19.3 Write property test for out-of-order feedback
    - **Property 8: Out-of-Order Observation Feedback**
    - **Validates: Requirements 3.3**
  
  - [ ] 19.4 Add vehicle mechanics
    - Spawn vehicles randomly from left and right
    - Animate vehicles moving across screen
    - Detect vehicle approach and block crossing
    - _Requirements: 3.4, 3.5_
  
  - [ ]* 19.5 Write property test for crossing prevention
    - **Property 9: Vehicle Approach Crossing Prevention**
    - **Validates: Requirements 3.5**
  
  - [ ] 19.6 Implement crossing and completion
    - Enable "Cross" button after correct sequence
    - Check for vehicle safety before allowing crossing
    - Navigate to result screen on completion
    - _Requirements: 3.6_

- [ ] 20. Checkpoint - Nhìn Trái Phải game complete
  - Ensure all tests pass, ask the user if questions arise.


#### Game 3: Đội Mũ Xinh Đi An Toàn (Helmet Safety)

- [ ] 21. Build Đội Mũ game backend
  - [ ] 21.1 Implement helmet selection scoring
    - Award 10 points for correct helmet placement
    - Award 10 bonus points for strap fastening
    - Calculate total score including efficiency bonus
    - _Requirements: 4.2, 4.4_
  
  - [ ]* 21.2 Write property test for helmet reward
    - **Property 10: Correct Helmet Selection Reward**
    - **Validates: Requirements 4.2**
  
  - [ ]* 21.3 Write property test for strap bonus
    - **Property 12: Helmet Strap Completion Bonus**
    - **Validates: Requirements 4.4**

- [ ] 22. Build Đội Mũ game frontend (Phaser.js)
  - [ ] 22.1 Create helmet selection scene
    - Set up scene with character sprite (without helmet)
    - Add helmet and item sprites (correct helmet, hat, cap)
    - Create helmet outline drop target on character head
    - _Requirements: 4.1_
  
  - [ ] 22.2 Implement drag-and-drop mechanics
    - Enable dragging for all items (min 80px touch target)
    - Detect drop on character head target
    - Snap correct helmet into place
    - Bounce back incorrect items with animation
    - _Requirements: 4.2, 4.3, 4.5_
  
  - [ ]* 22.3 Write property test for incorrect item feedback
    - **Property 11: Incorrect Item Feedback**
    - **Validates: Requirements 4.3**
  
  - [ ] 22.4 Add chin strap interaction
    - Display chin strap button after helmet placement
    - Award bonus points on strap click
    - Show completion animation
    - _Requirements: 4.4_
  
  - [ ] 22.5 Complete game and navigate to result
    - Calculate final score
    - Navigate to result screen
    - _Requirements: 4.6_

- [ ] 23. Checkpoint - Đội Mũ game complete
  - Ensure all tests pass, ask the user if questions arise.

#### Game 4: Biển Báo Vui Nhộn (Traffic Signs Recognition)

- [ ] 24. Build Biển Báo game backend
  - [ ] 24.1 Create traffic signs data and endpoints
    - Implement GET `/api/traffic-signs` endpoint
    - Seed database with 8+ traffic signs
    - Include sign name, image, meaning, explanation for kids
    - _Requirements: 5.4_
  
  - [ ] 24.2 Implement sign question randomization
    - Generate random set of 5 questions per session
    - Ensure no duplicate questions in same session
    - Provide 3-4 sign options per question
    - _Requirements: 5.6_
  
  - [ ]* 24.3 Write property test for sign randomization
    - **Property 15: Sign Question Randomization**
    - **Validates: Requirements 5.6**
  
  - [ ] 24.4 Implement sign scoring logic
    - Award 10 points for correct first-try answers
    - Award 7 points for second-try, 5 for third-try
    - Add 20-point bonus for perfect round
    - _Requirements: 5.2_
  
  - [ ]* 24.5 Write property test for correct sign reward
    - **Property 13: Correct Sign Selection Reward**
    - **Validates: Requirements 5.2**

- [ ] 25. Build Biển Báo game frontend
  - [ ] 25.1 Create sign recognition scene
    - Display scenario illustration at top
    - Show question text in child-friendly language
    - Display 3-4 traffic sign options as buttons
    - _Requirements: 5.1_
  
  - [ ] 25.2 Implement sign selection logic
    - Handle sign button clicks
    - Show feedback for correct/incorrect selection
    - Display educational message explaining sign
    - _Requirements: 5.2, 5.3_
  
  - [ ]* 25.3 Write property test for incorrect sign feedback
    - **Property 14: Incorrect Sign Educational Feedback**
    - **Validates: Requirements 5.3**
  
  - [ ] 25.4 Add question progression
    - Move to next question after feedback
    - Track score across all 5 questions
    - Navigate to result screen after completion
    - _Requirements: 5.5_

- [ ] 26. Checkpoint - Biển Báo game complete
  - Ensure all tests pass, ask the user if questions arise.


#### Game 5: Đường Đến Trường An Toàn (Safe Route to School)

- [ ] 27. Build Đường Đến Trường game backend
  - [ ] 27.1 Implement route choice scoring
    - Award 10 points for each safe path choice
    - Deduct 5 points for unsafe choices
    - Add 20-point bonus for perfect route
    - _Requirements: 6.2, 6.3_
  
  - [ ]* 27.2 Write property test for safe path reward
    - **Property 16: Safe Path Selection Reward**
    - **Validates: Requirements 6.2**
  
  - [ ]* 27.3 Write property test for unsafe path feedback
    - **Property 17: Unsafe Path Educational Feedback**
    - **Validates: Requirements 6.3**

- [ ] 28. Build Đường Đến Trường game frontend (Phaser.js)
  - [ ] 28.1 Create top-down map scene
    - Set up tilemap for neighborhood layout
    - Add home icon at starting point
    - Add school icon at destination
    - Create path options (sidewalks, crosswalks, roads)
    - _Requirements: 6.1_
  
  - [ ] 28.2 Implement path decision points
    - Create 3+ decision points with path options
    - Display option buttons (safe vs unsafe choices)
    - Animate character movement along selected path
    - _Requirements: 6.4_
  
  - [ ] 28.3 Add path choice feedback
    - Award points for safe choices
    - Display educational message for unsafe choices
    - Suggest safer alternatives
    - _Requirements: 6.2, 6.3_
  
  - [ ] 28.4 Complete route and show results
    - Track all path choices
    - Calculate final score and stars
    - Navigate to result screen on reaching school
    - _Requirements: 6.5, 6.6_

- [ ] 29. Checkpoint - All 5 mini games complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 7: Progress & Scoring System

- [ ] 30. Implement scoring and star calculation
  - [ ] 30.1 Create score calculation service
    - Implement `calculateStars(score)` function
    - Clamp scores to 0-100 range
    - Apply star thresholds (1★: 0-40, 2★: 41-70, 3★: 71+)
    - _Requirements: 7.2_
  
  - [ ] 30.2 Implement high score retention logic
    - Compare new score with previous best score
    - Update only if new score is higher
    - Retain previous best otherwise
    - _Requirements: 7.6_
  
  - [ ]* 30.3 Write property test for high score retention
    - **Property 21: High Score Retention**
    - **Validates: Requirements 7.6**
  
  - [ ] 30.3 Add progress update handling
    - Update user progress within 2 seconds of game completion
    - Recalculate cumulative score
    - Update game-specific best stars
    - _Requirements: 10.5_
  
  - [ ]* 30.4 Write property test for progress update timeliness
    - **Property 35: Progress Update Timeliness**
    - **Validates: Requirements 10.5**

- [ ] 31. Implement badge system
  - [ ] 31.1 Create badge awarding service
    - Define badge criteria (all games 3★, 500 total points, 10 sessions)
    - Check criteria after each game completion
    - Award badges when milestones reached
    - Prevent duplicate badge awards
    - _Requirements: 7.4_
  
  - [ ]* 31.2 Write property test for milestone badges
    - **Property 20: Milestone Badge Awarding**
    - **Validates: Requirements 7.4**
  
  - [ ] 31.3 Create badge display endpoint
    - Implement GET `/api/users/badges`
    - Return all badges with earned timestamps
    - _Requirements: 10.2_
  
  - [ ]* 31.4 Write property test for badge timestamps
    - **Property 32: Badge Display with Timestamps**
    - **Validates: Requirements 10.2**

- [ ] 32. Build Result Screen component
  - [ ] 32.1 Create ScoreCard component
    - Display final score with count-up animation
    - Show star rating with reveal animation
    - Display any newly earned badges
    - _Requirements: 7.5, 8.1_
  
  - [ ] 32.2 Create LessonCard component
    - Display lesson title and content (max 100 words)
    - Show lesson illustration
    - Format with child-friendly language
    - _Requirements: 8.2, 8.3, 8.4_
  
  - [ ]* 32.3 Write property test for lesson word count
    - **Property 24: Lesson Word Count Constraint**
    - **Validates: Requirements 8.4**
  
  - [ ]* 32.4 Write property test for lesson association
    - **Property 22: Lesson-Game Association**
    - **Validates: Requirements 8.1**
  
  - [ ]* 32.5 Write property test for lesson illustration
    - **Property 23: Lesson Illustration Presence**
    - **Validates: Requirements 8.3**
  
  - [ ] 32.6 Add navigation controls
    - Add "Chơi Lại" (Replay) button
    - Add "Về Trang Chủ" (Home) button
    - Ensure both buttons present
    - _Requirements: 8.5_
  
  - [ ]* 32.7 Write property test for result navigation
    - **Property 25: Result Screen Navigation Controls**
    - **Validates: Requirements 8.5**
  
  - [ ] 32.8 Connect Result Screen to game completion flow
    - Navigate to result screen after any game session
    - Pass score, stars, badges, lesson data
    - _Requirements: 2.6, 3.6, 4.6, 6.6_
  
  - [ ]* 32.9 Write property test for game session lifecycle
    - **Property 6: Game Session Lifecycle Completion**
    - **Validates: Requirements 2.6, 3.6, 4.6, 6.6**

- [ ] 33. Build Progress Page
  - [ ] 33.1 Create ProgressHeader component
    - Display total cumulative score
    - Show badge collection count
    - Add visual highlights for new achievements
    - _Requirements: 10.3_
  
  - [ ] 33.2 Create GameProgressGrid component
    - Display all 5 games with thumbnails
    - Show best stars for each game (0 if not played)
    - Display play count per game
    - _Requirements: 10.1_
  
  - [ ]* 33.3 Write property test for progress completeness
    - **Property 31: Progress Display Completeness**
    - **Validates: Requirements 10.1**
  
  - [ ] 33.4 Create BadgeShowcase component
    - Display all earned badges with icons
    - Show earned_at timestamp for each
    - _Requirements: 10.2_
  
  - [ ] 33.5 Implement Guardian view (optional)
    - Add view toggle for guardians
    - Display session timestamps
    - Show detailed progress data
    - _Requirements: 10.4_
  
  - [ ]* 33.6 Write property test for Guardian view consistency
    - **Property 34: Guardian View Data Consistency**
    - **Validates: Requirements 10.4**

- [ ] 34. Checkpoint - Scoring and progress system complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 8: Admin Dashboard

- [ ] 35. Implement admin CRUD endpoints
  - [ ] 35.1 Create game management endpoints
    - Implement GET `/api/admin/games` (all games including inactive)
    - Implement POST `/api/admin/games` (create new game)
    - Implement PUT `/api/admin/games/:id` (update game)
    - Implement DELETE `/api/admin/games/:id` (soft delete)
    - _Requirements: 12.1, 12.2_
  
  - [ ]* 35.2 Write property test for entity validation
    - **Property 43: Entity Creation Required Field Validation**
    - **Validates: Requirements 12.2, 12.3, 12.4**
  
  - [ ] 35.3 Create lesson management endpoints
    - Implement GET `/api/admin/lessons`
    - Implement POST `/api/admin/lessons`
    - Implement PUT `/api/admin/lessons/:id`
    - Validate required fields (mini_game_id, title, content)
    - _Requirements: 12.3, 15.5_
  
  - [ ]* 35.4 Write property test for lesson dynamic linkage
    - **Property 56: Lesson Dynamic Linkage**
    - **Validates: Requirements 15.5**
  
  - [ ] 35.5 Create traffic sign management endpoints
    - Implement GET `/api/admin/traffic-signs`
    - Implement POST `/api/admin/traffic-signs`
    - Implement PUT `/api/admin/traffic-signs/:id`
    - Support new category values without migration
    - _Requirements: 12.4, 15.3_
  
  - [ ]* 35.6 Write property test for category flexibility
    - **Property 54: Traffic Sign Category Flexibility**
    - **Validates: Requirements 15.3**
  
  - [ ] 35.7 Create badge management endpoints
    - Implement GET `/api/admin/badges`
    - Implement POST `/api/admin/badges` with JSON criteria
    - Support custom badge criteria definitions
    - _Requirements: 15.4_
  
  - [ ]* 35.8 Write property test for custom badge criteria
    - **Property 55: Badge Custom Criteria Support**
    - **Validates: Requirements 15.4**
  
  - [ ] 35.9 Create statistics endpoint
    - Implement GET `/api/admin/stats`
    - Return total players, total sessions, average stars per game
    - _Requirements: 12.6_
  
  - [ ]* 35.10 Write property test for statistics accuracy
    - **Property 45: Usage Statistics Accuracy**
    - **Validates: Requirements 12.6**

- [ ] 36. Build admin dashboard UI
  - [ ] 36.1 Create admin layout and navigation
    - Build admin-specific layout
    - Add navigation to Games, Lessons, Signs, Badges, Stats
    - Apply role guard (admin only)
    - _Requirements: 12.1_
  
  - [ ] 36.2 Build game management interface
    - Create game list view with edit/delete actions
    - Build game creation/edit form
    - Add is_active toggle for visibility control
    - _Requirements: 12.2, 12.5_
  
  - [ ] 36.3 Build lesson management interface
    - Create lesson list view
    - Build lesson creation/edit form
    - Validate content length and child-friendly language
    - _Requirements: 12.3, 14.5_
  
  - [ ]* 36.4 Write property test for content moderation
    - **Property 51: Admin Content Moderation Enforcement**
    - **Validates: Requirements 14.5**
  
  - [ ] 36.5 Build traffic sign management interface
    - Create sign list view with category filter
    - Build sign creation/edit form
    - _Requirements: 12.4_
  
  - [ ] 36.6 Build badge management interface
    - Create badge list view
    - Build badge creation form with criteria editor
    - _Requirements: 15.4_
  
  - [ ] 36.7 Build statistics dashboard
    - Display total registered players
    - Show total game sessions played
    - Display average stars per mini game
    - Add charts/visualizations (optional)
    - _Requirements: 12.6_

- [ ] 37. Implement content moderation
  - [ ] 37.1 Create forbidden words validation
    - Define forbidden words list (sai rồi, nguy hiểm chết người, etc.)
    - Create validation function for messages
    - Apply to lesson content and feedback messages
    - _Requirements: 9.8, 14.3_
  
  - [ ] 37.2 Add child-friendly message validation
    - Check for positive, encouraging language
    - Validate tone and vocabulary suitability
    - Block content with forbidden words
    - _Requirements: 9.8, 14.5_
  
  - [ ] 37.3 Implement content approval workflow (optional)
    - Add review status to lessons (pending, approved, rejected)
    - Require approval before content goes live
    - _Requirements: 14.5_

- [ ] 38. Checkpoint - Admin dashboard complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 9: Testing & Quality Assurance

- [ ] 39. Implement comprehensive testing
  - [ ] 39.1 Set up testing infrastructure
    - Configure Jest with React Testing Library
    - Configure fast-check for property-based testing
    - Set up test database for integration tests
    - Configure code coverage reporting (80% minimum)
    - _Requirements: 13.1_
  
  - [ ]* 39.2 Write unit tests for authentication flow
    - Test registration with valid/invalid data
    - Test login success and failure cases
    - Test JWT token generation and verification
    - _Requirements: 11.1, 11.3, 11.4_
  
  - [ ]* 39.3 Write unit tests for scoring logic
    - Test star calculation for all score ranges
    - Test high score retention logic
    - Test cumulative score calculation
    - _Requirements: 7.2, 7.6, 10.3_
  
  - [ ]* 39.4 Write unit tests for badge system
    - Test badge criteria evaluation
    - Test duplicate badge prevention
    - Test milestone detection
    - _Requirements: 7.4_
  
  - [ ]* 39.5 Write unit tests for game mechanics
    - Test traffic light state transitions
    - Test observation sequence validation
    - Test helmet selection logic
    - Test sign selection scoring
    - Test route path scoring
    - _Requirements: 2.2, 2.3, 3.2, 4.2, 5.2, 6.2_
  
  - [ ]* 39.6 Write integration tests for API endpoints
    - Test complete game session flow
    - Test progress data retrieval
    - Test admin CRUD operations
    - _Requirements: 7.3, 10.5, 12.2_
  
  - [ ]* 39.7 Write E2E tests with Playwright (optional)
    - Test complete user journey (register → play game → view progress)
    - Test navigation flow
    - Test game completion flow
    - _Requirements: 1.2, 2.6, 10.1_

- [ ] 40. Implement performance optimizations
  - [ ] 40.1 Optimize asset loading
    - Compress images to max 500KB per file
    - Implement lazy loading for game assets
    - Use WebP format with fallbacks
    - _Requirements: 13.4, 13.6_
  
  - [ ]* 40.2 Write property test for asset size constraint
    - **Property 46: Image Asset Size Constraint**
    - **Validates: Requirements 13.4**
  
  - [ ]* 40.3 Write property test for lazy loading
    - **Property 48: Lazy Loading Asset Strategy**
    - **Validates: Requirements 13.6**
  
  - [ ] 40.4 Optimize rendering performance
    - Ensure 30+ FPS on mobile devices
    - Implement frame rate monitoring
    - Optimize Phaser physics and animations
    - _Requirements: 13.2_
  
  - [ ] 40.5 Optimize API response times
    - Add database query indexing
    - Implement response caching where appropriate
    - Ensure page loads within 2 seconds
    - _Requirements: 13.1_

- [ ] 41. Implement error handling and resilience
  - [ ] 41.1 Add client-side error handling
    - Display user-friendly error messages
    - Implement error boundaries for React components
    - Add retry mechanisms for failed requests
    - _Requirements: 13.5_
  
  - [ ]* 41.2 Write property test for error handling
    - **Property 47: Service Unavailability Error Handling**
    - **Validates: Requirements 13.5**
  
  - [ ] 41.3 Add server-side error handling
    - Implement global error handling middleware
    - Log errors with Winston or Pino
    - Return consistent error response format
    - Hide internal error details from clients
    - _Requirements: 13.5_
  
  - [ ] 41.4 Set up error tracking
    - Integrate Sentry or similar service
    - Configure error alerting
    - Add error context (user ID, request ID, etc.)
    - _Requirements: 13.5_

- [ ] 42. Implement security measures
  - [ ] 42.1 Add input validation with Zod
    - Create schemas for all API inputs
    - Validate on both client and server
    - _Requirements: 11.5, 11.6_
  
  - [ ] 42.2 Implement CORS and CSP headers
    - Configure CORS with frontend domain whitelist
    - Add Content Security Policy headers
    - Set secure cookie attributes (httpOnly, SameSite)
    - _Requirements: 11.3_
  
  - [ ] 42.3 Add rate limiting
    - Configure rate limit: 100 requests/15 minutes per user
    - Return 429 status on limit exceeded
    - _Requirements: 13.1_
  
  - [ ] 42.4 Implement content safety measures
    - Exclude violent imagery and language
    - Limit personal data collection (name, email only)
    - Add guardian consent requirement for under-13 users
    - _Requirements: 14.1, 14.2, 14.6_
  
  - [ ]* 42.5 Write property test for data collection limitation
    - **Property 50: Personal Data Collection Limitation**
    - **Validates: Requirements 14.2**
  
  - [ ]* 42.6 Write property test for guardian consent
    - **Property 52: Under-13 Guardian Consent Requirement**
    - **Validates: Requirements 14.6**

- [ ] 43. Accessibility and UX improvements
  - [ ] 43.1 Implement semantic color usage
    - Green for correct actions, red for stop, yellow for caution
    - Ensure color contrast meets WCAG AA (4.5:1 for text)
    - _Requirements: 9.2_
  
  - [ ]* 43.2 Write property test for color consistency
    - **Property 26: Color Semantic Consistency**
    - **Validates: Requirements 9.2**
  
  - [ ] 43.3 Ensure typography accessibility
    - Minimum 18px font size for all text
    - Clear, readable font families
    - _Requirements: 9.5_
  
  - [ ]* 43.4 Write property test for font size
    - **Property 27: Typography Minimum Font Size**
    - **Validates: Requirements 9.5**
  
  - [ ] 43.5 Optimize animations
    - Cap animation duration at 500ms
    - Add reduced-motion support
    - _Requirements: 9.6_
  
  - [ ]* 43.6 Write property test for animation duration
    - **Property 28: Animation Duration Cap**
    - **Validates: Requirements 9.6**

- [ ] 44. Checkpoint - Testing and QA complete
  - Ensure all tests pass, ask the user if questions arise.


### Phase 10: Deployment & Documentation

- [ ] 45. Prepare for deployment
  - [ ] 45.1 Set up production database
    - Create Supabase PostgreSQL instance
    - Configure connection pooling
    - Run migrations on production database
    - Seed initial data (games, lessons, signs, badges)
    - _Requirements: 15.1_
  
  - [ ] 45.2 Configure environment variables
    - Set up production environment variables
    - Configure JWT secret, database URL
    - Set up frontend/backend URLs
    - _Requirements: 11.3_
  
  - [ ] 45.3 Build and optimize for production
    - Build Next.js frontend for production
    - Build backend with TypeScript compilation
    - Optimize bundle sizes
    - Enable production mode for Phaser
    - _Requirements: 13.1, 13.4_
  
  - [ ] 45.4 Set up CI/CD pipeline (optional)
    - Configure GitHub Actions
    - Add lint, test, and build steps
    - Add deployment step to Vercel/Render
    - _Requirements: 13.1_

- [ ] 46. Deploy application
  - [ ] 46.1 Deploy frontend to Vercel
    - Connect GitHub repository
    - Configure build settings
    - Set environment variables
    - Deploy and verify
    - _Requirements: 13.1_
  
  - [ ] 46.2 Deploy backend to Render/Railway
    - Configure Node.js service
    - Set environment variables
    - Connect to production database
    - Deploy and verify
    - _Requirements: 13.1_
  
  - [ ] 46.3 Configure custom domain (optional)
    - Set up DNS records
    - Configure SSL certificates
    - _Requirements: 13.1_
  
  - [ ] 46.4 Set up monitoring and analytics
    - Configure Vercel Analytics
    - Set up error tracking (Sentry)
    - Add performance monitoring
    - _Requirements: 13.1_

- [ ] 47. Write documentation
  - [ ] 47.1 Write API documentation
    - Document all endpoints with OpenAPI/Swagger
    - Include request/response examples
    - Document authentication requirements
    - _Requirements: 15.6_
  
  - [ ] 47.2 Write developer setup guide
    - Document local development setup
    - Include database setup instructions
    - Document environment variable configuration
    - Add troubleshooting section
    - _Requirements: 15.1_
  
  - [ ] 47.3 Write user guide for admins
    - Document admin dashboard usage
    - Explain game, lesson, sign, badge management
    - Include content moderation guidelines
    - _Requirements: 12.1_
  
  - [ ] 47.4 Write deployment guide
    - Document production deployment steps
    - Include database migration procedures
    - Document backup and recovery procedures
    - _Requirements: 13.3_

- [ ] 48. Final testing and launch
  - [ ] 48.1 Perform final QA testing
    - Test all features in production environment
    - Verify all 5 games work correctly
    - Test authentication and authorization
    - Test admin dashboard functionality
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1_
  
  - [ ] 48.2 Verify performance and security
    - Test page load times (< 2 seconds)
    - Verify 30+ FPS in games
    - Test rate limiting
    - Verify content safety measures
    - _Requirements: 13.1, 13.2, 14.1_
  
  - [ ] 48.3 Conduct user acceptance testing
    - Have target users (children 6-11) test application
    - Gather feedback on usability and engagement
    - Make necessary adjustments
    - _Requirements: 9.1, 9.8_
  
  - [ ] 48.4 Launch application
    - Announce launch to target audience
    - Monitor for any issues
    - Gather user feedback for future improvements
    - _Requirements: 1.1_

- [ ] 49. Final checkpoint - Project complete
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

### MVP Priority (First 3 Phases)

For a Minimum Viable Product, focus on:
1. **Phase 1-2**: Project setup, database, authentication
2. **Phase 3-4**: User management, UI foundation
3. **Phase 5**: Game Hub
4. **Phase 6 (partial)**: First 3 games (Đèn Xanh, Nhìn Trái Phải, Đội Mũ)
5. **Phase 7**: Basic scoring and progress

This provides a functional app with 3 complete games, authentication, and progress tracking.

### Task Dependencies

- Phase 2 depends on Phase 1 (project structure)
- Phase 3 depends on Phase 2 (database schema)
- Phase 5 depends on Phase 3-4 (auth + UI components)
- Phase 6 depends on Phase 5 (game hub for navigation)
- Phase 7 depends on Phase 6 (games must exist to track progress)
- Phase 8 can be done in parallel with Phase 6-7
- Phase 9 should be ongoing throughout development
- Phase 10 depends on all previous phases

### Testing Strategy

- **Unit Tests**: Required for core business logic (scoring, auth, validation)
- **Property Tests**: Marked with `*`, validate universal properties
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Optional but recommended for critical user flows

### Child Safety Considerations

All tasks involving user-facing content must:
- Use child-friendly language (positive, encouraging)
- Avoid forbidden words (sai rồi, nguy hiểm chết người, etc.)
- Exclude violent imagery
- Limit personal data collection
- Implement content moderation

### Performance Targets

- Page load: < 2 seconds on 3 Mbps connection
- Frame rate: 30+ FPS on mobile devices
- Image size: < 500KB per file
- Navigation: < 500ms transition time

### Extensibility

The system is designed for easy expansion:
- New games can be added without code changes (database-driven)
- Traffic signs support new categories dynamically
- Badge criteria are customizable via JSON
- Lessons can be linked to existing or future games

