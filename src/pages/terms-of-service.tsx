import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Fitnession</title>
        <meta
          name="description"
          content="Fitnession Terms of Service - Read our terms and conditions for using the Fitnession app and services."
        />
        <link rel="canonical" href="https://fitnession.com/terms-of-service" />
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
                Terms of Service
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
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Fitnession mobile application and website (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  Fitnession is an AI-powered health and lifestyle application that provides:
                </p>
                <ul>
                  <li>Personalized diet plans based on Indian cuisine</li>
                  <li>Customized workout routines</li>
                  <li>AI health coaching and advice</li>
                  <li>Progress tracking tools</li>
                  <li>Health condition-specific programs</li>
                </ul>

                <h2>3. Mobile App Permissions</h2>
                <h3>3.1 Required Permissions</h3>
                <p>
                  Our mobile application requires certain permissions to function properly. By installing and using the app, you consent to these permissions:
                </p>
                <ul>
                  <li><strong>Internet Access:</strong> Required for all app functionality including AI coaching, data sync, and updates</li>
                </ul>

                <h3>3.2 Optional Permissions</h3>
                <p>
                  The following permissions are optional and requested only when needed:
                </p>
                <ul>
                  <li><strong>Camera:</strong> Used only when you choose to take profile photos or progress photos within the app. You can deny this permission and still use all other features.</li>
                  <li><strong>Photo Library/Storage:</strong> Used only when you choose to upload photos from your device. You can deny this permission and still use all other features.</li>
                </ul>
                <p>
                  You can manage these permissions at any time through your device settings. Denying optional permissions will not affect core app functionality.
                </p>

                <h2>4. User Accounts</h2>
                <h3>4.1 Registration</h3>
                <p>
                  To use certain features of our Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and keep your account information updated.
                </p>

                <h3>4.2 Account Security</h3>
                <p>
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to your account.
                </p>

                <h3>4.3 Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or illegal activities.
                </p>

                <h2>5. Health Disclaimer</h2>
                <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <strong>IMPORTANT:</strong> Fitnession is not a substitute for professional medical advice, diagnosis, or treatment. The information provided through our Service is for general informational purposes only.
                </p>
                <ul>
                  <li>Always consult with a qualified healthcare provider before starting any diet, exercise, or wellness program</li>
                  <li>If you have any medical conditions, consult your doctor before using our Service</li>
                  <li>In case of medical emergency, contact your local emergency services immediately</li>
                  <li>Our AI coaches provide general guidance and are not licensed medical professionals</li>
                </ul>

                <h2>6. Subscription and Payments</h2>
                <h3>6.1 Premium Plans</h3>
                <p>
                  Fitnession offers two premium plan types:
                </p>
                <ul>
                  <li><strong>Smart Plan:</strong> AI-powered health coaching with personalized diet and workout plans (1, 3, 6, or 12-month durations)</li>
                  <li><strong>Premium Plan:</strong> Everything in Smart Plan plus personal health coach with weekly calls (3, 6, or 12-month durations)</li>
                </ul>
                <p>
                  By purchasing a premium plan, you agree to pay the fees indicated for your selected plan. All prices are listed in Indian Rupees (INR).
                </p>

                <h3>6.2 Payment Processing</h3>
                <p>
                  Payments for Android users are processed exclusively through Google Play Store using Google Play Billing. Key points:
                </p>
                <ul>
                  <li>All transactions are subject to Google Play's terms and conditions</li>
                  <li>We do not store your payment information (credit card, UPI, etc.)</li>
                  <li>Payments are verified server-side to prevent fraud</li>
                  <li>You will receive a receipt from Google Play for each purchase</li>
                  <li>Billing issues should be directed to Google Play support</li>
                </ul>

                <h3>6.3 Subscription Duration and Access</h3>
                <p>
                  Premium features are available for the duration of your purchased plan:
                </p>
                <ul>
                  <li>Access begins immediately upon successful purchase verification</li>
                  <li>Plans are valid for the purchased duration (1, 3, 6, or 12 months)</li>
                  <li>No automatic renewal - you choose when to purchase again</li>
                  <li>Access expires at the end of your plan duration unless renewed</li>
                </ul>

                <h3 id="refunds">6.4 Refund Policy</h3>
                <p>
                  Refunds are handled according to Google Play Store policies:
                </p>
                <ul>
                  <li><strong>Within 48 hours:</strong> Request a refund directly through Google Play Store</li>
                  <li><strong>After 48 hours:</strong> Contact us at support@fitnession.com with your order details</li>
                  <li><strong>Eligibility:</strong> Refunds may be granted based on:
                    <ul>
                      <li>Technical issues preventing app usage</li>
                      <li>Accidental purchases with proof</li>
                      <li>Service not delivered as described</li>
                    </ul>
                  </li>
                  <li><strong>Not eligible:</strong> Refunds are generally not available for:
                    <ul>
                      <li>Change of mind after 7 days of active use</li>
                      <li>Partially used subscription periods after 7 days</li>
                      <li>Failure to achieve personal health goals</li>
                    </ul>
                  </li>
                  <li><strong>Processing time:</strong> Approved refunds are processed within 5-7 business days</li>
                </ul>
                <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                  <strong>Note:</strong> Refund decisions are made at our sole discretion. We review each request on a case-by-case basis.
                </p>

                <h3>6.5 Plan Changes and Pricing</h3>
                <p>
                  We reserve the right to modify our pricing and plans:
                </p>
                <ul>
                  <li>Price changes do not affect active subscriptions</li>
                  <li>New prices apply only to future purchases</li>
                  <li>Material changes will be communicated 30 days in advance</li>
                  <li>You can lock in current pricing by purchasing longer durations</li>
                </ul>

                <h3>6.6 Taxes</h3>
                <p>
                  All prices displayed are inclusive of applicable taxes (GST) as required by Indian law. Google Play handles tax calculation and collection.
                </p>

                <h2>7. User Content</h2>
                <h3>7.1 Your Content</h3>
                <p>
                  You retain ownership of any content you submit to the Service (including health data, photos, and feedback). By submitting content, you grant us a license to use, store, and process it to provide our services.
                </p>

                <h3>7.2 Prohibited Content</h3>
                <p>You agree not to submit content that:</p>
                <ul>
                  <li>Is false, misleading, or fraudulent</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains viruses or malicious code</li>
                  <li>Violates any applicable laws</li>
                  <li>Is offensive, abusive, or harmful</li>
                </ul>

                <h2>8. Intellectual Property</h2>
                <p>
                  The Service and its original content (excluding user content), features, and functionality are owned by Fitnession and are protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h2>9. Prohibited Uses</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Copy, modify, or distribute our content without permission</li>
                  <li>Use automated systems to access the Service</li>
                  <li>Impersonate another person or entity</li>
                  <li>Share your account credentials with others</li>
                </ul>

                <h2>10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Fitnession shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Personal injury or health issues</li>
                  <li>Errors or inaccuracies in content</li>
                  <li>Unauthorized access to your data</li>
                  <li>Interruption of service</li>
                </ul>
                <p>
                  Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.
                </p>

                <h2>11. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Fitnession and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
                </p>

                <h2>12. Third-Party Services</h2>
                <p>
                  Our Service may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party services.
                </p>

                <h2>13. Modifications to Service</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation.
                </p>

                <h2>14. Changes to Terms</h2>
                <p>
                  We may revise these Terms at any time. By continuing to use the Service after changes become effective, you agree to be bound by the revised Terms. We will notify users of material changes via email or in-app notification.
                </p>

                <h2>15. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                </p>

                <h2>16. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>

                <h2>17. Contact Information</h2>
                <p>For questions about these Terms, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong> support@fitnession.com</li>
                  <li><strong>Website:</strong> https://fitnession.com</li>
                </ul>

                <h2>18. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Fitnession regarding the use of the Service.
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
