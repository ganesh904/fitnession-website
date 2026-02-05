import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found | Fitnession</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <Header />

      <main className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-lg mx-auto"
          >
            {/* 404 Illustration */}
            <div className="text-9xl font-bold gradient-text mb-8">404</div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>

            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track to your health journey!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Home size={18} />
                <span>Go Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-outline flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={18} />
                <span>Go Back</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}
