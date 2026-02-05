import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { blogPosts, categories, getPostsByCategory, BlogPost } from '@/data/blogPosts'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = getPostsByCategory(selectedCategory).filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Health & Fitness Blog | Fitnession</title>
        <meta
          name="description"
          content="Expert health and fitness articles covering weight loss, muscle building, diabetes management, PCOD, nutrition, and exercise tips. Written by certified professionals."
        />
        <meta name="keywords" content="health blog, fitness tips, weight loss, diabetes, PCOD, nutrition, exercise, Indian diet" />
        <link rel="canonical" href="https://fitnession.com/blog" />
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
                Health & Fitness Blog
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Expert Tips for Your <span className="gradient-text">Health Journey</span>
              </h1>
              <p className="text-lg text-gray-600">
                Science-backed articles on nutrition, fitness, and wellness written by certified health professionals.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-xl mx-auto mt-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-gray-100">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.slug
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                        {/* Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                          <span className="text-4xl">
                            {post.categorySlug === 'weight-loss' && '🏃‍♀️'}
                            {post.categorySlug === 'diabetes' && '💉'}
                            {post.categorySlug === 'pcod' && '🩺'}
                            {post.categorySlug === 'exercise' && '💪'}
                            {post.categorySlug === 'nutrition' && '🥗'}
                            {post.categorySlug === 'muscle-building' && '🏋️'}
                          </span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category Badge */}
                          <span className="inline-block bg-primary-100 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                            {post.category}
                          </span>

                          {/* Title */}
                          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Calendar size={14} className="mr-1" />
                                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                              <span className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <ArrowRight
                              size={18}
                              className="text-primary-500 group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
