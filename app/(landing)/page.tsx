import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div>LandingPage
      <Link href={"/sign-in"}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Sign In</button>
      </Link>
      <Link href={"/sign-up"}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Register</button>
      </Link>
    </div>
  )
}

export default LandingPage