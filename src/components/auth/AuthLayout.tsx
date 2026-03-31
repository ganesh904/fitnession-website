import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <Link href="/" className="flex items-center space-x-2 max-w-7xl mx-auto">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Fitnession</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>

            {/* Content */}
            {children}
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link href="/privacy-policy" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2">•</span>
            <Link href="/terms-of-service" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full opacity-20 blur-3xl" />
      </div>
    </div>
  )
}
