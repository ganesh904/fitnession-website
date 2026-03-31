# Full Payment + Auth System Implementation Plan
## Fitnession Website - Complete Solution

**Implementation Option: B - Full (Payment + Authentication + Dashboard)**

---

## 📋 OVERVIEW

Building a complete payment and subscription management system with:
- ✅ User authentication (login/signup)
- ✅ Payment integration (Razorpay)
- ✅ Subscription management dashboard
- ✅ Account settings
- ✅ Payment history
- ✅ Cancel/upgrade subscriptions
- ✅ Password recovery
- ✅ Protected routes

**Total Implementation Time: ~16 hours**

---

## 📁 COMPLETE FILE STRUCTURE

### Configuration Files (3 files)
```
.env.local                           # Environment variables (gitignored)
.env.example                         # Template for env vars
middleware.ts                        # Auth middleware for protected routes
```

### Pages (13 files)
```
src/pages/login.tsx                  # Sign in page
src/pages/signup.tsx                 # Create account page
src/pages/forgot-password.tsx        # Password recovery
src/pages/reset-password.tsx         # Reset password with token
src/pages/premium.tsx                # Payment page (public)
src/pages/dashboard/index.tsx        # Subscription dashboard (protected)
src/pages/dashboard/settings.tsx     # Account settings (protected)
src/pages/dashboard/billing.tsx      # Payment history (protected)
src/pages/payment-success.tsx        # Payment success redirect
src/pages/payment-failed.tsx         # Payment failure redirect
src/pages/verify-email.tsx           # Email verification page
src/pages/api-test.tsx               # Test Supabase connection (dev only)
```

### API Routes (8 files)
```
src/pages/api/auth/session.ts                # Get current session
src/pages/api/auth/logout.ts                 # Logout endpoint
src/pages/api/payment/create-order.ts        # Create Razorpay order
src/pages/api/payment/verify-payment.ts      # Verify Razorpay signature
src/pages/api/payment/save-subscription.ts   # Save subscription to DB
src/pages/api/subscription/status.ts         # Get subscription status
src/pages/api/subscription/cancel.ts         # Cancel subscription
src/pages/api/subscription/history.ts        # Payment history
```

### Components - Auth (7 files)
```
src/components/auth/LoginForm.tsx            # Login form component
src/components/auth/SignupForm.tsx           # Signup form component
src/components/auth/ForgotPasswordForm.tsx   # Forgot password form
src/components/auth/ResetPasswordForm.tsx    # Reset password form
src/components/auth/AuthGuard.tsx            # Protected route wrapper
src/components/auth/AuthLayout.tsx           # Auth pages layout
src/components/auth/SocialLogin.tsx          # Google/Apple login (optional)
```

### Components - Payment (6 files)
```
src/components/payment/PlanCard.tsx          # Plan selection card
src/components/payment/PaymentButton.tsx     # Razorpay payment button
src/components/payment/PricingTable.tsx      # Pricing comparison table
src/components/payment/TrialBanner.tsx       # Trial status display
src/components/payment/PaymentModal.tsx      # Payment processing modal
src/components/payment/PlanComparison.tsx    # Smart vs Premium comparison
```

### Components - Dashboard (8 files)
```
src/components/dashboard/DashboardLayout.tsx     # Dashboard wrapper
src/components/dashboard/SubscriptionCard.tsx    # Current subscription card
src/components/dashboard/PaymentHistory.tsx      # Payment history table
src/components/dashboard/AccountDetails.tsx      # Account info display
src/components/dashboard/BillingCard.tsx         # Billing information
src/components/dashboard/UpgradeCard.tsx         # Upgrade plan CTA
src/components/dashboard/CancelModal.tsx         # Cancel subscription modal
src/components/dashboard/Sidebar.tsx             # Dashboard sidebar nav
```

### Utilities & Helpers (8 files)
```
src/lib/supabase.ts                  # Supabase client setup
src/lib/supabaseServer.ts            # Server-side Supabase client
src/lib/razorpay.ts                  # Razorpay helper functions
src/lib/plans.ts                     # Plan definitions (shared with mobile)
src/lib/auth.ts                      # Auth helper functions
src/lib/validation.ts                # Form validation helpers
src/hooks/useAuth.ts                 # Auth React hook
src/hooks/useSubscription.ts         # Subscription React hook
```

### Types (3 files)
```
src/types/payment.ts                 # Payment-related types
src/types/subscription.ts            # Subscription types
src/types/auth.ts                    # Auth types
```

