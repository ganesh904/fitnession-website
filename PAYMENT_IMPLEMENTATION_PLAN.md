# Payment System Implementation Plan
## Fitnession Website - Premium Payment Integration

---

## 📋 CURRENT STATE ANALYSIS

### What EXISTS:
✅ Next.js 14 website with TypeScript
✅ Tailwind CSS styling
✅ Framer Motion animations
✅ Landing page with features, testimonials, stats
✅ Blog pages
✅ Privacy policy & Terms pages
✅ Success stories page
✅ Delete account page
✅ Responsive design

### What's MISSING:
❌ No backend/API routes
❌ No Supabase integration
❌ No payment gateway integration
❌ No environment variables
❌ No /premium page
❌ No payment success/failure pages
❌ No user authentication
❌ No subscription management

---

## 🎯 IMPLEMENTATION GOAL

Build a complete payment flow where:
1. User clicks "Get Premium Access" in mobile app
2. Browser opens to `/premium?plan=...&userId=...&email=...&tier=...`
3. User sees plan details and pricing
4. User completes payment via Razorpay
5. Subscription saved to Supabase
6. User redirected back to app via deep link
7. App checks subscription and unlocks Mira

---

## 📁 NEW FILES TO CREATE

### 1. Environment Configuration
```
.env.local                         # Environment variables (gitignored)
.env.example                       # Template for environment variables
```

### 2. Pages
```
src/pages/premium.tsx              # Main payment page
src/pages/payment-success.tsx      # Success redirect page
src/pages/payment-failed.tsx       # Failed payment page
src/pages/payment-processing.tsx   # Processing page (optional)
```

### 3. API Routes
```
src/pages/api/payment/create-order.ts      # Create Razorpay order
src/pages/api/payment/verify-payment.ts    # Verify Razorpay signature
src/pages/api/payment/save-subscription.ts # Save to Supabase
```

### 4. Utilities
```
src/lib/supabase.ts                # Supabase client setup
src/lib/razorpay.ts                # Razorpay helper functions
src/lib/plans.ts                   # Plan definitions (shared with mobile)
src/types/payment.ts               # TypeScript types for payment
```

### 5. Components
```
src/components/payment/PlanCard.tsx          # Plan selection card
src/components/payment/PaymentButton.tsx     # Razorpay payment button
src/components/payment/PricingTable.tsx      # Pricing comparison
src/components/payment/PaymentModal.tsx      # Payment processing modal
src/components/payment/TrialBanner.tsx       # Trial status display
```

---

## 🔧 PACKAGES TO INSTALL

```bash
# Supabase client
npm install @supabase/supabase-js

# Razorpay SDK
npm install razorpay

# Crypto for signature verification
# (built-in with Node.js, no install needed)

# Optional: Payment UI enhancements
npm install react-hot-toast         # Toast notifications
npm install @headlessui/react        # Modal/Dialog components
```

---

## 🌐 ENVIRONMENT VARIABLES

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App Configuration
NEXT_PUBLIC_APP_SCHEME=fitnession://
NEXT_PUBLIC_SITE_URL=https://fitnession.com
```

Create `.env.example`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# App Configuration
NEXT_PUBLIC_APP_SCHEME=fitnession://
NEXT_PUBLIC_SITE_URL=https://fitnession.com
```

---

## 📊 PLAN DEFINITIONS

Plans must match mobile app (from `@/constants/plans.ts`):

### Smart Plans
```typescript
{
  monthly: { price: 199, duration: 1 },
  quarterly: { price: 499, duration: 3 },
  yearly: { price: 1499, duration: 12 }
}
```

### Premium Plans
```typescript
{
  monthly: { price: 499, duration: 1 },
  quarterly: { price: 1299, duration: 3 },
  yearly: { price: 3999, duration: 12 }
}
```

---

## 🔄 PAYMENT FLOW ARCHITECTURE

