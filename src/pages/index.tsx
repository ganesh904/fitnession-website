import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import AppScreenshots from '@/components/AppScreenshots'
import Testimonials from '@/components/Testimonials'
import Stats from '@/components/Stats'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fitnession - India's #1 AI-Powered Health & Lifestyle App</title>
        <meta
          name="description"
          content="Transform your health with Fitnession - India's first AI-powered health app. Get personalized diet plans, smart workouts, and 24/7 AI coaching. Download free today!"
        />
        <meta name="keywords" content="health app, fitness app, diet plan, workout, AI coach, weight loss, India, PCOD, diabetes, nutrition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Fitnession - India's #1 AI-Powered Health & Lifestyle App" />
        <meta property="og:description" content="Transform your health with personalized diet plans, smart workouts, and 24/7 AI coaching." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fitnession.com" />
        <meta property="og:image" content="https://fitnession.com/images/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fitnession - India's #1 AI Health App" />
        <meta name="twitter:description" content="Transform your health with AI-powered personalized plans." />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://fitnession.com" />
      </Head>

      <Header />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AppScreenshots />
        <Stats />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
