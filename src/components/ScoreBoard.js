import React from 'react'

const ScoreBoard = ({score}) => {
  return (
    <div className='mb-16 mt-4 text-2xl font-bold text-black md:text-4xl lg:text-5xl'>
      Score: {score}
    </div>
  )
}

export default ScoreBoard