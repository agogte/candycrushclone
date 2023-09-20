import React from 'react'

const WelcomeScreen = ({onStartGame}) => {
  return (
    <div className='flex justify-center items-center flex-col'>
        <h1 className='text-5xl  text-amber-800'>Welcome to CandyCrushClone!</h1>
        <button className="bg-blue-500 hover:bg-blue-700 mt-10 text-white font-bold py-2 px-4 rounded-full" onClick={onStartGame}>Play!</button>
        <p className="pt-10 font-bold text-lg font-serif text-amber-800">&copy; Advait Gogte</p>
    </div>
  )
}

export default WelcomeScreen