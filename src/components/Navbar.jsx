import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 border border-sky-500 justify-evenly bg-slate-800 rounded-md mt-2 w-[500px]' >
     <NavLink
     to={"/"}
     >
        Home
    </NavLink>

    <NavLink
    to={"/pastes"}
    >
        Pastes
    </NavLink>
    </div>
  )
}

export default Navbar
