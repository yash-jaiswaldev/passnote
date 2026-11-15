import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-green-300 w-full max-w-full">
            <div className="md:mycontainer flex  justify-between md:justify-between items-center h-14 md:px-16 md:py-4">

                <div className='logo cursor-pointer'>
                    <h1 className='text-xl font-bold text-center'>
                        <span className='text--600'>&lt;</span>
                        <span>Pass</span><span className='text-green-700'>Note&gt;</span>
                    </h1>
                </div>
                <div>
                    <button className='bg-black text-white p-2 rounded-b-lg font-semibold'>
                        <span><a href=""><img className='w-7 h-auto' src="/icons/git.png" alt="Github" /></a></span></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
