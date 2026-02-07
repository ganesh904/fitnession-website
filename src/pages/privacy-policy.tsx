import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Fitnession</title>
        <meta
          name="description"
          content="Fitnession Privacy Policy - Learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://fitnession.com/privacy-policy" />
      </Head>

      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
          <div className="container-custom mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-600">
                Last updated: February 7, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-custom mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Fitnession ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                </p>

                <h2>2. Information We Collect</h2>

                <h3>2.1 Personal Information You Provide</h3>
                <p>We collect information that you voluntarily provide when you:</p>
                <ul>
                  <li>Register for an account (name, email, phone number)</li>
                  <li>Complete your health profile (age, gender, height, weight, health conditions)</li>
                  <li>Use our AI coaching features</li>
                  <li>Make purchases within the app</li>
                  <li>Contact our support team</li>
                </ul>

                <h3>2.2 Health Information</h3>
                <p>With your consent, we collect health-related information including:</p>
                <ul>
                  <li>Physical measurements (weight, height, body measurements)</li>
                  <li>Health conditions (diabetes, PCOD, thyroid, etc.)</li>
                  <li>Dietary preferences and restrictions</li>
                  <li>Fitness goals and activity levels</li>
                  <li>Progress photos (if you choose to upload them)</li>
                </ul>

                <h3>2.3 Mobile App Permissions</h3>
                <p>Our mobile application requests the following permissions to provide our services:</p>
                <ul>
                  <li><strong>Camera Permission (android.permission.CAMERA):</strong> We request camera access to allow you to take profile photos and progress photos directly within the app. This permission is optional and only used when you choose to capture photos. We do not access your camera without your explicit action. Photos are stored securely and used only for tracking your fitness journey.</li>
                  <li><strong>Photo Library Access (READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE):</strong> We request access to your photo library to allow you to upload profile pictures and progress photos from your device. This permission is optional and only used when you choose to upload photos. We only access the specific photos you select.</li>
                  <li><strong>Internet Permission (INTERNET):</strong> Required to connect to our servers, sync your data, and provide AI coaching features.</li>
                </ul>
                <p className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <strong>Important:</strong> All permissions are requested only when needed and with clear explanations. You can revoke these permissions at any time through your device settings. If you deny these permissions, certain features (like photo uploads) will not be available, but core functionality will still work.
                </p>

                <h3>2.4 Automatically Collected Information</h3>
                <p>When you use our app, we automatically collect:</p>
                <ul>
                  <li>Device information (type, operating system, unique identifiers)</li>
                  <li>Usage data (features used, time spent, interactions)</li>
                  <li>Log data (IP address, browser type, access times)</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Provide personalized diet and workout plans</li>
                  <li>Power our AI health coaching features</li>
                  <li>Track your progress and provide insights</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates and notifications</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>4. Sharing Your Information</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                  <li><strong>Service Providers:</strong> Third-party companies that help us operate our services (cloud hosting, analytics, payment processing)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>

                <h2>5. Payment and Subscription Information</h2>
                <h3>5.1 Google Play In-App Purchases</h3>
                <p>
                  When you purchase a subscription or make in-app purchases through our Android app, payments are processed by Google Play Store. We do not directly collect or store your credit card or payment information.
                </p>
                <ul>
                  <li><strong>Purchase Verification:</strong> We verify purchases with Google Play to prevent fraud and ensure legitimate transactions</li>
                  <li><strong>Subscription Management:</strong> We store subscription details (plan type, duration, status) to provide you access to premium features</li>
                  <li><strong>Transaction Records:</strong> We maintain records of purchase transactions for support and billing purposes</li>
                  <li><strong>Google Play Privacy:</strong> Payment processing is subject to Google Play's privacy policy</li>
                </ul>
                <p>
                  Your financial information is handled exclusively by Google Play in accordance with their security standards and privacy policies.
                </p>

                <h3>5.2 Subscription Data</h3>
                <p>We collect and store the following subscription-related information:</p>
                <ul>
                  <li>Subscription plan type (Smart or Premium)</li>
                  <li>Subscription duration and expiration date</li>
                  <li>Purchase verification status</li>
                  <li>Transaction identifiers (for support purposes)</li>
                </ul>

                <h2>6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information, including:
                </p>
                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication mechanisms</li>
                  <li>Server-side purchase verification to prevent fraud</li>
                  <li>Row-level security on databases</li>
                  <li>Regular security audits</li>
                  <li>Access controls and employee training</li>
                </ul>
                <p>
                  However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>

                <h2>7. Data Retention</h2>
                <p>
                  We retain your personal information for as long as your account is active or as needed to provide you services. You can request deletion of your account and data at any time by contacting us at support@fitnession.com.
                </p>
                <p>
                  <strong>Subscription Data:</strong> Purchase records and transaction data are retained for 7 years as required by applicable tax and accounting regulations.
                </p>

                <h2>8. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong>Deletion:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Request transfer of your data</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at support@fitnession.com.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>

                <h2>10. Third-Party Services</h2>
                <h3>10.1 Service Providers</h3>
                <p>
                  We use trusted third-party service providers to help us operate our services:
                </p>
                <ul>
                  <li><strong>Supabase:</strong> Cloud database and authentication services</li>
                  <li><strong>Google Play Store:</strong> Payment processing for Android in-app purchases</li>
                  <li><strong>Anthropic Claude AI:</strong> AI-powered health coaching and recommendations</li>
                  <li><strong>Analytics Services:</strong> To understand app usage and improve our services</li>
                </ul>
                <p>
                  These providers have access only to the information necessary to perform their functions and are obligated to protect your information.
                </p>

                <h3>10.2 External Links</h3>
                <p>
                  Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
                </p>

                <h2>11. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than India. We ensure that appropriate safeguards are in place to protect your information in accordance with this privacy policy.
                </p>

                <h2>12. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. Material changes will be communicated via email or in-app notification. You are advised to review this privacy policy periodically.
                </p>

                <h2>13. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong> support@fitnession.com</li>
                  <li><strong>Website:</strong> https://fitnession.com</li>
                  <li><strong>Address:</strong> Bangalore, Karnataka, India</li>
                </ul>

                <h2>14. Grievance Officer</h2>
                <p>
                  In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
                </p>
                <p>
                  <strong>Name:</strong> Fitnession Support Team<br />
                  <strong>Email:</strong> support@fitnession.com<br />
                  <strong>Response Time:</strong> Within 24-48 hours
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
