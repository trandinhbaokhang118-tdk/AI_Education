tiêp# Traffic Kids - UI/UX Design & Mini Games Design

This document contains supplementary design details for UI/UX system and individual mini-game mechanics.

## UI/UX Design System

### Design Principles for Children

**Age-Appropriate Design (6-11 years):**
1. **Large Interactive Elements**: Minimum 60px touch targets, 80px for drag-drop
2. **High Contrast**: Clear figure-ground separation, avoid subtle grays
3. **Immediate Feedback**: Every action gets visual/audio response within 100ms
4. **Consistent Layouts**: Predictable button placement across screens
5. **Icon-First Communication**: Minimize text, maximize visual cues
6. **Forgiving Interactions**: Allow undo, prevent accidental exits

### Color Palette

**Primary Colors:**
- **Light Blue** (#87CEEB - sky blue): Default background, calm and friendly
- **Green** (#4CAF50): Correct actions, safe choices, success states
- **Red** (#F44336): Stop signals, danger warnings (gentle, not harsh)
- **Yellow/Orange** (#FFC107): Caution, attention needed, highlights

**Secondary Colors:**
- **Purple** (#9C27B0): Badges, rewards, special achievements
- **Pink** (#E91E63): Character accents, playful elements
- **Teal** (#009688): Water, alternative safe indicators
- **Amber** (#FF9800): Progress indicators, loading states

**Neutral Colors:**
- **White** (#FFFFFF): Cards, panels, clean backgrounds
- **Light Gray** (#F5F5F5): Secondary backgrounds, disabled states
- **Dark Gray** (#424242): Primary text (high contrast)
- **Medium Gray** (#757575): Secondary text, helper text

**Semantic Color Usage:**
- Success: Green-500 (#4CAF50)
- Warning: Amber-600 (#FFB300)
- Error/Stop: Red-500 (#F44336) - used gently with friendly icons
- Info: Blue-500 (#2196F3)

### Typography

**Font Families:**
- **Primary**: "Baloo 2" or "Nunito" (rounded, friendly sans-serif)
- **Headings**: Bold weight for emphasis
- **Body**: Regular weight for readability
- **Buttons**: SemiBold for clarity

**Font Sizes (Mobile-First):**
- **Display**: 32px - 40px (hero titles)
- **H1**: 28px - 32px (page titles)
- **H2**: 24px - 28px (section titles)
- **H3**: 20px - 24px (card titles)
- **Body**: 18px - 20px (minimum for readability)
- **Small**: 16px (captions, helper text)
- **Button**: 18px - 20px (clear action labels)

**Line Height:**
- Headings: 1.2 - 1.3
- Body text: 1.5 - 1.6
- Button text: 1.0 (single line preferred)

**Letter Spacing:**
- Headings: -0.02em (tight for impact)
- Body: 0 (default)
- Buttons: 0.02em (slight spread for clarity)

### Spacing Scale

**Base Unit:** 4px (0.25rem)

**Spacing Values:**
- xs: 4px (0.25rem) - tight icon spacing
- sm: 8px (0.5rem) - input padding
- md: 16px (1rem) - card padding, section gaps
- lg: 24px (1.5rem) - component spacing
- xl: 32px (2rem) - section spacing
- 2xl: 48px (3rem) - major section breaks
- 3xl: 64px (4rem) - page sections

### Component Library

#### Buttons

**Primary Button:**
```css
.btn-primary {
  background: #4CAF50;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  min-height: 60px;
  min-width: 60px;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(76, 175, 80, 0.4);
}

.btn-primary:active {
  transform: translateY(0px);
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
}
```

**Secondary Button:**
- Background: White
- Border: 2px solid primary color
- Same padding/size as primary
- Hover: Light background tint

**Icon Button:**
- Size: 60px × 60px
- Circular or rounded square
- Icon: 32px size
- Clear hit target

#### Cards

**Game Card:**
```css
.game-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

**Lesson Card:**
- Border-radius: 16px
- Padding: 32px
- Max-width: 600px
- Background: White with subtle gradient

#### Star Rating

**3-Star Display:**
```typescript
// Filled stars for earned rating, outlined for unearned
<div className="star-rating">
  {[1, 2, 3].map(star => (
    <Star
      key={star}
      filled={star <= earnedStars}
      size={48}
      color={star <= earnedStars ? '#FFC107' : '#E0E0E0'}
    />
  ))}
</div>
```

#### Progress Bar

**Linear Progress:**
- Height: 12px
- Border-radius: 6px
- Background: Light gray
- Fill: Gradient (green to teal)
- Animation: Smooth fill transition 0.5s

### Animation Patterns

**Page Transitions:**
- Fade-in: 300ms ease-out
- Slide-in: 400ms ease-out from right
- Scale: 250ms ease-out (modals, popups)

**Button Feedback:**
- Hover: Scale 1.02, lift 2px, 150ms
- Active: Scale 0.98, 100ms
- Success: Scale 1.1 → 1.0, 300ms with spring

**Game Elements:**
- Character movement: 300-500ms ease-in-out
- Score update: Count-up animation, 400ms
- Badge award: Scale 0 → 1.2 → 1.0, 500ms bounce

**Loading States:**
- Spinner: 1s rotation infinite
- Skeleton: Pulse animation 1.5s
- Progress: Smooth fill 300ms per update

### Responsive Breakpoints

**Breakpoint System:**
```css
/* Mobile (default) */
@media (min-width: 0px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

**Layout Adaptations:**

**Mobile (375px - 767px):**
- Single column layouts
- Full-width cards
- Bottom navigation or hamburger menu
- Stacked game zones
- Touch-optimized spacing (larger gaps)

**Tablet (768px - 1023px):**
- 2-column grids for games
- Side navigation option
- Larger game canvas
- More padding around interactive elements

**Desktop (1024px+):**
- 3-column grid for game zones (or creative layout)
- Persistent side navigation
- Larger game canvas with more detail
- Hover states enabled
- Mouse pointer interactions

### Accessibility

**WCAG 2.1 AA Compliance:**
- Color contrast: Minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: 2px solid outline on all focusable elements
- Alt text: All images and icons have descriptive alt text
- Keyboard navigation: Tab order follows visual flow
- Screen reader support: ARIA labels on interactive elements

**Child-Specific Considerations:**
- Audio cues for actions (optional, with mute control)
- Visual feedback for every click/tap
- No time-pressure mechanics (games are self-paced)
- Clear "back" or "home" buttons on every screen
- Confirmation dialogs for irreversible actions (e.g., exit game)


## Mini Game Designs

### General Game Structure

All mini-games follow this structure:
1. **Intro Screen**: Brief instructions with character animation (skip option)
2. **Gameplay**: Interactive phase with scoring
3. **Result Screen**: Score, stars, badges, lesson
4. **Navigation**: Replay or return to Game Hub

**Common Game Elements:**
- **Score Display**: Top-left corner, live updates
- **Timer Display**: Top-right (if time-limited game)
- **Character**: Friendly 2D sprite (Bé An or variants)
- **Background**: Colorful, contextual (street, crosswalk, etc.)
- **Sound Effects**: Positive reinforcement sounds (can be muted)

### Game 1: Đèn Xanh Qua Đường (Traffic Light Crossing)

**Objective**: Teach children to wait for green light before crossing.

**Game Mechanics:**

**Scene Setup:**
- Character stands on left side of crosswalk
- Traffic light on right side (red/yellow/green)
- Zebra crossing in the middle
- Cars passing occasionally

**Game Flow:**
1. Traffic light starts in random state (red or green)
2. Light cycles every 3-7 seconds (random interval)
3. Player taps/clicks character or "Cross" button to attempt crossing
4. If green: Character crosses, +10 points, cheerful sound
5. If red: Character stops, -5 points, gentle reminder message
6. Goal: 5 correct crossings without errors = 3 stars

**Scoring Algorithm:**
```typescript
function calculateTrafficLightScore(crossings: Crossing[]): Score {
  let points = 0;
  let correctStreak = 0;
  
  for (const crossing of crossings) {
    if (crossing.lightColor === 'green') {
      points += 10;
      correctStreak++;
    } else {
      points -= 5;
      correctStreak = 0;
    }
  }
  
  // Bonus for perfect streak
  if (correctStreak >= 5) {
    points += 20; // bonus
  }
  
  // Clamp score
  points = Math.max(0, Math.min(100, points));
  
  return {
    points,
    stars: calculateStars(points),
    perfectStreak: correctStreak >= 5
  };
}
```

**State Machine:**
```typescript
enum GameState {
  INTRO = 'intro',
  WAITING = 'waiting', // player waiting for input
  CROSSING = 'crossing', // character animating across
  FEEDBACK = 'feedback', // showing message after action
  COMPLETE = 'complete'
}

type LightColor = 'red' | 'yellow' | 'green';

interface TrafficLightGameState {
  currentState: GameState;
  lightColor: LightColor;
  score: number;
  crossingCount: number;
  correctStreak: number;
}
```

**Assets Required:**
- Character sprite (idle, walking animation)
- Traffic light sprite (3 states)
- Crosswalk background
- Car sprites (passing background)
- Sound: success beep, warning sound, background traffic ambience

**Phaser Implementation Notes:**
- Use Phaser.Physics for car movement
- Tween for character crossing animation
- Timer for light state changes
- Event emitter for score updates

---

### Game 2: Nhìn Trái Nhìn Phải (Look Left-Right-Left)

**Objective**: Teach the "look left, look right, look left again" sequence before crossing.

**Game Mechanics:**

**Scene Setup:**
- Character at curb edge (bottom of screen)
- Road with vehicles coming from left and right
- Arrow indicators (left/right) above character
- Safe crossing opportunity when no vehicles

**Game Flow:**
1. Player sees directional prompts: "Nhìn trái" → "Nhìn phải" → "Nhìn trái"
2. Player must tap left/right arrows in correct order
3. Vehicles appear randomly from left or right
4. After correct sequence, player taps "Cross" button
5. If vehicles approaching: crossing blocked, gentle reminder
6. If safe: character crosses, points awarded

**Scoring Algorithm:**
```typescript
interface ObservationStep {
  direction: 'left' | 'right';
  correct: boolean;
}

function calculateObservationScore(steps: ObservationStep[], crossingSuccess: boolean): Score {
  let points = 0;
  
  // 5 points per correct observation
  steps.forEach(step => {
    if (step.correct) points += 5;
  });
  
  // Bonus for safe crossing
  if (crossingSuccess && steps.every(s => s.correct)) {
    points += 15;
  }
  
  // Penalty for crossing with vehicles (safety violation)
  if (!crossingSuccess) {
    points -= 10;
  }
  
  return {
    points: Math.max(0, Math.min(100, points)),
    stars: calculateStars(points)
  };
}
```

**State Machine:**
```typescript
enum ObservationState {
  INTRO = 'intro',
  LOOKING_LEFT_1 = 'looking_left_1',
  LOOKING_RIGHT = 'looking_right',
  LOOKING_LEFT_2 = 'looking_left_2',
  READY_TO_CROSS = 'ready_to_cross',
  CROSSING = 'crossing',
  FEEDBACK = 'feedback',
  COMPLETE = 'complete'
}

interface LookGameState {
  currentState: ObservationState;
  observationSequence: ObservationStep[];
  vehiclesApproaching: boolean;
  score: number;
}
```

**Assets Required:**
- Character sprite (looking left/right animations)
- Vehicle sprites (cars, motorbikes from both directions)
- Road/curb background
- Arrow indicator sprites
- Sound: correct observation beep, crossing success, vehicle approaching alert

---

### Game 3: Đội Mũ Xinh Đi An Toàn (Helmet Safety)

**Objective**: Teach children to wear helmets and fasten chin straps properly.

**Game Mechanics:**

**Scene Setup:**
- Character (child sprite) standing in center without helmet
- Array of items at bottom: correct helmet, hat, cap, wrong helmet
- Helmet outline on character's head (drop target)
- Chin strap indicator when helmet placed

**Game Flow:**
1. Player sees character without helmet
2. Multiple items appear below (draggable)
3. Player drags items to character's head
4. Correct helmet: Snaps into place, +10 points
5. Wrong item: Bounces off, explanation message, no points
6. After correct helmet placed, chin strap button appears
7. Player taps chin strap to fasten
8. Fasten strap: +10 bonus, completion animation

**Scoring Algorithm:**
```typescript
interface HelmetSelection {
  itemType: 'correct_helmet' | 'wrong_helmet' | 'hat' | 'cap';
  selected: boolean;
}

function calculateHelmetScore(selections: HelmetSelection[], strapFastened: boolean): Score {
  let points = 0;
  let attempts = 0;
  
  selections.forEach(selection => {
    if (selection.selected) {
      attempts++;
      if (selection.itemType === 'correct_helmet') {
        points += 10;
      } else {
        // Small penalty for wrong items (gentle)
        points -= 2;
      }
    }
  });
  
  // Bonus for fastening strap
  if (strapFastened) {
    points += 10;
  }
  
  // Efficiency bonus (fewer wrong attempts)
  if (attempts <= 2 && strapFastened) {
    points += 10; // quick learner bonus
  }
  
  return {
    points: Math.max(0, Math.min(100, points)),
    stars: calculateStars(points)
  };
}
```

**State Machine:**
```typescript
enum HelmetGameState {
  INTRO = 'intro',
  SELECTING = 'selecting', // player dragging items
  HELMET_PLACED = 'helmet_placed', // correct helmet on head
  FASTENING = 'fastening', // waiting for strap click
  COMPLETE = 'complete'
}

interface HelmetState {
  currentState: HelmetGameState;
  helmetPlaced: boolean;
  strapFastened: boolean;
  wrongAttempts: number;
  score: number;
}
```

**Assets Required:**
- Character sprite (without helmet, with helmet, with fastened strap)
- Multiple helmet/item sprites (correct, wrong variants)
- Chin strap button/indicator
- Background (home or street scene)
- Sound: correct placement success, wrong item bounce, strap click

**Drag-and-Drop Implementation:**
- Phaser.Input.Drag for drag-and-drop
- Drop zones with collision detection
- Snap-to-target animation for correct items
- Bounce-back animation for wrong items

---

### Game 4: Biển Báo Vui Nhộn (Traffic Signs Recognition)

**Objective**: Teach children to recognize common traffic signs.

**Game Mechanics:**

**Scene Setup:**
- Scenario illustration at top (e.g., school zone, pedestrian crossing)
- Question text: "Biển báo nào phù hợp?"
- 3-4 traffic sign options below (buttons)
- Character mascot giving encouraging hints

**Game Flow:**
1. Scenario appears with context illustration
2. Question displayed with child-friendly language
3. Player selects one of the traffic sign options
4. Correct: +10 points, explanation of sign meaning
5. Incorrect: Explanation of correct sign, try again option
6. 5 questions per session (randomized from pool)
7. Final score based on accuracy and first-try success

**Scoring Algorithm:**
```typescript
interface SignQuestion {
  scenario: string;
  correctSignId: string;
  selectedSignId: string;
  attempts: number;
  correct: boolean;
}

function calculateSignScore(questions: SignQuestion[]): Score {
  let points = 0;
  
  questions.forEach(q => {
    if (q.correct) {
      // Full points for first try, reduced for multiple attempts
      if (q.attempts === 1) {
        points += 10;
      } else if (q.attempts === 2) {
        points += 7;
      } else {
        points += 5;
      }
    }
  });
  
  // Bonus for perfect round (all first-try correct)
  if (questions.every(q => q.correct && q.attempts === 1)) {
    points += 20;
  }
  
  return {
    points: Math.max(0, Math.min(100, points)),
    stars: calculateStars(points)
  };
}
```

**Traffic Sign Categories:**
1. **Pedestrian Signs**: Pedestrian crossing, school zone
2. **Prohibitory Signs**: No entry, speed limit, no bicycles
3. **Directional Signs**: One-way, bicycle lane
4. **Warning Signs**: Construction, slippery road

**State Machine:**
```typescript
enum SignGameState {
  INTRO = 'intro',
  QUESTION = 'question', // showing current question
  FEEDBACK = 'feedback', // showing correct/incorrect feedback
  NEXT_QUESTION = 'next_question',
  COMPLETE = 'complete'
}

interface SignGameStateData {
  currentState: SignGameState;
  currentQuestionIndex: number;
  questions: SignQuestion[];
  score: number;
}
```

**Assets Required:**
- 8+ traffic sign images (vector or high-res PNG)
- Scenario illustrations (school, crosswalk, road, etc.)
- Character mascot sprite (pointing, explaining)
- Background (classroom or outdoor)
- Sound: correct answer chime, encouraging voice-over (optional)

---

### Game 5: Đường Đến Trường An Toàn (Safe Route to School)

**Objective**: Teach route planning with safe path choices.

**Game Mechanics:**

**Scene Setup:**
- Top-down map view
- Starting point (home icon) at bottom-left
- Destination (school icon) at top-right
- Multiple path options with decision points
- Safe paths: sidewalks, crosswalks, traffic lights
- Unsafe paths: shortcuts through roads, no crosswalks

**Game Flow:**
1. Character starts at home
2. At each decision point, 2-3 path options appear
3. Player selects a path
4. Safe choice: Character moves along path, +10 points
5. Unsafe choice: Educational message, suggest safer alternative, -5 points
6. Minimum 3 decision points per journey
7. Reaching school with all safe choices = 3 stars

**Scoring Algorithm:**
```typescript
interface PathChoice {
  point: number; // decision point number
  choiceType: 'safe' | 'unsafe';
  alternatives: string[]; // what alternatives were available
}

function calculateRouteScore(choices: PathChoice[]): Score {
  let points = 0;
  let safeChoices = 0;
  
  choices.forEach(choice => {
    if (choice.choiceType === 'safe') {
      points += 10;
      safeChoices++;
    } else {
      points -= 5;
    }
  });
  
  // Bonus for all safe choices
  if (safeChoices === choices.length) {
    points += 20; // perfect route bonus
  }
  
  return {
    points: Math.max(0, Math.min(100, points)),
    stars: calculateStars(points),
    perfectRoute: safeChoices === choices.length
  };
}
```

**Path Decision Points:**
1. **Intersection**: Crosswalk vs. jaywalking
2. **Sidewalk**: Use sidewalk vs. walk on road
3. **Traffic Light**: Wait for green vs. rush across
4. **Shortcut**: Safe route vs. through parking lot

**State Machine:**
```typescript
enum RouteGameState {
  INTRO = 'intro',
  DECISION_POINT = 'decision_point', // waiting for player choice
  MOVING = 'moving', // character traveling on chosen path
  FEEDBACK = 'feedback', // explaining safe/unsafe choice
  COMPLETE = 'complete' // reached school
}

interface RouteGameStateData {
  currentState: RouteGameState;
  currentDecisionPoint: number;
  pathChoices: PathChoice[];
  characterPosition: { x: number, y: number };
  score: number;
}
```

**Assets Required:**
- Top-down map tiles (roads, sidewalks, buildings)
- Character sprite (walking animation, top-down view)
- Path indicators (arrows, highlights)
- Decision point UI (choice buttons with icons)
- Home and school icons
- Background: Neighborhood/city map
- Sound: footsteps, correct choice chime, unsafe warning

**Phaser Implementation:**
- Tilemap for the neighborhood layout
- Pathfinding (simple waypoint system)
- Tween animations for character movement
- Interactive decision point overlays

---

## Game Performance Considerations

**Frame Rate Targets:**
- Desktop: 60 FPS
- Mobile: 30-60 FPS (depending on device)

**Optimization Strategies:**
1. **Asset Loading**: Preload all assets for a game before starting
2. **Sprite Atlases**: Combine multiple sprites into texture atlases
3. **Object Pooling**: Reuse game objects (vehicles, UI elements)
4. **Lazy Loading**: Load games only when selected
5. **Canvas Size**: Adapt canvas resolution to device capability
6. **Physics**: Use simple collision detection (AABB), avoid complex physics

**Memory Management:**
- Destroy Phaser scenes when exiting game
- Clear timers and event listeners on cleanup
- Limit maximum concurrent animations
- Compress images (WebP format with fallback)

**Mobile Considerations:**
- Touch-optimized controls (large buttons)
- Simplified graphics on low-end devices
- Battery-friendly frame rate (30 FPS fallback)
- Minimal particle effects
- Haptic feedback for touch interactions (optional)

---

## Security Considerations

**Client-Side:**
- Input validation on all forms
- Sanitize user-generated content (names, if displayed)
- No sensitive data in local storage (only tokens)
- HTTPS only for production
- CSP headers to prevent XSS

**Server-Side:**
- JWT token validation on every protected endpoint
- Rate limiting per user (100 requests / 15 minutes)
- SQL injection prevention (Prisma parameterized queries)
- Password hashing (bcrypt, salt rounds = 10)
- CORS configuration (whitelist frontend domain)
- Input validation with Zod schemas
- Error messages don't leak system information

**Child Safety:**
- No chat or user-generated content features
- No collection of sensitive personal information
- Parent/guardian consent for under-13 users (COPPA compliance)
- Content moderation for admin-created lessons
- No external links without guardian approval
- No ads or third-party tracking

---

This completes the supplementary UI/UX and mini-game design documentation for Traffic Kids.

