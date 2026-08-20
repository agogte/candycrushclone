import React from 'react'

const ScoreBoard = ({ score }) => {
  return (
    <div className='mb-8 mt-2 flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-white'>
      <span className='text-2xl md:text-3xl'>🏆</span>
      <span className='font-game text-xl md:text-3xl text-amber-700'>
        {score}
      </span>
    </div>
  )
}

export default ScoreBoard
