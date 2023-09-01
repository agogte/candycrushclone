import { useEffect, useState } from "react"

const width = 8
const candyColors = ['red', 'blue', 'green','yellow','orange','purple']


function App() {
  const [currentColorArrangemnet, setCurrentColorArrangement] = useState([])

  const createBoard = () => {
    const randomColorArrangement = []
    for(let i =0; i<width*width; i++){
      const randomColor = candyColors[Math.floor(Math.random() *candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  return (
    <div className="app">
      <div className="game">
        { currentColorArrangemnet.map((candyColor, index) => (
          <img key={index} style={{backgroundColor: candyColor}} alt="candycolor"/>
        ))}
      </div>
    </div>
  );
}

export default App;
