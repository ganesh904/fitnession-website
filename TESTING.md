# Testing Guide - Fitnession Website

## Prerequisites

Before testing, ensure:

1. **Environment Variables Set**
   - Copy `.env.example` to `.env.local`
   - Fill in all Supabase credentials (same as mobile app)
   - Add Supabase Service Role Key (from Supabase Dashboard → Settings → API)
   - Razorpay credentials are already in place (LIVE keys)
   - Set `NEXT_PUBLIC_APP_SCHEME=fitnession://`

2. **Dependencies Installed**
   ```bash
   npm install
   ```

3. **Development Server Running**
   ```bash
   npm run dev
   ```
   Website should be at http://localhost:3000

4. **Supabase Database Ready**
   - Trial system migration deployed
   - Subscriptions table exists
   - Users table exists
   - RLS policies configured

---

## Phase 1: Authentication Testing

### 1.1 Signup Flow

**Test Steps:**
1. Navigate to http://localhost:3000/signup
2. Fill in email and password (min 8 characters)
3. Check password strength indicator works
4. Submit form
5. ✅ Should redirect to /verify-email
6. Check email inbox for verification link
7. Click verification link
8. ✅ Should be redirected to login page

**Expected Results:**
- New user created in Supabase auth.users table
- Password strength shows: Weak → Medium → Strong
- Validation errors show for invalid inputs
- Email verification sent automatically

### 1.2 Login Flow

**Test Steps:**
1. Navigate to http://localhost:3000/login
2. Enter credentials from signup
3. Toggle password visibility
4. Click "Sign In"
5. ✅ Should redirect to /dashboard

**Expected Results:**
- User authenticated successfully
- Session persisted in localStorage
- Redirect to dashboard
- User data visible in dashboard

### 1.3 Forgot Password Flow

**Test Steps:**
1. Navigate to http://localhost:3000/forgot-password
2. Enter registered email
3. Submit form
4. ✅ Success message shown
5. Check email for reset link
6. Click reset link
7. ✅ Redirects to /reset-password with token
8. Enter new password (twice)
9. Submit form
10. ✅ Redirects to login

**Expected Results:**
- Password reset email received
- Token in URL validated
- Password successfully updated
- Can login with new password

### 1.4 Logout Flow

**Test Steps:**
1. While logged in, click "Logout" in dashboard sidebar
2. ✅ Should redirect to homepage
3. Try accessing /dashboard
4. ✅ Should redirect to /login

**Expected Results:**
- Session cleared
- Protected routes inaccessible
- Redirect to login when accessing dashboard

---

## Phase 2: Payment Flow Testing

### 2.1 Premium Page Access (From Website)

**Test Steps:**
1. Login to website
2. Navigate to /premium
3. ✅ User info should be auto-filled
4. Select a plan (Smart or Premium)
5. Select duration (1/3/12 months)
6. ✅ Price displayed correctly
7. Click "Subscribe Now"
8. ✅ Razorpay modal opens

**Expected Results:**
- Trial status banner shows (if trial active/expired)
- Plan prices match mobile app
- Savings percentage shown for longer durations
- User authenticated before payment

### 2.2 Premium Page Access (From Mobile App)

**Test Steps:**
1. Open URL with query params:
   ```
   http://localhost:3000/premium?userId=USER_UUID&email=user@example.com&tier=smart&plan=smart_1
   ```
2. ✅ User info pre-filled from query params
3. ✅ Plan pre-selected based on params
4. Continue with payment

**Expected Results:**
- Deep linking works without login
- User ID from mobile app used
- Plan pre-selected correctly

### 2.3 Razorpay Payment (Test Mode First)

**Important:** Test with Razorpay Test Keys first before using LIVE keys!

**Test Cards:**
- Success: 4111 1111 1111 1111
- Failure: 4111 1111 1111 1112

**Test Steps:**
1. Select a plan and click "Subscribe Now"
2. Razorpay modal opens
3. ✅ Order details correct (amount, plan name)
4. Enter test card: 4111 1111 1111 1111
5. CVV: 123, Expiry: any future date
6. Enter any OTP shown
7. ✅ Payment succeeds
8. ✅ Redirects to /payment-success

**Expected Results:**
- Order created in Razorpay dashboard
- Payment signature verified on server
- Subscription saved to database
- User redirected to success page
- Deep link attempts to open mobile app

**Database Verification:**
```sql
SELECT * FROM subscriptions
WHERE user_id = 'USER_UUID'
ORDER BY created_at DESC
LIMIT 1;
```

