# Fitnession Website

Official website for Fitnession - India's #1 AI-Powered Health & Lifestyle App.

**Now featuring:** Complete payment system, user authentication, and subscription management dashboard!

## 🎯 Features

### Marketing Site
- Landing page with app showcase
- Health & fitness blog
- User transformation stories
- Privacy policy & Terms of service

### Payment System (NEW!)
- User authentication (Signup, Login, Password Reset)
- Razorpay payment integration (LIVE)
- Subscription management dashboard
- Trial system integration
- Deep linking to mobile app
- Billing history & account settings

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (shared with mobile app)
- **Payment**: Razorpay (LIVE mode)
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form + Zod
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (same as mobile app)
- Razorpay account (LIVE keys provided)

### Installation

1. Navigate to the website directory:
```bash
cd fitnession-website
```

2. Install dependencies:
```bash
npm install
```

3. **Setup Environment Variables** (IMPORTANT!)

Create `.env.local` in the root directory:

```env
# Supabase (same credentials as mobile app)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Razorpay (LIVE keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_VNA4bS2fMFepXR
RAZORPAY_KEY_SECRET=cAXBundvZIF11fbETkTM8SZJ

# Mobile App Deep Linking
NEXT_PUBLIC_APP_SCHEME=fitnession://
```

**Get Supabase Keys:**
- Dashboard → Settings → API
- Copy Project URL, anon key, and service_role key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fitnession-website/
├── public/                  # Static files
│   ├── images/              # Image assets
│   ├── robots.txt           # SEO robots file
│   └── sitemap.xml          # SEO sitemap
├── src/
│   ├── components/
│   │   ├── auth/            # NEW: Auth components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── payment/         # NEW: Payment components
│   │   │   ├── PlanCard.tsx
│   │   │   ├── PaymentButton.tsx
│   │   │   ├── TrialBanner.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   └── PaymentModal.tsx
│   │   └── dashboard/       # NEW: Dashboard components
│   │       └── DashboardLayout.tsx
│   ├── data/                # Static data (blog posts)
│   ├── hooks/               # NEW: Custom hooks
│   │   └── useAuth.ts
│   ├── lib/                 # NEW: Utilities
│   │   ├── supabase.ts
│   │   ├── supabaseServer.ts
│   │   ├── razorpay.ts
│   │   ├── plans.ts
│   │   ├── auth.ts
│   │   └── validation.ts
│   ├── pages/
│   │   ├── api/             # NEW: API routes
│   │   │   ├── payment/
│   │   │   │   ├── create-order.ts
│   │   │   │   └── verify-payment.ts
│   │   │   └── subscription/
│   │   │       ├── status.ts
│   │   │       ├── cancel.ts
│   │   │       └── history.ts
│   │   ├── dashboard/       # NEW: Dashboard pages
│   │   │   ├── index.tsx    # Subscription view
│   │   │   ├── billing.tsx  # Billing history
│   │   │   └── settings.tsx # Account settings
│   │   ├── index.tsx        # Landing page
│   │   ├── blog.tsx         # Blog listing
│   │   ├── login.tsx        # NEW: Login page
│   │   ├── signup.tsx       # NEW: Signup page
│   │   ├── forgot-password.tsx    # NEW
│   │   ├── reset-password.tsx     # NEW
│   │   ├── premium.tsx      # NEW: Payment page
│   │   ├── payment-success.tsx    # NEW
│   │   ├── payment-failed.tsx     # NEW
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── styles/              # Global styles
│   └── types/               # NEW: TypeScript types
│       ├── auth.ts
│       ├── payment.ts
│       ├── subscription.ts
│       └── navigation.ts
├── middleware.ts            # NEW: Route protection
├── .env.example             # NEW: Environment template
├── .env.local               # NEW: Local env (create this)
├── TESTING.md               # NEW: Testing guide
├── DEPLOYMENT.md            # NEW: Deployment guide
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Pages

### Marketing Pages
- `/` - Landing page (Home)
- `/blog` - Health & fitness blog
- `/blog/[slug]` - Individual blog posts
- `/success-stories` - User transformation stories
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service

### Authentication Pages (NEW!)
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset with token
- `/verify-email` - Email verification instructions

### Payment & Subscription (NEW!)
- `/premium` - Payment page (works from mobile app OR website)
- `/payment-success` - Payment success with deep linking
- `/payment-failed` - Payment failure handling

### Dashboard (NEW! - Protected)
- `/dashboard` - Subscription overview
- `/dashboard/billing` - Billing history
- `/dashboard/settings` - Account settings

## 💳 Payment System

### Subscription Plans

**Smart Plan (AI Only):**
- 1 Month: ₹199
- 3 Months: ₹499 (save 16%)
- 12 Months: ₹1,499 (save 37%)