### Step 1: User Lands on Premium Page
```
URL: /premium?plan=smart_monthly&userId=abc123&email=user@email.com&tier=smart

1. Parse query parameters
2. Validate userId exists
3. Check if user already has subscription
4. Display selected plan details
5. Show pricing options
```

### Step 2: User Selects Plan
```
1. User clicks plan card
2. Plan details highlighted
3. "Pay ₹XXX" button enabled
```

### Step 3: Payment Initialization
```
1. User clicks "Pay Now" button
2. Frontend calls: POST /api/payment/create-order
   Body: { planId, userId, email, tier, duration }

3. Backend:
   - Validates plan exists
   - Calculates amount
   - Creates Razorpay order
   - Returns: { orderId, amount, currency }

4. Frontend receives order details
```

### Step 4: Razorpay Checkout Opens
```
1. Initialize Razorpay with:
   - key_id
   - order_id
   - amount
   - currency
   - prefill (name, email)
   - handler (success callback)

2. User enters payment details
3. User completes payment
```

### Step 5: Payment Verification
```
1. Razorpay returns:
   - razorpay_payment_id
   - razorpay_order_id
   - razorpay_signature

2. Frontend calls: POST /api/payment/verify-payment
   Body: { paymentId, orderId, signature, userId, planId }

3. Backend:
   - Verifies Razorpay signature (CRITICAL)
   - If valid, calls save-subscription API
   - Returns: { success, subscriptionId }
```

### Step 6: Save Subscription to Supabase
```
1. Backend calls Supabase:
   INSERT INTO subscriptions (
     user_id,
     plan_tier,
     plan_duration,
     start_date,
     end_date,
     is_active,
     payment_id,
     order_id,
     amount_paid
   )

2. Returns subscription ID
```

### Step 7: Redirect to App
```
1. Frontend redirects to:
   fitnession://payment-success?subscriptionId=xyz

2. App receives deep link
3. App calls subscriptionStore.checkSubscriptionStatus()
4. Mira unlocked!
```

---

## 🎨 PREMIUM PAGE UI STRUCTURE

```
┌─────────────────────────────────────┐
│ Header (with Fitnession logo)      │
├─────────────────────────────────────┤
│                                     │
│ 🎉 Welcome, John!                   │
│ Complete your premium upgrade       │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Trial Status Banner         │   │
│ │ 🎁 3 Days Free Trial Left   │   │
│ └─────────────────────────────┘   │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Selected Plan: Smart        │   │
│ │ ⚡ Mira AI Health Coach     │   │
│ └─────────────────────────────┘   │
│                                     │
│ Pricing Options:                    │
│                                     │
│ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │Month │ │3 Mo  │ │12 Mo │        │
│ │₹199  │ │₹499  │ │₹1499 │        │
│ │      │ │SAVE  │ │SAVE  │        │
│ │      │ │17%   │ │38%   │        │
│ └──────┘ └──────┘ └──────┘        │
│                                     │
│ What's Included:                    │
│ ✅ Unlimited Mira AI chat          │
│ ✅ Personalized diet plans         │
│ ✅ Custom workout plans            │
│ ✅ 24/7 health advice              │
│                                     │
│ ┌─────────────────────────────┐   │
│ │   Pay ₹199 with Razorpay    │   │
│ │   💳 Secure Payment         │   │
│ └─────────────────────────────┘   │
│                                     │
│ 🔒 Secure • 7-Day Money Back      │
│                                     │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

---

## 🔐 SECURITY CONSIDERATIONS

### 1. Payment Verification
```typescript
// CRITICAL: Always verify Razorpay signature on server
import crypto from 'crypto';