Expected columns:
- `is_active = true`
- `plan_tier = 'smart' or 'premium'`
- `plan_duration = 1, 3, or 12`
- `start_date = today`
- `end_date = calculated based on duration`
- `payment_id = razorpay_payment_id`
- `order_id = razorpay_order_id`
- `amount_paid = plan price`

### 2.4 Payment Failure Testing

**Test Steps:**
1. Select a plan and click "Subscribe Now"
2. Razorpay modal opens
3. Click "X" to cancel payment OR use failure test card
4. ✅ Redirects to /payment-failed
5. ✅ Reason shown: "cancelled" or "timeout"

**Expected Results:**
- Payment failure page shown
- Reason displayed correctly
- "Retry Payment" button works
- Deep link attempts to notify app of failure

### 2.5 Payment Security Testing

**CRITICAL - Signature Verification:**

**Test Steps:**
1. Open browser DevTools → Network tab
2. Complete a payment
3. Find POST request to `/api/payment/verify-payment`
4. Right-click → Copy as cURL
5. Modify the signature in the request
6. Replay the request
7. ✅ Should return 400 error "Payment verification failed"

**Expected Results:**
- Server ALWAYS verifies signature
- Tampered signatures rejected
- No subscription created for invalid signatures

**Test Invalid Order Creation:**

**Test Steps:**
1. Try creating order with non-existent user ID:
   ```bash
   curl -X POST http://localhost:3000/api/payment/create-order \
     -H "Content-Type: application/json" \
     -d '{"userId":"fake-uuid","planId":"smart_1","email":"test@test.com"}'
   ```
2. ✅ Should return 404 "User not found"

**Expected Results:**
- User existence verified before order creation
- Invalid plan IDs rejected
- Proper error messages returned

---

## Phase 3: Dashboard Testing

### 3.1 Subscription Dashboard

**Test Steps (With Active Subscription):**
1. Login with account that has active subscription
2. Navigate to /dashboard
3. ✅ Active subscription displayed
4. Check plan name, duration, amount shown correctly
5. Check expiry date and "days remaining" accurate
6. Click "Cancel Subscription"
7. Confirm cancellation
8. ✅ Subscription cancelled, UI updates

**Database Verification:**
```sql
SELECT is_active, cancelled_at
FROM subscriptions
WHERE user_id = 'USER_UUID';
```
- `is_active = false`
- `cancelled_at = timestamp`

**Test Steps (No Subscription):**
1. Login with account that has NO subscription
2. Navigate to /dashboard
3. ✅ "No active subscription" message shown
4. ✅ Link to /premium page provided

### 3.2 Billing History

**Test Steps:**
1. Create multiple test subscriptions (or use existing)
2. Navigate to /dashboard/billing
3. ✅ All subscriptions listed in table
4. Check columns: Plan, Duration, Amount, Date, Status
5. ✅ Most recent subscription shown first
6. Active subscription has green "Active" badge
7. Cancelled/expired have gray "Expired" badge

### 3.3 Settings Page

**Test Steps:**
1. Navigate to /dashboard/settings
2. ✅ Email displayed (read-only)
3. ✅ Account creation date shown
4. Enter new password (8+ characters)
5. Confirm password
6. Click "Update Password"
7. ✅ Success toast shown
8. Logout and login with new password
9. ✅ New password works

---

## Phase 4: Trial System Integration

### 4.1 Trial Status Display

**Test Steps:**
1. Create a user with ACTIVE trial in database:
   ```sql
   INSERT INTO user_trials (user_id, trial_start_date, trial_end_date, has_used_trial, is_trial_active)
   VALUES ('USER_UUID', NOW(), NOW() + INTERVAL '7 days', false, true);
   ```
2. Login and go to /premium
3. ✅ Orange trial banner shows: "X days remaining in your trial"

**Test Steps (Trial Expired):**
1. Update trial to expired:
   ```sql
   UPDATE user_trials
   SET is_trial_active = false, trial_end_date = NOW() - INTERVAL '1 day'
   WHERE user_id = 'USER_UUID';
   ```
2. Refresh /premium
3. ✅ Red banner shows: "Your trial has expired"

**Test Steps (Active Subscription):**
1. Create active subscription for user
2. Refresh /premium
3. ✅ Green banner shows: "You have an active subscription"

---

## Phase 5: Deep Linking Testing

### 5.1 Success Deep Link

