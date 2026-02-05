'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'Personalized AI health coaching',
  'Customized Indian diet plans',
  'Home & gym workout routines',
  'Progress tracking & analytics',
]

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Health Transformation Today
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join 10,000+ Indians who are already achieving their health goals with Fitnession.
              Download the app and get started for free.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-secondary-300 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors group"
            >
              <Download size={24} />
              <span>Download Free on Play Store</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-2xl scale-90" />

              {/* Phone */}
              <div className="relative w-64 md:w-72 animate-float">
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <div className="h-full bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center p-6">
                      {/* App Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-white font-bold text-3xl">F</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Fitnession</h3>
                      <p className="text-sm text-gray-500 text-center mb-6">
                        Your AI Health Coach
                      </p>

                      {/* Mock UI */}
                      <div className="w-full space-y-3">
                        <div className="bg-primary-100 rounded-xl p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">AI</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">AI Coach</p>
                              <p className="text-xs text-gray-500">Ready to help!</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-secondary-100 rounded-xl p-3 text-center">
                          <p className="text-sm font-medium text-gray-700">Today's Goal</p>
                          <p className="text-2xl font-bold text-secondary-600">1,800 cal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
