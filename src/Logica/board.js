import { WINNER_COMBOSS } from '../Components/Constants';

export const checkWinnerFrom = (boardToCheck) => {

    // Verificamos todas las combinaciones para ver si X u O ganaron.
    for (let i = 0; i < WINNER_COMBOSS.length; i++) {
      const [a, b, c] = WINNER_COMBOSS[i];
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador ...
    return null;
  }

  export   const checkEndGame = (newBoard) => {
    // Si hay un valor null en el tablero, significa que no hay empate.

    // [null, 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O']
    return newBoard.every((item) => item !== null)  
  }
  