### Styles (2 files)
```
src/styles/auth.css                  # Auth pages styles
src/styles/dashboard.css             # Dashboard styles
```

**Total: 61 new files**

---

## 📦 PACKAGES TO INSTALL

```bash
# Core functionality
npm install @supabase/supabase-js      # Supabase client
npm install @supabase/auth-helpers-nextjs  # Supabase Auth helpers for Next.js
npm install razorpay                   # Razorpay SDK

# UI & UX
npm install react-hot-toast            # Toast notifications
npm install @headlessui/react          # Modal/Dialog components
npm install @heroicons/react           # Icons
npm install react-hook-form            # Form handling
npm install zod                        # Schema validation

# Utilities
npm install date-fns                   # Date formatting
npm install clsx                       # Conditional classes
```

---

## 🔧 ENVIRONMENT VARIABLES

Create `.env.local`:
```env
# Supabase (Same as mobile app)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For admin operations

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App Configuration
NEXT_PUBLIC_APP_SCHEME=fitnession://
NEXT_PUBLIC_SITE_URL=https://fitnession.com

# Email (for password reset - uses Supabase)
NEXT_PUBLIC_REDIRECT_URL=https://fitnession.com/reset-password

# Session (optional - for security)
JWT_SECRET=your-random-secret-string
```

