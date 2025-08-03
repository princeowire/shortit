import React from 'react'

const Nav = () => {
  return (
    <div className='w-full p-4 flex justify-between gap-6 absolute top-0 left-0'>
      <p className="logo text-2xl font-semibold">Shortit</p>

      <span className='rounded-[30px] gradient-border'>
        <button className='p-2 px-6 bg-[#181E29] rounded-[30px]'  onClick={() => alert('Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark this page')}>Book Mark now</button>
      </span>
    </div>
  )
}

export default Nav