function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const text = orderId + '|' + paymentId;
  const generated = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(text)
    .digest('hex');

  return generated === signature;
}
```

### 2. Never Trust Client
- ❌ Don't accept amount from frontend
- ✅ Calculate amount on backend
- ❌ Don't save subscription before verification
- ✅ Verify signature first, then save

### 3. Environment Variables
- ❌ Never expose secret key to frontend
- ✅ Use NEXT_PUBLIC_ prefix only for public keys
- ❌ Never commit .env.local to git
- ✅ Add .env.local to .gitignore

### 4. User Validation
- Verify userId exists in database
- Check user email matches
- Prevent duplicate subscriptions
- Handle trial users correctly

---

## 🚀 API ROUTE IMPLEMENTATIONS

### POST /api/payment/create-order
```typescript
Request:
{
  planId: "smart_monthly",
  userId: "abc123",
  email: "user@email.com",
  tier: "smart",
  duration: 1
}

Response:
{
  orderId: "order_xyz",
  amount: 19900, // in paise
  currency: "INR",
  planDetails: { ... }
}
```

### POST /api/payment/verify-payment
```typescript
Request:
{
  razorpay_payment_id: "pay_xyz",
  razorpay_order_id: "order_xyz",
  razorpay_signature: "signature_hash",
  userId: "abc123",
  planId: "smart_monthly",
  tier: "smart",
  duration: 1
}

Response:
{
  success: true,
  subscriptionId: "sub_123",
  message: "Payment verified and subscription activated"
}
```

---

## 📱 DEEP LINKING

### Success Redirect
```
fitnession://payment-success?subscriptionId=sub_123&tier=smart&duration=1
```

### Failure Redirect
```
fitnession://payment-failed?reason=payment_cancelled
```

### App Handler (already configured in app.config.js)
```javascript
scheme: 'fitnession'
```

---

## 🧪 TESTING STRATEGY

### 1. Razorpay Test Mode
- Use test API keys from Razorpay dashboard
- Test cards available at: https://razorpay.com/docs/payments/test-card-details

Test Cards:
```
Success: 4111 1111 1111 1111
Failure: 4111 1111 1111 1112
CVV: Any 3 digits
Expiry: Any future date
```

### 2. Test Scenarios
- ✅ New user with active trial
- ✅ User with expired trial
- ✅ User trying to buy again (already has subscription)
- ✅ Invalid userId
- ✅ Payment success flow
- ✅ Payment failure flow
- ✅ Payment cancellation
- ✅ Network errors
- ✅ Deep link redirect

### 3. Manual Testing Checklist
```
□ Premium page loads with correct plan
□ User info displayed correctly
□ Trial status shown if applicable
□ Plan selection works
□ Payment button triggers Razorpay
□ Payment success → subscription saved
□ Deep link redirects to app
□ App unlocks Mira access
□ Subscription visible in Supabase
□ Payment ID stored correctly
```

---

## 📦 SUPABASE TABLE (Already exists)

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_tier TEXT NOT NULL, -- 'smart' or 'premium'
  plan_duration INTEGER NOT NULL, -- 1, 3, or 12 months
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  payment_id TEXT, -- Razorpay payment ID
  order_id TEXT, -- Razorpay order ID
  amount_paid INTEGER, -- Amount in rupees
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_subscriptions_user_active
ON subscriptions(user_id, is_active);
```

---

## 🎯 IMPLEMENTATION PHASES

### Phase 1: Setup (1 hour)
1. Install packages (Supabase, Razorpay, toast)
2. Setup environment variables
3. Create Supabase client
4. Create Razorpay helper
5. Create plan definitions
6. Create TypeScript types

### Phase 2: Premium Page (2 hours)
1. Create /premium page
2. Parse query parameters
3. Build plan selection UI
4. Create PlanCard components
5. Add trial status banner
6. Design responsive layout

### Phase 3: API Routes (2 hours)
1. Create create-order API
   - Validate plan
   - Calculate amount
   - Create Razorpay order
2. Create verify-payment API
   - Verify signature
   - Handle success/failure
3. Create save-subscription API
   - Save to Supabase
   - Calculate end_date
   - Return subscription details