**Premium Plan (AI + Human Coach):**
- 1 Month: ₹499
- 3 Months: ₹1,299 (save 13%)
- 12 Months: ₹3,999 (save 33%)

### Payment Flow

1. User selects plan on `/premium`
2. Razorpay modal opens
3. User completes payment
4. Backend verifies signature (security!)
5. Subscription saved to Supabase
6. User redirected to success page
7. Deep link opens mobile app

### Security Features

✅ Razorpay signature verification on server
✅ Server-side payment amount validation
✅ Row Level Security (RLS) on Supabase
✅ JWT-based authentication
✅ Protected API routes

## 🔌 API Routes

### Payment APIs
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment & save subscription

### Subscription APIs
- `GET /api/subscription/status?userId=UUID` - Get subscription & trial status
- `POST /api/subscription/cancel` - Cancel subscription
- `GET /api/subscription/history?userId=UUID` - Get payment history

## 📱 Mobile App Integration

### Deep Linking from Mobile App

```typescript
// Open payment page from mobile app
const url = `https://yourwebsite.com/premium?userId=${userId}&email=${email}&tier=smart&plan=smart_3`
Linking.openURL(url)
```

### Handling Deep Link Response

```typescript
// In mobile app - handle payment success/failure
Linking.addEventListener('url', (event) => {
  if (event.url.includes('payment-success')) {
    // Handle success
  } else if (event.url.includes('payment-failed')) {
    // Handle failure
  }
})
```

## 🧪 Testing

See **TESTING.md** for comprehensive testing guide.

**Quick Test:**
```bash
# Start dev server
npm run dev

# Test auth flow
1. Signup at /signup
2. Login at /login
3. Access dashboard at /dashboard

# Test payment (use Razorpay test card: 4111 1111 1111 1111)
1. Go to /premium
2. Select plan
3. Complete payment
4. Verify subscription in database
```

## 🚢 Deployment

See **DEPLOYMENT.md** for complete deployment guide.

### Quick Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_APP_SCHEME`
4. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change brand colors:
- Primary: Emerald/Green (#10b981) - used for payment pages
- Marketing: Teal (#00897B) - used for landing page
- Secondary: Orange (#FF9800)

### Content

- Blog posts: `src/data/blogPosts.ts`
- Success stories: `src/pages/success-stories.tsx`
- Legal pages: `src/pages/privacy-policy.tsx` and `src/pages/terms-of-service.tsx`
- Subscription plans: `src/lib/plans.ts` (must match mobile app!)

### Payment Plans

To update pricing, edit `src/lib/plans.ts`:

```typescript
export const SMART_PLANS = [
  { id: 'smart_1', duration: 1, originalPrice: 199, totalPrice: 199 },
  { id: 'smart_3', duration: 3, originalPrice: 597, totalPrice: 499, savings: 16 },
  // ...
]
```

**IMPORTANT:** Keep prices in sync with mobile app!

## 🐛 Troubleshooting

### "User not found" during payment
- Check user exists in Supabase auth.users
- Verify userId is valid UUID

### Razorpay modal not opening
- Check `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Verify Razorpay script loaded in browser
- Check browser console for errors

### Payment verification fails
- Check `RAZORPAY_KEY_SECRET` is correct
- Verify no whitespace in environment variables
- Ensure signature verification logic is correct

### Deep links not working
- Ensure mobile app has `fitnession://` URL scheme registered
- Test on real device (not simulator)
- Verify app is installed

See TESTING.md for more troubleshooting.

## 📦 Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-hook-form": "^7.49.2",
    "react-hot-toast": "^2.4.1",
    "zod": "^3.22.4",
    "framer-motion": "latest",
    "lucide-react": "latest"
  }
}
```

## ✅ Implementation Status

- [x] Phase 1: Setup & Configuration
- [x] Phase 2: Authentication Pages
- [x] Phase 3: Auth Guards & Protection
- [x] Phase 4: Premium Page & Payment Components
- [x] Phase 5: Payment API Integration
- [x] Phase 6: Dashboard Components
- [x] Phase 7: Dashboard Pages (Subscription)
- [x] Phase 8: Dashboard Pages (Billing & Settings)
- [x] Phase 9: Success/Failure Pages
- [ ] Phase 10: Testing (see TESTING.md)
- [ ] Phase 11: Production Deployment (see DEPLOYMENT.md)

## 📚 Documentation

- **TESTING.md** - Comprehensive testing guide with checklist
- **DEPLOYMENT.md** - Production deployment guide (Vercel, Netlify, VPS)
- **README.md** - This file (overview and quick start)

## 🤝 Support

For issues or questions:
- Check TESTING.md for common issues
- Check DEPLOYMENT.md for deployment help
- Review Razorpay docs: https://razorpay.com/docs
- Review Supabase docs: https://supabase.com/docs

## License

Proprietary - Fitnession

---

**Built with ❤️ for Fitnession AI Fitness Coaching**
