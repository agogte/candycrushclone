import { useCallback, useEffect, useState } from "react"
import ScoreBoard from './components/ScoreBoard'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
// import sound from './assets/sound.mp3'
import WelcomeScreen from "./components/WelcomeScreen"

const width = 8
const candyColors = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy
]


function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(0)
    const [scoreDisplay, setScoreDisplay] = useState(0)
    const [isGameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
        // You can perform any other game initialization logic here
      };

    const checkForColumnOfFour = useCallback(() => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    },[currentColorArrangement])

    const checkForRowOfFour = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    },[currentColorArrangement])

    // function play() {
    //     new Audio(sound).play()  
    // }

    const checkForColumnOfThree = useCallback(() => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement])

    const checkForRowOfThree = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement])

    const moveIntoSquareBelow = useCallback(() => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
                // play()
            }
        }
    }, [currentColorArrangement])

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }
    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }
    const dragEnd = () => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }
    }


    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    useEffect(() => {
        createBoard()
    }, [])

    // useEffect(() => {
    //     play()
    // }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            // play()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    const handleReset = () => {
      window.location.reload();
    }

    return (
        <div className="bg-gradient-to-br from-pink-200 via-orange-100 to-amber-200 flex flex-col px-4 min-h-screen w-screen items-center justify-center">
            {!isGameStarted ? (
        // Show the welcome screen
        <WelcomeScreen onStartGame={handleStartGame} />
      ) : (
        // Render your game component here
        <div className="flex flex-col items-center py-8">
            <h1 className="font-game text-3xl md:text-4xl mb-2 bg-gradient-to-r from-pink-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Candy Crush Clone
            </h1>
            <ScoreBoard score={scoreDisplay}/>
            <div className="grid grid-cols-8 gap-1 bg-white/60 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-white">
                {currentColorArrangement.map((candyColor, index) => (
                    <img
                        key={index}
                        src={candyColor}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-md p-0.5 cursor-grab active:cursor-grabbing hover:scale-105 hover:drop-shadow-md transition-transform"
                    />
                ))}
            </div>
            <div className="pt-6">
              <button onClick={handleReset} className="bg-gradient-to-r from-pink-500 to-amber-500 hover:brightness-110 active:scale-95 text-white font-game tracking-wide py-2 px-8 rounded-full shadow-lg shadow-orange-300/50 transition-all">RESET</button>
            </div>
            <p className="pt-6 font-semibold text-sm text-amber-800/70">&copy; Advait Gogte</p>
            </div>
      )}
        </div>
        )
      }

export default App;