Create `.env.example`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# App Configuration
NEXT_PUBLIC_APP_SCHEME=fitnession://
NEXT_PUBLIC_SITE_URL=https://fitnession.com
NEXT_PUBLIC_REDIRECT_URL=https://fitnession.com/reset-password
JWT_SECRET=
```

---

## 🎯 IMPLEMENTATION PHASES

### **Phase 1: Setup & Configuration** (1.5 hours)

**Tasks:**
1. Install all packages
2. Setup environment variables
3. Create Supabase client (browser & server)
4. Configure Next.js middleware for auth
5. Create base types
6. Setup Razorpay helper
7. Test Supabase connection

**Files Created:**
- `.env.local`, `.env.example`
- `src/lib/supabase.ts`
- `src/lib/supabaseServer.ts`
- `src/lib/razorpay.ts`
- `src/types/auth.ts`
- `src/types/payment.ts`
- `middleware.ts`

---

### **Phase 2: Authentication Pages** (3 hours)

**Tasks:**
1. Create auth layout component
2. Build login page with form validation
3. Build signup page
4. Build forgot password page
5. Build reset password page
6. Add form validation with zod
7. Integrate with Supabase Auth
8. Add error handling
9. Add loading states

**Files Created:**
- `src/pages/login.tsx`
- `src/pages/signup.tsx`
- `src/pages/forgot-password.tsx`
- `src/pages/reset-password.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/SignupForm.tsx`
- `src/components/auth/ForgotPasswordForm.tsx`
- `src/components/auth/ResetPasswordForm.tsx`
- `src/components/auth/AuthLayout.tsx`
- `src/lib/auth.ts`
- `src/lib/validation.ts`

**Features:**
- Email/password authentication
- Form validation (email format, password strength)
- Error messages
- Loading states
- "Remember me" option
- Redirect after login
- Email verification flow

---

### **Phase 3: Auth Guards & Hooks** (1 hour)

**Tasks:**
1. Create useAuth hook
2. Create AuthGuard component
3. Setup protected routes
4. Add session management
5. Handle auth state changes

**Files Created:**
- `src/hooks/useAuth.ts`
- `src/components/auth/AuthGuard.tsx`

**Features:**
- Auto-redirect if not logged in
- Persist auth state
- Listen for auth changes
- Logout functionality

---

### **Phase 4: Premium Payment Page** (2.5 hours)

**Tasks:**
1. Create /premium page
2. Parse query parameters (userId, plan, tier, email)
3. Build plan selection UI
4. Create PlanCard components
5. Create PricingTable
6. Add trial status banner
7. Make responsive
8. Handle both: logged-in users + URL params from app

**Files Created:**
- `src/pages/premium.tsx`
- `src/components/payment/PlanCard.tsx`
- `src/components/payment/PricingTable.tsx`
- `src/components/payment/TrialBanner.tsx`
- `src/components/payment/PlanComparison.tsx`
- `src/lib/plans.ts`

**Features:**
- Works with userId from URL (mobile app flow)
- Also works for logged-in web users
- Plan selection with savings badges
- Trial status display
- Responsive design

---

### **Phase 5: Payment Integration** (2.5 hours)

**Tasks:**
1. Create PaymentButton component
2. Add Razorpay script to _document.tsx
3. Build create-order API
4. Build verify-payment API
5. Build save-subscription API
6. Implement signature verification
7. Handle payment callbacks
8. Add PaymentModal for loading states

**Files Created:**
- `src/components/payment/PaymentButton.tsx`
- `src/components/payment/PaymentModal.tsx`
- `src/pages/api/payment/create-order.ts`
- `src/pages/api/payment/verify-payment.ts`
- `src/pages/api/payment/save-subscription.ts`

**Features:**
- Razorpay checkout integration
- Payment signature verification (CRITICAL)
- Loading states during payment
- Error handling
- Toast notifications
- Deep link redirect after success

---

### **Phase 6: Dashboard - Subscription Management** (2.5 hours)

**Tasks:**
1. Create dashboard layout
2. Build subscription status card
3. Create subscription/status API
4. Show active plan details
5. Display next billing date
6. Add upgrade/downgrade options
7. Create cancel subscription flow
8. Build cancel API

**Files Created:**
- `src/pages/dashboard/index.tsx`
- `src/components/dashboard/DashboardLayout.tsx`
- `src/components/dashboard/SubscriptionCard.tsx`
- `src/components/dashboard/UpgradeCard.tsx`
- `src/components/dashboard/CancelModal.tsx`
- `src/components/dashboard/Sidebar.tsx`
- `src/pages/api/subscription/status.ts`
- `src/pages/api/subscription/cancel.ts`
- `src/hooks/useSubscription.ts`

**Features:**
- View current subscription
- See plan details (tier, duration, expiry)
- Upgrade/downgrade options
- Cancel with confirmation modal
- Trial status if active

---

### **Phase 7: Dashboard - Billing & History** (1.5 hours)

**Tasks:**
1. Create billing page
2. Build payment history component
3. Create history API
4. Display past payments
5. Show payment method
6. Add invoice download (optional)

**Files Created:**
- `src/pages/dashboard/billing.tsx`
- `src/components/dashboard/PaymentHistory.tsx`
- `src/components/dashboard/BillingCard.tsx`
- `src/pages/api/subscription/history.ts`

**Features:**
- Payment history table
- Filter by date
- Show payment status
- Display amount paid
- Export invoices (optional)

---

### **Phase 8: Dashboard - Account Settings** (1 hour)

**Tasks:**
1. Create settings page
2. Build AccountDetails component
3. Show user info (email, name)
4. Add password change
5. Add email update
6. Delete account option

**Files Created:**
- `src/pages/dashboard/settings.tsx`
- `src/components/dashboard/AccountDetails.tsx`

**Features:**
- View account details
- Update password
- Update email
- Delete account (with confirmation)

---

### **Phase 9: Success/Failure Pages** (0.5 hours)

**Tasks:**
1. Create payment-success page
2. Create payment-failed page
3. Add deep link buttons
4. Add redirect logic
5. Handle edge cases

**Files Created:**
- `src/pages/payment-success.tsx`
- `src/pages/payment-failed.tsx`

**Features:**
- Success message with confetti
- Deep link to open app
- Manual open app button
- Failure reasons
- Retry payment option

---

### **Phase 10: Testing & Refinement** (1.5 hours)

**Tasks:**
1. Test auth flows (login, signup, logout)
2. Test payment with Razorpay test cards
3. Test dashboard all features
4. Test protected routes
5. Test deep linking
6. Test responsive design
7. Test error scenarios
8. Fix bugs

**Test Scenarios:**
- [ ] New user signup
- [ ] Login with existing account
- [ ] Forgot password flow
- [ ] Payment from mobile app (with userId)
- [ ] Payment from website (logged in)
- [ ] View subscription in dashboard
- [ ] Cancel subscription
- [ ] View payment history
- [ ] Update account settings
- [ ] Logout and re-login
- [ ] Protected routes redirect
- [ ] Deep link to app works

---

### **Phase 11: Production Setup** (1 hour)

**Tasks:**
1. Get Razorpay production keys
2. Update production env vars
3. Test with real payment
4. Deploy to Vercel/production
5. Configure custom domain
6. Test end-to-end in production
7. Setup error monitoring
8. Document deployment

---

## 🔄 USER FLOWS

### Flow 1: Mobile App User Pays (No Website Login)
```
1. User in mobile app (already logged in)
   ↓
2. Clicks "Get Premium Access"
   ↓
3. Browser opens: /premium?userId=abc&email=user@email.com&plan=smart_monthly&tier=smart
   ↓
4. Website reads userId from URL (no login needed)
   ↓
