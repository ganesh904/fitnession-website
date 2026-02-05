'use client'

import { motion } from 'framer-motion'
import {
  Bot,
  Utensils,
  Dumbbell,
  TrendingUp,
  Users,
  Clock,
  Heart,
  Brain
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Health Coaches',
    description: 'Chat with 8+ specialized AI coaches for nutrition, fitness, diabetes, PCOD, and more. Get instant, personalized advice 24/7.',
    color: 'bg-primary-500',
    lightColor: 'bg-primary-100',
  },
  {
    icon: Utensils,
    title: 'Personalized Diet Plans',
    description: 'Get customized Indian diet plans based on your goals, preferences, and health conditions. Includes weekly grocery lists.',
    color: 'bg-secondary-500',
    lightColor: 'bg-secondary-100',
  },
  {
    icon: Dumbbell,
    title: 'Smart Workout Plans',
    description: 'Home or gym workouts tailored to your fitness level. Video guides and progress tracking included.',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track weight, water intake, meals, and workouts. Visual charts show your transformation journey.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
  },
  {
    icon: Heart,
    title: 'Health Condition Support',
    description: 'Specialized programs for diabetes, PCOD, thyroid, hypertension, and cholesterol management.',
    color: 'bg-red-500',
    lightColor: 'bg-red-100',
  },
  {
    icon: Clock,
    title: '4-Week Transformation',
    description: 'Structured 28-day plans with daily meals and workouts. See visible results in just one month.',
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Everything You Need to{' '}
            <span className="gradient-text">Transform Your Health</span>
          </h2>
          <p className="text-lg text-gray-600">
            Powered by advanced AI, Fitnession combines personalized nutrition,
            smart workouts, and expert coaching in one app.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="card p-8 h-full hover:scale-105 transition-transform duration-300 border border-gray-100">
                {/* Icon */}
                <div className={`w-14 h-14 ${feature.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color.replace('bg-', '').replace('-500', '-600')}`} style={{ color: feature.color.includes('primary') ? '#00897B' : feature.color.includes('secondary') ? '#FF9800' : undefined }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
