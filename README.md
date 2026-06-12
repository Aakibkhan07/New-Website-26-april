# Trade Metrix AI - Institutional Trading Infrastructure

A premium, modern website for Trade Metrix AI, showcasing institutional trading infrastructure with AI-powered automation, real-time analytics, and low-latency execution.

## Features

### Design System
- **Dark Theme**: Professional #0a0a0a background with high contrast
- **Neon Blue Accents**: #00b4ff primary color for institutional aesthetic
- **Glassmorphism**: Frosted glass effects with blur and transparency
- **Responsive**: Mobile-first design optimized for all viewport sizes

### Core Sections
1. **Navigation**: Fixed sticky header with smooth scroll links
2. **Hero**: Animated background with staggered text reveal and key metrics
3. **Features**: 6-card grid showcasing AI automation, multi-asset trading, analytics, execution, risk management, and API access
4. **Comparison**: Manual vs Automated trading comparison table with visual indicators
5. **Solutions**: 4 trader type cards (Algorithmic, Quantitative, Day Traders, Options)
6. **Testimonials**: 4 client testimonials with avatar badges
7. **FAQ**: Interactive accordion with smooth expand/collapse animations
8. **CTA**: Final call-to-action section with dual button options
9. **Footer**: Complete footer with links, company info, and social media

### Components
- **Button**: Primary, secondary, and outline variants with sizes
- **GlassCard**: Reusable glassmorphic container with optional hover effects
- **SectionWrapper**: Consistent section padding and max-width management
- **Navigation**: Client-side responsive navigation with mobile menu

### Animations
- Framer Motion for smooth, performant animations
- Scroll-triggered reveals with viewport detection
- Staggered animations for grid items
- Parallax effects on hero section
- Smooth accordion expand/collapse
- Hover effects on interactive elements

## Tech Stack
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion 12+
- **Typography**: System fonts with responsive scaling
- **Build Tool**: Turbopack (default in Next.js 16)

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page composing all sections
├── components/
│   ├── Button.tsx          # Button component
│   ├── GlassCard.tsx       # Glassmorphic card
│   ├── Navigation.tsx      # Header navigation
│   ├── SectionWrapper.tsx  # Section container
│   ├── Footer.tsx          # Footer
│   └── sections/
│       ├── Hero.tsx        # Hero section with animations
│       ├── Features.tsx    # Features grid
│       ├── Comparison.tsx  # Manual vs automated table
│       ├── Solutions.tsx   # Solutions for different traders
│       ├── Testimonials.tsx # Client testimonials
│       ├── FAQ.tsx         # Interactive FAQ
│       └── CTA.tsx         # Call to action
└── styles/
    └── globals.css        # Global styles and Tailwind imports
```

## Key Design Decisions

1. **Dark Theme**: Institutional trading platforms use dark themes for reduced eye strain and professional appearance
2. **Glassmorphism**: Adds visual depth and modern aesthetic while maintaining readability
3. **Neon Blue**: Contrasts well with dark background and conveys technological sophistication
4. **Animations**: Framer Motion provides performant animations that enhance user experience without bloat
5. **Mobile-First**: Responsive design ensures excellent experience on all devices
6. **Semantic HTML**: Proper heading hierarchy and ARIA labels for accessibility
7. **No localStorage**: All content is server-rendered for better SEO and performance

## Performance Optimizations
- Server-side rendering for fast initial load
- Image optimization (uses emoji icons instead of image assets)
- Responsive images and viewport-aware rendering
- CSS-in-JS with Tailwind for minimal bundle size
- Smooth scrolling and efficient animations

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS and Android mobile browsers
- Requires JavaScript enabled for animations

## Future Enhancements
- Integration with trading API backends
- Live market data visualization
- User authentication and account management
- Admin dashboard for content management
- Advanced analytics and reporting
- Multi-language support

## License
© 2026 Trade Metrix AI. All rights reserved.