**Test Steps:**
1. Complete a payment successfully
2. On success page, observe browser behavior
3. ✅ After 500ms, attempts to open `fitnession://payment-success?subscriptionId=XXX`
4. Click "Open Fitnession App" button manually
5. ✅ Should trigger app to open (if installed)

**Mobile App Side (Test Later):**
- App should handle `fitnession://payment-success` route
- Parse `subscriptionId` from query params
- Show success screen in app
- Refresh subscription status

### 5.2 Failure Deep Link

**Test Steps:**
1. Cancel a payment
2. On failure page, observe browser behavior
3. ✅ After 1000ms, attempts to open `fitnession://payment-failed?reason=cancelled`
4. Click "Return to App" button manually
5. ✅ Should trigger app to open

---

## Phase 6: Route Protection Testing

### 6.1 Middleware Protection

**Test Steps (Unauthenticated):**
1. Logout completely
2. Try accessing: /dashboard
3. ✅ Should redirect to /login?redirect=/dashboard
4. Try accessing: /dashboard/billing
5. ✅ Should redirect to /login
6. Try accessing: /dashboard/settings
7. ✅ Should redirect to /login

**Test Steps (Authenticated):**
1. Login
2. Try accessing: /login
3. ✅ Should redirect to /dashboard
4. Try accessing: /signup
5. ✅ Should redirect to /dashboard
6. Access /dashboard routes
7. ✅ All accessible

---

## Phase 7: Cross-Browser Testing

Test in:
- ✅ Chrome (Desktop)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop - Mac only)
- ✅ Edge (Desktop)
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)

**Check:**
- Responsive design works
- Forms submit correctly
- Razorpay modal opens
- Deep links trigger correctly
- Toast notifications display

---

## Phase 8: Production Razorpay Testing

**IMPORTANT:** Before going live, test with LIVE Razorpay keys!

1. Switch to Razorpay LIVE mode in dashboard
2. Already using LIVE keys: `rzp_live_VNA4bS2fMFepXR`
3. **Use real card to test small amount (₹1)**
4. Complete full payment flow
5. Verify in Razorpay dashboard
6. Refund test payment

---

## Checklist Summary

**Authentication:**
- [ ] Signup works
- [ ] Email verification works
- [ ] Login works
- [ ] Password reset works
- [ ] Logout works
- [ ] Route protection works

**Payment:**
- [ ] Premium page loads (website login)
- [ ] Premium page loads (mobile deep link)
- [ ] Trial status displays correctly
- [ ] Plan selection works
- [ ] Razorpay integration works
- [ ] Payment success flow works
- [ ] Payment failure flow works
- [ ] Signature verification works (security)
- [ ] Subscription saved to database

**Dashboard:**
- [ ] Subscription view works
- [ ] Cancel subscription works
- [ ] Billing history works
- [ ] Settings works
- [ ] Password change works

**Integration:**
- [ ] Deep linking to app works
- [ ] Trial status syncs with mobile
- [ ] Same Supabase backend works

**Production:**
- [ ] LIVE Razorpay payment tested
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Cross-browser tested
- [ ] Mobile responsive tested

---

## Common Issues & Solutions

### Issue: "User not found" during payment
**Solution:** Ensure user exists in Supabase auth.users table. Check userId is correct UUID.

### Issue: Payment verification fails
**Solution:** Check RAZORPAY_KEY_SECRET is correct in .env.local. Verify signature calculation logic.

### Issue: Deep links don't work
**Solution:** Ensure mobile app has URL scheme registered. Test on actual device, not simulator.

### Issue: Trial status not showing
**Solution:** Check user_trials table exists and has data. Verify API route `/api/subscription/status` returns trial data.

### Issue: Middleware redirects infinitely
**Solution:** Check middleware.ts config matches auth routes. Clear cookies and try again.

### Issue: Razorpay modal doesn't open
**Solution:** Check Razorpay script loaded in _document.tsx. Verify NEXT_PUBLIC_RAZORPAY_KEY_ID is set. Check browser console for errors.

---

## Security Checklist

- [ ] Never trust client for payment amounts
- [ ] Always verify Razorpay signature on server
- [ ] Use service role key only on server (never expose to client)
- [ ] Validate all inputs in API routes
- [ ] Check user authentication before sensitive operations
- [ ] Use HTTPS in production
- [ ] Keep Razorpay secret key secure
- [ ] Implement rate limiting on payment APIs (future enhancement)

---

**Next Step:** After testing is complete, proceed to DEPLOYMENT.md for production deployment.
