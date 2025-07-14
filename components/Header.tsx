"use client"

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form'
import { ClipboardIcon, TrolleyIcon } from '@sanity/icons'
import useCartStore from '@/app/(shop)/store';

function Header() {
  const { user } = useUser();
  const itemCount = useCartStore((state) => state.items.reduce((total,item) => total + item.quantity, 0));

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2'>
      <div className='flex w-full justify-between items-center'>
        <Link href="/" className='text-2xl font-semibold text-black hover:opacity-50 cursor-pointer'>
          GymDolphin
        </Link>
        
        <Form action="/search" className='hidden sm:flex sm:ml-auto sm:mr-4 min-w-xl'>
          <input 
            type="text" 
            name="query" 
            placeholder='Search our products' 
            className='bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-grey-200 focus:ring-opacity-20 border-none w-full placeholder:text-gray-500'/>
        </Form>
        
        <div className='flex items-center space-x-4'>
          <Link href="/cart" className='relative flex justify-center items-center space-x-2 text-black font-bold py-2 px-2'>
            <TrolleyIcon className="w-7 h-7" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          </Link>
          <ClerkLoaded>
            {user && (
              <Link href="/orders" className='relative flex justify-center items-center space-x-2 text-black font-bold py-2 px-2'>
                <ClipboardIcon className="w-7 h-7" />
              </Link>
            )}
            {user ? (
              <div className='flex items-center space-x-2'>
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>
        </div>
      </div>
      
      {/* Search bar for mobile */}
      <Form action="/search" className='mt-2 sm:hidden max-w-2xl ml-auto'>
        <input 
          type="text" 
          name="query" 
          placeholder='Search our products' 
          className='bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-grey-500 focus:ring-opacity-50 border-none w-full placeholder:text-gray-500'/>
      </Form>
    </header>
  )
};

export default Header;