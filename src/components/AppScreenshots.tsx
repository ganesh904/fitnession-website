'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const screenshots = [
  {
    id: 1,
    title: 'AI Health Coach',
    description: 'Chat with specialized AI coaches 24/7',
    gradient: 'from-primary-500 to-primary-600',
    emoji: '🤖',
    features: ['Instant responses', 'Personalized advice', '8+ specialists'],
  },
  {
    id: 2,
    title: 'Diet Plans',
    description: 'Customized Indian meal plans',
    gradient: 'from-secondary-500 to-secondary-600',
    emoji: '🥗',
    features: ['Daily meals', 'Calorie tracking', 'Grocery lists'],
  },
  {
    id: 3,
    title: 'Workout Plans',
    description: 'Home & gym workout routines',
    gradient: 'from-purple-500 to-purple-600',
    emoji: '💪',
    features: ['Video guides', 'Custom plans', 'Progress tracking'],
  },
  {
    id: 4,
    title: 'Progress Tracking',
    description: 'Visual transformation journey',
    gradient: 'from-blue-500 to-blue-600',
    emoji: '📊',
    features: ['Weight charts', 'Photo diary', 'Milestones'],
  },
  {
    id: 5,
    title: 'Health Insights',
    description: 'AI-powered health analysis',
    gradient: 'from-green-500 to-green-600',
    emoji: '❤️',
    features: ['Health score', 'Recommendations', 'Reports'],
  },
]

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            App Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            See <span className="gradient-text">Fitnession</span> in Action
          </h2>
          <p className="text-lg text-gray-600">
            Explore the powerful features that make Fitnession your perfect health companion.
          </p>
        </motion.div>

        {/* Screenshots Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="text-gray-600" />
            </button>

            {/* Phone Carousel */}
            <div className="flex items-center justify-center space-x-4 md:space-x-8 overflow-hidden py-8">
              {[-1, 0, 1].map((offset) => {
                const index = (currentIndex + offset + screenshots.length) % screenshots.length
                const screenshot = screenshots[index]
                const isCenter = offset === 0

                return (
                  <motion.div
                    key={`${screenshot.id}-${offset}`}
                    initial={false}
                    animate={{
                      scale: isCenter ? 1 : 0.8,
                      opacity: isCenter ? 1 : 0.5,
                      x: offset * 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`${isCenter ? 'z-20' : 'z-10'} ${!isCenter && 'hidden md:block'}`}
                  >
                    <div className="w-64 md:w-72">
                      <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                        <div className={`bg-gradient-to-b ${screenshot.gradient} rounded-[2rem] overflow-hidden aspect-[9/19]`}>
                          <div className="h-full flex flex-col items-center justify-center p-6 text-white">
                            <span className="text-5xl mb-4">{screenshot.emoji}</span>
                            <h3 className="text-xl font-bold mb-2">{screenshot.title}</h3>
                            <p className="text-sm text-white/80 text-center mb-6">
                              {screenshot.description}
                            </p>
                            <div className="space-y-2 w-full">
                              {screenshot.features.map((feature, i) => (
                                <div
                                  key={i}
                                  className="bg-white/20 rounded-lg p-2 text-sm text-center"
                                >
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full" />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
