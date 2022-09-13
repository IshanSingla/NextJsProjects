import React from 'react'
import Link from 'next/link'

const NavBar = ({cartQty}) => {
  return (
    <div>
        <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href='/'>
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">  
                <img src="/logo-landscape.png"/>
            </a>
          </Link> 
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href='/'><a className="mr-5 hover:text-gray-900">Home</a></Link>
            <Link href='/about'><a className="mr-5 hover:text-gray-900">About</a></Link>
            <Link href='/products'><a className="mr-5 hover:text-gray-900">Products</a></Link>
            <Link href='/contact'><a className="mr-5 hover:text-gray-900">Contact Us</a></Link>
            <Link href='/cart'>
              <button className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="absolute inset-0 object-right-top -mr-6">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-indigo-500 text-white">
                    {cartQty}
                  </div>
                </span>
              </button>
            </Link>
          </nav>
          {/* <button className="my-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Login</button> */}
        </div>
      </header> 
    </div>
  )
}

export default NavBar