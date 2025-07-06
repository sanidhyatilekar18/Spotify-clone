import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiOutlineHashtag,
  HiOutlineMenu,
} from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-row items-center my-8 text-sm font-medium ${
            isActive ? 'text-cyan-400' : 'text-gray-400'
          } hover:text-cyan-300`
        }
        onClick={() => handleClick?.()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        
        <h1 className="text-white text-2xl font-bold">🎵 Musicify</h1>
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-4 z-20">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-7 h-7 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-7 h-7 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        {/* Logo for mobile */}
        <h1 className="text-white text-2xl font-bold mb-6">🎵 Musicify</h1>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
