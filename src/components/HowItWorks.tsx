'use client'

import { motion } from 'framer-motion'
import { UserPlus, MessageSquare, TrendingUp, Trophy } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Complete Your Profile',
    description: 'Answer a few questions about your health goals, preferences, and any medical conditions.',
  },
  {
    icon: MessageSquare,
    number: '02',
    title: 'Chat with AI Coach',
    description: 'Get instant personalized advice from our AI coaches specialized in various health domains.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Follow Your Plan',
    description: 'Receive customized daily meal plans and workout routines tailored just for you.',
  },
  {
    icon: Trophy,
    number: '04',
    title: 'Track & Transform',
    description: 'Monitor your progress, celebrate milestones, and achieve your health goals.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Your Health Transformation in{' '}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with Fitnession is easy. Follow these simple steps
            to begin your journey to better health.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-secondary-400 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center relative z-10">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