5. Shows selected plan, user can change duration
   ↓
6. User clicks "Pay ₹499"
   ↓
7. Razorpay checkout opens
   ↓
8. User completes payment
   ↓
9. Backend verifies payment → saves subscription
   ↓
10. Redirects: fitnession://payment-success
    ↓
11. App opens → checks subscription → Mira unlocked ✨
```

### Flow 2: Website User Pays (With Login)
```
1. User visits fitnession.com
   ↓
2. Clicks "Get Premium" in navbar
   ↓
3. Not logged in → redirects to /login
   ↓
4. User logs in (or signs up)
   ↓
5. Redirects to /premium
   ↓
6. Selects plan
   ↓
7. Completes payment via Razorpay
   ↓
8. Redirects to /payment-success
   ↓
9. Can view subscription in /dashboard
```

### Flow 3: Manage Subscription from Website
```
1. User visits fitnession.com
   ↓
2. Clicks "Dashboard" or "My Account"
   ↓
3. Logs in if not already
   ↓
4. Sees dashboard with current subscription
   ↓
5. Can:
   - View subscription details
   - See payment history
   - Upgrade/downgrade plan
   - Cancel subscription
   - Update account settings
```

### Flow 4: Password Recovery
```
1. User clicks "Forgot Password" on login page
   ↓
2. Enters email
   ↓
3. Supabase sends password reset email
   ↓
4. User clicks link in email
   ↓
5. Opens /reset-password?token=xxx
   ↓
6. Enters new password
   ↓
7. Password updated
   ↓
8. Redirects to /login
```

---

## 🔐 AUTHENTICATION IMPLEMENTATION

### Using Supabase Auth

#### Browser Client (`src/lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

#### Server Client (`src/lib/supabaseServer.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Admin access
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

#### Auth Hooks (`src/hooks/useAuth.ts`)
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

#### Login Function
```typescript
async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}
```

#### Signup Function
```typescript
async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/verify-email`
    }
  })

  if (error) throw error
  return data
}
```

#### Logout Function
```typescript
async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
```

#### Password Reset
```typescript
// Request reset
async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })

  if (error) throw error
}

// Update password
async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
}
```

---

## 🔒 PROTECTED ROUTES MIDDLEWARE

Create `middleware.ts`:
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Protect /dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
```

---

## 💾 DATABASE (Same Supabase as Mobile App)

### Tables Used:

#### `auth.users` (Supabase built-in)
```sql
-- Managed by Supabase Auth
-- Contains: id, email, created_at, etc.
```

#### `profiles` (Already exists from mobile app)
```sql
-- User profile information
-- Links to auth.users via user_id
```

#### `subscriptions` (Already exists from mobile app)
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_tier TEXT NOT NULL,
  plan_duration INTEGER NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  payment_id TEXT,
  order_id TEXT,
  amount_paid INTEGER,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `payment_history` (NEW - Optional)
```sql
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  payment_id TEXT NOT NULL,
  order_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL, -- success, failed, pending
  plan_tier TEXT NOT NULL,
  plan_duration INTEGER NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_payment_history_user
ON payment_history(user_id, created_at DESC);
```

---

## 🎨 UI/UX DESIGN NOTES

