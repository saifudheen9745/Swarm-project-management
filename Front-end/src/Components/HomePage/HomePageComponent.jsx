import React from 'react'
import MainSide from './MainSide/MainSide'
import Navbar from './Navbar/Navbar'
import AsideNav from './AsideComponent/AsideNav'

function HomePageComponent() {
  return (
    <div className='flex h-screen overflow-hidden'>
        <AsideNav/>
        <div className='w-full'>
        <Navbar/>
        <MainSide/>
        </div>
    </div>
  )
}

export default HomePageComponent