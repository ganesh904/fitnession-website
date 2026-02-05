import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Contact', href: '/#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/terms-of-service#refunds' },
  ],
  categories: [
    { name: 'Weight Loss', href: '/blog?category=weight-loss' },
    { name: 'Muscle Building', href: '/blog?category=muscle-building' },
    { name: 'Diabetes', href: '/blog?category=diabetes' },
    { name: 'Nutrition', href: '/blog?category=nutrition' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/fitnession', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/fitnession', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/fitnession', label: 'Facebook' },
  { icon: Linkedin, href: 'https://linkedin.com/company/fitnession', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-white">Fitnession</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              India's first AI-powered health and lifestyle app. Transform your health with personalized diet plans, workouts, and 24/7 AI coaching.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Health Topics</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:support@fitnession.com" className="hover:text-primary-400">
                  support@fitnession.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Fitnession. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
