# Production Deployment Guide - Fitnession Website

## Overview

This guide covers deploying the Fitnession website to production using Vercel (recommended) or other platforms.

---

## Pre-Deployment Checklist

### 1. Testing Complete
- [ ] All tests in TESTING.md passed
- [ ] Razorpay LIVE payment tested successfully
- [ ] Mobile app deep linking tested
- [ ] Trial system integration verified
- [ ] Cross-browser testing complete

### 2. Environment Variables Ready
- [ ] Supabase URL and Anon Key
- [ ] Supabase Service Role Key
- [ ] Razorpay LIVE Key ID: `rzp_live_VNA4bS2fMFepXR`
- [ ] Razorpay LIVE Secret: `cAXBundvZIF11fbETkTM8SZJ`
- [ ] App scheme: `fitnession://`

### 3. Database Ready
- [ ] All migrations applied to production Supabase
- [ ] Trial system tables exist
- [ ] Subscriptions table exists
- [ ] RLS policies configured correctly
- [ ] Service role key has proper permissions

### 4. Code Ready
- [ ] All files committed to git
- [ ] No console.log statements in production code
- [ ] No test/dummy data in code
- [ ] .env.local not committed (in .gitignore)

---

## Deployment Option 1: Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js.

### Step 1: Prepare Repository

```bash
# Navigate to website directory
cd C:\Users\NEHA\Desktop\AI-Health\fitnession-website

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial production-ready commit"

# Create GitHub repository and push
# (Follow GitHub instructions to create repo)
git remote add origin https://github.com/YOUR_USERNAME/fitnession-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Create Vercel Account:**
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Build Settings:**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables:**

   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_VNA4bS2fMFepXR
   RAZORPAY_KEY_SECRET=cAXBundvZIF11fbETkTM8SZJ
   NEXT_PUBLIC_APP_SCHEME=fitnession://
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Vercel provides a URL: `https://fitnession-website.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain: `www.fitnession.com`

2. **Update DNS Records:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (5-30 minutes)

3. **SSL Certificate:**
   - Vercel automatically provisions SSL certificate
   - HTTPS enabled by default

### Step 4: Test Production Deployment

1. Visit your Vercel URL
2. Test login/signup flow
3. **IMPORTANT:** Test ONE real payment with small amount
4. Verify subscription saved to database
5. Test deep linking to mobile app
6. Check all dashboard pages work

---

## Deployment Option 2: Netlify

### Step 1: Prepare Repository
Same as Vercel - push to GitHub.

### Step 2: Deploy to Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty)

6. Add Environment Variables (same as Vercel)

7. Deploy

8. Netlify URL: `https://fitnession-website.netlify.app`

**Note:** Next.js 14 works better with Vercel due to native support.

---

## Deployment Option 3: Self-Hosted (VPS/Cloud)

