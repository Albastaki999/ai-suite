import LandingHero from '@/components/landing-hero'
import LandingNavbar from '@/components/landing-navbar'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
    </div>
  )
}

export default LandingPage