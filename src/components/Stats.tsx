'use client'

import { motion } from 'framer-motion'
import { Users, Star, TrendingDown, MessageSquare } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Users',
    description: 'Indians transforming their health',
    color: 'text-primary-500',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Star,
    value: '4.8',
    label: 'App Rating',
    description: 'On Google Play Store',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: TrendingDown,
    value: '50,000+',
    label: 'Kg Lost',
    description: 'Collective weight loss',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-100',
  },
  {
    icon: MessageSquare,
    value: '1M+',
    label: 'AI Conversations',
    description: 'Health queries answered',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
]

export default function Stats() {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-lg font-semibold text-gray-300 mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-gray-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