### Requirements
- Ubuntu 20.04+ server
- Node.js 18+ installed
- Nginx or Apache
- PM2 for process management
- SSL certificate (Let's Encrypt)

### Step 1: Server Setup

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

### Step 2: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/fitnession-website.git
cd fitnession-website

# Install dependencies
npm install

# Create .env.local with production variables
sudo nano .env.local
# (Paste all environment variables)

# Build for production
npm run build

# Start with PM2
pm2 start npm --name "fitnession-website" -- start
pm2 save
pm2 startup
```

### Step 3: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/fitnession
```

Add configuration:
```nginx
server {
    listen 80;
    server_name fitnession.com www.fitnession.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/fitnession /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d fitnession.com -d www.fitnession.com
```

---

## Post-Deployment Configuration

### 1. Update Mobile App

Update mobile app to use production website URL:

```typescript
// In your React Native app
const PAYMENT_WEB_URL = 'https://fitnession-website.vercel.app/premium'
// or your custom domain
const PAYMENT_WEB_URL = 'https://www.fitnession.com/premium'
```

### 2. Configure Razorpay Webhook (Optional)

For advanced payment tracking:

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Save webhook secret

**Create webhook handler** (future enhancement):
```typescript
// src/pages/api/webhooks/razorpay.ts
export default async function handler(req, res) {
  // Verify webhook signature
  // Update subscription status based on event
  // Return 200 OK
}
```

### 3. Update Supabase Redirect URLs

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add to "Redirect URLs":
   - `https://your-domain.com/login`
   - `https://your-domain.com/dashboard`
   - `https://your-domain.com/reset-password`

### 4. Configure CORS (if needed)

If you encounter CORS issues with Supabase:

1. Go to Supabase Dashboard → Settings → API
2. Add your domain to allowed origins:
   - `https://your-domain.com`
   - `https://www.your-domain.com`

---

## Monitoring & Maintenance

### 1. Error Tracking

**Add Sentry (Recommended):**

```bash
npm install @sentry/nextjs
```

```javascript
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig({
  // existing config
}, {
  silent: true,
  org: 'your-org',
  project: 'fitnession-website',
})
```

### 2. Analytics

**Add Google Analytics:**

```typescript
// src/pages/_app.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
```

Add to `_document.tsx`:
```typescript
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### 3. Performance Monitoring

**Vercel Analytics:**
- Automatically enabled on Vercel
- View in Vercel dashboard under "Analytics"

**Lighthouse Scores:**
- Run regular Lighthouse audits
- Target: 90+ on all metrics

### 4. Database Monitoring

Monitor Supabase usage:
- Go to Supabase Dashboard → Reports
- Check database size, API requests, bandwidth
- Set up usage alerts

### 5. Payment Monitoring

Monitor Razorpay:
- Check daily payment reports
- Set up email alerts for failed payments
- Monitor refund requests
- Track subscription trends

---

## Backup Strategy

### 1. Database Backups

Supabase automatically backs up your database. To manual backup:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Create backup
supabase db dump --db-url postgresql://[connection-string] > backup.sql
```

### 2. Code Backups

- GitHub repository serves as code backup
- Vercel keeps deployment history
- Can rollback to any previous deployment

---

## Scaling Considerations

### Current Limits (Starter)
- Supabase Free Tier: 500MB database, 2GB bandwidth/month
- Vercel Free Tier: 100GB bandwidth/month, unlimited requests
- Razorpay: No limits (pay per transaction)

### When to Scale

**Upgrade Supabase** when:
- Database > 400MB
- Bandwidth > 1.5GB/month
- Need better performance

**Upgrade Vercel** when:
- Bandwidth > 80GB/month
- Need team features
- Need advanced analytics

### Cost Estimates

**Monthly costs at scale:**
- Vercel Pro: $20/month (if needed)
- Supabase Pro: $25/month (if needed)
- Razorpay: 2% transaction fee
- Domain: ~$10-15/year
- SSL: Free (Let's Encrypt or Vercel)

---

## Troubleshooting Production Issues

### Issue: "500 Internal Server Error"
**Check:**
1. Vercel logs (Dashboard → Deployments → View Function Logs)
2. Environment variables set correctly
3. Supabase connection working
4. Database migrations applied

### Issue: "Razorpay modal not opening"
**Check:**
1. NEXT_PUBLIC_RAZORPAY_KEY_ID is LIVE key
2. Razorpay script loaded (check Network tab)
3. No console errors
4. Key activated in Razorpay dashboard

### Issue: "Payment verification failed"
**Check:**
1. RAZORPAY_KEY_SECRET is correct LIVE secret
2. Signature calculation logic matches Razorpay docs
3. No extra whitespace in environment variables

### Issue: "Deep links not working"
**Check:**
1. Mobile app has URL scheme registered
2. NEXT_PUBLIC_APP_SCHEME is correct
3. Test on real device (not simulator)
4. App installed on test device

### Issue: "Auth redirects not working"
**Check:**
1. Middleware.ts configured correctly
2. Supabase redirect URLs include production domain
3. Cookies enabled in browser
4. Not in incognito/private mode

---

## Security Hardening

### 1. Environment Variables
- Never commit .env.local
- Use Vercel/Netlify secrets management
- Rotate keys regularly (quarterly)

### 2. Supabase RLS
Verify Row Level Security policies:

```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('subscriptions', 'user_trials');

-- Should show rowsecurity = true

-- Verify policies exist
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('subscriptions', 'user_trials');
```

### 3. API Rate Limiting

Add rate limiting to payment APIs (future enhancement):

```typescript
// src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit'

export const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many payment attempts, please try again later',
})
```

### 4. Content Security Policy

Add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com; frame-src https://api.razorpay.com;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
}
```

---

## Launch Checklist

**Final Pre-Launch:**
- [ ] All environment variables set in production
- [ ] DNS configured and propagated
- [ ] SSL certificate active
- [ ] Test payment with real card (₹1)
- [ ] Verify subscription saved to database
- [ ] Test deep linking to mobile app
- [ ] All auth flows work (signup, login, reset)
- [ ] Dashboard displays correctly
- [ ] Mobile app pointing to production URL
- [ ] Razorpay webhook configured (optional)
- [ ] Analytics tracking setup (optional)
- [ ] Error monitoring setup (Sentry)
- [ ] Backups configured

**Post-Launch:**
- [ ] Monitor Vercel logs for errors
- [ ] Monitor Razorpay dashboard for payments
- [ ] Check Supabase database for subscriptions
- [ ] Test from multiple devices/browsers
- [ ] Monitor performance metrics
- [ ] Set up alerts for downtime

---

## Rollback Procedure

If issues arise in production:

### Vercel Rollback

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Previous version instantly live

### Database Rollback

```bash
# Restore from backup
psql postgresql://[connection-string] < backup.sql
```

### Code Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main
# Vercel auto-deploys
```

---

## Support & Resources

**Documentation:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Razorpay: https://razorpay.com/docs

**Community:**
- Next.js Discord: https://discord.gg/nextjs
- Supabase Discord: https://discord.supabase.com

**Emergency Contacts:**
- Razorpay Support: support@razorpay.com
- Supabase Support: support@supabase.io
- Vercel Support: support@vercel.com

---

## Congratulations!

Your Fitnession website is now live in production! 🎉

**Next Steps:**
1. Monitor payments and subscriptions
2. Gather user feedback
3. Iterate and improve
4. Scale as needed

Remember to:
- Check logs regularly
- Monitor payment success rates
- Update dependencies monthly
- Review security practices quarterly
