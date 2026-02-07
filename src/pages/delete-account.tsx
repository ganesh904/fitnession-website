import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DeleteAccountPage() {
  return (
    <>
      <Head>
        <title>Delete Account | Fitnession</title>
        <meta
          name="description"
          content="Request account deletion for Fitnession app. Permanent removal of your personal data and account information."
        />
        <link rel="canonical" href="https://fitnession.com/delete-account" />
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
                Delete Your Account
              </h1>
              <p className="text-gray-600">
                Request permanent deletion of your Fitnession account and data
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

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mt-0 mb-2">⚠️ Important Notice</h3>
                  <p className="mb-0">
                    Account deletion is <strong>permanent and irreversible</strong>. All your data including health profiles,
                    diet plans, workout routines, progress photos, and chat history will be permanently deleted and cannot be recovered.
                  </p>
                </div>

                <h2>What Will Be Deleted</h2>
                <p>When you delete your account, the following data will be permanently removed:</p>
                <ul>
                  <li><strong>Account Information:</strong> Email, name, phone number</li>
                  <li><strong>Health Profile:</strong> Age, gender, height, weight, health conditions</li>
                  <li><strong>Health Data:</strong> Diet plans, workout plans, progress tracking</li>
                  <li><strong>Photos:</strong> Profile pictures and progress photos</li>
                  <li><strong>AI Chat History:</strong> All conversations with AI health coach</li>
                  <li><strong>Subscription Records:</strong> Purchase history and subscription details</li>
                </ul>

                <h2>What Happens to Your Subscription</h2>
                <ul>
                  <li>If you have an active subscription, it will be cancelled</li>
                  <li>You will <strong>not</strong> receive a refund for remaining subscription time</li>
                  <li>To request a refund, please contact us before deleting your account</li>
                  <li>You can manage your Google Play subscription separately at:
                    <a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener">
                      play.google.com/store/account/subscriptions
                    </a>
                  </li>
                </ul>

                <h2>Before You Delete</h2>
                <p>Consider these alternatives:</p>
                <ul>
                  <li><strong>Pause Subscription:</strong> Cancel your subscription but keep your account and data</li>
                  <li><strong>Contact Support:</strong> If you're having issues, we can help! Email support@fitnession.com</li>
                  <li><strong>Export Your Data:</strong> Request a copy of your data before deletion (email support@fitnession.com)</li>
                </ul>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 my-8">
                  <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">💾 Data Export (Optional)</h3>
                  <p className="mb-3">
                    Before deleting, you can request a copy of your data:
                  </p>
                  <ol className="mb-0">
                    <li>Email support@fitnession.com with subject "Data Export Request"</li>
                    <li>Include your registered email address</li>
                    <li>We'll send you a copy within 7 business days</li>
                    <li>Then proceed with deletion request</li>
                  </ol>
                </div>

                <h2>How to Delete Your Account</h2>

                <h3>Option 1: Delete from Mobile App (Recommended)</h3>
                <ol>
                  <li>Open the Fitnession app</li>
                  <li>Go to <strong>Profile</strong> → <strong>Settings</strong></li>
                  <li>Scroll down to <strong>Account Management</strong></li>
                  <li>Tap <strong>"Delete My Account"</strong></li>
                  <li>Read the warning carefully</li>
                  <li>Type "DELETE" to confirm</li>
                  <li>Tap <strong>"Permanently Delete Account"</strong></li>
                  <li>Your account will be deleted within 24 hours</li>
                </ol>

                <h3>Option 2: Request Deletion via Email</h3>
                <p>If you cannot access the app, send an email to:</p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
                  <p className="mb-2"><strong>To:</strong> support@fitnession.com</p>
                  <p className="mb-2"><strong>Subject:</strong> Account Deletion Request</p>
                  <p className="mb-4"><strong>Include in email:</strong></p>
                  <ul className="mb-0">
                    <li>Your registered email address</li>
                    <li>Your full name (as registered)</li>
                    <li>Phone number (if provided during registration)</li>
                    <li>Reason for deletion (optional)</li>
                    <li>Confirmation statement: "I understand this is permanent and irreversible"</li>
                  </ul>
                </div>

                <h3>Option 3: Request via Contact Form</h3>
                <p>
                  Visit our contact page and submit a deletion request:
                  <a href="https://fitnession.com/contact"> fitnession.com/contact</a>
                </p>

                <h2>Deletion Timeline</h2>
                <ul>
                  <li><strong>Immediate:</strong> Account login disabled, app access removed</li>
                  <li><strong>Within 24 hours:</strong> Personal data removed from active databases</li>
                  <li><strong>Within 7 days:</strong> Data removed from backup systems</li>
                  <li><strong>Within 30 days:</strong> Complete deletion from all systems</li>
                </ul>

                <h2>Data Retention for Legal Compliance</h2>
                <p>
                  Some data may be retained for legal and regulatory requirements:
                </p>
                <ul>
                  <li><strong>Transaction Records:</strong> Purchase receipts and invoices retained for 7 years (tax compliance)</li>
                  <li><strong>Support Tickets:</strong> Customer service communications retained for 2 years</li>
                  <li><strong>Anonymized Analytics:</strong> Non-identifiable usage statistics may be retained</li>
                </ul>
                <p>
                  This data cannot be used to identify you and is kept solely for legal compliance.
                </p>

                <h2>Cancelling a Deletion Request</h2>
                <p>
                  You have <strong>24 hours</strong> to cancel your deletion request:
                </p>
                <ul>
                  <li>Email support@fitnession.com with subject "Cancel Deletion Request"</li>
                  <li>Include your registered email</li>
                  <li>We'll restore your account within 2 business days</li>
                  <li>After 24 hours, deletion cannot be stopped</li>
                </ul>

                <h2>After Deletion</h2>
                <ul>
                  <li>You will receive a confirmation email when deletion is complete</li>
                  <li>You can create a new account anytime with the same email</li>
                  <li>Previous data will <strong>not</strong> be restored to new accounts</li>
                  <li>Active subscriptions will be cancelled (no refund unless within Google Play's 48-hour window)</li>
                </ul>

                <h2>Alternatives to Deletion</h2>

                <h3>Just Want to Cancel Subscription?</h3>
                <p>
                  You don't need to delete your account to stop payments:
                </p>
                <ol>
                  <li>Open Google Play Store app</li>
                  <li>Tap Menu → Subscriptions</li>
                  <li>Find Fitnession subscription</li>
                  <li>Tap "Cancel subscription"</li>
                  <li>Your data remains safe, just subscription stops</li>
                </ol>

                <h3>Need a Break?</h3>
                <p>
                  You can simply log out and return anytime. Your data will be preserved for 2 years of inactivity.
                </p>

                <h3>Having Issues?</h3>
                <p>
                  Contact our support team before deleting: support@fitnession.com
                </p>

                <div className="bg-red-50 p-6 rounded-lg border border-red-200 my-8">
                  <h3 className="text-xl font-bold text-red-900 mt-0 mb-3">🚨 Final Warning</h3>
                  <p className="mb-0 text-red-900">
                    Once deletion is processed (after 24 hours), <strong>all your data is gone forever</strong>.
                    There is no way to recover your health profiles, diet plans, workout routines, or any other data.
                    Please be absolutely certain before proceeding.
                  </p>
                </div>

                <h2>Questions About Account Deletion?</h2>
                <p>Contact us:</p>
                <ul>
                  <li><strong>Email:</strong> support@fitnession.com</li>
                  <li><strong>Response Time:</strong> Within 24-48 hours</li>
                  <li><strong>Website:</strong> <a href="https://fitnession.com">fitnession.com</a></li>
                </ul>

                <h2>Privacy & Data Protection</h2>
                <p>
                  For more information about how we handle your data, please review:
                </p>
                <ul>
                  <li><a href="https://fitnession.com/privacy-policy">Privacy Policy</a></li>
                  <li><a href="https://fitnession.com/terms-of-service">Terms of Service</a></li>
                </ul>

                <hr className="my-8" />

                <p className="text-center text-gray-600">
                  We're sorry to see you go, but we respect your choice. Thank you for using Fitnession. 🙏
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
