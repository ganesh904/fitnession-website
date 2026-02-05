'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    image: '/images/testimonials/user1.jpg',
    rating: 5,
    beforeWeight: '78 kg',
    afterWeight: '62 kg',
    duration: '3 months',
    quote: 'Fitnession changed my life! The AI coach understood my PCOD condition and created a perfect diet plan. I lost 16 kg in just 3 months without feeling hungry.',
    highlight: 'Lost 16 kg',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Delhi',
    image: '/images/testimonials/user2.jpg',
    rating: 5,
    beforeWeight: '92 kg',
    afterWeight: '75 kg',
    duration: '4 months',
    quote: 'As a diabetic, I was skeptical about fitness apps. But Fitnession\'s specialized diabetes coach helped me manage my blood sugar while losing weight. My HbA1c dropped from 8.2 to 6.5!',
    highlight: 'HbA1c: 8.2 to 6.5',
  },
  {
    id: 3,
    name: 'Anjali Patel',
    location: 'Bangalore',
    image: '/images/testimonials/user3.jpg',
    rating: 5,
    beforeWeight: '68 kg',
    afterWeight: '55 kg',
    duration: '2.5 months',
    quote: 'The home workout plans are amazing! Being a working mom, I couldn\'t go to the gym. Fitnession gave me 20-minute effective workouts that fit my schedule perfectly.',
    highlight: 'Lost 13 kg at home',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    image: '/images/testimonials/user4.jpg',
    rating: 5,
    beforeWeight: '85 kg',
    afterWeight: '78 kg',
    duration: '2 months',
    quote: 'I wanted to build muscle while staying vegetarian. The AI coach created a high-protein veg diet that helped me gain muscle and lose fat simultaneously. Incredible results!',
    highlight: 'Gained muscle on veg diet',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Real People, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of Indians who have transformed their health with Fitnession.
            Here are some of their inspiring journeys.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* User Info */}
                <div className="text-center md:text-left">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mx-auto md:mx-0 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-500">{testimonials[currentIndex].location}</p>

                  {/* Rating */}
                  <div className="flex justify-center md:justify-start mt-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-6 space-y-2">
                    <div className="bg-primary-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">Before</p>
                      <p className="text-lg font-bold text-gray-900">
                        {testimonials[currentIndex].beforeWeight}
                      </p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">After</p>
                      <p className="text-lg font-bold text-gray-900">
                        {testimonials[currentIndex].afterWeight}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      in {testimonials[currentIndex].duration}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <Quote className="w-12 h-12 text-primary-200 mb-4" />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold w-fit">
                    {testimonials[currentIndex].highlight}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="text-gray-600" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
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

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
