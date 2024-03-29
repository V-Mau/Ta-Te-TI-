import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './Components/Square'
import { TURNS} from './Components/Constants'
import { checkWinnerFrom, checkEndGame } from './Logica/board'
import './App.css'
import { WinnerModal } from './Components/WinnerModal'




function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const[turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  //null = no hay ganador , false = empate 
  const [winner, setWinner] = useState(null)

 

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }


  const updateBoard = (index) => {
    // NO se alctualiza la posición si ya tiene un valor.
     if(board[index] || winner ) return
     // Actuazamos el tablero.
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Guardar partida en el local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
  
    // Revisa si hay ganador.
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti();
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }

  return (
    <>
    <main className='board'>
     <h1>TA-TE-TI</h1>
     <button onClick={resetGame}>Reset Game</button>
     <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard} 
            >
              {square}
            </Square>

          )
        })
      }

     </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} >
          {TURNS.O}
        </Square>

      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
    </>
  )
}

export default App
