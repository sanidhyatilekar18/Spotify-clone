import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine, RiMenuLine } from 'react-icons/ri';
import {links} from '../assets/constants'


function Sidebar() {
    const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191414]'>
        <div className='flex justify-between items-center'>
            <h1 className='text-white text-2xl font-bold'>Spotify</h1>
            <RiCloseLine 
            className='text-white text-2xl cursor-pointer md:hidden'
            onClick={() => setMobileMenu(false)}
            />
        </div>
        <nav className='mt-10'>
            {links.map((link) => (
            <NavLink 
                key={link.name} 
                to={link.to} 
                className='text-white text-lg mb-4 flex items-center gap-2'
                onClick={() => setMobileMenu(false)}
            >
                <i className={link.icon}></i>
<span>{link.name}</span>
            </NavLink>
            ))}
        </nav>  
        <div className='absolute md:hidden block top-6 right-3'>
             {mobileMenu ? (
                <RiCloseLine 
                className='text-white text-2xl cursor-pointer'
                onClick={() => setMobileMenu(false)}
                />
            ) : (
                <RiMenuLine
                className='text-white text-2xl cursor-pointer'
                onClick={() => setMobileMenu(true)}
                />
            )}
        </div>
        {mobileMenu && (
            <div className='fixed top-0 left-0 w-2/3 h-screen bg-black bg-opacity-70 z-10'>
                <div className='flex flex-col items-start p-4 bg-[#191414] h-full'>
                    <nav className='mt-10'>
                        {links.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.to} 
                            className='text-white text-lg mb-4 flex items-center gap-2'
                            onClick={() => setMobileMenu(false)}
                        >
                            <i className={link.icon}></i>
                            {link.name}
                        </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        )}

    </div>
  )
}

export default Sidebar