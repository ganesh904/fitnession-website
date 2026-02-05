import Head from 'next/head'
import { motion } from 'framer-motion'
import { Star, TrendingDown, Calendar, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const successStories = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 32,
    location: 'Mumbai, Maharashtra',
    goal: 'Weight Loss + PCOD Management',
    beforeWeight: 78,
    afterWeight: 62,
    duration: '3 months',
    rating: 5,
    quote: 'I had been struggling with PCOD for years and tried everything. Fitnession\'s AI coach understood my condition and created a diet plan that actually worked. Not only did I lose 16 kg, but my PCOD symptoms have reduced significantly!',
    tips: ['Followed the app\'s meal timing religiously', 'Did 20-min home workouts daily', 'Tracked water intake'],
    achievements: ['Lost 16 kg', 'PCOD symptoms improved', 'Energy levels increased'],
  },
  {
    id: 2,
    name: 'Rahul Verma',
    age: 45,
    location: 'New Delhi',
    goal: 'Diabetes Management + Weight Loss',
    beforeWeight: 92,
    afterWeight: 75,
    duration: '4 months',
    rating: 5,
    quote: 'As a diabetic, I was always worried about what to eat. Fitnession\'s diabetes-specific AI coach gave me a customized Indian diet that helped me manage my blood sugar while losing weight. My HbA1c dropped from 8.2 to 6.5!',
    tips: ['Used the app\'s glucose-friendly meal plans', 'Walked 30 minutes daily', 'Monitored progress weekly'],
    achievements: ['Lost 17 kg', 'HbA1c reduced to 6.5', 'Reduced medication'],
  },
  {
    id: 3,
    name: 'Anjali Patel',
    age: 28,
    location: 'Bangalore, Karnataka',
    goal: 'Post-Pregnancy Weight Loss',
    beforeWeight: 68,
    afterWeight: 55,
    duration: '2.5 months',
    rating: 5,
    quote: 'After my pregnancy, I gained a lot of weight and didn\'t have time for gym. Fitnession\'s home workouts were perfect - just 20 minutes a day! The AI coach also helped me with breastfeeding-safe diet plans.',
    tips: ['Followed postpartum-safe workouts', 'Used quick 20-min exercise routines', 'Prepped meals using app grocery lists'],
    achievements: ['Lost 13 kg', 'Regained pre-pregnancy fitness', 'More energy for baby'],
  },
  {
    id: 4,
    name: 'Vikram Singh',
    age: 24,
    location: 'Jaipur, Rajasthan',
    goal: 'Muscle Building (Vegetarian)',
    beforeWeight: 58,
    afterWeight: 72,
    duration: '5 months',
    rating: 5,
    quote: 'I always thought building muscle as a vegetarian was impossible. Fitnession proved me wrong! The AI coach created a high-protein veg diet and gym workout plan that helped me gain 14 kg of muscle.',
    tips: ['Ate 6 meals a day as recommended', 'Never missed a workout', 'Tracked protein intake daily'],
    achievements: ['Gained 14 kg muscle', 'Achieved dream physique', 'Learned proper nutrition'],
  },
  {
    id: 5,
    name: 'Deepika Nair',
    age: 38,
    location: 'Chennai, Tamil Nadu',
    goal: 'Thyroid-Related Weight Loss',
    beforeWeight: 82,
    afterWeight: 68,
    duration: '4 months',
    rating: 5,
    quote: 'With hypothyroidism, losing weight felt impossible. Fitnession\'s thyroid-specific program changed everything. The AI understood my condition and created a plan that worked with my metabolism.',
    tips: ['Followed thyroid-friendly foods', 'Did low-impact exercises', 'Maintained consistent sleep schedule'],
    achievements: ['Lost 14 kg', 'Improved thyroid levels', 'Better sleep quality'],
  },
  {
    id: 6,
    name: 'Amit Gupta',
    age: 52,
    location: 'Kolkata, West Bengal',
    goal: 'Cholesterol & BP Management',
    beforeWeight: 88,
    afterWeight: 76,
    duration: '3.5 months',
    rating: 5,
    quote: 'At 52, my doctor warned me about my cholesterol and blood pressure. Fitnession\'s heart-health program helped me change my lifestyle completely. Both my cholesterol and BP are now in normal range!',
    tips: ['Reduced salt as per app suggestions', 'Followed heart-healthy diet', 'Walking became daily habit'],
    achievements: ['Lost 12 kg', 'Normal cholesterol', 'BP under control'],
  },
]

export default function SuccessStoriesPage() {
  return (
    <>
      <Head>
        <title>Success Stories | Fitnession - Real Transformations</title>
        <meta
          name="description"
          content="Read inspiring success stories from real Fitnession users who transformed their health. Weight loss, diabetes management, PCOD, and more."
        />
        <meta name="keywords" content="success stories, weight loss transformation, health transformation, fitness journey, India" />
        <link rel="canonical" href="https://fitnession.com/success-stories" />
      </Head>

      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
          <div className="container-custom mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Success Stories
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Real People, <span className="gradient-text">Real Results</span>
              </h1>
              <p className="text-lg text-gray-600">
                These are real transformations from Fitnession users across India.
                Their journeys inspire us every day.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-600">10,000+</p>
                <p className="text-gray-600">Happy Users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-secondary-600">50,000+</p>
                <p className="text-gray-600">Kg Lost</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="section-padding">
          <div className="container-custom mx-auto px-4">
            <div className="space-y-12">
              {successStories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-3">
                    {/* Profile Section */}
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8 text-white">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                        {story.name.charAt(0)}
                      </div>
                      <h2 className="text-2xl font-bold mb-1">{story.name}</h2>
                      <p className="text-white/80 text-sm mb-4">Age: {story.age}</p>

                      <div className="flex items-center text-white/80 text-sm mb-6">
                        <MapPin size={16} className="mr-2" />
                        {story.location}
                      </div>

                      {/* Rating */}
                      <div className="flex mb-6">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      {/* Transformation Stats */}
                      <div className="space-y-4">
                        <div className="bg-white/10 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70 text-sm">Before</span>
                            <span className="text-white/70 text-sm">After</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">{story.beforeWeight} kg</span>
                            <TrendingDown className="text-green-300" />
                            <span className="text-2xl font-bold">{story.afterWeight} kg</span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-2" />
                          <span>Duration: {story.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="md:col-span-2 p-8">
                      <span className="inline-block bg-primary-100 text-primary-600 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                        {story.goal}
                      </span>

                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                        "{story.quote}"
                      </blockquote>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* What Worked */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">What Worked for Me:</h3>
                          <ul className="space-y-2">
                            {story.tips.map((tip, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600">
                                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                                  {i + 1}
                                </span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Key Achievements:</h3>
                          <div className="space-y-2">
                            {story.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-r from-primary-50 to-secondary-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                              >
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of Indians who have transformed their health with Fitnession.
                Your transformation journey starts today.
              </p>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Start Your Journey Free
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
