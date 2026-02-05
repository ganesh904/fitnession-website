# Fitnession Website

Official website for Fitnession - India's #1 AI-Powered Health & Lifestyle App.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the website directory:
```bash
cd fitnession-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fitnession-website/
├── public/           # Static files
│   ├── images/       # Image assets
│   ├── robots.txt    # SEO robots file
│   └── sitemap.xml   # SEO sitemap
├── src/
│   ├── components/   # React components
│   ├── data/         # Static data (blog posts)
│   ├── pages/        # Next.js pages
│   └── styles/       # Global styles
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Pages

- `/` - Landing page (Home)
- `/blog` - Health & fitness blog
- `/blog/[slug]` - Individual blog posts
- `/success-stories` - User transformation stories
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Colors

Edit `tailwind.config.js` to change brand colors:
- Primary: Teal (#00897B)
- Secondary: Orange (#FF9800)

### Content

- Blog posts: `src/data/blogPosts.ts`
- Success stories: `src/pages/success-stories.tsx`
- Legal pages: `src/pages/privacy-policy.tsx` and `src/pages/terms-of-service.tsx`

## License

Proprietary - Fitnession