### Phase 4: Payment Integration (2 hours)
1. Add Razorpay script to _document.tsx
2. Create PaymentButton component
3. Initialize Razorpay checkout
4. Handle payment callbacks
5. Show loading states
6. Add toast notifications

### Phase 5: Success/Failure Pages (1 hour)
1. Create payment-success.tsx
2. Create payment-failed.tsx
3. Add redirect logic
4. Add deep link buttons
5. Add "Open App" functionality

### Phase 6: Testing (2 hours)
1. Test with Razorpay test cards
2. Verify signature validation
3. Check Supabase subscriptions
4. Test deep linking
5. Test error scenarios
6. Mobile browser testing

### Phase 7: Production Setup (1 hour)
1. Get Razorpay production keys
2. Update environment variables
3. Test in production
4. Monitor logs
5. Setup error tracking

**Total Estimated Time: 11 hours**

---

## 🔗 INTEGRATION WITH MOBILE APP

### App Receives Query Params
```typescript
// App constructs URL:
const paymentUrl = `https://fitnession.com/premium?plan=${planId}&userId=${userId}&email=${email}&tier=${tier}`;
```

### Website Parses Params
```typescript
// Premium page reads:
const { plan, userId, email, tier } = router.query;
```

### After Payment → Deep Link
```typescript
// Website redirects:
window.location.href = `fitnession://payment-success?subscriptionId=${id}`;
```

### App Handles Deep Link
```typescript
// App checks subscription:
await subscriptionStore.checkSubscriptionStatus(userId);
```

---

## 📋 CHECKLIST BEFORE GOING LIVE

### Development
- [ ] All packages installed
- [ ] Environment variables configured
- [ ] Supabase connection tested
- [ ] Razorpay test mode working
- [ ] Premium page UI complete
- [ ] Payment flow tested end-to-end
- [ ] Deep linking works
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Toast notifications working

### Security
- [ ] Signature verification implemented
- [ ] Secret keys not exposed
- [ ] .env.local gitignored
- [ ] API routes protected
- [ ] Input validation added
- [ ] SQL injection prevented
- [ ] XSS protection enabled

### Production
- [ ] Razorpay production keys added
- [ ] Production Supabase URL added
- [ ] Website deployed to fitnession.com
- [ ] DNS/domain configured
- [ ] SSL certificate active
- [ ] Error tracking setup (Sentry)
- [ ] Analytics added (optional)

### Testing
- [ ] Test with real payment
- [ ] Verify subscription in Supabase
- [ ] Test app unlocking Mira
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test network errors
- [ ] Test payment failures

---

## 🆘 TROUBLESHOOTING

### Payment Not Working
1. Check Razorpay dashboard for errors
2. Verify API keys (test vs production)
3. Check browser console for errors
4. Verify CORS settings
5. Check Razorpay webhook logs

### Subscription Not Saved
1. Check Supabase logs
2. Verify signature validation
3. Check API route response
4. Verify userId exists
5. Check RLS policies

### Deep Link Not Opening
1. Verify app scheme in app.config.js
2. Test deep link directly in browser
3. Check mobile OS version
4. Verify app is installed
5. Test fallback URL

---

## 📚 RESOURCES

### Documentation
- Razorpay Docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
- Supabase Docs: https://supabase.com/docs/reference/javascript/introduction
- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction

### Razorpay Test Cards
- https://razorpay.com/docs/payments/test-card-details

### Supabase Dashboard
- https://app.supabase.com

---

## 🎉 EXPECTED OUTCOME

After implementation:
1. ✅ User clicks "Get Premium Access" in app
2. ✅ Browser opens to premium page with plan pre-selected
3. ✅ User sees trial status and pricing
4. ✅ User completes payment via Razorpay
5. ✅ Subscription saved to Supabase automatically
6. ✅ User redirected back to app
7. ✅ Mira AI coach unlocked instantly
8. ✅ User can start chatting with Mira

---

**Ready to implement!** 🚀

Next step: Get approval to start Phase 1 (Setup)