### Design System
- Use existing Tailwind colors (primary: #00897B, secondary: #FF9800)
- Match mobile app's design language
- Clean, modern, minimal
- Focus on conversion (premium page)
- Professional dashboard look

### Key Pages Design:

**Login Page:**
- Clean, centered form
- Email/password fields
- "Forgot password?" link
- "Don't have an account? Sign up"
- Social login buttons (optional)

**Dashboard:**
- Sidebar navigation
- Subscription card (prominent)
- Quick actions
- Clean layout
- Mobile responsive

**Premium Page:**
- Hero section with trial status
- Plan comparison table
- Clear pricing
- Security badges
- Trust indicators

---

## 📋 TESTING CHECKLIST

### Authentication
- [ ] Signup with valid email/password
- [ ] Signup with invalid email
- [ ] Signup with weak password
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Forgot password flow
- [ ] Reset password with token
- [ ] Logout
- [ ] Session persistence
- [ ] Auto-redirect when logged in
- [ ] Protected routes redirect

### Payment
- [ ] Premium page loads with URL params
- [ ] Premium page loads for logged-in user
- [ ] Plan selection works
- [ ] Razorpay checkout opens
- [ ] Payment with test success card
- [ ] Payment with test failure card
- [ ] Payment cancellation
- [ ] Signature verification
- [ ] Subscription saved to Supabase
- [ ] Deep link redirect works

### Dashboard
- [ ] Dashboard loads subscription
- [ ] Shows correct plan details
- [ ] Cancel subscription works
- [ ] Cancel confirmation modal
- [ ] Payment history displays
- [ ] Account settings load
- [ ] Update password works
- [ ] Logout from dashboard

### Edge Cases
- [ ] Expired session handling
- [ ] Network errors
- [ ] Duplicate payment prevention
- [ ] User already has subscription
- [ ] Invalid userId from URL
- [ ] Missing query parameters

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Deployment
- [ ] All environment variables set
- [ ] Razorpay production keys configured
- [ ] Supabase RLS policies checked
- [ ] All API routes tested
- [ ] Responsive design verified
- [ ] Browser compatibility tested
- [ ] Error handling complete
- [ ] Loading states everywhere
- [ ] No console errors
- [ ] No TypeScript errors

### Deployment Steps
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel
4. Deploy
5. Configure custom domain (fitnession.com)
6. Test premium payment flow
7. Test with real Razorpay payment
8. Monitor Vercel logs
9. Setup error tracking (Sentry - optional)

### Post-Deployment
- [ ] Test complete flow on production
- [ ] Mobile app → website payment works
- [ ] Deep linking works
- [ ] SSL certificate valid
- [ ] All pages load correctly
- [ ] Auth flows work
- [ ] Dashboard accessible
- [ ] Monitor for errors

---

## 📚 HELPFUL RESOURCES

### Documentation
- **Supabase Auth**: https://supabase.com/docs/guides/auth
- **Supabase Auth Helpers (Next.js)**: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- **Razorpay Web Integration**: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **Next.js Middleware**: https://nextjs.org/docs/app/building-your-application/routing/middleware

### Razorpay Test Cards
```
Success: 4111 1111 1111 1111
Failure: 4111 1111 1111 1112
CVV: Any 3 digits
Expiry: Any future date
```

### Supabase Auth Events
- `SIGNED_IN` - User logged in
- `SIGNED_OUT` - User logged out
- `USER_UPDATED` - User data changed
- `PASSWORD_RECOVERY` - Password reset requested

---

## 🎯 SUCCESS METRICS

After implementation, users should be able to:

### From Mobile App:
1. ✅ Click "Get Premium" → browser opens
2. ✅ See pre-selected plan
3. ✅ Complete payment
4. ✅ Return to app → Mira unlocked

### From Website:
1. ✅ Sign up for account
2. ✅ Login to existing account
3. ✅ Purchase subscription
4. ✅ View subscription in dashboard
5. ✅ Manage subscription (cancel, upgrade)
6. ✅ View payment history
7. ✅ Update account settings
8. ✅ Reset password if forgotten

### Admin/Support:
1. ✅ Verify subscriptions in Supabase
2. ✅ Check payment history
3. ✅ View user accounts
4. ✅ Monitor payment failures

---

## ⏱️ DETAILED TIME BREAKDOWN

| Phase | Hours | Description |
|-------|-------|-------------|
| 1. Setup | 1.5 | Packages, env, Supabase, types |
| 2. Auth Pages | 3.0 | Login, signup, forgot/reset password |
| 3. Auth Guards | 1.0 | Hooks, middleware, protected routes |
| 4. Premium Page | 2.5 | Payment UI, plan selection |
| 5. Payment Integration | 2.5 | Razorpay, APIs, verification |
| 6. Dashboard - Subscription | 2.5 | View, cancel, upgrade |
| 7. Dashboard - Billing | 1.5 | Payment history, invoices |
| 8. Dashboard - Settings | 1.0 | Account settings |
| 9. Success/Failure Pages | 0.5 | Redirects, deep linking |
| 10. Testing | 1.5 | All flows, edge cases |
| 11. Production | 1.0 | Deploy, production keys, monitoring |
| **TOTAL** | **18 hours** | Complete implementation |

*(Slightly more than initial 16hr estimate due to added polish)*

---

## 🎉 READY TO START!

**Next Steps:**

1. **Get Credentials:**
   - Supabase URL and keys (you have these from mobile app)
   - Create Razorpay account → get test API keys
   - Save all in .env.local

2. **Start Phase 1:**
   - Install packages
   - Setup environment
   - Create Supabase client
   - Test connection

3. **Follow Phases Sequentially:**
   - Complete one phase before moving to next
   - Test each phase thoroughly
   - Commit code after each phase

**Ready when you are!** 🚀

Just say "start Phase 1" and I'll begin implementation!
