import React from 'react'

const WelcomeScreen = ({ onStartGame }) => {
  return (
    <div className='flex justify-center items-center flex-col bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl px-10 py-12 border border-white'>
      <span className='text-6xl mb-2'>🍬</span>
      <h1 className='font-game text-4xl md:text-5xl text-center bg-gradient-to-r from-pink-500 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm'>
        Candy Crush Clone
      </h1>
      <p className='mt-3 text-amber-800/80 font-semibold text-center'>
        Match 3 or more candies to score points!
      </p>
      <button
        className='bg-gradient-to-r from-pink-500 to-amber-500 hover:brightness-110 active:scale-95 mt-8 text-white font-game text-lg tracking-wide py-3 px-10 rounded-full shadow-lg shadow-orange-300/50 transition-all'
        onClick={onStartGame}
      >
        Play!
      </button>
      <p className='pt-8 text-sm font-semibold text-amber-800/70'>&copy; Advait Gogte</p>
    </div>
  )
}

export default WelcomeScreen
