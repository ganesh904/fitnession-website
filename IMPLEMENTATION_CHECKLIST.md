# Implementation Checklist
## Quick Reference for Full Payment + Auth System

**Total Time:** ~18 hours
**Total Files:** 61 new files

---

## ✅ PHASE 1: SETUP (1.5 hours)

### Packages to Install
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs razorpay react-hot-toast @headlessui/react @heroicons/react react-hook-form zod date-fns clsx
```

### Files to Create
- [ ] `.env.local` - Environment variables
- [ ] `.env.example` - Template
- [ ] `middleware.ts` - Auth middleware
- [ ] `src/lib/supabase.ts` - Browser client
- [ ] `src/lib/supabaseServer.ts` - Server client
- [ ] `src/lib/razorpay.ts` - Razorpay helpers
- [ ] `src/types/auth.ts` - Auth types
- [ ] `src/types/payment.ts` - Payment types
- [ ] `src/types/subscription.ts` - Subscription types

### Tasks
- [ ] Install all packages
- [ ] Create .env.local with Supabase + Razorpay keys
- [ ] Setup Supabase client
- [ ] Setup server-side Supabase client
- [ ] Create Razorpay helper
- [ ] Test Supabase connection
- [ ] Verify environment variables loading

---

## ✅ PHASE 2: AUTH PAGES (3 hours)

### Files to Create
- [ ] `src/pages/login.tsx`
- [ ] `src/pages/signup.tsx`
- [ ] `src/pages/forgot-password.tsx`
- [ ] `src/pages/reset-password.tsx`
- [ ] `src/pages/verify-email.tsx`
- [ ] `src/components/auth/LoginForm.tsx`
- [ ] `src/components/auth/SignupForm.tsx`
- [ ] `src/components/auth/ForgotPasswordForm.tsx`
- [ ] `src/components/auth/ResetPasswordForm.tsx`
- [ ] `src/components/auth/AuthLayout.tsx`
- [ ] `src/lib/auth.ts` - Auth helper functions
- [ ] `src/lib/validation.ts` - Form validation

### Features to Implement
- [ ] Login form with email/password
- [ ] Signup form with validation
- [ ] Password strength indicator
- [ ] Forgot password flow
- [ ] Reset password with token
- [ ] Email verification page
- [ ] Form error handling
- [ ] Loading states
- [ ] Toast notifications
- [ ] Redirect after login

### Testing
- [ ] Signup new user
- [ ] Login existing user
- [ ] Wrong password error
- [ ] Invalid email error
- [ ] Weak password error
- [ ] Forgot password sends email
- [ ] Reset password works

---

## ✅ PHASE 3: AUTH GUARDS (1 hour)

### Files to Create
- [ ] `src/hooks/useAuth.ts` - Auth hook
- [ ] `src/components/auth/AuthGuard.tsx` - Protected route wrapper
- [ ] Update `middleware.ts` - Add route protection

### Features to Implement
- [ ] useAuth hook with user state
- [ ] Listen for auth state changes
- [ ] AuthGuard component
- [ ] Redirect to login if not authenticated
- [ ] Persist session
- [ ] Logout function

### Testing
- [ ] Protected routes redirect to login
- [ ] Logged-in users can access dashboard
- [ ] Session persists on refresh
- [ ] Logout clears session
- [ ] Auth state updates in real-time

---

## ✅ PHASE 4: PREMIUM PAGE (2.5 hours)

### Files to Create
- [ ] `src/pages/premium.tsx`
- [ ] `src/components/payment/PlanCard.tsx`
- [ ] `src/components/payment/PricingTable.tsx`
- [ ] `src/components/payment/TrialBanner.tsx`
- [ ] `src/components/payment/PlanComparison.tsx`
- [ ] `src/lib/plans.ts` - Plan definitions

### Features to Implement
- [ ] Parse URL query params (userId, plan, tier, email)
- [ ] Display selected plan
- [ ] Plan selection UI
- [ ] Duration selection (1/3/12 months)
- [ ] Trial status banner
- [ ] Pricing comparison table
- [ ] Savings badges
- [ ] Responsive design
- [ ] Works for logged-in users
- [ ] Works with URL params (from app)

### Testing
- [ ] Load with URL params from mobile app
- [ ] Load as logged-in user
- [ ] Plan selection changes price
- [ ] Trial banner shows correctly
- [ ] Responsive on mobile
- [ ] All plans display correctly

---

## ✅ PHASE 5: PAYMENT INTEGRATION (2.5 hours)

### Files to Create
- [ ] `src/components/payment/PaymentButton.tsx`
- [ ] `src/components/payment/PaymentModal.tsx`
- [ ] `src/pages/api/payment/create-order.ts`
- [ ] `src/pages/api/payment/verify-payment.ts`
- [ ] `src/pages/api/payment/save-subscription.ts`
- [ ] Update `src/pages/_document.tsx` - Add Razorpay script

### API Routes to Implement

**POST /api/payment/create-order**
- [ ] Validate plan exists
- [ ] Calculate amount
- [ ] Create Razorpay order
- [ ] Return orderId and amount

**POST /api/payment/verify-payment**
- [ ] Verify Razorpay signature (CRITICAL)
- [ ] Validate payment details
- [ ] Call save-subscription
- [ ] Return success/failure

**POST /api/payment/save-subscription**
- [ ] Save to Supabase subscriptions table
- [ ] Calculate end_date
- [ ] Store payment_id and order_id
- [ ] Return subscription details

### Features to Implement
- [ ] PaymentButton opens Razorpay
- [ ] Initialize Razorpay with order details
- [ ] Handle payment success callback
- [ ] Handle payment failure
- [ ] Show loading modal during payment
- [ ] Verify signature on backend
- [ ] Save subscription to database
- [ ] Toast notifications
- [ ] Error handling

### Testing
- [ ] Payment button opens Razorpay
- [ ] Test card (success) works
- [ ] Test card (failure) shows error
- [ ] Signature verification works
- [ ] Subscription saved to Supabase
- [ ] Payment cancellation handled
- [ ] Network errors handled

---

## ✅ PHASE 6: DASHBOARD - SUBSCRIPTION (2.5 hours)

### Files to Create
- [ ] `src/pages/dashboard/index.tsx`
- [ ] `src/components/dashboard/DashboardLayout.tsx`
- [ ] `src/components/dashboard/SubscriptionCard.tsx`
- [ ] `src/components/dashboard/UpgradeCard.tsx`
- [ ] `src/components/dashboard/CancelModal.tsx`
- [ ] `src/components/dashboard/Sidebar.tsx`
- [ ] `src/pages/api/subscription/status.ts`
- [ ] `src/pages/api/subscription/cancel.ts`
- [ ] `src/hooks/useSubscription.ts`

### Features to Implement
- [ ] Dashboard layout with sidebar
- [ ] Fetch subscription status
- [ ] Display current plan
- [ ] Show expiry date
- [ ] Trial status if active
- [ ] Upgrade/downgrade options
- [ ] Cancel subscription button
- [ ] Cancel confirmation modal
- [ ] Update subscription in Supabase

### Testing
- [ ] Dashboard loads subscription
- [ ] Shows correct plan details
- [ ] Expiry date displayed
- [ ] Cancel button works
- [ ] Cancel modal confirms
- [ ] Subscription updated in DB
- [ ] UI updates after cancel

---

## ✅ PHASE 7: DASHBOARD - BILLING (1.5 hours)

### Files to Create
- [ ] `src/pages/dashboard/billing.tsx`
- [ ] `src/components/dashboard/PaymentHistory.tsx`
- [ ] `src/components/dashboard/BillingCard.tsx`
- [ ] `src/pages/api/subscription/history.ts`

### Features to Implement
- [ ] Payment history page
- [ ] Fetch payment history from API
- [ ] Display past payments in table
- [ ] Show payment status
- [ ] Show amount and date
- [ ] Filter by date range (optional)
- [ ] Export invoices (optional)

### Testing
- [ ] Payment history loads
- [ ] Shows correct payments
- [ ] Dates formatted correctly
- [ ] Amounts display correctly
- [ ] Empty state works

---

## ✅ PHASE 8: DASHBOARD - SETTINGS (1 hour)

### Files to Create
- [ ] `src/pages/dashboard/settings.tsx`
- [ ] `src/components/dashboard/AccountDetails.tsx`

### Features to Implement
- [ ] Account settings page
- [ ] Display user email
- [ ] Display account created date
- [ ] Change password form
- [ ] Update email (optional)
- [ ] Delete account button (with warning)

### Testing
- [ ] Settings page loads
- [ ] User info displayed
- [ ] Change password works
- [ ] Delete account confirmation

---

## ✅ PHASE 9: SUCCESS/FAILURE PAGES (0.5 hours)

### Files to Create
- [ ] `src/pages/payment-success.tsx`
- [ ] `src/pages/payment-failed.tsx`

### Features to Implement
- [ ] Success page with celebration
- [ ] Show subscription details
- [ ] Deep link button to open app
- [ ] Manual "Open App" button
- [ ] Failure page with reason
- [ ] Retry payment option
- [ ] Contact support link

### Testing
- [ ] Success page displays
- [ ] Deep link works
- [ ] Failure page shows reason
- [ ] Retry button works

---

## ✅ PHASE 10: TESTING (1.5 hours)

### Complete User Flows
- [ ] **Mobile App User:**
  - [ ] App → premium page → payment → back to app → Mira unlocked
- [ ] **Website User:**
  - [ ] Signup → login → premium → payment → dashboard
- [ ] **Existing User:**
  - [ ] Login → dashboard → view subscription → cancel
- [ ] **Password Recovery:**
  - [ ] Forgot password → email → reset → login

### Edge Cases
- [ ] Duplicate subscription prevention
- [ ] Expired session handling
- [ ] Invalid userId from URL
- [ ] Missing query parameters
- [ ] Network errors during payment
- [ ] Payment timeout
- [ ] User already has active subscription

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Responsive Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## ✅ PHASE 11: PRODUCTION (1 hour)

### Pre-Deployment
- [ ] Get Razorpay production keys
- [ ] Update .env with production keys
- [ ] Verify all environment variables
- [ ] Remove console.logs
- [ ] Check for TypeScript errors
- [ ] Run build locally
- [ ] Test production build

### Deployment
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Configure custom domain (fitnession.com)
- [ ] Verify SSL certificate
- [ ] Test deployed site

### Post-Deployment Testing
- [ ] Test complete payment flow on production
- [ ] Test with real Razorpay payment
- [ ] Test deep linking from mobile app
- [ ] Test all auth flows
- [ ] Test dashboard features
- [ ] Monitor Vercel logs for errors
- [ ] Setup error tracking (Sentry - optional)

### Documentation
- [ ] Document deployment process
- [ ] Document environment variables
- [ ] Create user guide (optional)
- [ ] Update README

---

## 📊 PROGRESS TRACKER

| Phase | Status | Hours | Completed |
|-------|--------|-------|-----------|
| 1. Setup | ⬜ | 1.5 | |
| 2. Auth Pages | ⬜ | 3.0 | |
| 3. Auth Guards | ⬜ | 1.0 | |
| 4. Premium Page | ⬜ | 2.5 | |
| 5. Payment | ⬜ | 2.5 | |
| 6. Dashboard - Sub | ⬜ | 2.5 | |
| 7. Dashboard - Bill | ⬜ | 1.5 | |
| 8. Dashboard - Settings | ⬜ | 1.0 | |
| 9. Success/Failure | ⬜ | 0.5 | |
| 10. Testing | ⬜ | 1.5 | |
| 11. Production | ⬜ | 1.0 | |
| **TOTAL** | **0%** | **18.0** | **0/11** |

---

## 🔑 CREDENTIALS NEEDED

Before starting, gather:
- [ ] Supabase URL (from mobile app project)
- [ ] Supabase Anon Key (from mobile app project)
- [ ] Supabase Service Role Key (from Supabase dashboard)
- [ ] Razorpay Test Key ID
- [ ] Razorpay Test Key Secret
- [ ] (Later) Razorpay Production keys

---

## 🚨 CRITICAL SECURITY REMINDERS

- [ ] NEVER expose Razorpay secret key to frontend
- [ ] ALWAYS verify payment signature on server
- [ ] NEVER trust client for amount calculation
- [ ] Add .env.local to .gitignore
- [ ] Use HTTPS in production
- [ ] Validate all API inputs
- [ ] Protect API routes with auth checks

---

## 📱 MOBILE APP INTEGRATION CHECKLIST

- [ ] Mobile app passes correct URL params
- [ ] userId format matches Supabase
- [ ] Deep link scheme configured (fitnession://)
- [ ] App handles payment-success deep link
- [ ] App handles payment-failed deep link
- [ ] App checks subscription after payment
- [ ] Mira unlocks when subscription active

---

## 🎯 DEFINITION OF DONE

✅ Implementation is complete when:

**Authentication:**
- [ ] Users can signup
- [ ] Users can login
- [ ] Password reset works
- [ ] Sessions persist
- [ ] Protected routes work

**Payment:**
- [ ] Premium page works from mobile app
- [ ] Premium page works from website
- [ ] Razorpay payment succeeds
- [ ] Subscription saved to Supabase
- [ ] Deep link redirects to app

**Dashboard:**
- [ ] Subscription details display
- [ ] Payment history shows
- [ ] Cancel subscription works
- [ ] Account settings work

**Quality:**
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] All tests pass
- [ ] Responsive on all devices
- [ ] Works in all browsers

**Production:**
- [ ] Deployed to fitnession.com
- [ ] SSL certificate valid
- [ ] Production payment works
- [ ] Monitored for errors

---

**Ready to start Phase 1!** 🚀

Mark phases as complete using:
- ⬜ Not started
- 🔄 In progress
- ✅ Complete
