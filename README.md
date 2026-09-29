SHOPSPHERE AI

An AI-powered e-commerce web application designed to provide a personalized and interactive shopping experience through smart recommendations, ShopBot, voice assistance, rewards, analytics, and modern shopping features.

FEATURES

Shopping
• Product catalog
• Product filtering and search
• Product details
• Shopping cart
• Wishlist
• Stock-aware cart limits
• Checkout flow
• Order history
• Order tracking
• Printable invoices

AI & SMART FEATURES
• Multi-modal smart recommendation engine
• Recommended For You
• Because You Viewed
• Buy Again
• Trending Essentials
• Personalized recommendation headers
• Dynamic recommendation updates based on user activity
• ShopBot conversational assistant
• Voice-enabled shopping assistance

CUSTOMER EXPERIENCE
• Rewards and loyalty points
• Membership tiering
• Product ratings and reviews
• Recently viewed products
• Personalized shopping experience
• Address book
• Dark mode
• Responsive mobile interface

ANALYTICS
• Shopping analytics
• Product interaction tracking
• Personalized insights

ACCESSIBILITY
• ARIA tab roles
• Keyboard navigation
• Arrow-key recommendation tab switching
• Visible focus states
• Mobile-friendly layouts

SMART RECOMMENDATION ENGINE

ShopSphere AI provides four recommendation modes:

Recommended For You
Personalized products based on shopping activity.

Because You Viewed
Recommendations based on recently viewed products.

Buy Again
Previously ordered products for quick repurchase.

Trending Essentials
Popular products based on ratings, reviews, and product signals.

The recommendation engine also handles cold-start users when there is no browsing or order history.

TESTING

The project has been verified through dedicated feature and regression test suites.

TOTAL: 69 / 69 TESTS PASSED — 100%

• Phase 7.1 Smart Recommendations: 12/12
• Phase 6.7 Voice Assistant: 25/25
• Phase 6.8 Comprehensive Audit: 32/32
• Data integrity and idempotency: PASS
• Cart / Checkout / Modal regression: PASS
• Console errors: 0

TECH STACK

• HTML5
• CSS3
• JavaScript
• Web Speech API
• LocalStorage
• Responsive Web Design
• Git
• GitHub

PROJECT STRUCTURE

ShopSphere-AI/
│
├── app.js
├── index.html
├── style.css
│
└── ShopSphere/
    ├── app.js
    ├── index.html
    └── style.css

The ShopSphere directory maintains a synchronized mirror of the primary application files.

RUN LOCALLY

Clone the repository:

git clone https://github.com/deeksha-regupathi/ShopSphere-AI.git

Open the project folder:

cd ShopSphere-AI

The application can be opened using a local development server or VS Code Live Server.

RESPONSIVE DESIGN

The application supports desktop and mobile layouts, including testing at a 375 × 667 viewport.

DARK MODE

ShopSphere AI includes a dedicated dark-mode experience with recommendation cards and interactive components adapted for dark themes.

DATA & RELIABILITY

The application includes defensive handling for malformed local storage data, duplicate reward operations, stock boundaries, and user interaction edge cases.

PROJECT STATUS

Phase 7.1 Complete

The Multi-Modal Smart Recommendation Engine has been implemented, tested, committed, and pushed to GitHub.

Latest verified commit:

d2fb6ec
Phase 7.1: Multi-Modal Smart Recommendation Engine

Built as a portfolio project demonstrating frontend engineering, JavaScript application architecture, accessibility, responsive design, and AI-inspired personalization.
